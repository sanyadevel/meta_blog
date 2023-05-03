import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../store';

import headerStyles from './Header.module.scss';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {

  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );

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
      <div className={headerStyles.childrenContainer}>{children}</div>
    </div>
  );
};

export default Header;
