import React from 'react';

import * as styles from './links-block.module.scss';

const LinksBlock = ({ mdBlockContent }) => {
  const linksInner = mdBlockContent.replace(/<\/?p>/g, '');
  const links = linksInner.replace(/<a/g, `<a class="${styles.link}"`);

  return (
    <div
      className={styles.wrapper}
      dangerouslySetInnerHTML={{
        __html: links,
      }}
    />
  );
};

export default LinksBlock;
