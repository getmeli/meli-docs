import React from 'react';
import styles from './page-content-table.module.scss';
import { useLandmark } from 'hooks';

const PageContentTable = () => {
  const links = useLandmark();
  return (
    <ul className={styles.wrapper}>
      {links.map(({ path, title }, i) => (
        <li key={`lr-${i}`}>
          <a href={`#${path}`} className={styles.link}>
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default PageContentTable;
