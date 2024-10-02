import { useEffect } from 'react';

import { hex2hsl } from '@/utils/color';

import useGlobalStore, { AppThemeEnum } from '@/store';
import { setCssVar } from '@/utils';

function useColors() {
  const { primaryColor, appTheme } = useGlobalStore();
  useEffect(() => {
    if (appTheme === AppThemeEnum.dark) {
      const primaryColorHSL = hex2hsl(primaryColor);
      // 黑暗模式下，主题色又跟中性色接近需要更新文本颜色
      if (primaryColorHSL.l <= 30) {
        setCssVar('--ant-color-link', 'rgba(255,255,255,0.85)', '.ra-css-var');
        setCssVar(
          '--ant-color-link-hover',
          'rgba(255,255,255,0.85)',
          '.ra-css-var',
        );
      } else {
        setCssVar('--ant-color-link', null, '.ra-css-var');
        setCssVar('--ant-color-link-hover', null, '.ra-css-var');
      }
    }
  }, [primaryColor, appTheme]);
}

export default useColors;
