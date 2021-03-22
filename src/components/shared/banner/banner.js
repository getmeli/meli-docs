import React from 'react';
import * as styles from './banner.module.scss';

export default function Banner({articleSrc, buttonText = 'Edit on Github'}) {
  return (
    <div className={styles.wrapper}>
      <a
        className={`link`}
        href={articleSrc}
        target="_blank"
        rel="noreferrer noopener"
      >
        {buttonText}
      </a>
    </div>
  );
}
