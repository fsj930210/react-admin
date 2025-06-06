import { create } from 'zustand';

import { createSelector } from './createSelector';

export type LayoutType =
  | 'vertical'
  | 'horizontal'
  | 'doubleColumn'
  | 'mixVertical'
  | 'mixDoubleColumn'
  | 'fullScreen'
  | 'side';
export type BreadcrumbType = 'menu' | 'flat';
export interface LayoutState {
  showBreadcrumb: boolean;
  showTabs: boolean;
  layoutType: LayoutType;
  breadcrumbType: BreadcrumbType;
  changeShowBreadcrumb: (showBreadcrumb: boolean) => void;
  changeShowTabs: (showTabs: boolean) => void;
  changeLayoutType: (layout: LayoutType) => void;
  changeBreadcrumbType: (breadcrumbType: BreadcrumbType) => void;
}

const useLayoutStore = create<LayoutState>()((set) => ({
  showBreadcrumb: true,
  changeShowBreadcrumb: (showBreadcrumb: boolean) =>
    set(() => ({ showBreadcrumb })),
  showTabs: true,
  changeShowTabs: (showTabs: boolean) => set(() => ({ showTabs })),
  layoutType: 'vertical',
  changeLayoutType: (layoutType: LayoutType) => set(() => ({ layoutType })),
  breadcrumbType: 'flat',
  changeBreadcrumbType: (breadcrumbType: BreadcrumbType) =>
    set(() => ({ breadcrumbType })),
}));

const useLayoutStoreSelector = createSelector(useLayoutStore);

export default useLayoutStoreSelector;
