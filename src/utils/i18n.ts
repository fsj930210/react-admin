import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend'; // fallback http load
import LocalStorageBackend from 'i18next-localstorage-backend'; // primary use cache

i18n
  .use(ChainedBackend)
  // 检测用户当前使用的语言
  // 文档: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // 注入 react-i18next 实例
  .use(initReactI18next)
  // 初始化 i18next
  // 配置参数的文档: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      backends: [
        LocalStorageBackend, // primary backend
        HttpApi, // fallback backend
      ],
      backendOptions: [],
      cacheHitMode: 'refreshAndUpdateStore',
    },
    // debug: true,
    fallbackLng: navigator.language,
    interpolation: {
      escapeValue: false,
    },
    react: {
      bindI18nStore: 'added', // this way, when the HttpBackend delivers new translations (thanks to refreshAndUpdateStore), the UI gets updated
    },
  });

export default i18n;
