import { Suspense } from 'react';

const LazyLoadComponent = ({ Component }: { Component: React.LazyExoticComponent<() => JSX.Element> }) => {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export default LazyLoadComponent;
