import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { useLocation } from 'react-router-dom';

import { useDebounce, useEventListener, useMemoizedFn } from 'ahooks';
import { isArray, isRegExp, isString } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';

import { KeepAliveContext } from '../KeepAliveContext';

import useFixAntdStyle from './useFixAntdStyle';

import type {
  CachedComponent,
  ExcludeComponent,
  KeepAliveRouteProps,
  ScrollNodesPosition,
} from '../interface';

const useRouteCache = (props: KeepAliveRouteProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    children,
    cachedKey,
    saveScrollPosition = true,
    excludes,
    includes,
  } = props;
  const { cachedComponents, setCachedComponents, cachedComponentsRef } =
    useContext(KeepAliveContext);
  const location = useLocation();
  // const [cachedComponents, setCachedComponents] = useState<CachedComponent[]>(
  //   [],
  // );
  const [excludeComponents, setExcludeComponents] = useState<
    ExcludeComponent[]
  >([]);
  const { fixAntdStyle, revertAntdStyle } = useFixAntdStyle();
  // // 缓存的组件，所有的操作都在它上
  // const cachedComponentsRef = useRef<CachedComponent[]>([]);
  const container = containerRef.current;
  const routeKey = useMemo(
    () => location.pathname + location.search,
    [location.pathname, location.search],
  );
  const resolvedKey = cachedKey ? cachedKey : routeKey || uuidv4();
  // 容器滚动位置
  const containerScrollTo = useMemoizedFn((scrollOffsets) =>
    container?.scrollTo?.({
      top: scrollOffsets?.top || 0,
      left: scrollOffsets?.left || 0,
    }),
  );

  const saveCachedNodeChildren = useMemoizedFn(() => {
    const nodeList: undefined | NodeListOf<Element> =
      container?.querySelectorAll('*');
    if (!nodeList?.length) return;
    const cachedScrollNodes: ScrollNodesPosition[] = Array.from(nodeList)
      ?.filter((node) => {
        return (
          node.scrollWidth > node.clientWidth + 2 ||
          node.scrollHeight > node.clientHeight + 2
        );
      })
      .map((node) => [node, { x: node.scrollLeft, y: node.scrollTop }]);
    const index = (
      cachedComponentsRef as MutableRefObject<CachedComponent[]>
    ).current.findIndex((i) => i.key === resolvedKey);
    if (index > -1) {
      (cachedComponentsRef as MutableRefObject<CachedComponent[]>).current[
        index
      ].cachedScrollNodes = cachedScrollNodes;
    }
  });
  const debouncedSaveCachedNodeChildren = useDebounce(
    () => saveCachedNodeChildren,
    {
      wait: 500,
    },
  );

  useEventListener('touchmove', debouncedSaveCachedNodeChildren);
  useEventListener('wheel', debouncedSaveCachedNodeChildren);
  const shouldCached = (key: string) => {
    let inExcludes = false;
    if (isArray(excludes)) {
      inExcludes = excludes.some((item) => {
        if (isRegExp(item)) {
          return item.test(key);
        } else {
          return item === key;
        }
      });
    } else if (isRegExp(excludes)) {
      inExcludes = excludes.test(key);
    } else if (isString(excludes)) {
      inExcludes = excludes === key;
    }
    if (inExcludes) return false;
    if (!includes) return true;
    if (includes) {
      let cached = true;
      if (isArray(includes)) {
        cached = includes.some((item) => {
          if (isRegExp(item)) {
            return item.test(key);
          } else {
            return item === key;
          }
        });
      } else if (isRegExp(includes)) {
        cached = includes.test(key);
      } else if (isString(includes)) {
        cached = includes === key;
      }
      return cached;
    }
  };
  const fixStyle = (callback: () => void) => {
    fixAntdStyle();
    callback();
    revertAntdStyle();
  };
  useEffect(() => {
    if (shouldCached(resolvedKey)) {
      fixStyle(() => {
        setCachedComponents((prev) => {
          const newCachedComponents = [...prev];
          const index = newCachedComponents.findIndex(
            (item) => item.key === resolvedKey,
          );
          if (index < 0) {
            const cachedItem: CachedComponent = {
              component: children,
              key: resolvedKey,
              refreshKey: uuidv4(),
              cachedScrollNodes: [],
            };
            newCachedComponents.push(cachedItem);
            (
              cachedComponentsRef as MutableRefObject<CachedComponent[]>
            ).current = newCachedComponents;
            return newCachedComponents;
          }
          return [
            ...(cachedComponentsRef as MutableRefObject<CachedComponent[]>)
              .current,
          ];
        });
      });
    } else {
      setExcludeComponents((prev) => {
        const newExcludeComponents = [...prev];
        const index = newExcludeComponents.findIndex(
          (item) => item.key === resolvedKey,
        );
        const newItem: ExcludeComponent = {
          component: children,
          key: resolvedKey,
          refreshKey: uuidv4(),
        };
        if (index < 0) {
          newExcludeComponents.push(newItem);
        } else {
          newExcludeComponents.splice(index, 1, newItem);
        }
        return newExcludeComponents;
      });
    }
  }, [resolvedKey]);

  useEffect(() => {
    if (!shouldCached(resolvedKey)) {
      containerScrollTo({ left: 0, top: 0 });
    }
    if (!saveScrollPosition) {
      containerScrollTo({ left: 0, top: 0 });
      const cachedItem = cachedComponents.find((i) => i.key === resolvedKey);
      if (cachedItem) {
        cachedItem.cachedScrollNodes?.forEach?.(([node]) => {
          node?.scrollTo({ left: 0, top: 0 });
        });
      }
    }
  }, [saveScrollPosition, resolvedKey, cachedComponents]);

  return {
    components: cachedComponents,
    excludeComponents,
    activeKey: resolvedKey,
    containerRef,
  };
};

export default useRouteCache;
