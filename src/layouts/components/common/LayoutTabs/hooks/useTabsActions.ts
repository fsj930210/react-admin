import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFullscreen } from 'ahooks';

import { LayoutTabsContext } from '../../Content/LayoutTabsContext';

import { HOME_PATH } from '@/utils/constants';

import type { UpdateTabItems } from './useTabs';
import type { TabItem } from '../components/Tabs/interface';

import useAppConfigStoreSelector from '@/store/appConfig';

const useTabActions = ({
  updateTabItems,
}: {
  updateTabItems: UpdateTabItems;
}) => {
  const navigate = useNavigate();
  const { keepAliveRef, refresh } = useContext(LayoutTabsContext);
  const { keepAlive } = useAppConfigStoreSelector('keepAlive');
  const [isFullscreen, { toggleFullscreen: toggleFullscreenFunc }] =
    useFullscreen(document.getElementById('ra-content-container'));
  /**
   * 之前的版本这些方法都是用useCallback包裹的，读了一篇文章后
   * 觉得这些其实都是没必要的，反而增加了心智负担，和性能开销。
   * 文章链接：链接：https://www.yuque.com/jiango/code/good-bye-use-effect
   * 文章有点长建议先用AI读然后总结，然后再去细看
   */
  // 重新加载
  const reloadTabFunc = (key: string) => {
    if (keepAlive) {
      keepAliveRef?.current?.onRefreshCache?.(key);
    } else {
      refresh?.();
    }
  };
  // 删除Tab
  const deleteTabFunc = (key: string) => {
    updateTabItems((tabItems: TabItem[]) => {
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
        keepAliveRef?.current?.onRemoveCache?.(key);
        return newTabs;
      } else {
        return tabItems;
      }
    });
  };
  // 固定 如果现有items有固定的则放到最后一个固定的后面
  const togglePinTabFunc = (item: TabItem) => {
    updateTabItems((tabItems: TabItem[]) => {
      const newItems = [...tabItems];
      const index = tabItems.findIndex((i) => i.key === item?.key);
      // 取消固定
      if (item.pinned) {
        newItems.splice(index, 1, { ...item, pinned: false });
      } else {
        const pinIndexArr = tabItems.reduce(
          (pre: number[], current, curIndex) => {
            if (current.pinned) {
              pre.push(curIndex);
            }
            return pre;
          },
          [],
        );
        const maxIndex = Math.max(...pinIndexArr);
        if (index > -1) {
          newItems.splice(index, 1);
          item.pinned = true;
          item.closable = false;
          newItems.splice(maxIndex + 1, 0, item);
        }
      }
      return newItems;
    });
  };
  // 新窗口打开
  const openNewWindowFunc = (item: TabItem) => {
    const origin = window.location.origin;
    const url = origin + item.key;
    window.open(url, '_blank');
  };
  // 删除其他
  const deleteOtherTabsFunc = (key: string) => {
    updateTabItems((tabItems: TabItem[]) => {
      const deleteKeys = tabItems
        .filter((item) => item.closable && item.key !== key)
        .map((i) => i.key);

      keepAliveRef?.current?.onRemoveCacheByKeys?.(deleteKeys);
      return tabItems.filter((i) => !deleteKeys.includes(i.key));
    });
  };
  // 通过keys删除其他左侧或者右侧
  const deleteTabsByKeysFunc = (key: string, direction: 'left' | 'right') => {
    updateTabItems((tabItems: TabItem[]) => {
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
        keepAliveRef?.current?.onRemoveCacheByKeys?.(deleteKeys);
        return tabItems.filter((i) => !deleteKeys.includes(i.key));
      }
      return tabItems;
    });
  };
  // 关闭全部
  const deleteAllFunc = () => {
    updateTabItems((tabItems: TabItem[]) => {
      const deleteKeys = tabItems
        .filter((item) => item.closable)
        .map((i) => i.key);
      keepAliveRef?.current?.onRemoveCacheByKeys?.(deleteKeys);
      navigate(HOME_PATH);
      return tabItems.filter((i) => !i.closable);
    });
  };

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
