import { useMemo } from 'react';

import classNames from 'classnames';

import TabDropdown from '../Dropdown';

import './index.css';
import type { TabsProps } from 'antd';

import ChromeTabsBg from '@/assets/images/chrome-tabs-bg.svg?react';

type ChromeTabProps = {
  node: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  activeKey: string;
  items: TabsProps['items'];
  hoveringKey: string;
};
const ChromeTab = ({
  node,
  activeKey,
  items = [],
  hoveringKey,
}: ChromeTabProps) => {
  const activeIndex = useMemo(
    () => items.findIndex((i) => i.key === activeKey),
    [activeKey, items],
  );
  const preKey = useMemo(() => {
    if (activeIndex <= 0) return '';
    return items[activeIndex - 1].key;
  }, [activeIndex, items]);
  const hoveringIndex = useMemo(
    () => items.findIndex((i) => i.key === hoveringKey),
    [hoveringKey, items],
  );
  const hoveringPrevKey = useMemo(() => {
    if (hoveringIndex <= 0) return '';
    return items[hoveringIndex - 1].key;
  }, [hoveringIndex, items]);
  return (
    <TabDropdown>
      <div
        className={classNames({
          active: activeKey === node.key,
          'chrome-tabs-tab': true,
          'no-divider':
            preKey === node.key ||
            items[items.length - 1].key === node.key ||
            hoveringPrevKey === node.key,
        })}
      >
        <div className="chrome-tabs-tab-bg">
          <ChromeTabsBg />
        </div>
        <div className="chrome-tabs-tab-divider"></div>
        <div className="chrome-tabs-tab-content">{node}</div>
      </div>
    </TabDropdown>
  );
};

export default ChromeTab;
