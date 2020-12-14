import React, { useState } from 'react';
import Media from 'react-media';
import HeaderMobile from 'components/shared/header-mobile';
import styles from './header.module.scss';
import HeaderLogo from '../header-logo';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GithubStars } from './github-stars/github-stars';
import { GITHUB_URL, TWITTER_URL } from '../../../constants';
import { LocalSearch } from '../local-search/local-search';

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
          <div className={styles.right}>
            <LocalSearch className={styles.search}/>
            {isMobileOrTablet ? (
              <HeaderMobile/>
            ) : (
              <>
                <div className={styles.headerMenu}>
                  <a
                    href={TWITTER_URL}
                    target="_blank"
                    rel="noopener noreferer"
                  >
                    <div className={styles.iconLink}>
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className={styles.icon}
                        fixedWidth
                      />
                    </div>
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferer"
                    className={styles.linkWithIcon}
                  >
                    <div className={styles.iconLink}>
                      <FontAwesomeIcon
                        icon={faGithub}
                        className={styles.icon}
                        fixedWidth
                      />
                    </div>
                    <GithubStars className={styles.stars}/>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
