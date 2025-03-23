import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { JSXElementConstructor, ReactElement } from 'react';

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
/**
 * @description 缓存组件 适用于路由和非路由缓存；
 * 注意当react-router-dom是v7时，此组件不会正常工作
 * 表现为路由切换了(resolvedKey变化了)但是useEffect回调函数没有执行
 * 直接打印（不在useEffect里）打印resolvedKey是不同的值，但是在useEffect回调不执行
 * 怀疑是被Suspense组件给缓存了
 * 所以要使用此组件react-touter-dom保持在v6版本，如果大家有好的解决方法，欢迎提pr
 * @param props
 * @returns
 */
const useKeepAlive = (props: KeepAliveProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    cachedKey,
    saveScrollPosition = true,
    excludes,
    includes,
    children,
    refreshInterval = 200,
  } = props;
  const [cachedComponents, setCachedComponents] = useState<CachedComponent[]>(
    [],
  );
  const [excludeComponents, setExcludeComponents] = useState<
    ExcludeComponent[]
  >([]);
  const { fixAntdStyle, revertAntdStyle } = useFixAntdStyle();
  // 缓存的组件，所有的操作都在它上,
  // 频繁操作，直接在ref上操作，而不是频繁更新cachedComponents
  const cachedComponentsRef = useRef<CachedComponent[]>([]);
  // 全局存一份缓存是因为当缓存非路由组件时，卸载后再恢复能恢复数据
  const globalCachedComponents = useContext(KeepAliveContext);
  const container = containerRef.current;

  const resolvedKey = useMemo(() => {
    return cachedKey || uuidv4();
  }, [cachedKey]);

  // 容器滚动位置
  const containerScrollTo = useMemoizedFn((scrollOffsets) =>
    container?.scrollTo?.({
      top: scrollOffsets?.top || 0,
      left: scrollOffsets?.left || 0,
    }),
  );

  const saveCachedNodeChildren = useMemoizedFn(() => {
    const index = cachedComponentsRef.current.findIndex(
      (i) => i.key === resolvedKey,
    );
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
      // 更新缓存里的cachedScrollNodes
      cachedComponentsRef.current[index].cachedScrollNodes = cachedScrollNodes;
      // 更新全局缓存里的cachedScrollNodes
      const globalCachedItem = globalCachedComponents.get(resolvedKey);
      if (globalCachedItem) {
        globalCachedItem.cachedScrollNodes = cachedScrollNodes;
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
        return isRegExp(item) ? (item as RegExp).test(key) : item === key;
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
          return isRegExp(item) ? (item as RegExp).test(key) : item === key;
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
  const createCachedComponentItem = useCallback(
    (
      key: string,
      component: ReactElement<
        unknown,
        string | JSXElementConstructor<any>
      > | null,
    ) => {
      return {
        component,
        key,
        refreshKey: uuidv4(),
        cachedScrollNodes: [],
        el: containerRef.current as HTMLDivElement,
        refreshing: false,
      };
    },
    [],
  );
  const updateGlobalCachedComponents = (
    key: string | string[],
    callback: (
      globalCachedComponents: Map<string, CachedComponent>,
      key: string,
    ) => void,
  ) => {
    if (isArray(key)) {
      key.forEach((i) => {
        callback(globalCachedComponents, i);
      });
    } else {
      callback(globalCachedComponents, key);
    }
  };

  const updateCachedComponents = (
    key: string,
    children: ReactElement<unknown, string | JSXElementConstructor<any>> | null,
  ) => {
    const newCachedComponents = [...cachedComponentsRef.current];
    const index = newCachedComponents.findIndex((item) => item.key === key);
    // 找不到则分两种情况
    if (index < 0) {
      // 1. 从全局缓存里面找
      const globalCachedItem = globalCachedComponents.get(key);
      if (globalCachedItem) {
        newCachedComponents.push(globalCachedItem);
      } else {
        // 2. 从全局缓存里面找不到则创建一个
        const newCachedItem = createCachedComponentItem(key, children);
        newCachedComponents.push(newCachedItem);
        // 更新全局缓存
        updateGlobalCachedComponents(key, (globalCachedComponents, key) => {
          globalCachedComponents.set(key, newCachedItem);
        });
      }
      // 更新缓存
      cachedComponentsRef.current = newCachedComponents;
    } else {
      // 找到则更新
      newCachedComponents[index].component = children;
      // 更新全局缓存
      updateGlobalCachedComponents(key, (globalCachedComponents, key) => {
        globalCachedComponents.set(key, newCachedComponents[index]);
      });
    }
    return newCachedComponents;
  };
  useEffect(() => {
    if (shouldCached(resolvedKey)) {
      fixStyle(() => {
        setCachedComponents(updateCachedComponents(resolvedKey, children));
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
    // 如果不需要缓存滚动条置顶
    if (!shouldCached(resolvedKey) || !saveScrollPosition) {
      containerScrollTo({ left: 0, top: 0 });
      // const cachedItem = cachedComponents.find((i) => i.key === resolvedKey);
      // if (cachedItem) {
      //   cachedItem.cachedScrollNodes?.forEach?.(([node]) => {
      //     node?.scrollTo({ left: 0, top: 0 });
      //   });
      // }
    }
    // 如果需要保存滚动条位置
    if (shouldCached(resolvedKey) && saveScrollPosition) {
      const globalCachedItem = globalCachedComponents.get(resolvedKey);
      if (globalCachedItem) {
        globalCachedItem.cachedScrollNodes?.forEach?.(([node, { x, y }]) => {
          setTimeout(() => {
            node?.scrollTo({ left: x || 0, top: y || 0 });
          }, 20);
        });
      }
    }
  }, [saveScrollPosition, resolvedKey]);

  const onRefreshCache = useCallback((key: string) => {
    // 刷新缓存需要滚动条回到最开始的地方
    containerScrollTo({ left: 0, top: 0 });
    setCachedComponents((prev) => {
      const newCachedComponents = [...prev];
      const index = cachedComponents.findIndex((item) => item.key === key);
      const newRefreshKey = uuidv4();
      if (index > -1) {
        const cachedItem = newCachedComponents[index];
        cachedItem.refreshKey = newRefreshKey;
        cachedItem.refreshing = true;
        cachedItem.cachedScrollNodes?.forEach?.(([node]) => {
          node?.scrollTo({ left: 0, top: 0 });
        });
        cachedItem.cachedScrollNodes = [];
      }
      cachedComponentsRef.current = newCachedComponents;
      updateGlobalCachedComponents(key, (globalCachedComponents, key) => {
        const globalCachedItem = globalCachedComponents.get(key);
        if (globalCachedItem) {
          globalCachedItem.refreshKey = newRefreshKey;
          globalCachedItem.refreshing = true;
          globalCachedItem.cachedScrollNodes = [];
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
          const cachedItem = newCachedComponents[index];
          cachedItem.refreshKey = newRefreshKey;
          cachedItem.refreshing = false;
        }
        cachedComponentsRef.current = newCachedComponents;
        updateGlobalCachedComponents(key, (globalCachedComponents, key) => {
          const globalCachedItem = globalCachedComponents.get(key);
          if (globalCachedItem) {
            globalCachedItem.refreshKey = newRefreshKey;
            globalCachedItem.refreshing = false;
          }
        });
        return newCachedComponents;
      });
    }, refreshInterval);
  }, []);
  const onClearCache = useCallback(() => {
    cachedComponentsRef.current = [];
    globalCachedComponents.clear();
    setCachedComponents([]);
  }, []);
  const onRemoveCacheByKeys = useCallback((keys: string[]) => {
    setCachedComponents((prev) => {
      const newCachedComponents = prev.filter(
        (item) => !keys.includes(item.key),
      );
      cachedComponentsRef.current = newCachedComponents;
      updateGlobalCachedComponents(keys, (globalCachedComponents, key) => {
        globalCachedComponents.delete(key);
      });
      return newCachedComponents;
    });
  }, []);
  const onRemoveCache = useCallback((key: string) => {
    onRemoveCacheByKeys([key]);
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

export default useKeepAlive;
