import classNames from 'classnames';

import RaIcon from '@/components/RaIcon';

import type { TabNodeProps } from '../Tabs/interface';

import ChromeTabBackground from '@/assets/images/chrome-tab-bg.svg?react';

import './index.css';

const ChromeTab = (props: Omit<TabNodeProps, 'customRenderTab'>) => {
  const { onClick, onClose, tab, active } = props;
  const { label, icon, closable, disabled } = tab;
  function onInternalClick() {
    if (disabled) {
      return;
    }
    onClick?.(tab.key);
  }

  return (
    <div
      onClick={onInternalClick}
      className={classNames({
        'chrome-tabs-tab': true,
        'chrome-tabs-tab-active': active,
      })}
      data-tab-key={tab.key}
    >
      <div className="chrome-tabs-tab-divider" />
      <div className="chrome-tabs-tab-background">
        <ChromeTabBackground />
      </div>
      <div className="chrome-tabs-tab-content">
        {icon ? (
          <span className="chrome-tabs-tab-icon">
            {typeof icon === 'string' ? (
              <RaIcon icon={icon} fontSize={14} />
            ) : (
              icon
            )}
          </span>
        ) : null}

        <span className="chrome-tabs-tab-text" title={tab.title || ''}>
          {label}
        </span>
        {closable ? (
          <div
            className="chrome-tabs-tab-close"
            onClick={(e) => {
              onClose?.(tab.key, e);
            }}
          >
            <RaIcon inline icon="lucide:x" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChromeTab;
