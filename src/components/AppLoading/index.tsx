import styles from './index.module.css';

type AppLoadingProps = {
  text?: string;
  showText?: boolean;
};

const AppLoading = ({ text = 'Loading...', showText }: AppLoadingProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className={styles['loading-wrapper']}>
        <div className={styles['loading-circle']} />
        <div className={styles['loading-circle']} />
        <div className={styles['loading-circle']} />
        <div className={styles['loading-shadow']} />
        <div className={styles['loading-shadow']} />
        <div className={styles['loading-shadow']} />
        {showText ? <div className="mt-[16px]">{text}</div> : null}
      </div>
    </div>
  );
};

export default AppLoading;
