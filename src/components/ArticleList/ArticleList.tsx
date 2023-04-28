import React, { FC, useEffect, useMemo } from 'react';
import { Pagination } from 'antd';

import { useGetArticlesQuery } from '../../logics/rtkQueryLogics/getArticlesFromApi';
import Article from '../Article';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../store';
import { changeArticlePage, getTotalCountPages } from '../../slices/articleSlice';
import Loader from '../Loader';

export interface IArticle {
  slug?: string;
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  favoritesCount?: number;
  author?: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

const ArticlesList: FC<IArticle> = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const totalCountPages = useAppSelector(state=>state.article.totalCountPages);

  const currentPage: number | undefined = useAppSelector(
    (state) => state.article.currentPage,
  ); // get current page from store

  const { data, error, isLoading } = useGetArticlesQuery({
    limit: 5,
    page: currentPage,
  });

  const memoizedPageCount = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return data?.articlesCount;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }, [data?.articlesCount]);

  useEffect(() => {
    if (memoizedPageCount !== undefined) {
      dispatch(getTotalCountPages(memoizedPageCount));
    }
  }, [dispatch, memoizedPageCount]);


  if (isLoading) return <Loader />;
  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      {data?.articles.map((article: IArticle) => (
        <Article key={article.slug} {...article} />
      ))}
      <Pagination
        defaultCurrent={1}
        total={totalCountPages * 10}
        size="default"
        style={{ textAlign: 'center', marginTop: 60, paddingBottom: 80 }}
        showSizeChanger={false}
        onChange={(page: number) => dispatch(changeArticlePage(page))} // поднимаем в стейт номер страницы
      />
    </div>
  );
};

export default ArticlesList;

