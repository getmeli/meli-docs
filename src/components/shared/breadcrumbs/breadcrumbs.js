import React from 'react';
import cn from 'classnames';
import { Link } from 'gatsby';
import styles from './breadcrumbs.module.scss';

const Breadcrumbs = ({ breadcrumbs }) =>
  breadcrumbs.length ? (
    <div className={styles.wrapper}>
      {breadcrumbs.map(({ path, name }, i) =>
        i !== breadcrumbs.length - 1 ? (
          <Link key={path} to={path} className={styles.link}>
            {name}
          </Link>
        ) : (
          <span key={path} className={cn(styles.link, styles.linkActive)}>
            {name}
          </span>
        )
      )}
    </div>
  ) : null;

export default Breadcrumbs;
