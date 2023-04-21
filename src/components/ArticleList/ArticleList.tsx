import React, { FC } from 'react';
import { SpinnerInfinity } from 'spinners-react';
import { Pagination } from 'antd';

import { useGetArticlesQuery } from '../../slices/apiSlice';
import Article from '../Article';

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

const ArticlesList:FC<IArticle> = () => {
  const { data, error, isLoading } = useGetArticlesQuery({
    limit: 10,
    offset: 0,
  });

  if (isLoading)
    return (
      <SpinnerInfinity
        size="120px"
        thickness={134}
        speed={159}
        color="rgba(24, 144, 255, 1)"
        secondaryColor="rgba(57, 121, 172, 1)"
        style={{ display: 'block', margin: '50px auto 0 auto' }}
      />
    );
  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.articles.map((article: IArticle) => (
        <Article key={article.slug} {...article}/>
      ))}
      <Pagination
        defaultCurrent={1}
        total={50}
        size="default"
        style={{ textAlign: 'center', marginTop: 40, paddingBottom: 40 }}
      />
    </div>
  );
};

export default ArticlesList;
