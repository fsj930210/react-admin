import Icon from '@/components/Icon';

import TabDropdown from '../TabDropdown';
const TabBarExtraContent = () => {
  return (
    <div className="flex items-center h-full">
      <span className="app-tabs-right-item">
        <div className="w-full h-full flex items-center">
          <Icon icon="ant-design:reload-outlined" />
        </div>
      </span>
      <span className="app-tabs-right-item">
        <TabDropdown trigger={['click']}>
          <div className="w-full h-full flex items-center">
            <Icon icon="lucide:chevron-down" />
          </div>
        </TabDropdown>
      </span>
      <span className="app-tabs-right-item">
        <div className="w-full h-full flex items-center">
          <Icon icon="lucide:fullscreen" />
        </div>
      </span>
    </div>
  );
};

export default TabBarExtraContent;
