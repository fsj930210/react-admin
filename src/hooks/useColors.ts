import { useEffect } from 'react';

import { hex2hsl } from '@/utils/color';

import useAppConfigStore, { AppThemeEnum } from '@/store/appConfig';
import { setCssVar } from '@/utils/utils';
import { RA_ANTD_APP_CSS_TOKEN_KEY } from '@/utils/constants';

function useColors() {
  const { primaryColor, appTheme } = useAppConfigStore([
    'primaryColor',
    'appTheme',
  ]);
  useEffect(() => {
    if (appTheme === AppThemeEnum.dark) {
      const primaryColorHSL = hex2hsl(primaryColor);
      // 黑暗模式下，主题色又跟中性色接近需要更新文本颜色
      if (primaryColorHSL.l <= 30) {
        setCssVar(
          '--ant-color-link',
          'rgba(255,255,255,0.85)',
          `.${RA_ANTD_APP_CSS_TOKEN_KEY}`,
        );
        setCssVar(
          '--ant-color-link-hover',
          'rgba(255,255,255,0.85)',
          `.${RA_ANTD_APP_CSS_TOKEN_KEY}`,
        );
      } else {
        setCssVar('--ant-color-link', null, `.${RA_ANTD_APP_CSS_TOKEN_KEY}`);
        setCssVar(
          '--ant-color-link-hover',
          null,
          `.${RA_ANTD_APP_CSS_TOKEN_KEY}`,
        );
      }
    }
  }, [primaryColor, appTheme]);
}

export default useColors;
