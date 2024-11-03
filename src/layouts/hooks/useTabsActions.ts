import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFullscreen } from 'ahooks';

import type { Tab } from '@/components/RaTabs/interface';

import { LayoutTabsContext } from '../components/Content/LayoutTabsContext';

import { HOME_PATH } from '@/utils/constants';

import useTabsStore from '@/store/tabs';

const useTabActions = ({
  updateTabItems,
}: {
  updateTabItems: (updateFunc: () => Tab[]) => void;
}) => {
  const navigate = useNavigate();
  const { onRemoveCache, onRefreshCache, onRemoveCacheByKeys } =
    useContext(LayoutTabsContext);
  const tabItems = useTabsStore((state) => state.tabItems);
  const [isFullscreen, { toggleFullscreen: toggleFullscreenFunc }] =
    useFullscreen(document.getElementById('ra-content-container'));
  // 重新加载
  const reloadTabFunc = useCallback(
    (key: string) => {
      onRefreshCache?.(key);
    },
    [onRefreshCache],
  );
  // 删除Tab
  const deleteTabFunc = useCallback(
    (key: string) => {
      updateTabItems(() => {
        const index = tabItems.findIndex((i) => i.key === key);
        const prevIndex = index - 1;
        if (index > -1) {
          if (!tabItems[index].closable) return tabItems;
          const newTabs = [...tabItems];
          newTabs.splice(index, 1);
          if (prevIndex > -1) {
            setTimeout(() => {
              navigate(tabItems[prevIndex].key);
            }, 0);
          }
          onRemoveCache?.(key);
          return newTabs;
        } else {
          return tabItems;
        }
      });
    },
    [tabItems, onRemoveCache],
  );
  // 固定 如果现有items有固定的则放到最后一个固定的后面
  const togglePinTabFunc = useCallback(
    (item: Tab) => {
      updateTabItems(() => {
        const newItems = [...tabItems];
        const index = tabItems.findIndex((i) => i.key === item?.key);
        // 取消固定
        if (item.pin) {
          newItems.splice(index, 1, { ...item, pin: false });
        } else {
          const pinIndexArr = tabItems.reduce(
            (pre: number[], current, curIndex) => {
              if (current.pin) {
                pre.push(curIndex);
              }
              return pre;
            },
            [],
          );
          const maxIndex = Math.max(...pinIndexArr);
          if (index > -1) {
            newItems.splice(index, 1);
            item.pin = true;
            item.closable = false;
            newItems.splice(maxIndex + 1, 0, item);
          }
        }

        return newItems;
      });
    },
    [tabItems],
  );
  // 新窗口打开
  const openNewWindowFunc = (item: Tab) => {
    const origin = window.location.origin;
    const url = origin + item.key;
    window.open(url, '_blank');
  };
  // 删除其他
  const deleteOtherTabsFunc = useCallback(
    (key: string) => {
      updateTabItems(() => {
        const deleteKeys = tabItems
          .filter((item) => item.closable && item.key !== key)
          .map((i) => i.key);

        onRemoveCacheByKeys?.(deleteKeys);
        return tabItems.filter((i) => !deleteKeys.includes(i.key));
      });
    },
    [tabItems, onRemoveCacheByKeys],
  );
  // 通过keys删除其他左侧或者右侧
  const deleteTabsByKeysFunc = useCallback(
    (key: string, direction: 'left' | 'right') => {
      updateTabItems(() => {
        const index = tabItems.findIndex((item) => item.key === key);
        if (index > -1) {
          const deleteKeys = tabItems
            .filter((item, i) => {
              if (direction === 'left') {
                return i < index && item.closable;
              } else {
                return i > index && item.closable;
              }
            })
            .map((i) => i.key);
          onRemoveCacheByKeys?.(deleteKeys);
          return tabItems.filter((i) => !deleteKeys.includes(i.key));
        }
        return tabItems;
      });
    },
    [tabItems, onRemoveCacheByKeys],
  );
  // 关闭全部
  const deleteAllFunc = useCallback(() => {
    updateTabItems(() => {
      const deleteKeys = tabItems
        .filter((item) => item.closable)
        .map((i) => i.key);
      onRemoveCacheByKeys?.(deleteKeys);
      navigate(HOME_PATH);
      return tabItems.filter((i) => !i.closable);
    });
  }, [tabItems, onRemoveCacheByKeys]);

  return {
    reloadTabFunc,
    deleteTabFunc,
    deleteAllFunc,
    deleteOtherTabsFunc,
    deleteTabsByKeysFunc,
    openNewWindowFunc,
    togglePinTabFunc,
    toggleFullscreenFunc,
    isFullscreen,
  };
};

export default useTabActions;
