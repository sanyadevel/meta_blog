import React, { FC } from 'react';

import noInternetImage from '../../assets/images/noInternetImage.png';

import styles from './NoInternetConnection.module.scss';

const NoInternetConnection: FC = () => {
  return (
    <div className={styles.container}>
      <img
        src={noInternetImage}
        alt="noInternetImage"
        className={styles.image}
      />
      <h2 className={styles.title}>Проблема соединения с интернетом</h2>
      <h3 className={styles.description}>
        Проверьте свою сеть и попробуйте снова .
      </h3>
    </div>
  );
};

export default NoInternetConnection;
