import styles from './index.module.css';

type BlockLoadingProps = {
  text?: string;
};

const BlockLoading = ({ text, }: BlockLoadingProps) => {
  return (
    <div className="size-full flex-center">
      <div className={styles['block-loading']}>
        <div className={styles["block"]}></div>
        <div className={styles["block"]}></div>
        <div className={styles["block"]}></div>
        <div className={styles["block"]}></div>
      </div>
      {text ? <div className="mt-[16px]">{text}</div> : null}
    </div >
  );
};

export default BlockLoading;
