import React from 'react';
import { compose, slugify } from 'utils';
import AnchorIcon from 'images/anchor.inline.svg';
import styles from './heading-mark.module.scss';

// takes a slug of kind `/slug/to-some-resources`
// and applies a number of rules to ensure it is valid
// e.g. removing digits from the beginning
// idify(slug: String!) -> String
const idify = slug =>
  slug
    .replace(/\//g, '-') // replaces all slashes with dashes
    .replace(/^\d+/g, '') // remove all digits form the beginning of the string
    .replace(/^-*/g, '') // remove all dashes from the end
    .replace(/-*$/g, ''); // remove all dashes from the beginning

const HeadingMark = ({ content }) => (
  <h2 className={styles.wrapper} id={`${compose(idify, slugify)(content)}`}>
    <a href={`#${compose(idify, slugify)(content)}`}>
      <AnchorIcon />
    </a>
    {content}
  </h2>
);

export default HeadingMark;
