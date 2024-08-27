export const padLeftZero = (val: string | number) =>
  +val < 10 ? `0${val}` : val;
export const dayMap: Record<string, string> = {
  '0': '日',
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
};
