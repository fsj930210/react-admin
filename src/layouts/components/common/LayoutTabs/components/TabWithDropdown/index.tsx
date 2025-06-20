import ChromeTab from '../ChromeTab';
import TabDropdown from '../TabDropdown';

import type { UpdateTabItems } from '../../hooks/useTabs';
import type { TabNodeProps } from '../Tabs/interface';

import useTabsStoreSelector from '@/store/tabs';

type LayoutTabProps = {
  node: React.ReactElement;
  props: Omit<TabNodeProps, 'renderWrapper'>;
  nodeKey: string;
  index: number;
  updateTabItems: UpdateTabItems;
};

const LayoutTab = ({ node, props, index, updateTabItems }: LayoutTabProps) => {
  const { tabStyle } = useTabsStoreSelector('tabStyle');

  return (
    <TabDropdown tab={props.tab} updateTabItems={updateTabItems} index={index}>
      <div
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        className="h-full max-w-[140px]"
      >
        {tabStyle === 'chrome' ? <ChromeTab {...props} /> : node}
      </div>
    </TabDropdown>
  );
};
LayoutTab.displayName = 'LayoutTab';
export default LayoutTab;
