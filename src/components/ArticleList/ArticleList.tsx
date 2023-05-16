import React, { FC, useEffect, useMemo } from 'react';
import { Pagination } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetArticlesQuery } from '../../slices/getArticlesFromApi';
import Article from '../Article';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../store';
import { getTotalCountPages } from '../../slices/articleSlice';
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
  const navigate = useNavigate();

  const { page } = useParams();

  const totalCountPages = useAppSelector(
    (state) => state.article.totalCountPages,
  );

  useEffect(()=>{
    navigate(`/articles/page/${page || 1}`);
  }, [page]);

  const { data, error, status } = useGetArticlesQuery({
    limit: 5,
    offset: (Number(page) - 1 ) * 5 || 1,
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
      // dispatch the number of pages for pagination to the state (5 articles per page)
    }
  }, [dispatch, memoizedPageCount]);

  if (error) {
    if ('status' in error) {
      return <div>Error: {error.status}</div>;
    }
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {status === 'pending' && <Loader />}
      {data?.articles.map((article: IArticle) => (
        <Article key={article.slug} {...article}/>
      ))}
      <Pagination
        current={Number(page)}
        total={totalCountPages * 10 }
        size="default"
        style={{ textAlign: 'center', marginTop: 60, paddingBottom: 60 }}
        showSizeChanger={false}
        onChange={(currentPaginationPage:number) =>  navigate(`/articles/page/${currentPaginationPage}`)} // refresh domain with the page number
      />
    </div>
  );
};

export default ArticlesList;
