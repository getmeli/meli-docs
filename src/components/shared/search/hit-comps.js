import React from 'react';
import {Highlight, Snippet} from 'react-instantsearch-dom';
import {Link} from 'gatsby';
import styles from './search.module.scss';

export const docPageHit = clickHandler => ({hit}) => (
  <Link to={`${hit.slug}`} onClick={clickHandler} className={styles.hitEntry}>
    <h4 className={styles.hitHeading}>
      <Highlight attribute={'title'} hit={hit} tagName={'mark'}/>
    </h4>

    <Snippet
      attribute={'content'}
      hit={hit}
      tagName={'mark'}
      className={styles.excerpt}
    />
  </Link>
);
