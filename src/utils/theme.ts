import { setCssVar } from './utils';

export function setLightCssVars() {
  setCssVar('--ra-scrollbar-thumb-bg', 'rgba(0,0,0,0.1)');
  setCssVar('--ra-color-bg-layout', '#f5f5f5');
  // setCssVar('--ra-color-link', 'var(--ant-color-link)');
}
export function setDarkCssVars() {
  setCssVar('--ra-scrollbar-thumb-bg', 'rgba(255,255,255,0.1)');
  setCssVar('--ra-color-bg-layout', '#424242');
  // setCssVar('--ra-color-link', 'rgba(255,255,255,0.85)');
}
