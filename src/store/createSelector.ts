import { useShallow } from 'zustand/react/shallow';

import type { StoreApi, UseBoundStore } from 'zustand';

/**
 * 从 Store 中提取状态类型
 * 使用条件类型和 infer 关键字提取 getState 方法返回的类型
 */
type ExtractState<S> = S extends { getState: () => infer T } ? T : never;

/**
 * 状态选择器的类型定义
 * @template T - Store 状态的类型
 */
type StateKeys<T> = keyof T;

/**
 * 选择器的可能类型：
 * 1. 单个状态的 key
 * 2. 多个状态的 key 数组（支持 readonly）
 * 3. 自定义选择器函数
 */
type SelectorType<T> =
  | StateKeys<T>
  | readonly StateKeys<T>[]
  | ((state: T) => any);

/**
 * 创建状态选择器的高阶函数
 * @template T - Zustand store 的类型
 * @param useStore - Zustand store hook
 * @returns 返回一个新的选择器函数
 *
 * @example
 * // 1. 创建 store
 * interface StoreState {
 *   count: number;
 *   text: string;
 *   increment: () => void;
 * }
 *
 * const useStore = create<StoreState>()((set) => ({
 *   count: 0,
 *   text: 'hello',
 *   increment: () => set((state) => ({ count: state.count + 1 })),
 * }));
 *
 * // 2. 创建选择器
 * const useStoreSelector = createSelector(useStore);
 *
 * // 3. 在组件中使用
 * // 选择单个状态
 * const { count } = useStoreSelector('count');
 *
 * // 选择多个状态
 * const { count, text } = useStoreSelector(['count', 'text']);
 *
 * // 使用函数选择器（可以派生状态）
 * const derived = useStoreSelector(state => ({
 *   doubled: state.count * 2,
 *   uppercase: state.text.toUpperCase()
 * }));
 *
 * // 选择方法
 * const { increment } = useStoreSelector('increment');
 */
export const createSelector = <T extends UseBoundStore<StoreApi<object>>>(
  useStore: T,
) => {
  /**
   * 状态选择器函数
   * @template K - 选择器的类型（可以是 key、key数组或函数）
   * @param selector - 选择器参数
   * @returns 根据选择器类型返回相应的状态值
   * - 如果是函数，返回函数的返回值类型
   * - 如果是数组，返回选中的多个状态的对象类型
   * - 如果是单个 key，返回该状态的类型
   */
  return <K extends SelectorType<ExtractState<T>>>(
    selector: K,
  ): K extends (state: ExtractState<T>) => infer R
    ? R
    : K extends
          | Array<keyof ExtractState<T>>
          | readonly (keyof ExtractState<T>)[]
      ? Pick<ExtractState<T>, K[number]>
      : K extends keyof ExtractState<T>
        ? Pick<ExtractState<T>, K>
        : never => {
    return useStore(
      useShallow((state: object) => {
        // 将 state 转换为正确的类型
        const typedState = state as ExtractState<T>;

        // 处理函数选择器
        if (typeof selector === 'function') {
          return selector(typedState);
        }

        // 处理字符串或数组选择器
        // 将单个 key 转换为数组，统一处理
        const selectedKeys = (
          Array.isArray(selector) ? selector : [selector]
        ) as (keyof ExtractState<T>)[];

        // 根据选中的 keys 构建结果对象
        return selectedKeys.reduce<Record<string, unknown>>(
          (acc, key) => ({
            ...acc,
            [key]: typedState[key],
          }),
          {},
        ) as any;
      }),
    );
  };
};
