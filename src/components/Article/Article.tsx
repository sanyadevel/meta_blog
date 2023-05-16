import React, { FC } from 'react';
import Heart from 'react-heart';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { IArticle } from '../ArticleList/ArticleList';
import { formatDate } from '../../logics/date/formateDate';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateArticle, updateArticleFavoriteStatus, updateFavoritesCount } from '../../slices/articleSlice';
import useToggleArticleLike from '../../hooks/useToggleArticleLike';

import articleStyles from './Article.module.scss';

const Article: FC<IArticle> = ({
  title,
  tagList,
  description,
  author,
  favorited,
  createdAt,
  slug,
  favoritesCount,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const { toggleArticleLike, isLikeButtonActive, favoriteLikesCount } =
    useToggleArticleLike(slug || '', favorited || false, favoritesCount || 0);
  const currentArticle = useAppSelector((state) => state.article.articleProp);

  const getFullArticle = (slugTitle: string): void => {
    dispatch(updateArticle({ ...currentArticle, slug: slugTitle }));
    dispatch(updateArticleFavoriteStatus(isLikeButtonActive || false));
    dispatch(updateFavoritesCount(favoriteLikesCount || 0));

    navigate(`/articles/${slugTitle}`);
  };

  return (
    <div className={articleStyles.container}>
      <ToastContainer />
      <main className={articleStyles.main}>
        <div className={articleStyles.header}>
          <h3
            className={articleStyles.title}
            onClick={() => getFullArticle(slug || '')}
          >
            {title && title.split(' ').slice(0, 13).join(' ')}
          </h3>
          <div className={articleStyles.likeBtn}>
            <Heart
              isActive={isLikeButtonActive}
              onClick={() => toggleArticleLike()}
              animationScale={1.1}
            />
          </div>
          <span>{favoriteLikesCount}</span>
        </div>
        <div className={articleStyles.tags}>
          {tagList &&
            tagList?.map((tag) => {
              if (tag && tag.length > 0) {
                return (
                  <span className={articleStyles.tag} key={crypto.randomUUID()}>
                    {tag && tag.split(' ').slice(0, 17).join(' ')}
                  </span>
                );
              }
            })}
        </div>
        <p className={articleStyles.description}>
          {description && description?.split(' ').slice(0, 58).join(' ')}
        </p>
      </main>
      <legend className={articleStyles.legend}>
        <div className={articleStyles.personInfo}>
          <span className={articleStyles.personName}>
            {author?.username.slice(0, 20)}
          </span>
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
