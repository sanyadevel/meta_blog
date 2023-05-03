import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Popconfirm } from 'antd';
import Heart from 'react-heart';
import './popupAntdStyles.css';

import { useFullArticleQuery } from '../../slices/fullArticlePage';
import { useAppSelector } from '../../store';
import articleStyles from '../Article/Article.module.scss';
import { formatDate } from '../../logics/date/formateDate';
import Loader from '../Loader';

import styles from './FullArticle.module.scss';

const FullArticle: FC = () => {
  const slug = useAppSelector((state) => state.article.slug) || '';
  const { data, error, isLoading } = useFullArticleQuery({ slug });
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isPopupLoading, setIsPopupLoading] = useState<boolean>(false);
  const isUserLoggedIn = useAppSelector(
    (state) => state.userInfo.isUserLoggedIn,
  );

  const showPopconfirm = (): void => {
    setIsOpenPopup(true);
  };

  const handleOk = (): void => {
    setIsPopupLoading(true);

    setTimeout((): void => {
      setIsOpenPopup(false);
      setIsPopupLoading(false);
    }, 2000);
  };

  const handleCancel = (): void => {
    console.log('Clicked cancel button'); //потом потребуется для удаления
    setIsOpenPopup(false);
  };

  useEffect(() => {
    console.log(data, 'data');
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <div className={styles.container}>
            <header>
              <div>
                <div className={styles.headerFirstPart}>
                  <h4 className={styles.title}>{data?.article?.title}</h4>
                  <div className={articleStyles.likeBtn}>
                    <Heart
                      animationScale={1.1}
                      onClick={() => null}
                      isActive={false}
                    />
                  </div>
                  <span>12</span>
                </div>
                {data?.article?.tagList.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
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
                  src={data?.article?.author.image}
                  className={styles.userAvatar}
                />
              </div>
            </header>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>{data?.article?.description}</p>
              {isUserLoggedIn ? (
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
                  <button className={styles.editButton}>Edit</button>
                </div>
              ) : (
                ''
              )}
            </div>
            <main className={styles.mainBody}>
              <ReactMarkdown>{data?.article?.body || ''}</ReactMarkdown>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default FullArticle;
