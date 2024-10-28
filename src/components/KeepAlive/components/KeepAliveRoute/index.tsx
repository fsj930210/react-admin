import { memo, Fragment } from 'react';

import useRouteCache from '../../hooks/useRouteCache';
import Activity from '../Activity';

import type { KeepAliveRouteProps } from '../../interface';

function KeepAliveRoute(props: KeepAliveRouteProps) {
  const { className, style } = props;
  const { components, excludeComponents, activeKey, containerRef } =
    useRouteCache(props);

  return (
    <div ref={containerRef} className={className} style={style}>
      {components?.map((o) => (
        <Activity
          key={o.refreshKey}
          mode={o.key === activeKey ? 'visible' : 'hidden'}
        >
          {o.component}
        </Activity>
      ))}
      {excludeComponents?.map((item) =>
        activeKey === item.key ? (
          <Fragment key={item.refreshKey}>{item.component}</Fragment>
        ) : null,
      )}
    </div>
  );
}

export default memo(KeepAliveRoute);
