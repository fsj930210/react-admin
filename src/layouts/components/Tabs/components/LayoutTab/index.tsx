import { useState } from 'react';

import classNames from 'classnames';

import type { Tab } from '@/components/RaTabs/interface';
import type { TabNodeProps } from '@/components/RaTabs/TabNavList/TabNode';

import ChromeTab from '../ChromeTab';
import TabDropdown from '../TabDropdown';

type LayoutTabProps = {
  node: React.ReactElement;
  props: Omit<TabNodeProps, 'renderWrapper'>;
  nodeKey: string;
  updateTabItems: (updateFunc: (preItems: Tab[]) => Tab[]) => void;
};

const LayoutTab = ({
  node,
  props,
  nodeKey,
  updateTabItems,
}: LayoutTabProps) => {
  const [tabType] = useState('classic');
  return (
    // <div
    //   data-node-key={tabType === 'chrome' ? nodeKey : undefined}
    //   className={classNames({
    //     'layout-tabs-tab': true,
    //     'layout-tabs-tab-wrapper-active': props.active,
    //     'layout-tabs-tab-chrome': tabType === 'chrome',
    //     'layout-tabs-tab-card': tabType === 'card',
    //     'layout-tabs-tab-classic': tabType === 'classic',
    //     'layout-tabs-tab-trapezoid': tabType === 'trapezoid',
    //     'layout-tabs-tab-brisk': tabType === 'brisk',
    //     'layout-tabs-tab-rhythm': tabType === 'rhythm',
    //   })}
    // >
    //   {tabType === 'chrome' ? (
    //     <ChromeTab {...props} />
    //   ) : (
    //     <TabDropdown tab={props.tab} updateTabItems={updateTabItems}>
    //       {node}
    //     </TabDropdown>
    //   )}
    // </div>
    <TabDropdown tab={props.tab} updateTabItems={updateTabItems}>
      <div
        data-node-key={tabType === 'chrome' ? nodeKey : undefined}
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

export default LayoutTab;
