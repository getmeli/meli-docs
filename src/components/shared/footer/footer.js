import React from 'react';
import styles from './footer.module.scss';

const Footer = props => (
  <footer className={styles.wrapper}>
    <div className="container is-fluid">
      <div className={styles.copyright}>
        <div className={styles.company}>
          Crafted by{' '}
          <a
            href="https://charlie-bravo.be"
            className={`link ${styles.companyLink}`}
            target="_blank"
          >
            Charlie Bravo
          </a>
        </div>
        <div className={styles.footerCopyrightText}>
          Open Sourced on{' '}
          <a
            href="https://github.com/metroline/metroline"
            className={`link ${styles.companyLink}`}
            target="_blank"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
