import React, { Suspense } from 'react';
import type { FC, ExoticComponent } from 'react';

import { Repeater } from '../Repeater';

import type { ActivityProps } from '../../interface';

const isSupportStableActivity = 'Activity' in React;

const NativeActivity = isSupportStableActivity
  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (React.Activity as ExoticComponent<ActivityProps>)
  : 'unstable_Activity' in React
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (React.unstable_Activity as ExoticComponent<ActivityProps>)
    : null;

/**
 *
 * @param {ActivityProps} props
 * @description This is a component that keeps its state while hiding it
 * @example
 * when visible
 * <Activity mode="visible">
 *  <Child />
 * </Activity>
 * when hidden
 * <Activity mode="hidden">
 *  <Child />
 * </Activity>
 */
const Activity: FC<ActivityProps> = (props) => {
  // props
  const { mode, children } = props;

  if (NativeActivity) {
    return <NativeActivity mode={mode}>{children}</NativeActivity>;
  }

  return (
    <Suspense fallback={null}>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
};

export default Activity;
