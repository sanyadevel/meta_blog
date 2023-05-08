import React, { FC } from 'react';
import * as yup from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { notification } from 'antd';
import './antdNotificationStyles.css';
import { Navigate, useNavigate } from 'react-router-dom';

import { useCustomArticleMutation } from '../../slices/postAnArticle';
import { useAppSelector } from '../../store';

import styles from './CustomArticle.module.scss';
import customArticleStyles from './CustomArticle.module.scss';

interface IArticleTag {
  value: string;
}

export interface ICustomArticle {
  title: string;
  description: string;
  body: string;
  tagList: IArticleTag[];
}


const CustomArticle: FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openAntdNotification = (message: string, description: string): void => {
    setTimeout(() => {
      api.open({
        className: 'ant-notification-notice-message',
        key: 'updatable',
        message,
        description,
        placement: 'topRight',
        style:{ top: 20, right:10, color: message === 'Congratulations !' ? 'green' : 'red' },
        duration: 3,
      });
    }, 1000);
  };

  const schema = yup.object({
    title: yup
      .string()
      .min(2)
      .max(70)
      .transform((value) => (value.trim().length <= 2 ? null : value))
      .required(),
    description: yup
      .string()
      .min(2)
      .max(80)
      .transform((value) => (value.trim().length <= 2 ? null : value))
      .required(),
    body: yup
      .string()
      .min(3)
      .max(5000)
      .transform((value) => (value.trim().length <= 3 ? null : value))
      .required(),
    tagList: yup.array().of(
      yup.object().shape({
        value: yup.string().min(2).max(17).required('Tag cannot be empty'),
      }),
    ),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ICustomArticle>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [customArticleMutation] = useCustomArticleMutation();
  const navigate = useNavigate();
  const { fields, append, remove } = useFieldArray({ name: 'tagList', control });

  const isUserLoggedIn = useAppSelector((state) => state.userInfo.isUserLoggedIn);

  const submitCustomArticle = async (articleData: ICustomArticle) => {
    const transformedArticleData = {
      ...articleData,
      tagList: articleData.tagList.map(tag => tag.value),
    };

    for (const key of articleData.tagList) {
      if (key.value.trim() === '') {
        articleData.tagList.filter((tag) => tag.value !== key.value);
      }
    }
    try {
      await customArticleMutation(transformedArticleData).unwrap();

      openAntdNotification(
        'Congratulations !',
        'A new post is added to METABLOG community',
      );

      setTimeout(()=>{
        navigate('/user');
      }, 2500);
    } catch (err) {
      openAntdNotification('Oops !!!', 'Something went wrong, refresh the page and try again');
    }
  };
  return (
    <div className={customArticleStyles.main}>
      {!isUserLoggedIn && <Navigate to='/sign-in' />}
      <div className={customArticleStyles.container}>
        <h3 className={customArticleStyles.title}>Create new article</h3>
        <form onSubmit={handleSubmit(submitCustomArticle)}>
          <div className={customArticleStyles.mainInputs}>
            <label htmlFor="title">Title</label>
            <>
              <input
                id="title"
                type="text"
                placeholder="Title"
                {...register('title', { required: true })}
              />
              {errors.title && (
                <p
                  className={styles.inputErrorTextLabel}
                >{`Title ${errors.title.message
                  ?.split(' ')
                  .slice(1)
                  .join(' ')}`}</p>
              )}
            </>
            <label htmlFor="description">Short description</label>

            <input
              id="description"
              type="text"
              placeholder="Write a short description"
              {...register('description', { required: true })}
            />
            {errors.description && (
              <p
                className={styles.inputErrorTextLabel}
              >{`Description ${errors.description.message
                ?.split(' ')
                .slice(1)
                .join(' ')}`}</p>
            )}

            <label htmlFor="text">Text</label>

            <textarea
              id="text"
              placeholder="Text"
              className={`${customArticleStyles.textArea} ${customArticleStyles.input}`}
              {...register('body', { required: true })}
            />
            {errors.body && (
              <p
                className={styles.inputErrorTextLabel}
              >{`Text ${errors.body.message
                ?.split(' ')
                .slice(1)
                .join(' ')}`}</p>
            )}
          </div>

          {fields.length > 0 && (
            <span className={customArticleStyles.tagsTitle}>Tags</span>
          )}
          {fields.map((field, index) => (
            <div className={customArticleStyles.tag} key={field.id}>
              <div>
                <input
                  {...register(`tagList.${index}.value`, {
                    required: 'Tag is required',
                  })}
                  defaultValue={field.value}
                  className={customArticleStyles.customInput}
                />
                {errors?.tagList?.[index]?.value && (
                  <p className={styles.inputErrorTextLabel}>
                    Tag value must be at least 2 characters
                  </p>
                )}
              </div>
              <button
                className={customArticleStyles.deleteTagButton}
                onClick={() => remove(index)}
              >
                Delete
              </button>
            </div>
          ))}

          <div className={customArticleStyles.tagHandlerButtons}>
            <button
              className={customArticleStyles.addTagButton}
              onClick={(e) => {
                e.preventDefault();
                append({ value: '' });
              }}
            >
              Add tag
            </button>
          </div>
          {contextHolder}
          <button type="submit" className={customArticleStyles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomArticle;
