import React, { FC, useState } from 'react';
import Heart from 'react-heart';
import { useNavigate } from 'react-router-dom';

import { IArticle } from '../ArticleList/ArticleList';
import { formatDate } from '../../logics/date/formateDate';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateSlug } from '../../slices/articleSlice';
import { useLikeArticleMutation } from '../../slices/likeAnArticle';
import { useDislikeArticleMutation } from '../../slices/dislikeAnArticle';

import articleStyles from './Article.module.scss';

const Article: FC<IArticle> = ({
  title,
  tagList,
  description,
  author,
  createdAt,
  slug,
  favoritesCount,
}) => {
  const [isLikeButtonActive, setIsLikeButtonActive] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );
  const [
    likeArticleMutation,
    { isLoading: isLikeLoading, isError: isLikeError, error: likeError },
  ] = useLikeArticleMutation();
  const [
    dislikeArticleMutation,
    {
      isLoading: isDislikeLoading,
      isError: isDislikeError,
      error: dislikeError,
    },
  ] = useDislikeArticleMutation();

  const getSlugFromTitle = (slugTitle: string): void => {
    dispatch(updateSlug(slugTitle));
    return navigate(`/articles/${slugTitle}`);
  };

  const toggleArticleLike = async () => {
    setIsLikeButtonActive((prev) => !prev);
    try {
      if (isLikeButtonActive) {
        const unlikeArticleResponse = await dislikeArticleMutation(slug).unwrap();
        console.log(unlikeArticleResponse, 'unlikeArticleResponse');
      } else {
        const likeArticleResponse = await likeArticleMutation(slug).unwrap();
        console.log(likeArticleResponse, 'likeArticleResponse');
      }
    } catch (e) {}
  };

  return (
    <div className={articleStyles.container}>
      <main className={articleStyles.main}>
        <div className={articleStyles.header}>
          <h3
            className={articleStyles.title}
            onClick={() => getSlugFromTitle(slug || '')}
          >
            {title?.split(' ').slice(0, 13).join(' ')}
          </h3>
          <div className={articleStyles.likeBtn}>
            <Heart
              isActive={isLikeButtonActive}
              onClick={() => (isUserLoggedIn ? toggleArticleLike() : null)}
              animationScale={1.1}
            />
          </div>
          <span>{favoritesCount}</span>
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
