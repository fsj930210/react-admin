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

export const setCssVar = (
  prop: string,
  val: any,
  dom = document.documentElement,
) => {
  dom.style.setProperty(prop, val);
};

/**
 *
 * @param arr
 * @description 深度优先遍历 非递归版本 核心思想是通过栈的先进后出来实现
 */
export function dfs<T extends Record<string, any>>(
  arr: T[],
  childKey = 'children',
) {
  const returnArr: T[] = [];
  // 栈
  const stack: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    stack.push(item);
    while (stack.length) {
      const node = stack.pop();
      if (node) {
        const children = node[childKey];
        returnArr.push(node);
        if (children) {
          for (let j = 0; j < children.length; j++) {
            stack.push(children[j]);
          }
        }
      }
    }
  }
  return returnArr;
}
