import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import signUpPageStyles from '../../components/SignUpPage/SignUpPage.module.scss';
import { callNotification } from '../../logics/errors/callLoginErrors';
import { useAppDispatch, useAppSelector } from '../../store';
import { IEditUserInfo, useEditUserInfoMutation } from '../../slices/editUserInfo';
import { uploadUserInfo } from '../../slices/userProfileInfo';

const EditedUser: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { email = '', image = '', username = '' } = useAppSelector((state) => state.userInfo.userDatas) || {};
  const [editUserInfoMutation] = useEditUserInfoMutation();

  const schema = yup
    .object({
      username: yup.string().min(3).max(20).required(),
      email: yup
        .string()
        .email('Please enter a valid email address')
        .min(6)
        .max(35)
        .required(),
      password: yup.string().min(6).max(25).required(),
      image: yup
        .string()
        .url()
        .required(),
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

  const submitUserEditDetails = async (editedDatas: FormData):Promise<void> => {
    const newEditedUserDatas:IEditUserInfo = {
      user:{
        ...editedDatas, bio: '',
      },
    };

    const editedUserInforesponse = await editUserInfoMutation(newEditedUserDatas).unwrap();

    callNotification('Your profile details was changed', 'success');

    setTimeout(()=>{
      navigate('/user');
      dispatch(uploadUserInfo({ userDatas: editedUserInforesponse.user }));
    }, 2500);
  };

  type FormData = yup.InferType<typeof schema>;

  return (
    <div className={signUpPageStyles.main}>
      <ToastContainer />
      <div className={signUpPageStyles.container}>
        <h2 className={signUpPageStyles.title}>Edit profile</h2>
        <form
          className={signUpPageStyles.form}
          onSubmit={handleSubmit(submitUserEditDetails)}
        >
          <label className={signUpPageStyles.label}>Username</label>
          <div className={signUpPageStyles.inputWrapper}>
          <input
            type="text"
            className={
              errors.username
                ? signUpPageStyles.inputError
                : signUpPageStyles.input
            }
            defaultValue={username}
            placeholder="Enter a new username"
            {...register('username', { required: 'Username is required' })}
          />
            {errors.username && (
              <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
                Your username needs to be at least 3 characters.
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
            defaultValue={email}
            placeholder="Enter an email address"
            {...register('email', { required: 'Email Address is required' })}
          />
            {errors.email && (
              <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
                Please enter a valid email address
              </p>
            )}
          </div>
          <label className={signUpPageStyles.label}>New Password</label>
          <div className={signUpPageStyles.inputWrapper}>
          <input
            type="password"
            className={
              errors.password
                ? signUpPageStyles.inputError
                : signUpPageStyles.input
            }
            placeholder="Enter a new password"
            {...register('password', { required: 'Password is required' })}
          />
            {errors.password && (
              <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
                Your password needs to be at least 6 characters.
              </p>
            )}
          </div>
          <label className={signUpPageStyles.label}>Avatar Image URL</label>
          <div className={signUpPageStyles.inputWrapper}>
          <input
            type="text"
            className={
              errors.image
                ? signUpPageStyles.inputError
                : signUpPageStyles.input
            }
            defaultValue={image || ''}
            placeholder="Enter a valid URL"
            {...register('image')}
          />
            {errors.image && (
                <p role="alert" className={signUpPageStyles.inputErrorTextLabel}>
                  Please enter a valid URL address.
                </p>
            )}
          </div>
          <input
            type="submit"
            className={`${signUpPageStyles.input} ${signUpPageStyles.submitButton}`}
            value="Save"
          />
        </form>
      </div>
    </div>
  );
};

export default EditedUser;
