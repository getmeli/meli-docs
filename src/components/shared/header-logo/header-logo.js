import React from 'react';
import styles from './header-logo.module.scss';

export default function HeaderLogo() {
  return (
    <div className={styles.headerLogo}>
      <a className={styles.headerLogoLink} href="/">
        <img src="https://raw.githubusercontent.com/getmeli/meli-brand/latest/logo/meli-logo-circle-black.svg" alt="meli-logo"/>
      </a>
    </div>
  )
}
