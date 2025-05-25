import { useEffect, useState } from 'react';

import { setDarkCssVars, setLightCssVars } from '@/utils/theme';

import type { AppContext } from '@/AppContext';

import useAppConfigStore, { AppThemeEnum } from '@/store/appConfig';

const useTheme = () => {
  const [theme, setTheme] = useState<AppContext['theme']>('light');
  const { appTheme } = useAppConfigStore('appTheme');
  // 这里处理是因为有些页面没有引入DarkTheme组件，全局监听
  useEffect(() => {
    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    function onThemeChange(e: MediaQueryListEvent) {
      if (e.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
    if (appTheme === AppThemeEnum['os']) {
      if (themeMedia.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
      themeMedia.addEventListener('change', onThemeChange);
    } else {
      themeMedia.removeEventListener('change', onThemeChange);
      setTheme(appTheme);
    }
  }, [appTheme]);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
      setDarkCssVars();
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      setLightCssVars();
    }
  }, [theme]);

  return theme;
};

export default useTheme;
