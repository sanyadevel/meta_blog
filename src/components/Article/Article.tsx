import React, { FC, useState } from 'react';
import Heart from 'react-heart';

import { IArticle } from '../ArticleList/ArticleList';
import { formatDate } from '../../logics/date/formateDate';
import { useAppSelector } from '../../store';

import articleStyles from './Article.module.scss';

const Article: FC<IArticle> = ({
  title,
  tagList,
  description,
  author,
  createdAt,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );

  return (
    <>
      <div className={articleStyles.container}>
        <main className={articleStyles.main}>
          <div className={articleStyles.header}>
            <h3 className={articleStyles.title}>
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
            {tagList?.map((tag, idx) => (
              <span className={articleStyles.tag} key={idx}>
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
    </>
  );
};

export default React.memo(Article);
