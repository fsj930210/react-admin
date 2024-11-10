import { memo, Fragment, forwardRef, useImperativeHandle } from 'react';
import type { Ref } from 'react';

import useKeepAlive from '../../hooks/useKeepAlive';
import Activity from '../Activity';

import type { KeepAliveProps, KeepAliveRef } from '../../interface';

function KeepAlive(props: KeepAliveProps, ref: Ref<KeepAliveRef>) {
  const { className, style, refreshFallback } = props;
  const {
    excludeComponents,
    cachedComponents,
    activeKey,
    containerRef,
    onClearCache,
    onRefreshCache,
    onRemoveCache,
    onRemoveCacheByKeys,
  } = useKeepAlive(props);
  useImperativeHandle(ref, () => ({
    onRefreshCache,
    onRemoveCache,
    onRemoveCacheByKeys,
    onClearCache,
  }));

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      data-key={activeKey}
    >
      {cachedComponents?.map((o) =>
        o.refreshing ? (
          <Fragment key={o.refreshKey}>{refreshFallback}</Fragment>
        ) : (
          <Activity
            key={o.refreshKey}
            mode={o.key === activeKey ? 'visible' : 'hidden'}
          >
            {o.component}
          </Activity>
        ),
      )}
      {excludeComponents?.map((item) =>
        activeKey === item.key ? (
          <Fragment key={item.refreshKey}>{item.component}</Fragment>
        ) : null,
      )}
    </div>
  );
}
const ForwardKeepAlive = forwardRef(KeepAlive);
export default memo(ForwardKeepAlive);
