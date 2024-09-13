import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
export default defineConfig({
  presets: [
    // 默认预设
    presetUno({ dark: 'class' }),
    // 支持attributify mode,简单说就是为了避免样式写太长难维护，能将py-2 px-2这种相关属性整合起来写成p="y-2 x-4"
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    ['size-full', { width: '100%', height: '100%' }],
    [
      'flex-center',
      { display: 'flex', 'align-items': 'center', 'justify-content': 'center' },
    ],
  ],
});
