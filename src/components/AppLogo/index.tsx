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
      className={`${className} flex items-center cursor-pointer`}
      style={style}
      onClick={goHome}
    >
      <img
        src="/logo.svg"
        alt="logo"
        className={animate ? styles.logo : ''}
        style={style}
      />
      {showTitle ? <h1 className="text-center ml-[10px]">{title}</h1> : null}
    </div>
  );
};

export default AppLogo;
