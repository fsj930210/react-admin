import React from 'react';

import ReactDOM from 'react-dom/client';

import 'virtual:uno.css';
import 'virtual:react-iconify';
import App from './App.tsx';

import '@/styles/reset.css';
import '@/styles/global.css';
import '@/styles/entry.css';
import '@/components/Icon/loadIconifyIcons.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
