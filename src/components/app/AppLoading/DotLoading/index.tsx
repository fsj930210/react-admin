import styles from './index.module.css';

type DotLoadingProps = {
  text?: string;
};

const DotLoading = ({ text }: DotLoadingProps) => {
  return (
    <div className="size-full flex-center">
      <div className={styles['dot-loading']}>
        <div className={styles['loading-circle']} />
        <div className={styles['loading-circle']} />
        <div className={styles['loading-circle']} />
        <div className={styles['loading-shadow']} />
        <div className={styles['loading-shadow']} />
        <div className={styles['loading-shadow']} />
        {text ? <div className="mt-[16px]">{text}</div> : null}
      </div>
    </div>
  );
};

export default DotLoading;
