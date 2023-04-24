import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { emailRegex } from '../../variables/emailRegex';

import signUpPageStyles from './SignUpPage.module.scss';

const SignUpPage: FC = () => {
  const schema = yup
    .object({
      userName: yup.string().min(3).max(20).required(),
      email: yup.string().min(11).max(40).required().test(
        'is-valid-email',
        'Please enter a valid email address',
        (value) => {
          return emailRegex.test(value);
        },
      ),
      password: yup.string().min(6).max(35).required('Password is required'),
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

  const submitRegistrationDatas = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <div className={signUpPageStyles.main}>
      <div className={signUpPageStyles.container}>
        <h2 className={signUpPageStyles.title}>Create new account</h2>

        <form className={signUpPageStyles.form} onSubmit={handleSubmit(submitRegistrationDatas)}>
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
              {...register('userName', { required: 'Username is required', minLength:{
                value: 3,
                message: 'Username needs to be more than 3 characters',
              } })}
            />
            {errors.userName && (
              <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
                Username {errors?.userName?.message?.split(' ').slice(1).join(' ')}
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
              {...register('email', { required: 'Email is required', minLength:{
                value: 6,
                message: 'Email needs to be more than 6 characters',
              }, maxLength:{
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
              {...register('password', { required: 'Password is required', minLength:{
                value: 6,
                message:'Your password needs to be at least 6 characters.',
              } })}
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
            <input type="checkbox" id="agree" />
            <label className={signUpPageStyles.label} htmlFor="agree">
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
            <Link
              to="/login"
              className={signUpPageStyles.alreadyHaveAccount__link}
            >
              Sign In.
            </Link>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
