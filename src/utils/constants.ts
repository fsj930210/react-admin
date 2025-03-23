import type { ThemeItem } from '@/types/custom-types';

export const RA_CACHED_TABS_KEY = 'RA::CACHED_TABS_KEY';
export const RA_CACHED_GLOBAL_SEARCH_KEY = 'RA::CACHED_GLOBAL_SEARCH_KEY';
export const RA_ANTD_APP_CSS_TOKEN_KEY = 'ra-css-var';
export const HOME_PATH = import.meta.env.VITE_APP_HOME_PATH;
export const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH;
export const builtInThemes: ThemeItem[] = [
  {
    value: '#f5222d',
    label: '薄暮',
  },
  {
    value: '#fa541c',
    label: '火山',
  },
  {
    value: '#fa8c16',
    label: '日暮',
  },
  {
    value: '#faad14',
    label: '金盏花',
  },
  {
    value: '#fadb14',
    label: '日出',
  },
  {
    value: '#a0d911',
    label: '青柠',
  },
  {
    value: '#52c41a',
    label: '极光绿',
  },
  {
    value: '#13c2c2',
    label: '明青',
  },
  {
    value: '#1677ff',
    label: '拂晓蓝',
  },
  {
    value: '#2f54eb',
    label: '极客蓝',
  },
  {
    value: '#722ed1',
    label: '酱紫',
  },
  {
    value: '#eb2f96',
    label: '法式洋红',
  },
  {
    value: '#000000',
    label: '中性色',
  },
];
