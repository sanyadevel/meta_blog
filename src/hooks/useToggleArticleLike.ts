import { useEffect, useState } from 'react';

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
  const [favoriteLikesCount, setFavoriteLikesCount] = useState<number>(favoritesCount);

  useEffect(() => {
    setIsLikeButtonActive(isFavorited);
  }, [isFavorited]);

  useEffect(() => {
    setFavoriteLikesCount(favoritesCount);
  }, [favoritesCount]);


  const [likeArticleMutation] = useLikeArticleMutation();
  const [dislikeArticleMutation] = useDislikeArticleMutation();

  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );

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
        setFavoriteLikesCount((prev) => prev + 1);
        await likeArticleMutation(slug).unwrap();

      } else {
        setFavoriteLikesCount((prev) => prev - 1);
        await dislikeArticleMutation(slug).unwrap();

      }

    } catch (e) {
      callNotification('Something went wrong, please try later', 'error');
    }
  };

  return { toggleArticleLike, isLikeButtonActive, favoriteLikesCount };
};

export default useToggleArticleLike;
