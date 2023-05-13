import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Popconfirm } from 'antd';
import Heart from 'react-heart';
import './popupAntdStyles.css';
import { ToastContainer } from 'react-toastify';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

import { useFullArticleQuery } from '../../slices/fullArticlePage';
import { useAppDispatch, useAppSelector } from '../../store';
import { formatDate } from '../../logics/date/formateDate';
import { useDeleteArticleMutation } from '../../slices/deleteArticle';
import { callNotification } from '../../logics/errors/callLoginErrors';
import articleStyles from '../Article/Article.module.scss';
import useToggleArticleLike from '../../hooks/useToggleArticleLike';
import {
  updateArticle,
  updateArticleEditStatus,
  updateArticleFavoriteStatus,
  updateFavoritesCount,
} from '../../slices/articleSlice';
import Loader from '../Loader';

import styles from './FullArticle.module.scss';

const FullArticle: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const { slug } = useParams();

  const { data } = useFullArticleQuery({ slug });

  useEffect(()=>{

    dispatch(updateArticleFavoriteStatus(data?.article?.favorited || false));
    dispatch(updateFavoritesCount(data?.article?.favoritesCount || 0));

  }, [data]);


  const favoritesCount = useAppSelector(
    (state) => state.article.favoritesCount,
  );
  const isFavoritedArticle = useAppSelector(
    (state) => state.article.isFavoritedArticle,
  );


  useEffect(() => {
    navigate(`/articles/${slug}`);
    document.title = `Article ${slug}`;
  }, []);

  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isPopupLoading, setIsPopupLoading] = useState<boolean>(false);

  const userInfo = useAppSelector((state) => state.userInfo.userDatas);

  const { toggleArticleLike, isLikeButtonActive, favoriteLikesCount } =
    useToggleArticleLike(slug || '', isFavoritedArticle || false, favoritesCount || 0);


  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );
  const currentArticle = useAppSelector((state) => state.article.articleProp);

  const [deleteArticle] = useDeleteArticleMutation();

  const handleDelete = async () => {
    try {
      await deleteArticle(slug || '').unwrap();

      callNotification('Article was deleted', 'success');

      setTimeout(() => {
        navigate('/user');
      }, 2500);
    } catch (err: any) {
      if (err?.originalStatus === 403) {
        callNotification('Please refresh the page or try later', 'error');

        setTimeout(() => {
          navigate('/user');
        }, 2500);
      }
    }
  };

  const showPopconfirm = (): void => {
    setIsOpenPopup(true);
  };

  const handleOk = (): void => {
    setIsPopupLoading(true);

    setTimeout((): void => {
      setIsOpenPopup(false);

      handleDelete();

      setIsPopupLoading(false);
    }, 2000);
  };

  const handleCancel = (): void => {
    setIsOpenPopup(false);
  };

  const editArticle = () => {
    navigate(`/articles/${slug}/edit`);

    dispatch(updateArticleEditStatus(true));
    dispatch(
      updateArticle({
        ...currentArticle,
        articleTitle: data?.article?.title || '',
        articleDescription: data?.article?.description || '',
        articleText: data?.article?.body || '',
        articleTags: data?.article?.tagList || [''],
      }),
    );
  };

  return (
    <>
      {data === undefined ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <div className={styles.container}>
            <ToastContainer />
            <header>
              <div>
                <div className={styles.headerFirstPart}>
                  <h4 className={styles.title}>{data?.article?.title}</h4>
                  <div className={articleStyles.likeBtn}>
                    <Heart
                      animationScale={1.1}
                      onClick={() => toggleArticleLike()}
                      isActive={isLikeButtonActive}
                    />
                  </div>
                  <span>{favoriteLikesCount}</span>
                </div>
                {data?.article?.tagList.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag.split(' ').slice(0, 17).join(' ')}
                  </span>
                ))}
              </div>
              <div className={styles.user}>
                <div>
                  <h5 className={styles.userName}>
                    {data?.article?.author.username}
                  </h5>
                  <span className={styles.date}>
                    {formatDate(data?.article?.createdAt)}
                  </span>
                </div>

                <img
                  src={data?.article.author.image}
                  className={styles.userAvatar}
                  alt="Avatar"
                />
              </div>
            </header>

            <div className={styles.descriptionContainer}>
              <p className={styles.description}>{data?.article?.description}</p>
              {isUserLoggedIn &&
              userInfo?.username === data?.article?.author?.username ? (
                <div className={styles.articleEditButtons}>
                  <Popconfirm
                    title="Are you sure to delete this article?"
                    open={isOpenPopup}
                    onConfirm={handleOk}
                    okButtonProps={{ loading: isPopupLoading }}
                    onCancel={handleCancel}
                    className="ant-popover-content"
                  >
                    <button
                      className={styles.deleteButton}
                      onClick={showPopconfirm}
                    >
                      Delete
                    </button>
                  </Popconfirm>
                  <button className={styles.editButton} onClick={editArticle}>
                    Edit
                  </button>
                </div>
                ) : (
                  ''
                )}
            </div>
            <main className={styles.markdownContainer}>
              <ReactMarkdown>{data?.article?.body || ''}</ReactMarkdown>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default FullArticle;
