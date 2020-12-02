import React, { useState } from 'react';
import Media from 'react-media';
import HeaderMobile from 'components/shared/header-mobile';
import GithubLogo from 'images/github.svg';
import TwitterLogo from 'images/twitter.svg';
import styles from './header.module.scss';
import HeaderLogo from '../header-logo';

export default function Header() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  return (
    <header className={styles.wrapper}>
      <div className={`container is-fluid ${styles.container}`}>
        <div className={styles.inner}>
          <HeaderLogo/>
          <Media
            query="(max-width: 767.98px)"
            onChange={matches =>
              matches ? setIsMobileOrTablet(true) : setIsMobileOrTablet(false)
            }
          />
          {isMobileOrTablet ? (
            <HeaderMobile/>
          ) : (
            <>
              <div className={styles.headerMenu}>
                <a
                  href="https://github.com/metroline/metroline"
                  target="_blank"
                  rel="noopener noreferer"
                  className={styles.link}
                >
                  <img src={GithubLogo} alt="Github"/>
                </a>
                <a
                  href="https://twitter.com/metrolineio"
                  target="_blank"
                  rel="noopener noreferer"
                  className={styles.link}
                >
                  <img src={TwitterLogo} alt="Twitter"/>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
