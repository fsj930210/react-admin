import { useEffect } from 'react';

import useGlobalStore from '@/store';

export const useBrowserLanguage = () => {
  const { changeAppLanguage } = useGlobalStore();

  // 获取navigator
  const navigator = window?.navigator;
  function handleLanguageChange() {
    if (navigator) {
      const lang = navigator.language;
      if (lang.includes('zh')) {
        changeAppLanguage('zh-CN');
      } else {
        // 目前只支持中英文，所以其他一律处理为英文
        changeAppLanguage('en');
      }
    }
  }
  useEffect(() => {
    // 监听languagechange事件，如果有变化，就更新存储的language值
    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);
};
