import React from 'react';
import { Link } from 'gatsby';
import styles from './section-content-table.module.scss';

const SectionContentTable = ({ sectionLinks }) => {
  return (
    <div className={styles.wrapper}>
      <h2>Table of Content</h2>
      <ul>
        {sectionLinks.map(({ path, title }, i) => (
          <li key={`lr-${i}`}>
            <Link to={path} className={styles.link}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionContentTable;
