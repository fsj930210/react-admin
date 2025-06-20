import classNames from 'classnames';

import RaIcon from '@/components/RaIcon';

import type { TabNodeProps } from './interface';

const TabNode = (props: TabNodeProps) => {
  const { customRenderTab, ...restProps } = props;
  const { tab, active, onClick, onClose } = restProps;
  const node = (
    <div
      key={tab.key}
      title={tab.title || ''}
      data-tab-key={tab.key}
      onClick={() => onClick?.(tab.key)}
      className={classNames({
        'ra-layout-tabs-tab': true,
        'ra-layout-tabs-tab-active': active,
        'ra-layout-tabs-tab-disabled': tab.disabled,
      })}
    >
      {tab.icon ? (
        <span className="ra-layout-tabs-tab-icon">
          {typeof tab.icon === 'string' ? (
            <RaIcon icon={tab.icon} fontSize={14} />
          ) : (
            tab.icon
          )}
        </span>
      ) : null}
      <span className="ra-layout-tabs-tab-text">{tab.label}</span>

      {tab.closable ? (
        <span
          className="ra-layout-tabs-tab-close"
          onClick={(e) => onClose?.(tab.key, e)}
        >
          <RaIcon icon="lucide:x" fontSize={14} />
        </span>
      ) : null}
    </div>
  );
  return customRenderTab
    ? customRenderTab(node, restProps, tab.key, restProps.index)
    : node;
};
export default TabNode;
