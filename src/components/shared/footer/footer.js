import React from 'react';
import * as styles from './footer.module.scss';
import { GITHUB_URL, TWITTER_URL } from '../../../constants';

const Footer = props => (
  <footer className={styles.wrapper}>
    <div className="container is-fluid">
      <div className={styles.copyright}>
        <div className={styles.company}>
          Crafted by{' '}
          <a
            href="https://charlie-bravo.be"
            className={`link ${styles.link}`}
            target="_blank"
          >
            Charlie Bravo
          </a>
        </div>
        <div className={styles.copyright}>
          <a
            href={TWITTER_URL}
            className={`link ${styles.link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href={GITHUB_URL}
            className={`link ${styles.link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
