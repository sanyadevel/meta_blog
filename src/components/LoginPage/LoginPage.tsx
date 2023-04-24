import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { emailRegex } from '../../variables/emailRegex';
import signUpPageStyles from '../SignUpPage/SignUpPage.module.scss';
import { useValidation } from '../../hooks/useValidation';

import loginPageStyles from './LoginPage.module.scss';

const LoginPage: FC = () => {
  const schema = yup
    .object({
      email: yup
        .string()
        .min(11)
        .max(35)
        .matches(emailRegex, 'Please enter a valid email address')
        .required(),
      password: yup.string().min(6).max(25).required(),
    })
    .required();

  const formMethods = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState: { errors } } = formMethods;

  const onSubmit = (data: FormData) => console.log(data);

  type FormData = yup.InferType<typeof schema>;

  const { validateField } = useValidation(formMethods);

  const onBlurInputs = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value);
  };

  return (
    <div className={loginPageStyles.main}>
      <div
        className={`${loginPageStyles.container} ${signUpPageStyles.container}`}
      >
        <h3 className={signUpPageStyles.title}>Sign In</h3>
        <form
          className={signUpPageStyles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={signUpPageStyles.label}>Email address</label>
          <div className={signUpPageStyles.inputWrapper}>
          <input
            type="text"
            className={errors.email ? signUpPageStyles.inputError : signUpPageStyles.input}
            placeholder="Email address"
            {...register('email', { required: 'Email Address is required' })}
            onBlur={onBlurInputs}
          />
          {errors.email && (
            <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
              Please enter a valid email address
            </p>
          )}
          </div>
          <label className={signUpPageStyles.label}>Password</label>
          <div className={signUpPageStyles.inputWrapper}>
          <input
            type="password"
            className={errors.password ? signUpPageStyles.inputError : signUpPageStyles.input}
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            onBlur={onBlurInputs}
          />
          {errors.password && (
            <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
              Your password needs to be at least 6 characters.
            </p>
          )}
          </div>
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
    </div>
  );
};

export default LoginPage;
