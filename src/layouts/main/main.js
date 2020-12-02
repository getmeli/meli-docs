import React from 'react';
import PropTypes from 'prop-types';
import Footer from 'components/shared/footer';
import Sidebar from 'components/shared/sidebar';
import Seo from 'components/shared/seo';
import styles from './main.module.scss';
import Header from '../../components/shared/header';
import Favicon from '../../components/shared/seo/Favicon';

const Main = ({ children, pageMetadata, sidebar = false }) => (
  <>
    <Seo {...pageMetadata} />
    <Favicon/>
    <div className={styles.wrapper}>
      <main className={styles.inner}>
        <Header/>
        <div className="container is-fluid">
          <div className="columns">
            <div className={`column is-narrow ${styles.left}`}>
              {!!sidebar && (
                <Sidebar sidebar={sidebar} slug={pageMetadata.data.slug}/>
              )}
            </div>
            <div className={`column ${styles.right} py-6`}>
              <div className={styles.rightWrapper}>{children}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  </>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
