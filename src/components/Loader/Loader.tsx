import React from 'react';
import { SpinnerInfinity } from 'spinners-react';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.container}>
    <SpinnerInfinity
      size="120px"
      thickness={134}
      speed={159}
      color="rgba(24, 144, 255, 1)"
      secondaryColor="rgba(57, 121, 172, 1)"
      className={styles.loader}
    />
    </div>
  );
};

export default Loader;
