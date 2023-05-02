import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleList from '../ArticleList';
import { useAppDispatch, useAppSelector } from '../../store';
import headerStyles from '../Header/Header.module.scss';
import { changeUserActiveStatus, uploadUserInfo } from '../../slices/userProfileInfo';
import Header from '../Header';

import styles from './UserPage.module.scss';

const UserPage = () => {
  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );
  const userInfo = useAppSelector((state) => state.userInfo.userDatas);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getLogoutedUser = () => {
    dispatch(uploadUserInfo({ userDatas: {} }));
    dispatch(changeUserActiveStatus({ isUserLoggedIn: false }));
  };

  if (!isUserLoggedIn) {
    navigate('/articles');
  }

  return (
    <>
    <div className={styles.container}>
      {isUserLoggedIn && (
        <Header>
          <button className={styles.createArticle}>Create article</button>
          <h3 className={styles.username}>{userInfo?.username}</h3>
          <img className={styles.userAvatar} src={userInfo?.image || ''} alt='user avatar'/>
          <a href='/articles'
            className={`${
              (headerStyles.listDecoration, 
              headerStyles.listDecoration__logoutBackground)
            }`}
            onClick={getLogoutedUser}
          >
            Logout
          </a>
        </Header>
      )}
      <ArticleList />
    </div>
    </>
  );
};

export default UserPage;
