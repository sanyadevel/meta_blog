import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';

import { emailRegex } from '../../variables/emailRegex';
import signUpPageStyles from '../SignUpPage/SignUpPage.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginUserMutation, UserLoginDetails } from '../../slices/userLogin';
import { callNotification } from '../../logics/errors/callLoginErrors';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeUserActiveStatus, uploadUserInfo } from '../../slices/userProfileInfo';

import loginPageStyles from './LoginPage.module.scss';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] =
    useState<boolean>(true);

  const [isLoginError, setIsLoginError] = useState<boolean>(false);

  useEffect(() => {
    if (isLoginError) {
      callNotification('Email or password is incorrect', 'error');
    }
  }, [isLoginError]);

  const [loginUserMutation] = useLoginUserMutation();
  const userInfo = useAppSelector((state) => state.userInfo.userDatas);

  // useLayoutEffect(() => {
  //   if (pathname === '/sign-in') {
  //     dispatch(changeUserActiveStatus({ isUserLoggedIn: false }));
  //     localStorage.removeItem('token');
  //   }
  // }, [pathname]);

  const schema = yup
    .object({
      email: yup
        .string()
        .min(6)
        .max(35)
        .matches(emailRegex, 'Please enter a valid email address')
        .required(),
      password: yup.string().min(6).max(25).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
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
      console.log(userDatas, 'userDatas');
      setIsLoginError(false);

      if ('user' in userDatas) {
        dispatch(uploadUserInfo({ userDatas: userDatas.user }));

        localStorage.setItem('token', userDatas.user.token);

        dispatch(changeUserActiveStatus({ isUserLoggedIn: true }));

        return navigate('/profile');
      }
    } catch (error: any) {
      if (error?.status === 422) {
        setIsLoginError(true);

        setTimeout(() => {
          setIsLoginError(false);
        }, 150);
      }
    }
    reset();
  };

  type FormData = yup.InferType<typeof schema>;

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
