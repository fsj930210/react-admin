/**
 * 参考：https://codepen.io/a-farahmand/pen/MWjGEpg
 */

import styles from './index.module.css';

const AppLoading = () => {
  return (
    <div className={styles['loading-wrapper']}>
      <div className={styles['loading-circle']}></div>
      <div className={styles['loading-circle']}></div>
      <div className={styles['loading-circle']}></div>
      <div className={styles['loading-shadow']}></div>
      <div className={styles['loading-shadow']}></div>
      <div className={styles['loading-shadow']}></div>
      <div>Loading</div>
    </div>
  );
};

export default AppLoading;
