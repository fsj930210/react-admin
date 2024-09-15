import { useTranslation } from 'react-i18next';

import { Input } from 'antd';

const SearchInput = () => {
  const { t } = useTranslation();
  return (
    <div className="h-[60px] p-[10px]">
      <Input placeholder={t('search.inputPlaceHolder')} className="h-full" />
    </div>
  );
};

export default SearchInput;
