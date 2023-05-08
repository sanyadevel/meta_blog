import React, { FC, useState } from 'react';
import Heart from 'react-heart';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { IArticle } from '../ArticleList/ArticleList';
import { formatDate } from '../../logics/date/formateDate';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateSlug } from '../../slices/articleSlice';
import { useLikeArticleMutation } from '../../slices/likeAnArticle';
import { useDislikeArticleMutation } from '../../slices/dislikeAnArticle';
import { callNotification } from '../../logics/errors/callLoginErrors';

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

    if (!isUserLoggedIn) {
      callNotification(
        'You are not logged in to like this article, please sign in and try later',
        'error',
      );
      return null;
    } else {
      setIsLikeButtonActive((prev) => !prev);
    }

    try {
      if (isLikeButtonActive) {
        await dislikeArticleMutation(
          slug,
        ).unwrap();

      } else {
        await likeArticleMutation(slug).unwrap();
      }
    } catch (e) {
      callNotification('Something went wrong, please try later', 'error');
    }
  };

  return (
    <div className={articleStyles.container}>
      <ToastContainer />
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
              onClick={() => toggleArticleLike()}
              animationScale={1.1}
            />
          </div>
          <span>{favoritesCount}</span>
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
