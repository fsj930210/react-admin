import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import useGlobalStore from '@/store/global';

const useI18n = () => {
  const { i18n } = useTranslation();
  const { changeAppLanguage, appLanguage } = useGlobalStore([
    'appLanguage',
    'changeAppLanguage',
  ]);
  const handleLanguageChange = async () => {
    // 目前只支持中英文
    const lang = navigator.language.includes('zh') ? 'zh-CN' : 'en';
    await i18n.changeLanguage(lang);
    changeAppLanguage(lang);
  };
  useEffect(() => {
    handleLanguageChange();
  }, [navigator.language]);

  useEffect(() => {
    if (appLanguage === 'en') {
      dayjs.locale('en');
    } else {
      dayjs.locale('zh-cn');
    }
  }, [appLanguage]);
  useEffect(() => {
    // 监听languagechange事件，如果有变化，就更新存储的language值
    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);
  const antdLanguage = useMemo(() => {
    if (appLanguage === 'en') return enUS;
    return zhCN;
  }, [appLanguage]);
  return { antdLanguage };
};

export default useI18n;
