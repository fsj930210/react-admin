import { useTranslation } from 'react-i18next';

type HeaderProps = {
  todo?: boolean;
};

const Header = ({ todo }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3>
          {todo ? t('notification.todo') : t('notification.messageCenter')}
        </h3>
        {todo ? <a>{t('notification.clear')}</a> : null}
      </div>
    </div>
  );
};

export default Header;
