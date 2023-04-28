import React, { FC } from 'react';
import * as yup from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import customArticleStyles from './CustomArticle.module.scss';

interface ICustomArticle {
  title: string;
  description: string;
  text: string;
  tagInput: string;
  items: Array<{ value: string }>;
}

const CustomArticle: FC = () => {
  const schema = yup
    .object({
      title: yup.string().min(1).max(70).required(),
      description: yup.string().min(2).max(80).required(),
      text: yup.string().min(2).max(1000).required(),
      tagInput: yup.string().min(2).max(7).required(),
    })
    .required();

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

  const { fields, append, remove } = useFieldArray({ name: 'items', control });
  const submitCustomArticle = (articleData: ICustomArticle) => {};

  return (
    <div className={customArticleStyles.main}>
      <div className={customArticleStyles.container}>
        <h3 className={customArticleStyles.title}>Create new article</h3>
        <form onSubmit={handleSubmit(submitCustomArticle)}>
          <div className={customArticleStyles.mainInputs}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" placeholder="Title" />
            <label htmlFor="description">Short description</label>
            <input
              id="description"
              type="text"
              placeholder="Write a short description"
            />
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              placeholder="Text"
              className={`${customArticleStyles.textArea} ${customArticleStyles.input}`}
            ></textarea>
          </div>

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

          {fields.map((field, index) => (
            <div className={customArticleStyles.tag} key={field.id}>
              <input
                {...register(`items.${index}.value`, { required: true })}
                defaultValue={field.value}
                className={customArticleStyles.customInput}
              />
              <button
                className={customArticleStyles.deleteTagButton}
                onClick={() => remove(index)}
              >
                Delete
              </button>
            </div>
          ))}

          <button type="submit" className={customArticleStyles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomArticle;
