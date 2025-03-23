import { create } from 'zustand';

import { createSelector } from './createSelector';

import type { IRouteObject } from '@/types/custom-types';

import { dfs } from '@/utils';

interface RouteState {
  flatRoutes: IRouteObject[];
  routes: IRouteObject[];
  setRoutes: (routes: IRouteObject[]) => void;
  setFlatRoutes: (routes: IRouteObject[]) => void;
}

const useRouteStore = create<RouteState>()((set) => ({
  flatRoutes: [],
  routes: [],
  setRoutes: (routes: IRouteObject[]) => set(() => ({ routes })),
  setFlatRoutes: (routes: IRouteObject[]) =>
    set(() => ({ flatRoutes: dfs(routes) })),
}));

const useRouteStoreSelector = createSelector(useRouteStore);

export default useRouteStoreSelector;
