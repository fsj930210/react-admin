import { Fragment } from 'react';

import { builtInThemes } from '@/utils/constants';

import useAppConfigStore from '@/store/appConfig';
type ThemeItemProps = {
  simple?: boolean;
};
const ThemeItem = ({ simple }: ThemeItemProps) => {
  const changePrimaryColor = useAppConfigStore(
    (state) => state.changePrimaryColor,
  );
  return (
    <div className="flex">
      {builtInThemes.map((item) => {
        return simple ? (
          <span
            key={item.value}
            style={{
              backgroundColor: item.value,
              width: 20,
              height: 20,
              cursor: 'pointer',
              borderRadius: '100%',
              marginRight: 8,
            }}
            title={item.label}
            onClick={() => changePrimaryColor(item.value)}
          />
        ) : (
          <Fragment key={item.value}>
            <span style={{ backgroundColor: item.value }} />
            <span>{item.label}</span>
          </Fragment>
        );
      })}
    </div>
  );
};

export default ThemeItem;
