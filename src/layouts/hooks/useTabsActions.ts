import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFullscreen } from 'ahooks';

import { KeepAliveContext } from '@/components/KeepAlive/KeepAliveContext';
import type { Tab } from '@/components/RaTabs/interface';

import { HOME_PATH } from '@/utils/constants';

const useTabActions = ({
  updateTabItems,
}: {
  updateTabItems: (updateFunc: (preItems: Tab[]) => Tab[]) => void;
}) => {
  const navigate = useNavigate();
  const {
    onRefreshCache,
    onRemoveCache,
    onRemoveCacheByKeys,
    onRemoveOtherCache,
  } = useContext(KeepAliveContext);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(
    document.getElementById('ra-content-container'),
  );
  const actions = useMemo(() => {
    // 重新加载
    const reloadTabFunc = (key: string) => {
      onRefreshCache?.(key);
    };
    // 删除Tab
    const deleteTabFunc = (key: string) => {
      if (key === HOME_PATH) return;
      updateTabItems((prevTabItems) => {
        const index = prevTabItems.findIndex((i) => i.key === key);
        const prevIndex = index - 1;
        if (index > -1) {
          const newTabs = [...prevTabItems];
          newTabs.splice(index, 1);
          if (prevIndex > -1) {
            setTimeout(() => {
              navigate(prevTabItems[prevIndex].key);
            }, 0);
          }
          return newTabs;
        } else {
          return prevTabItems;
        }
      });
      onRemoveCache?.(key);
    };
    // 固定 如果现有items有固定的则放到最后一个固定的后面
    const pinTabFunc = (item: Tab) => {
      updateTabItems((prevTabItems) => {
        const newItems = [...prevTabItems];
        const index = prevTabItems.findIndex((i) => i.key === item?.key);
        // 取消固定
        if (item.pin) {
          newItems.splice(index, 1, { ...item, pin: false });
        } else {
          const pinIndexArr = prevTabItems.reduce(
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
    };
    // 新窗口打开
    const openNewWindowFunc = (item: Tab) => {
      const origin = window.location.origin;
      const url = origin + item.key;
      window.open(url, '_blank');
    };
    // 删除其他
    const deleteOtherTabsFunc = (key: string) => {
      updateTabItems((prevTabItems) => {
        return prevTabItems.filter((item) => item.pin && item.key === key);
      });
      onRemoveOtherCache(key);
    };
    // 通过keys删除其他左侧或者右侧
    const deleteTabsByKeysFunc = (key: string, direction: 'left' | 'right') => {
      updateTabItems((prevTabItems) => {
        const index = prevTabItems.findIndex((item) => item.key === key);
        if (index > -1) {
          const keys = prevTabItems
            .filter((item, i) => {
              if (direction === 'left') {
                return !item.pin && i < index;
              } else {
                return !item.pin && i > index;
              }
            })
            .map((i) => i.key);
          onRemoveCacheByKeys(keys);
          return prevTabItems.filter((i) => !keys.includes(i.key));
        }
        return prevTabItems;
      });
    };
    // 关闭全部
    const deleteAllFunc = () => {
      updateTabItems((preTabItems) => {
        const keys = preTabItems
          .filter((item) => item.key !== HOME_PATH)
          .map((i) => i.key);
        onRemoveCacheByKeys(keys);
        navigate(HOME_PATH);
        return preTabItems.filter((i) => i.key === HOME_PATH);
      });
    };
    return {
      reloadTabFunc,
      deleteTabFunc,
      pinTabFunc,
      openNewWindowFunc,
      deleteOtherTabsFunc,
      deleteTabsByKeysFunc,
      deleteAllFunc,
      toggleFullscreen,
      isFullscreen,
    };
  }, []);
  return {
    ...actions,
  };
};

export default useTabActions;
