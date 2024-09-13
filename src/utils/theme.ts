import { setCssVar } from '.';

export function setLightCssVars() {
  setCssVar('--scrollbar-thumb-bg', 'rgba(0,0,0,0.1)');
}
export function setDarkCssVars() {
  setCssVar('--scrollbar-thumb-bg', 'rgba(255,255,255,0.1)');
}
