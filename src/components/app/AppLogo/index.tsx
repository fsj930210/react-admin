import { PUBLIC_PATH } from '@/utils/constants';

import styles from './index.module.css';

import useGoto from '@/hooks/useGoto';

type AppLogoProps = {
  animate?: boolean;
  className?: string;
  title?: string;
  showTitle?: boolean;
  style?: React.CSSProperties;
};
const AppLogo = ({
  animate,
  style,
  className = '',
  title = 'React Admin',
  showTitle = true,
}: AppLogoProps) => {
  const { goHome } = useGoto();
  return (
    <div
      className={`${className} ${styles['logo-wrapper']} flex-items-center cursor-pointer`}
      style={style}
      onClick={() => goHome()}
    >
      <img
        src={`${PUBLIC_PATH}/logo.svg`}
        alt="logo"
        className={`${animate ? styles['logo-animate'] : ''}`}
      />

      <h1 className={`text-center ml-[10px] text-[16px] transition ${showTitle ? 'opcatiy-100' : 'opacity-0'}`}>
        {title}
      </h1>

    </div>


  );
};

export default AppLogo;
