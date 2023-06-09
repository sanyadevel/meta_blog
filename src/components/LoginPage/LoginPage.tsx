import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';

import signUpPageStyles from '../SignUpPage/SignUpPage.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginUserMutation, UserLoginDetails } from '../../slices/userLogin';
import { callNotification } from '../../logics/errors/callLoginErrors';
import { useAppDispatch } from '../../store';
import { changeUserActiveStatus, uploadUserInfo } from '../../slices/userProfileInfo';
import { emailRegex } from '../../variables/emailRegex';

import loginPageStyles from './LoginPage.module.scss';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] =
    useState<boolean>(true);

  const [isLoginError, setIsLoginError] = useState<boolean>(false);

  useEffect(() => {
    if (isLoginError) {
      callNotification('Email or password is incorrect', 'error');
    }
    document.title = 'Page Error';
  }, [isLoginError]);

  const [loginUserMutation] = useLoginUserMutation();

  const loginSchema = yup
    .object({
      email: yup
        .string()
        .min(6)
        .max(35)
        .email('Please enter a valid email address')
        .required(),
      password: yup.string().min(6).max(25).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const loginInput = watch('email');
  const passwordInput = watch('password');

  useEffect(() => {
    if (loginInput?.match(emailRegex) && passwordInput?.length >= 6) {
      setIsLoginButtonDisabled(false);
    } else {
      setIsLoginButtonDisabled(true);
    }
  }, [loginInput, passwordInput]);

  const submitAuthDetails = async (data: FormData): Promise<void> => {
    const userLoginDatas: UserLoginDetails = {
      user: {
        email: data?.email,
        password: data?.password,
      },
    };

    try {
      const userDatas = await loginUserMutation(userLoginDatas).unwrap();

      setIsLoginError(false);

      if ('user' in userDatas) {
        dispatch(uploadUserInfo({ userDatas: userDatas.user }));

        localStorage.setItem('token', userDatas.user.token);

        dispatch(changeUserActiveStatus({ isUserLoggedIn: true }));

        return navigate('/user');
      }
    } catch (error: any) {
      if (error?.status === 422) {
        setIsLoginError(true);

        setTimeout(() => {
          setIsLoginError(false);
        }, 150);
      }
    }
  };

  type FormData = yup.InferType<typeof loginSchema>;

  return (
    <div className={loginPageStyles.main}>
      <ToastContainer />
      <div
        className={`${loginPageStyles.container} ${signUpPageStyles.container}`}
      >
        <h3 className={signUpPageStyles.title}>Sign In</h3>
        <form
          className={signUpPageStyles.form}
          onSubmit={handleSubmit(submitAuthDetails)}
        >
          <label className={signUpPageStyles.label}>Email address</label>
          <div className={signUpPageStyles.inputWrapper}>
            <input
              type="text"
              className={
                errors.email
                  ? signUpPageStyles.inputError
                  : signUpPageStyles.input
              }
              placeholder="Email address"
              {...register('email', { required: 'Email Address is required' })}
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
              className={
                errors.password
                  ? signUpPageStyles.inputError
                  : signUpPageStyles.input
              }
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
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
            disabled={isLoginButtonDisabled}
          />
          <h3 className={signUpPageStyles.alreadyHaveAccount}>
            Already have an account?
            <Link
              to="/sign-up"
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
