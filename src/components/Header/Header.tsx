import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import headerStyles from './Header.module.scss';

const Header: FC = () => {
  return (
    <div className={headerStyles.items}>
      <Link to="/" className={headerStyles.listDecoration}>
        META_BLOG
      </Link>
      <div>
        <Link to="/login" className={headerStyles.listDecoration}>
          Sign In
        </Link>
        <Link
          to="/register"
          className={`${
            (headerStyles.listDecoration,
            headerStyles.listDecoration__signupBackground)
          }`}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Header;
