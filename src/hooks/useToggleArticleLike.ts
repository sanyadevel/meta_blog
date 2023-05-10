import { useState } from 'react';

import { useLikeArticleMutation } from '../slices/likeAnArticle';
import { useDislikeArticleMutation } from '../slices/dislikeAnArticle';
import { callNotification } from '../logics/errors/callLoginErrors';
import { useAppSelector } from '../store';

const useToggleArticleLike = (
  slug: string,
  isFavorited: boolean,
  favoritesCount: number,
) => {
  const [isLikeButtonActive, setIsLikeButtonActive] = useState<boolean>(isFavorited);
  const [favoriteCounter, setFavoriteCounter] = useState<number>(favoritesCount);

  const [likeArticleMutation] = useLikeArticleMutation();
  const [dislikeArticleMutation] = useDislikeArticleMutation();

  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );

  let toggleLikedArticleResponse;
  const toggleArticleLike = async () => {
    if (!isUserLoggedIn) {
      callNotification(
        'You are not logged in to like this article, please sign in and try later',
        'error',
      );
      return null;
    } else {
      setIsLikeButtonActive(!isLikeButtonActive);
    }

    try {
      if (!isLikeButtonActive) {
        setFavoriteCounter((prev) => prev + 1);
        toggleLikedArticleResponse =  await likeArticleMutation(slug).unwrap();

      } else {
        setFavoriteCounter((prev) => prev - 1);
        toggleLikedArticleResponse = await dislikeArticleMutation(slug).unwrap();

      }
      console.log(toggleLikedArticleResponse);
    } catch (e) {
      callNotification('Something went wrong, please try later', 'error');
    }
  };

  return { toggleArticleLike, isLikeButtonActive, favoriteCounter };
};

export default useToggleArticleLike;
