import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import { PUBLIC_PATH } from '@/utils/constants';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${PUBLIC_PATH}/locales/{{lng}}/{{ns}}.json`,
    },
    supportedLngs: ['en', 'zh-CN'],
    defaultNS: 'translation', // 添加默认命名空间
    fallbackLng: 'zh-CN',
    fallbackNS: 'translation', // 添加回退命名空间
    ns: ['translation'], // 指定要加载的命名空间
    preload: ['zh-CN', 'en'], // 预加载语言包
    load: 'currentOnly', // 只加载当前语言包
    // debug: process.env.NODE_ENV === 'development',
    // debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true, // 使用 Suspense
      bindI18nStore: 'added',
    },
  });

export default i18n;
