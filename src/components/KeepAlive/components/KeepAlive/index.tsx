import { memo, forwardRef, useImperativeHandle } from 'react';
import type { Ref } from 'react';

import useKeepAlive from '../../hooks/useKeepAlive';
import Activity from '../Activity';

import type { KeepAliveRef, KeepAliveRouteProps } from '../../interface';

function KeepAlive(props: KeepAliveRouteProps, ref: Ref<KeepAliveRef>) {
  const { className, style } = props;
  const {
    components,
    activeKey,
    containerRef,
    handleRefresh,
    handleClear,
    handleRemove,
    handleRemoveByKeys,
    handleRemoveOther,
  } = useKeepAlive(props);
  useImperativeHandle(ref, () => ({
    onClearCache: handleClear,
    onRemoveCache: handleRemove,
    onRefreshCache: handleRefresh,
    onRemoveCacheByKeys: handleRemoveByKeys,
    onRemoveOtherCache: handleRemoveOther,
  }));

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
    </div>
  );
}
const ForwardKeepAlive = forwardRef(KeepAlive);
export default memo(ForwardKeepAlive);
