import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import useGlobalStore from '@/store';

const useI18n = () => {
  const { i18n } = useTranslation();
  const { changeAppLanguage, appLanguage } = useGlobalStore();
  useEffect(() => {
    const lang = navigator.language;
    i18n.changeLanguage(lang);
    changeAppLanguage(lang);
  }, [navigator.language]);

  useEffect(() => {
    if (appLanguage === 'en') {
      dayjs.locale('en');
    } else {
      dayjs.locale('zh-cn');
    }
  }, [appLanguage]);

  const antdLanguage = useMemo(() => {
    if (appLanguage === 'en') return enUS;
    return zhCN;
  }, [appLanguage]);
  return { antdLanguage };
};

export default useI18n;
