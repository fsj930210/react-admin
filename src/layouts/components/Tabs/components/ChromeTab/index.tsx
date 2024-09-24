import { Icon } from '@iconify/react';

import type { TabNodeProps } from '@/components/RaTabs/TabNavList/TabNode';

import ChromeTabBackground from '@/assets/images/chrome-tab-bg.svg?react';
import './index.css';

const ChromeTab = (props: Omit<TabNodeProps, 'renderWrapper'>) => {
  const { tab, onClick } = props;
  const { label, icon, closable, disabled } = tab;
  function onInternalClick(e: React.MouseEvent | React.KeyboardEvent) {
    if (disabled) {
      return;
    }
    onClick?.(e);
  }
  return (
    // <TabDropdown>
    <div onClick={onInternalClick} className="h-full w-full">
      <div className="layout-chrome-tabs-tab-divider" />
      <div className="layout-chrome-tabs-tab-background">
        <ChromeTabBackground />
      </div>
      <div className="layout-chrome-tabs-tab-content">
        <span className="layout-chrome-tabs-tab-content-icon">
          <Icon inline icon={icon as string} />
        </span>
        <span className="layout-chrome-tabs-tab-content-title">{label}</span>
        {closable ? (
          <div className="layout-chrome-tabs-tab-close">
            <Icon inline icon="lucide:x" />
          </div>
        ) : null}
      </div>
    </div>
    // </TabDropdown>
  );
};
if (process.env.NODE_ENV !== 'production') {
  ChromeTab.displayName = 'ChromeTab';
}
export default ChromeTab;
