import RaIcon from '@/components/RaIcon';

import useTabActions from '../../hooks/useTabsActions';
import TabDropdown from '../TabDropdown';

import type { UpdateTabItems } from '../../hooks/useTabs';
import type { TabItem } from '../Tabs/interface';

type ExtraContentProps = {
  tab?: TabItem;
  tabIndex: number;
  updateTabItems: UpdateTabItems;
};
const ExtraContent = ({ tab, tabIndex, updateTabItems }: ExtraContentProps) => {
  const { isFullscreen, reloadTabFunc, toggleFullscreenFunc } = useTabActions({
    updateTabItems,
  });
  return (
    <div
      className="flex items-center h-full"
      onClick={() => reloadTabFunc(tab!.key)}
    >
      <span className="layout-tabs-right-item">
        <div className="w-full h-full flex items-center px-[8px]">
          <RaIcon icon="ant-design:reload-outlined" />
        </div>
      </span>
      <span className="layout-tabs-right-item">
        <TabDropdown
          trigger={['click']}
          tab={tab}
          updateTabItems={updateTabItems}
          index={tabIndex}
        >
          <div className="w-full h-full flex items-center px-[8px]">
            <RaIcon icon="lucide:chevron-down" />
          </div>
        </TabDropdown>
      </span>
      <span className="layout-tabs-right-item" onClick={toggleFullscreenFunc}>
        <div className="w-full h-full flex items-center px-[8px]">
          {isFullscreen ? (
            <RaIcon icon="ant-design:fullscreen-exit-outlined" />
          ) : (
            <RaIcon icon="lucide:fullscreen" />
          )}
        </div>
      </span>
    </div>
  );
};

export default ExtraContent;
