import React, { type Ref } from 'react';

import classNames from 'classnames';

export interface TabPaneProps {
  tab?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
  forceRender?: boolean;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  icon?: React.ReactNode;

  // Pass by TabPaneList
  prefixCls?: string;
  tabKey?: string;
  id?: string;
  animated?: boolean;
  active?: boolean;
  destroyInactiveTabPane?: boolean;
  ref?: Ref<HTMLDivElement>;
}

const TabPane = (props: TabPaneProps) => {
  const { prefixCls, className, style, id, active, tabKey, children, ref } =
    props;
  return (
    <div
      id={id && `${id}-panel-${tabKey}`}
      role="tabpanel"
      tabIndex={active ? 0 : -1}
      aria-labelledby={id && `${id}-tab-${tabKey}`}
      aria-hidden={!active}
      style={style}
      className={classNames(
        prefixCls,
        active && `${prefixCls}-active`,
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'TabPane';
}

export default TabPane;
