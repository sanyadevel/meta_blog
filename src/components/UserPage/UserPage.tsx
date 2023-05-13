import React, { useEffect } from 'react';

import ArticleList from '../ArticleList';

import styles from './UserPage.module.scss';

const UserPage = () => {
  useEffect(()=>{
    document.title = 'META_BLOG';
  }, []);

  return (
    <div className={styles.container}>
      <ArticleList />
    </div>
  );
};

export default UserPage;
