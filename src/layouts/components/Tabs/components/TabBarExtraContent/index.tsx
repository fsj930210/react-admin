import Icon from '@/components/Icon';
import type { Tab } from '@/components/RaTabs/interface';

import TabDropdown from '../TabDropdown';

import useTabActions from '@/layouts/hooks/useTabsActions';

type TabBarExtraContentProps = {
  tab?: Tab;
  tabIndex: number;
  tabsLength: number;
  updateTabItems: (updateFunc: (preItems: Tab[]) => Tab[]) => void;
};
const TabBarExtraContent = ({
  tab,
  tabIndex,
  tabsLength,
  updateTabItems,
}: TabBarExtraContentProps) => {
  const { isFullscreen, reloadTabFunc, toggleFullscreen } = useTabActions({
    updateTabItems,
  });
  return (
    <div
      className="flex items-center h-full"
      onClick={() => reloadTabFunc(tab!.key)}
    >
      <span className="app-tabs-right-item">
        <div className="w-full h-full flex items-center">
          <Icon icon="ant-design:reload-outlined" />
        </div>
      </span>
      <span className="app-tabs-right-item">
        <TabDropdown
          trigger={['click']}
          tab={tab}
          updateTabItems={updateTabItems}
          index={tabIndex}
          tabsLength={tabsLength}
        >
          <div className="w-full h-full flex items-center">
            <Icon icon="lucide:chevron-down" />
          </div>
        </TabDropdown>
      </span>
      <span className="app-tabs-right-item" onClick={toggleFullscreen}>
        <div className="w-full h-full flex items-center">
          {isFullscreen ? (
            <Icon icon="ant-design:fullscreen-exit-outlined" />
          ) : (
            <Icon icon="lucide:fullscreen" />
          )}
        </div>
      </span>
    </div>
  );
};

export default TabBarExtraContent;
