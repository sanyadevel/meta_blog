import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import signUpPageStyles from '../SignUpPage/SignUpPage.module.scss';

import loginPageStyles from './LoginPage.module.scss';

const LoginPage: FC = () => {
  return (
    <div className={`${loginPageStyles.container} ${signUpPageStyles.container}`}>
      <h3 className={signUpPageStyles.title}>Sign In</h3>
      <form className={signUpPageStyles.form}>
        <label className={signUpPageStyles.label}>Email address</label>
        <input type="text" className={signUpPageStyles.input} placeholder='Email address'/>
        <label className={signUpPageStyles.label}>Password</label>
        <input type="text" className={signUpPageStyles.input} placeholder='Password'/>

        <input
          type="submit"
          className={`${signUpPageStyles.input} ${signUpPageStyles.submitButton}`}
          value="Login"
        />
        <h3 className={signUpPageStyles.alreadyHaveAccount}>
          Already have an account?
          <Link
            to="/register"
            className={signUpPageStyles.alreadyHaveAccount__link}
          >
            Sign Up.
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default LoginPage;
