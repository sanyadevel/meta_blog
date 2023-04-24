import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useValidation } from '../../hooks/useValidation';

import signUpPageStyles from './SignUpPage.module.scss';

const SignUpPage: FC = () => {
  const schema = yup
    .object({
      userName: yup.string().min(3).max(20).required(),
      email: yup.string().min(6).max(25).required(),
      password: yup.string().required('Password is required'),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
    })
    .required();

  const formMethods = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = formMethods;
  const onSubmit = (data: FormData) => console.log(data);

  type FormData = yup.InferType<typeof schema>;

  const { validateField } = useValidation(formMethods);
  const password = watch('password');
  const onBlurInputs = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value);
  };

  return (
    <div className={signUpPageStyles.main}>
      <div className={signUpPageStyles.container}>
        <h2 className={signUpPageStyles.title}>Create new account</h2>

        <form
          className={signUpPageStyles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={signUpPageStyles.label}>Username</label>
          <div className={signUpPageStyles.inputWrapper}>
          <input
            type="text"
            className={errors.userName ? signUpPageStyles.inputError : signUpPageStyles.input}
            placeholder="some-username"
            {...register('userName', { required: 'Username is required' })}
            onBlur={onBlurInputs}
          />
          {errors.userName && (
            <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
              Please enter a username with at least 3 characters
            </p>
          )}
          </div>

          <label className={signUpPageStyles.label}>Email address</label>
          <div className={signUpPageStyles.inputWrapper}>
          <input
            type="text"
            className={errors.email ? signUpPageStyles.inputError : signUpPageStyles.input}
            placeholder="alex@example.com"
            {...register('email', { required: 'Email is required' })}
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

          <label className={signUpPageStyles.label}>Repeat Password</label>
          <div className={signUpPageStyles.inputWrapper}>
          <input
            type="password"
            className={errors.passwordConfirmation ? signUpPageStyles.inputError : signUpPageStyles.input}
            placeholder="Repeat Password"
            {...register('passwordConfirmation', {
              required: 'Passwords must match',
              validate: (value: any) =>
                value !== password || 'Passwords is not the same',
            })}
            onBlur={onBlurInputs}
          />
          {errors.passwordConfirmation && (
            <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
              Passwords must be the same.
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
