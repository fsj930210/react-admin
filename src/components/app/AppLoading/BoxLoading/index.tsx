import styles from './index.module.css';

type BoxLoadingProps = {
  text?: string;
};

const BoxLoading = ({ text, }: BoxLoadingProps) => {
  return (
    <div className="size-full flex-center">
      <div className={styles['box-loading']}></div>
      {text ? <div className="mt-[16px]">{text}</div> : null}
    </div>
  );
};

export default BoxLoading;
