import Icon from '@/components/RaIcon';
import type { Tab } from '@/components/RaTabs/interface';

import TabDropdown from '../TabDropdown';

import type { UpdateTabItems } from '@/layouts/hooks/useTabs';

import useTabActions from '@/layouts/hooks/useTabsActions';

type TabBarExtraContentProps = {
  tab?: Tab;
  tabIndex: number;
  updateTabItems: UpdateTabItems;
};
const TabBarExtraContent = ({
  tab,
  tabIndex,
  updateTabItems,
}: TabBarExtraContentProps) => {
  const { isFullscreen, reloadTabFunc, toggleFullscreenFunc } = useTabActions({
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
        >
          <div className="w-full h-full flex items-center">
            <Icon icon="lucide:chevron-down" />
          </div>
        </TabDropdown>
      </span>
      <span className="app-tabs-right-item" onClick={toggleFullscreenFunc}>
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
