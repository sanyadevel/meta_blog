import React from 'react';

import page404 from '../../assets/images/404.jpg';

import styles from './PageIsNotFound.module.scss';

const PageIsNotFound = () => {
  return (
    <div className={styles.container}>
      <img src={page404} alt="page is not found" className={styles.img} />
      <h3 className={styles.title}> Oops!, Page is not found !</h3>
    </div>
  );
};

export default PageIsNotFound;
