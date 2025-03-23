import { useState } from 'react';

import classNames from 'classnames';

import type { TabNodeProps } from '@/components/RaTabs/TabNavList/TabNode';

import ChromeTab from '../ChromeTab';
import TabDropdown from '../TabDropdown';

import type { UpdateTabItems } from '@/layouts/hooks/useTabs';

type LayoutTabProps = {
  node: React.ReactElement;
  props: Omit<TabNodeProps, 'renderWrapper'>;
  nodeKey: string;
  index: number;
  updateTabItems: UpdateTabItems;
};

const LayoutTab = ({ node, props, index, updateTabItems }: LayoutTabProps) => {
  const [tabType] = useState('trapezoid');
  return (
    <TabDropdown tab={props.tab} updateTabItems={updateTabItems} index={index}>
      <div
        className={classNames({
          'layout-tabs-tab': true,
          'layout-tabs-tab-wrapper-active': props.active,
          'layout-tabs-tab-chrome': tabType === 'chrome',
          'layout-tabs-tab-card': tabType === 'card',
          'layout-tabs-tab-classic': tabType === 'classic',
          'layout-tabs-tab-trapezoid': tabType === 'trapezoid',
          'layout-tabs-tab-brisk': tabType === 'brisk',
          'layout-tabs-tab-rhythm': tabType === 'rhythm',
        })}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {tabType === 'chrome' ? <ChromeTab {...props} /> : node}
      </div>
    </TabDropdown>
  );
};
LayoutTab.displayName = 'LayoutTab';
export default LayoutTab;
