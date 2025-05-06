import '@ant-design/v5-patch-for-react-19';
// 本地化图标 从npm安装想要的icon json
import { addCollection } from '@iconify/react';
import { icons as antdIcons } from '@iconify-json/ant-design';
import { icons as carbonIcons } from '@iconify-json/carbon';
import { icons as lucideIcons } from '@iconify-json/lucide';
import { icons as riIcons } from '@iconify-json/ri';
import ReactDOM from 'react-dom/client';

import 'virtual:uno.css';
import 'virtual:local-react-iconify';
import App from './App.tsx';

import '@/styles/reset.css';
import '@/styles/global.css';
import '@/styles/entry.css';
import '@/styles/animate.css';
import '@/components/business/I18n/init.ts';
// 本地化图标，如果不需要则去掉
addCollection(antdIcons);
addCollection(carbonIcons);
addCollection(lucideIcons);
addCollection(riIcons);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
