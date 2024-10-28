import { forwardRef, useState } from 'react';

import classNames from 'classnames';

import type { Tab } from '@/components/RaTabs/interface';
import type { TabNodeProps } from '@/components/RaTabs/TabNavList/TabNode';

import ChromeTab from '../ChromeTab';
import TabDropdown from '../TabDropdown';

type LayoutTabProps = {
  node: React.ReactElement;
  props: Omit<TabNodeProps, 'renderWrapper'>;
  nodeKey: string;
  index: number;
  tabsLength: number;
  updateTabItems: (updateFunc: (preItems: Tab[]) => Tab[]) => void;
};

const LayoutTab = forwardRef(
  (
    { node, props, index, tabsLength, updateTabItems }: LayoutTabProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref,
  ) => {
    const [tabType] = useState('trapezoid');
    return (
      <TabDropdown
        tab={props.tab}
        updateTabItems={updateTabItems}
        index={index}
        tabsLength={tabsLength}
      >
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
  },
);
LayoutTab.displayName = 'LayoutTab';
export default LayoutTab;
