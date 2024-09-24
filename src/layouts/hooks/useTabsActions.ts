import { useMemo, useState } from 'react';

import type { Tab } from '@/components/RaTabs/interface';

const useTabActions = ({
  updateTabItems,
}: {
  updateTabItems: (updateFunc: (preItems: Tab[]) => Tab[]) => void;
}) => {
  const [reload, setReload] = useState(false);

  const actions = useMemo(() => {
    // 重新加载
    const reloadFunc = () => {
      setReload(true);
      return new Promise((resolve) => {
        setTimeout(() => {
          setReload(false);
          resolve(null);
        }, 100);
      });
    };
    // 删除Tab
    const deleteTab = (key: string) => {
      updateTabItems((currentTabItems) => {
        const index = currentTabItems.findIndex((i) => i.key === key);
        if (index > -1) {
          const newTabs = [...currentTabItems];
          newTabs.splice(index, 1);
          return newTabs;
        } else {
          return currentTabItems;
        }
      });
    };
    // 固定 如果现有items有固定的则放到最后一个固定的后面
    const pinFunc = (item: Tab) => {
      updateTabItems((currentTabItems) => {
        const newItems = [...currentTabItems];
        const index = currentTabItems.findIndex((i) => i.key === item.key);
        const pinIndexArr = currentTabItems.reduce(
          (pre: number[], _, curIndex) => {
            if (item.pin) {
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
          newItems.splice(maxIndex, 0, item);
        }
        return newItems;
      });
    };
    return {
      reloadFunc,
      deleteTab,
      pinFunc,
    };
  }, []);
  return {
    reload,
    ...actions,
  };
};

export default useTabActions;
