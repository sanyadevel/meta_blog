import React, { FC } from 'react';
import Heart from 'react-heart';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { IArticle } from '../ArticleList/ArticleList';
import { formatDate } from '../../logics/date/formateDate';
import { useAppDispatch } from '../../store';
import { updateArticleFavoriteStatus, updateFavoritesCount, updateSlug } from '../../slices/articleSlice';
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { toggleArticleLike, isLikeButtonActive, favoriteCounter } = useToggleArticleLike(slug || '', favorited || false, favoritesCount || 0);

  const getFullArticle = (slugTitle: string): void => {
    dispatch(updateSlug(slugTitle));
    dispatch(updateArticleFavoriteStatus(isLikeButtonActive || false));
    dispatch(updateFavoritesCount(favoriteCounter || 0));

    return navigate(`/articles/${slugTitle}`);
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
            {title?.split(' ').slice(0, 13).join(' ')}
          </h3>
          <div className={articleStyles.likeBtn}>
            <Heart
              isActive={isLikeButtonActive}
              onClick={() =>toggleArticleLike()}
              animationScale={1.1}
            />
          </div>
          <span>{favoriteCounter}</span>
        </div>
        <div className={articleStyles.tags}>
          {tagList?.map((tag) => (
            <span className={articleStyles.tag} key={crypto.randomUUID()}>
              {tag.split(' ').slice(0, 17).join(' ')}
            </span>
          ))}
        </div>
        <p className={articleStyles.description}>
          {description?.split(' ').slice(0, 58).join(' ')}
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
