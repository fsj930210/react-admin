import {
  Fragment,
  memo,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ChangeEvent, CSSProperties } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { areEqual, FixedSizeList } from 'react-window';

import { icons as antdIcons } from '@iconify-json/ant-design';
import { icons as carbonIcons } from '@iconify-json/carbon';
import { icons as lucideIcons } from '@iconify-json/lucide';
import { icons as riIcons } from '@iconify-json/ri';
import { useControllableValue } from 'ahooks';
import { Input, Tabs } from 'antd';
import classNames from 'classnames';
import memoize from 'memoize-one';

import Icon from '@/components/RaIcon';

import { getIconNames } from '../../utils/getIconNames';

import styles from './index.module.css';

const iconWidth = 32;
const iconGap = 8;
const containerPadding = 4;
type IconViewProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};
type Icons = {
  prefix: string;
  iconNames: { name: string; active: boolean }[];
};
type LayoutIcons = {
  prefix: string;
  rows: Icons[];
};
const createItemData = memoize((items, toggleItemActive) => ({
  items,
  toggleItemActive,
}));
const Row = memo(
  ({
    data,
    index: rowIndex,
    style,
  }: {
    data: {
      items: Icons[];
      toggleItemActive: (args: {
        rowIndex: number;
        name: string;
        nameIndex: number;
        tabKey: string;
      }) => void;
    };
    index: number;
    style: CSSProperties;
  }) => {
    // const [messageApi, contextHolder] = message.useMessage();
    const { items, toggleItemActive } = data;
    const item = items[rowIndex];
    return (
      <div style={{ ...style, gap: iconGap }} className="flex">
        {item.iconNames.map((nameItem, index) => (
          <Fragment key={nameItem.name}>
            {/* {contextHolder} */}
            <div
              key={nameItem.name}
              onClick={() => {
                toggleItemActive({
                  rowIndex: rowIndex,
                  nameIndex: index,
                  name: `${item.prefix}:${nameItem.name}`,
                  tabKey: item.prefix,
                });
                // messageApi.success(`${item.prefix}:${nameItem.name}`);
              }}
              title={`${item.prefix}:${nameItem.name}`}
              className={classNames({
                [styles['icon-view-item']]: true,
                [styles.active]: nameItem.active,
              })}
              style={{ fontSize: iconWidth + 8 }}
            >
              <Icon
                icon={`${item.prefix}:${nameItem.name}`}
                fontSize={iconWidth}
              />
            </div>
          </Fragment>
        ))}
      </div>
    );
  },
  areEqual,
);
Row.displayName = 'Row';
const IconView = (props: IconViewProps) => {
  const [value, setValue] = useControllableValue(props);

  const allIcons: Icons[] = useMemo(() => {
    return [
      getIconNames(antdIcons),
      getIconNames(carbonIcons),
      getIconNames(lucideIcons),
      getIconNames(riIcons),
    ];
  }, []);
  const [activeKey, setActiveKey] = useState(allIcons[0].prefix);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [layoutIcons, setLayoutIcons] = useState<LayoutIcons[]>([]);
  const [filteredIcons, setFilteredIcons] = useState<Icons[]>(allIcons);
  useLayoutEffect(() => {
    const containerWidth = containerRef.current?.clientWidth || 1;
    const newLayoutIcons = filteredIcons.map((item) => {
      const iconNames = item.iconNames;

      const prefix = item.prefix;
      iconNames.forEach((i) => {
        if (value === `${prefix}:${i.name}`) {
          i.active = true;
        } else {
          i.active = false;
        }
      });
      const col = Math.max(
        Math.floor(
          containerWidth / (iconWidth + containerPadding * 2 + iconGap),
        ),
        1,
      );
      const row = Math.max(Math.ceil(iconNames.length / col), 1);
      const rows: LayoutIcons['rows'] = [];
      for (let i = 0; i < row; i++) {
        rows.push({
          prefix,
          iconNames: iconNames.slice(i * col, (i + 1) * col),
        });
      }
      return { prefix, rows };
    });
    setLayoutIcons(newLayoutIcons);
  }, [filteredIcons, containerRef.current, value]);

  const handleFilterIcons = (
    e: ChangeEvent<HTMLInputElement>,
    activeKey: string,
  ) => {
    const value = e.target.value;
    const currentIcons = allIcons.find((item) => item.prefix === activeKey);
    if (currentIcons) {
      const filteredIcons = currentIcons.iconNames.filter((item) =>
        item.name.includes(value),
      );
      setFilteredIcons((prev) => {
        const newFilteredIcons = [...prev];
        const index = newFilteredIcons.findIndex(
          (item) => item.prefix === activeKey,
        );
        if (index > -1) {
          newFilteredIcons.splice(index, 1, {
            iconNames: filteredIcons,
            prefix: activeKey,
          });
        }
        return newFilteredIcons;
      });
    }
  };

  const toggleItemActive = ({
    rowIndex,
    nameIndex,
    tabKey,
    name,
  }: {
    rowIndex: number;
    name: string;
    nameIndex: number;
    tabKey: string;
  }) => {
    setLayoutIcons((prevState) => {
      const newState = [...prevState];
      newState.forEach((item) => {
        item.rows.forEach((i) => {
          i.iconNames.forEach((name) => (name.active = false));
        });
      });
      const currentTab = prevState.find(
        (i) => i.prefix === tabKey,
      ) as LayoutIcons;

      const rows = currentTab.rows[rowIndex];
      rows.iconNames.forEach((i) => (i.active = false));
      rows.iconNames[nameIndex].active = !rows.iconNames[nameIndex].active;
      return newState;
    });
    setValue(name);
  };

  const items = layoutIcons.map((item) => {
    const itemData = createItemData(item.rows, toggleItemActive);
    return {
      label: item.prefix,
      key: item.prefix,
      children: (
        <div className="size-full flex flex-wrap flex-col ">
          <div>
            <Input.Search
              placeholder="搜索图标"
              onChange={(e) => handleFilterIcons(e, item.prefix)}
            />
          </div>
          <div className="flex-1">
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  width={width}
                  height={height}
                  itemSize={iconWidth}
                  itemCount={item.rows.length}
                  itemData={itemData}
                >
                  {Row}
                </FixedSizeList>
              )}
            </AutoSizer>
          </div>
        </div>
      ),
    };
  });

  return (
    <div ref={containerRef} className="size-full overflow-hidden">
      <Tabs
        items={items}
        onChange={(activeKey) => {
          setActiveKey(activeKey);
        }}
        activeKey={activeKey}
        className={`h-full ${styles['icon-view-tabs']}`}
      />
    </div>
  );
};

export default IconView;
