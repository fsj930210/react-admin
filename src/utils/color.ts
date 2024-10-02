export function hex2hsl(hex: string) {
  const { h, s, v } = hex2hsv(hex);
  return hsv2hsl(h, s, v);
}
function hex2hsv(hex: string) {
  const { r, g, b } = hex2rgb(hex);
  return rgb2hsv(r, g, b);
}

export function hsv2hsl(
  h: number,
  s: number,
  v: number,
): { h: number; s: number; l: number } {
  const hh = ((200 - s) * v) / 100;

  return {
    h: h,
    s: (s * v) / (hh < 100 ? hh : 200 - hh),
    l: hh / 2,
  };
}
export function hex2rgb(hex: string): { r: number; g: number; b: number } {
  if (hex[0] === '#') hex = hex.substr(1);

  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    };
  }

  return {
    r: parseInt(hex.substr(0, 2), 16),
    g: parseInt(hex.substr(2, 2), 16),
    b: parseInt(hex.substr(4, 2), 16),
  };
}

export function rgb2hsv(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; v: number } {
  let h;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) {
    h = 0;
  } else if (r === max) {
    h = ((g - b) / delta) % 6;
  } else if (g === max) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  const s = Math.round((max === 0 ? 0 : delta / max) * 100);

  const v = Math.round((max / 255) * 100);

  return { h, s, v };
}
