import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';

import { useRegisterUserMutation } from '../../slices/userRegistration';
import { callNotification } from '../../logics/errors/callLoginErrors';
import { useAppDispatch } from '../../store';
import { changeUserActiveStatus } from '../../slices/userProfileInfo';

import signUpPageStyles from './SignUpPage.module.scss';

export interface IRegistrationErrors {
  email?: string[] | undefined;
  password?: string[] | undefined;
  username?: string[] | undefined;
}

const SignUpPage: FC = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { pathname } = location;


  const [registerUser] = useRegisterUserMutation();
  const [registrationErrors, setRegistrationErrors] =
    useState<IRegistrationErrors>({});

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (pathname === '/sign-up') {
      dispatch(changeUserActiveStatus({ isUserLoggedIn: false }));
      localStorage.removeItem('token');
    }
  }, [pathname]);

  const schema = yup
    .object({
      userName: yup.string().min(3).max(20).required(),
      email: yup
        .string()
        .min(11)
        .max(40)
        .required()
        .email('Please enter a valid email address'),

      password: yup.string().min(6).max(40).required('Password is required'),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  type FormData = yup.InferType<typeof schema>;

  const submitRegistrationDatas = async (data: FormData): Promise<void> => {
    const userDatas = {
      user: {
        username: data?.userName,
        email: data?.email,
        password: data?.passwordConfirmation,
      },
    };

    try {
      const result = await registerUser(userDatas).unwrap();
      if (result) {
        callNotification('Congratulations, your account was successful created', 'success');
      }
    } catch (error: any) {
      if (error?.status === 422) {
        setRegistrationErrors(error?.data?.errors);
      }
    }
    await reset();
  };

  return (
<>
    <div className={signUpPageStyles.main}>
      <div className={signUpPageStyles.container}>
        <ToastContainer className={signUpPageStyles.notification} />
        <h2 className={signUpPageStyles.title}>Create new account</h2>

        <form
          className={signUpPageStyles.form}
          onSubmit={handleSubmit(submitRegistrationDatas)}
        >
          <label className={signUpPageStyles.label}>Username</label>
          <div className={signUpPageStyles.inputWrapper}>
            <input
              type="text"
              className={
                errors.userName
                  ? signUpPageStyles.inputError
                  : signUpPageStyles.input
              }
              placeholder="some-username"
              {...register('userName', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username needs to be more than 3 characters',
                },
              })}
            />
            {errors.userName && (
              <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
                Username {errors?.userName?.message?.split(' ').slice(1).join(' ')}
              </p>
            )}
            {(registrationErrors?.username?.length ?? 0) > 0 && (
              <p className={signUpPageStyles.inputErrorTextLabel}>
                Username has already been taken
              </p>
            )}
          </div>

          <label className={signUpPageStyles.label}>Email address</label>
          <div className={signUpPageStyles.inputWrapper}>
            <input
              type="text"
              className={
                errors.email
                  ? signUpPageStyles.inputError
                  : signUpPageStyles.input
              }
              placeholder="alex@example.com"
              {...register('email', {
                required: 'Email is required',
                minLength: {
                  value: 6,
                  message: 'Email needs to be more than 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Enter a valid email adress',
                },
              })}
            />
            {errors.email && (
              <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
                Email {errors?.email?.message?.split(' ').slice(1).join(' ')}
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
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters.',
                },
              })}
            />
            {errors.password && (
              <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
                Password {errors?.password?.message?.split(' ').slice(1).join(' ')}
              </p>
            )}
          </div>

          <label className={signUpPageStyles.label}>Repeat Password</label>
          <div className={signUpPageStyles.inputWrapper}>
            <input
              type="password"
              className={
                errors.passwordConfirmation
                  ? signUpPageStyles.inputError
                  : signUpPageStyles.input
              }
              placeholder="Repeat Password"
              {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && (
              <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
                {errors?.passwordConfirmation?.message}
              </p>
            )}
          </div>
          <span className={signUpPageStyles.brakeLine} />
          <div className={signUpPageStyles.agreeStatement}>
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
            />
            <label className={signUpPageStyles.label} htmlFor="agree">
              I agree to the processing of my personal information
            </label>
          </div>
          <input
            type="submit"
            className={`${signUpPageStyles.input} ${signUpPageStyles.submitButton}`}
            value="Create"
            disabled={!isChecked}
          />
          <h3 className={signUpPageStyles.alreadyHaveAccount}>
            Already have an account?
            <Link
              to="/sign-in"
              className={signUpPageStyles.alreadyHaveAccount__link}
            >
              Sign In.
            </Link>
          </h3>
        </form>
      </div>
    </div>
</>
  );
};

export default SignUpPage;
