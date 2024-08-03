import { Suspense } from 'react';

import AppLoading from '../AppLoading';

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
