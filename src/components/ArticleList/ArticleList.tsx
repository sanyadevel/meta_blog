import React, { FC, useEffect, useMemo } from 'react';
import { Pagination } from 'antd';

import { useGetArticlesQuery } from '../../slices/getArticlesFromApi';
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

  const totalCountPages = useAppSelector(
    (state) => state.article.totalCountPages,
  );

  const currentPage: number | undefined = useAppSelector(
    (state) => state.article.currentPage,
  ); // get current page from store


  const { data, error, isLoading } = useGetArticlesQuery({
    limit: 5,
    offset: currentPage,
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
      dispatch(getTotalCountPages(Math.ceil(memoizedPageCount / 5 )));
      // поднимаем в стейт количество страниц для пагинации (по 5 статей на страницу)
    }
  }, [dispatch, memoizedPageCount]);

  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      {isLoading && <Loader />}
      {data?.articles.map((article: IArticle) => (
        <Article key={article.slug} {...article}/>
      ))}
      <Pagination
        defaultCurrent={1}
        total={totalCountPages * 10 }
        size="default"
        style={{ textAlign: 'center', marginTop: 60, paddingBottom: 60 }}
        showSizeChanger={false}
        onChange={(page: number) => dispatch(changeArticlePage((page - 1 ) * 5 ))} // поднимаем в стейт номер страниц
      />
    </div>
  );
};

export default ArticlesList;
