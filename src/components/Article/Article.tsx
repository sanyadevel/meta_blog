import React, { FC, useState } from 'react';
import Heart from 'react-heart';

import articleStyles from './Article.module.scss';

const Article: FC = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={articleStyles.container}>
      <main>
        <div className={articleStyles.header}>
          <h3 className={articleStyles.title}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum,
            rerum.
          </h3>
          <div className={articleStyles.likeBtn}>
            <Heart
              isActive={active}
              onClick={() => setActive(!active)}
              animationScale={1.1}
            />
          </div>
          <span>12</span>
        </div>
        <div className={articleStyles.tags}>
          {['Tag1', 'Tag2'].map((tag, idx) => (
            <span className={articleStyles.tag} key={idx}>
              {tag}
            </span>
          ))}
        </div>
        <p className={articleStyles.description}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aliquam
          deleniti facere, hic minus molestias nulla perferendis porro praesentium
          quidem sint vitae? A delectus eius neque nihil officia voluptatum.</p>
      </main>
      <legend className={articleStyles.legend}>
        <div className={articleStyles.personInfo}>
        <span className={articleStyles.personName}>John Doe</span>
        <span className={articleStyles.birthDate}>March 5, 2020 </span>
        </div>
        <img src="/" alt="avatar"  className={articleStyles.personAvatar}/>
      </legend>
    </div>
  );
};

export default Article;
