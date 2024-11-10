import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { MutableRefObject } from 'react';
import { useLocation } from 'react-router-dom';

import { useDebounce, useEventListener, useMemoizedFn } from 'ahooks';
import isArray from 'lodash-es/isArray';
import isRegExp from 'lodash-es/isRegExp';
import isString from 'lodash-es/isString';
import { v4 as uuidv4 } from 'uuid';

import { KeepAliveContext } from '../KeepAliveContext';

import useFixAntdStyle from './useFixAntdStyle';

import type {
  CachedComponent,
  ExcludeComponent,
  KeepAliveProps,
  ScrollNodesPosition,
} from '../interface';

const useRouteCache = (props: KeepAliveProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    cachedKey,
    saveScrollPosition = true,
    excludes,
    includes,
    children,
    keepRoutes,
    refreshInterval = 200,
  } = props;
  const location = useLocation();
  const [cachedComponents, setCachedComponents] = useState<CachedComponent[]>(
    [],
  );
  const [excludeComponents, setExcludeComponents] = useState<
    ExcludeComponent[]
  >([]);
  const { fixAntdStyle, revertAntdStyle } = useFixAntdStyle();
  // 缓存的组件，所有的操作都在它上
  const cachedComponentsRef = useRef<CachedComponent[]>([]);
  const { allCachedComponentsRef } = useContext(KeepAliveContext);
  const container = containerRef.current;
  const defaultRouteKey = useMemo(
    () => location.pathname + location.search,
    [location.pathname, location.search],
  );
  const resolvedKey = keepRoutes
    ? cachedKey
      ? cachedKey
      : defaultRouteKey || uuidv4()
    : children?.key || uuidv4();
  // 容器滚动位置
  const containerScrollTo = useMemoizedFn((scrollOffsets) =>
    container?.scrollTo?.({
      top: scrollOffsets?.top || 0,
      left: scrollOffsets?.left || 0,
    }),
  );

  const saveCachedNodeChildren = useMemoizedFn(() => {
    const index = (
      cachedComponentsRef as MutableRefObject<CachedComponent[]>
    ).current.findIndex((i) => i.key === resolvedKey);
    if (index > -1) {
      const el = cachedComponentsRef.current[index].el;
      const nodeList: undefined | NodeListOf<Element> =
        el?.querySelectorAll('*');
      if (!nodeList?.length) return;
      const cachedScrollNodes: ScrollNodesPosition[] = Array.from(nodeList)
        ?.filter((node) => {
          return (
            node.scrollWidth > node.clientWidth ||
            node.scrollHeight > node.clientHeight
          );
        })
        .map((node) => [node, { x: node.scrollLeft, y: node.scrollTop }]);
      if (
        el.scrollWidth > el.clientWidth ||
        el.scrollHeight > el.clientHeight
      ) {
        cachedScrollNodes.unshift([el, { x: el.scrollLeft, y: el.scrollTop }]);
      }
      // 更新全部缓存组件的cachedScrollNodes
      const allCachedIndex =
        allCachedComponentsRef?.current?.findIndex?.(
          (i) => i.key === resolvedKey,
        ) || -1;
      (cachedComponentsRef as MutableRefObject<CachedComponent[]>).current[
        index
      ].cachedScrollNodes = cachedScrollNodes;

      if (allCachedIndex > -1) {
        (allCachedComponentsRef as MutableRefObject<CachedComponent[]>).current[
          allCachedIndex
        ].cachedScrollNodes = cachedScrollNodes;
      }
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
  // 判断是否需要缓存 默认需要
  const shouldCached = (key: string) => {
    let inExcludes = false;
    if (isArray(excludes)) {
      inExcludes = (excludes as (string | RegExp)[]).some((item) => {
        if (isRegExp(item)) {
          return (item as RegExp).test(key);
        } else {
          return item === key;
        }
      });
    } else if (isRegExp(excludes)) {
      inExcludes = (excludes as RegExp).test(key);
    } else if (isString(excludes)) {
      inExcludes = excludes === key;
    }
    if (inExcludes) return false;
    if (!includes) return true;
    if (includes) {
      let cached = true;

      if (isArray(includes)) {
        cached = (includes as (string | RegExp)[]).some((item) => {
          if (isRegExp(item)) {
            return (item as RegExp).test(key);
          } else {
            return item === key;
          }
        });
      } else if (isRegExp(includes)) {
        cached = (includes as RegExp).test(key);
      } else if (isString(includes)) {
        cached = includes === key;
      }
      return cached;
    }
    return true;
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
            let cachedItem: CachedComponent;
            const allCachedItem = allCachedComponentsRef?.current?.find?.(
              (i) => i.key === resolvedKey,
            );
            // 如果从全局里面找到则用全局缓存
            if (allCachedItem) {
              cachedItem = allCachedItem;
            } else {
              cachedItem = {
                component: children,
                key: resolvedKey,
                refreshKey: uuidv4(),
                cachedScrollNodes: [],
                el: containerRef.current as HTMLDivElement,
                refreshing: false,
              };
            }

            newCachedComponents.push(cachedItem);
            (
              cachedComponentsRef as MutableRefObject<CachedComponent[]>
            ).current = newCachedComponents;
            if (allCachedComponentsRef) {
              const allCachedIndex = allCachedComponentsRef.current.findIndex(
                (i) => i.key === resolvedKey,
              );
              if (allCachedIndex < 0) {
                allCachedComponentsRef.current.push(cachedItem);
              }
            }
            return newCachedComponents;
          }
          const oldCachedComponents = [
            ...(cachedComponentsRef as MutableRefObject<CachedComponent[]>)
              .current,
          ];
          if (allCachedComponentsRef) {
            const allCachedIndex = allCachedComponentsRef.current.findIndex(
              (i) => i.key === resolvedKey,
            );
            const cachedComponent = oldCachedComponents.find(
              (i) => i.key === resolvedKey,
            );
            if (allCachedIndex > -1 && cachedComponent) {
              allCachedComponentsRef.current.splice(
                allCachedIndex,
                1,
                cachedComponent,
              );
            }
          }
          return oldCachedComponents;
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
  }, [resolvedKey, keepRoutes]);

  useEffect(() => {
    // 如果不需要缓存滚动条置顶
    if (!shouldCached(resolvedKey) || !saveScrollPosition) {
      containerScrollTo({ left: 0, top: 0 });
      const cachedItem = cachedComponents.find((i) => i.key === resolvedKey);
      if (cachedItem) {
        cachedItem.cachedScrollNodes?.forEach?.(([node]) => {
          node?.scrollTo({ left: 0, top: 0 });
        });
      }
    }
    if (saveScrollPosition || shouldCached(resolvedKey)) {
      if (allCachedComponentsRef?.current) {
        const cachedItem = allCachedComponentsRef?.current.find(
          (i) => i.key === resolvedKey,
        );
        if (cachedItem) {
          cachedItem.cachedScrollNodes?.forEach?.(([node, { x, y }]) => {
            setTimeout(() => {
              node?.scrollTo({ left: x || 0, top: y || 0 });
            }, 20);
          });
        }
      }
    }
  }, [saveScrollPosition, resolvedKey, cachedComponents, children]);
  const updateAllCachedComponents = (
    key: string | string[],
    callback: (
      cachedComponents: MutableRefObject<CachedComponent[]>,
      index: number,
    ) => void,
  ) => {
    if (allCachedComponentsRef) {
      const allCachedComponents = allCachedComponentsRef.current;
      if (typeof key === 'string') {
        const index = allCachedComponents.findIndex((i) => i.key === key);
        if (index > -1) {
          callback(allCachedComponentsRef, index);
        }
      } else {
        callback(allCachedComponentsRef, -1);
      }
    }
  };

  const onRefreshCache = useCallback((key: string) => {
    setCachedComponents((prev) => {
      const newCachedComponents = [...prev];
      const index = cachedComponents.findIndex((item) => item.key === key);
      const newRefreshKey = uuidv4();
      if (index > -1) {
        newCachedComponents[index].refreshKey = newRefreshKey;
        newCachedComponents[index].refreshing = true;
      }
      cachedComponentsRef.current = newCachedComponents;
      updateAllCachedComponents(key, (allCachedComponentsRef, index) => {
        if (index > -1) {
          allCachedComponentsRef.current[index].refreshKey = newRefreshKey;
          allCachedComponentsRef.current[index].refreshing = true;
        }
      });
      return newCachedComponents;
    });
    setTimeout(() => {
      setCachedComponents((prev) => {
        const newCachedComponents = [...prev];
        const index = cachedComponents.findIndex((item) => item.key === key);
        const newRefreshKey = uuidv4();
        if (index > -1) {
          newCachedComponents[index].refreshKey = newRefreshKey;
          newCachedComponents[index].refreshing = false;
        }
        cachedComponentsRef.current = newCachedComponents;
        updateAllCachedComponents(key, (allCachedComponentsRef, index) => {
          if (index > -1) {
            allCachedComponentsRef.current[index].refreshKey = newRefreshKey;
            allCachedComponentsRef.current[index].refreshing = false;
          }
        });
        return newCachedComponents;
      });
    }, refreshInterval);
  }, []);
  const onClearCache = useCallback(() => {
    cachedComponentsRef.current = [];
    if (allCachedComponentsRef) {
      allCachedComponentsRef.current = [];
    }
    setCachedComponents([]);
  }, []);
  const onRemoveCache = useCallback((key: string) => {
    setCachedComponents((prev) => {
      const newCachedComponents = [...prev];
      const index = cachedComponents.findIndex((item) => item.key === key);
      if (index > -1) {
        newCachedComponents.splice(index, 1);
      }
      cachedComponentsRef.current = newCachedComponents;
      updateAllCachedComponents(key, (allCachedComponentsRef, index) => {
        if (index > -1) {
          allCachedComponentsRef.current.splice(index, 1);
        }
      });
      return newCachedComponents;
    });
  }, []);
  const onRemoveCacheByKeys = useCallback((keys: string[]) => {
    setCachedComponents((prev) => {
      const newCachedComponents = prev.filter(
        (item) => !keys.includes(item.key),
      );
      cachedComponentsRef.current = newCachedComponents;
      updateAllCachedComponents(keys, (allCachedComponentsRef, index) => {
        if (index) {
          allCachedComponentsRef.current =
            allCachedComponentsRef.current.filter(
              (item) => !keys.includes(item.key),
            );
        }
      });
      return newCachedComponents;
    });
  }, []);
  return {
    cachedComponents,
    excludeComponents,
    activeKey: resolvedKey,
    containerRef,
    onClearCache,
    onRefreshCache,
    onRemoveCache,
    onRemoveCacheByKeys,
  };
};

export default useRouteCache;
