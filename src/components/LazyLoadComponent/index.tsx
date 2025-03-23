import { Suspense, type JSX } from 'react';

import AppLoading from '../app/AppLoading';

const LazyLoadComponent = ({
  Component,
}: {
  Component: React.LazyExoticComponent<() => JSX.Element>;
}) => {
  return (
    <Suspense fallback={<AppLoading />}>
      <Component />
    </Suspense>
  );
};

export default LazyLoadComponent;
