import { useTranslation } from 'react-i18next';

import { RaCompositionInput } from '@/components/RaComposition';
import type { RaCompositionInputProps } from '@/components/RaComposition';

type SearchInputProps = {
  onChange: RaCompositionInputProps['onChange'];
  value: string;
};
const SearchInput = ({ onChange, value }: SearchInputProps) => {
  const { t } = useTranslation();
  return (
    <div className="h-[60px] p-[10px]">
      <RaCompositionInput
        placeholder={t('search.inputPlaceHolder')}
        className="h-full"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchInput;
