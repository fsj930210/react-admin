import { useContext, useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';

import { useDebounce, useEventListener, useMemoizedFn } from 'ahooks';
import { v4 as uuidv4 } from 'uuid';

import { KeepAliveContext } from '../KeepAliveContext';

import useFixAntdStyle from './useFixAntdStyle';

import type {
  CachedComponent,
  KeepAliveProps,
  ScrollNodesPosition,
} from '../interface';

const useKeepAlive = (props: KeepAliveProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { children, saveScrollPosition = true } = props;
  const { cachedComponents, setCachedComponents, cachedComponentsRef } =
    useContext(KeepAliveContext);
  const [currentKey, setCurrentKey] = useState('');
  const { fixAntdStyle, revertAntdStyle } = useFixAntdStyle();

  const container = containerRef.current;

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
    cachedScrollNodes.push([
      container as HTMLDivElement,
      { x: container?.scrollLeft || 0, y: container?.scrollTop || 0 },
    ]);
    const index = (
      cachedComponentsRef as MutableRefObject<CachedComponent[]>
    ).current.findIndex((i) => i.key === currentKey);
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

  const fixStyle = (callback: () => void) => {
    fixAntdStyle();
    callback();
    revertAntdStyle();
  };
  useEffect(() => {
    if (children && !children?.key) {
      throw Error('children 必须包含一个全局唯一key');
    }
    const key = children ? (children.key as string) : uuidv4();
    setCurrentKey(key);
    fixStyle(() => {
      setCachedComponents((prev) => {
        const newCachedComponents = [...prev];
        const index = newCachedComponents.findIndex(
          (item) => item.key === children?.key,
        );
        if (index < 0) {
          const cachedItem: CachedComponent = {
            component: children,
            key: key,
            refreshKey: uuidv4(),
            cachedScrollNodes: [],
          };
          newCachedComponents.push(cachedItem);
          (cachedComponentsRef as MutableRefObject<CachedComponent[]>).current =
            newCachedComponents;
          return newCachedComponents;
        }
        return [
          ...(cachedComponentsRef as MutableRefObject<CachedComponent[]>)
            .current,
        ];
      });
    });
  }, [children]);

  useEffect(() => {
    const cachedItem = cachedComponents.find((i) => i.key === currentKey);
    if (!saveScrollPosition) {
      containerScrollTo({ left: 0, top: 0 });

      if (cachedItem) {
        cachedItem.cachedScrollNodes?.forEach?.(([node]) => {
          node?.scrollTo({ left: 0, top: 0 });
        });
      }
    } else {
      if (cachedItem) {
        cachedItem.cachedScrollNodes?.forEach?.(([node, { x, y }]) => {
          node?.scrollTo({ left: x, top: y });
        });
      }
    }
  }, [saveScrollPosition, currentKey, cachedComponents]);

  return {
    components: cachedComponents,
    activeKey: currentKey,
    containerRef,
  };
};

export default useKeepAlive;
