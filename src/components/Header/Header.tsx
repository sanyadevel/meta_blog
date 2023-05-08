import React, { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';
import styles from '../UserPage/UserPage.module.scss';
import { changeUserActiveStatus, uploadUserInfo } from '../../slices/userProfileInfo';

import headerStyles from './Header.module.scss';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );
  const userInfo = useAppSelector((state) => state.userInfo.userDatas);

  const getLogoutedUser = () => {
    dispatch(uploadUserInfo({ userDatas: {} }));
    dispatch(changeUserActiveStatus({ isUserLoggedIn: false }));

    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/articles');
    }
  }, [isUserLoggedIn]);

  return !isUserLoggedIn ? (
    <div className={headerStyles.items}>
      <a href="/" className={headerStyles.listDecoration}>
        META_BLOG
      </a>
      <div>
        <Link to="/sign-in" className={headerStyles.listDecoration}>
          Sign In
        </Link>
        <Link
          to="/sign-up"
          className={`${
            (headerStyles.listDecoration,
            headerStyles.listDecoration__signupBackground)
          }`}
        >
          Sign Up
        </Link>
      </div>
    </div>
  ) : (
    <div className={headerStyles.items}>
      <a href="/" className={headerStyles.listDecoration}>
        META_BLOG
      </a>
      <div className={headerStyles.childrenContainer}>
        <Link to="/user/new-article" className={styles.createArticle}>
          Create article
        </Link>
        <Link to="/profile" className={styles.username}>
          {userInfo?.username}
        </Link>

        <Link to="/profile">
        <img
          className={styles.userAvatar}
          src={
            userInfo?.image ||
            'https://static.productionready.io/images/smiley-cyrus.jpg'
          }
          alt="avatar"
        />
        </Link>
        <a
          href="/articles"
          className={`${
            (headerStyles.listDecoration,
            headerStyles.listDecoration__logoutBackground)
          }`}
          onClick={getLogoutedUser}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Header;
