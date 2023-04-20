import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import signUpPageStyles from './SignUpPage.module.scss';

const SignUpPage: FC = () => {
  return (
    <div className={signUpPageStyles.container}>
      <h2 className={signUpPageStyles.title}>Create new account</h2>

      <form className={signUpPageStyles.form}>
        <label className={signUpPageStyles.label}>Username</label>
        <input type="text" className={signUpPageStyles.input} placeholder='some-username'/>

        <label className={signUpPageStyles.label}>Email address</label>
        <input type="text" className={signUpPageStyles.input} placeholder='alex@example.com'/>

        <label className={signUpPageStyles.label}>Password</label>
        <input type="text" className={signUpPageStyles.input} placeholder='Password'/>

        <label className={signUpPageStyles.label}>Repeat Password</label>
        <input type="text" className={signUpPageStyles.input} placeholder='Repeat Password'/>
        <span className={signUpPageStyles.brakeLine} />
        <div className={signUpPageStyles.agreeStatement}>
          <input type="checkbox" />
          <label className={signUpPageStyles.label}>
            I agree to the processing of my personal information
          </label>
        </div>
        <input
          type="submit"
          className={`${signUpPageStyles.input} ${signUpPageStyles.submitButton}`}
          value="Create"
        />
        <h3 className={signUpPageStyles.alreadyHaveAccount}>
          Already have an account?
          <Link to="/login" className={signUpPageStyles.alreadyHaveAccount__link}>Sign In.</Link>
        </h3>
      </form>
    </div>
  );
};

export default SignUpPage;
