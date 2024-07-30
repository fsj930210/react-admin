import React from 'react';

import ReactDOM from 'react-dom/client';

import 'virtual:uno.css';

import App from './App.tsx';
import '@/styles/reset.css';
import '@/styles/global.css';
import '@/styles/entry.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
