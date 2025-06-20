import classNames from 'classnames';

import type { TabNodeProps } from '@/components/RaTabs-deprecated/TabNavList/TabNode';

import ChromeTab from '../ChromeTab';
import TabDropdown from '../TabDropdown';

import type { UpdateTabItems } from '../../hooks/useTabs';

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
        className={classNames({
          'layout-tabs-tab': true,
          'layout-tabs-tab-wrapper-active': props.active,
          'layout-tabs-tab-chrome': tabStyle === 'chrome',
          'layout-tabs-tab-card': tabStyle === 'card',
          'layout-tabs-tab-classic': tabStyle === 'classic',
          'layout-tabs-tab-trapezoid': tabStyle === 'trapezoid',
          'layout-tabs-tab-line1': tabStyle === 'line1',
          'layout-tabs-tab-line2': tabStyle === 'line2',
        })}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {tabStyle === 'chrome' ? <ChromeTab {...props} /> : node}
      </div>
    </TabDropdown>
  );
};
LayoutTab.displayName = 'LayoutTab';
export default LayoutTab;
