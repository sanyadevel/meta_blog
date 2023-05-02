import React, { FC, useState } from 'react';
import Heart from 'react-heart';
import { useNavigate } from 'react-router-dom';

import { IArticle } from '../ArticleList/ArticleList';
import { formatDate } from '../../logics/date/formateDate';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateSlug } from '../../slices/articleSlice';

import articleStyles from './Article.module.scss';


const Article: FC<IArticle> = ({
  title,
  tagList,
  description,
  author,
  createdAt,
  slug,
}) => {

  const [active, setActive] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );

  const getSlugFromTitle = (slugTitle: string): void => {
    dispatch(updateSlug(slugTitle));
    return navigate(`/articles/${slugTitle}`);
  };


  return (
      <div className={articleStyles.container}>
        <main className={articleStyles.main}>
          <div className={articleStyles.header}>
            <h3 className={articleStyles.title} onClick={()=>getSlugFromTitle(slug || '')}>
              {title?.split(' ').slice(0, 13).join(' ')}
            </h3>
            <div className={articleStyles.likeBtn}>
              <Heart
                isActive={active}
                onClick={() => isUserLoggedIn ? setActive(!active) : null}
                animationScale={1.1}
              />
            </div>
            <span>12</span>
          </div>
          <div className={articleStyles.tags}>
            {tagList?.map((tag) => (
              <span className={articleStyles.tag} key={crypto.randomUUID()}>
                {tag}
              </span>
            ))}
          </div>
          <p className={articleStyles.description}>
            {description?.split(' ').slice(0, 28).join(' ')}
          </p>
        </main>
        <legend className={articleStyles.legend}>
          <div className={articleStyles.personInfo}>
            <span className={articleStyles.personName}>{author?.username}</span>
            <span className={articleStyles.birthDate}>
              {formatDate(createdAt)}
            </span>
          </div>
          <img
            src={author?.image}
            alt="avatar"
            className={articleStyles.personAvatar}
          />
        </legend>
      </div>
  );
};

export default React.memo(Article);
