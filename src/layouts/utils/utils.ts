import type { MenuItem } from "@/types/menu";

export interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

export const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

export function getAncestorLevelKey(item: MenuItem, items: MenuItem[], result: string[]) {
  const parentKey = item.parent_key;
  if (parentKey) {
    result.unshift(parentKey);
    const parentItem = items.find((i) => i.key === parentKey);
    if (parentItem) {
      getAncestorLevelKey(parentItem, items, result);
    }
  }
}