import React, { FC, useEffect } from 'react';
import * as yup from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { notification } from 'antd';
import './antdNotificationStyles.css';
import { useNavigate } from 'react-router-dom';

import { useCustomArticleMutation } from '../../slices/postAnArticle';
import { useAppSelector } from '../../store';
import { useEditedArticleMutation } from '../../slices/editAnArticle';

import styles from './CustomArticle.module.scss';
import customArticleStyles from './CustomArticle.module.scss';

interface IArticleTag {
  value: string;
}

export interface ICustomArticle {
  title: string;
  slug?: string;
  description: string;
  body: string;
  tagList: IArticleTag[];
}

const CustomArticle: FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const [editedArticleMutation] = useEditedArticleMutation();
  const [customArticleMutation] = useCustomArticleMutation();

  const navigate = useNavigate();

  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );
  const isArticleInEditProcess = useAppSelector(
    (state) => state.article.isArticleInEditProcess,
  );

  useEffect(()=>{
    if (isArticleInEditProcess) {
      document.title = 'Edit article';
    } else {
      document.title = 'Create new article';
    }

  }, []);

  const { slug, articleDescription, articleTitle, articleText, articleTags } = useAppSelector(state=>state.article.articleProp);

  const openAntdNotification = (message: string, description: string): void => {
    setTimeout(() => {
      api.open({
        className: 'ant-notification-notice-message',
        key: 'updatable',
        message,
        description,
        placement: 'topRight',
        style: {
          top: 20,
          right: 10,
          color: message === 'Congratulations !' ? 'green' : 'red',
        },
        duration: 3,
      });
    }, 1000);
  };

  const customSchema = yup.object({
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
  } = useForm<ICustomArticle>({
    resolver: yupResolver(customSchema),
    mode: 'onBlur',
    defaultValues: {
      tagList: isArticleInEditProcess
        ? articleTags.map((tag) => ({ value: tag }))
        : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  useEffect(() => {
    if (!isArticleInEditProcess) {
      reset({
        title: '',
        description: '',
        body: '',
        tagList: [],
      });
    } else {
      reset({
        title: articleTitle,
        description: articleDescription,
        body: articleText,
        tagList: articleTags.map((tag:string) => ({ value: tag })),
      });
    }
  }, [isArticleInEditProcess]);

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/sign-in');
    } else {
      navigate('/user/new-article');
    }
  }, [isUserLoggedIn, navigate]);

  const toggleCreateEditArticle = async (articleData: ICustomArticle) => {
    const transformedArticleData = {
      ...articleData,
      tagList: articleData.tagList.map((tag) => tag.value),
    };

    for (const key of articleData.tagList) {
      if (key.value.trim() === '') {
        articleData.tagList.filter((tag) => tag.value !== key.value);
      }
    }

    try {
      if (isArticleInEditProcess) {
        await editedArticleMutation({
          slug: slug || '',
          newArticle: transformedArticleData,
        }).unwrap();
      } else {
        await customArticleMutation(transformedArticleData).unwrap();
      }
      if (isArticleInEditProcess) {
        openAntdNotification(
          'Congratulations !',
          'Post is edited for METABLOG community',
        );
      } else {
        openAntdNotification(
          'Congratulations !',
          'A new post is added to METABLOG community',
        );
      }

      setTimeout(() => {
        navigate('/user');
      }, 2500);
    } catch (err) {
      openAntdNotification(
        'Oops !!!',
        'Something went wrong, refresh the page and try again',
      );
    }
  };

  return (
    <div className={customArticleStyles.main}>
      <div className={customArticleStyles.container}>
        {isArticleInEditProcess ? (
          <h3 className={customArticleStyles.title}> Edit Article </h3>
        ) : (
          <h3 className={customArticleStyles.title}> Create new article </h3>
        )}

        <form onSubmit={handleSubmit(toggleCreateEditArticle)}>
          <div className={customArticleStyles.mainInputs}>
            <label htmlFor="title">Title</label>
            <>
              <input
                id="title"
                type="text"
                placeholder="Title"
                {...register('title', { required: true })}
                defaultValue={articleTitle}
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
              defaultValue={articleDescription}
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
              defaultValue={articleText}
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
