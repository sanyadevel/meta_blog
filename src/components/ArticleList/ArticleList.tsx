import React, { FC } from 'react';
import { SpinnerInfinity } from 'spinners-react';

import { useGetArticlesQuery } from '../../slices/apiSlice';
import Article from '../Article';

const ArticlesList:FC = () => {
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
      />
    );
  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.articles.map((article) => (
        <Article key={article.slug} />
      ))}
    </div>
  );
};

export default ArticlesList;
