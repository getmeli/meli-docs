import React, {useEffect} from 'react';
import {AnimatePresence, motion, useCycle} from 'framer-motion';
import cl from 'classnames';
import styles from './header-mobile.module.scss';
import {MOTION_EASE} from 'constants/animation-variables';

const backgroundAnimation = {
  open: {
    clipPath: `circle(1230px at 40px 40px)`,
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: 'circle(0px at 0px 0px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const menuAnimation = {
  open: custom => ({
    opacity: 1,
    transition: {
      delay: custom,
      duration: 0.7,
      ease: MOTION_EASE,
    },
  }),
  closed: {
    opacity: 0,
    transition: {
      delay: 0,
      duration: 0.7,
      ease: MOTION_EASE,
    },
  },
};

const HeaderMobile = props => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const body = document.body;

  useEffect(() => {
    if (isOpen) {
      body.classList.add(styles.activeMenu);
    } else {
      body.classList.remove(styles.activeMenu);
    }
  }, [isOpen]);

  return (
    <>
      <button
        className={cl(styles.button, {
          [styles.buttonActive]: isOpen,
        })}
        onClick={() => toggleOpen()}
      >
        <span className={`${styles.buttonItem} ${styles.buttonItemTop}`}></span>
        <span
          className={`${styles.buttonItem} ${styles.buttonItemMiddle}`}
        ></span>
        <span
          className={`${styles.buttonItem} ${styles.buttonItemBottom}`}
        ></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className={styles.wrapper}>
            <motion.nav
              className={styles.nav}
              initial={'closed'}
              animate={'open'}
              exit="closed"
            >
              <motion.div
                className={styles.background}
                variants={backgroundAnimation}
              />
              <motion.div
                className={styles.navPanel}
                variants={menuAnimation}
                custom={1.5}
              />
              <motion.div
                variants={menuAnimation}
                className={styles.navWrapper}
                custom={1}
              >
                <a
                  href="https://github.com/metroline/metroline"
                  className={`link ${styles.link}`}
                >
                  Github
                </a>
                <a
                  href="https://twitter.com/metrolineio"
                  className={`link ${styles.link} ${styles.linkActive}`}
                >
                  Twitter
                </a>
              </motion.div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMobile;
