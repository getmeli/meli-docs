import React, { useEffect, useRef, useState } from 'react';
import Media from 'react-media';
import classNames from 'classnames/bind';
import * as styles from './sidebar.module.scss';
import { Link, navigate, withPrefix } from 'gatsby';
import _startCase from 'lodash/startCase';

const cx = classNames.bind(styles);

function withoutEndSlash(str) {
  return str.replace(/\/$/, '');
}

const doesPathnameMatch = path => {
  const maybePrefixedPath = withPrefix(path);
  return withoutEndSlash(maybePrefixedPath) === withoutEndSlash(window.location.pathname);
};

// renders sidebar nodes from passed children prop, recursively
const SidebarNode = ({
  node: {
    meta: {
      path,
      title,
      sidebarTitle,
    },
    name,
  },
}) => {
  const [isActive, setIsActive] = useState(false);
  const isLink = !!path;

  useEffect(() => {
    setIsActive(doesPathnameMatch(path));
  }, [path]);

  return (
    <>
      {isLink ? (
        <Link
          to={path}
          className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
        >
          {sidebarTitle || title || _startCase(name)}
        </Link>
      ) : (
        <span className={styles.title}>{title || name}</span>
      )}
    </>
  );
};

// renders options from the passed children array, recursively
const OptionsGroup = ({
  node: {
    meta: { path, title },
    name,
  },
}) => {
  return (
    <option label={title || name} value={path}>
      {title || name}
    </option>
  );
};

const Sidebar = ({ sidebar, slug }) => {
  const selectMenu = useRef();
  const [selectedPath, setSelectedPath] = useState(slug);

  const navigateMobile = () => {
    setSelectedPath(selectMenu.current.value);
    navigate(selectMenu.current.value).catch(console.error);
  };

  return (
    <div className={styles.wrapper}>
      <Media
        query="(min-width: 767.98px)"
        render={() => (
          <nav className={styles.nav}>
            {Object
              .values(sidebar)
              .filter(({ meta: {isHomePage} }) => !isHomePage)
              .map(
                ({ meta: { sidebarTitle, title, path }, name, children }, i) => (
                  <div
                    key={name}
                    className={cx('section', {
                      'section-main': i === 0,
                    })}
                  >
                    <a
                      className={cx(styles.title, {
                        [styles.linkActive]: selectedPath === path,
                      })}
                      href={path}
                    >
                      {sidebarTitle || title || name}
                    </a>
                    <div
                      className={cx('dropdown', {
                        [styles.dropdownActive]: true,
                      })}
                    >
                      {Object.values(children).map(node => (
                        <SidebarNode node={node} key={node.name}/>
                      ))}
                    </div>
                  </div>
                ),
              )}
          </nav>
        )}
      />

      <Media
        query="(max-width: 767.98px)"
        render={() => (
          <div className={styles.selectWrapper}>
            <select
              ref={selectMenu}
              onChange={() => navigateMobile()}
              className={styles.select}
              value={selectedPath}
            >
              {Object.values(sidebar).map(
                ({ meta: { sidebarTitle, title }, name, children }, i) => {
                  return (
                    <optgroup label={sidebarTitle || title || name} key={name}>
                      {Object.values(children).map(node => (
                        <OptionsGroup node={node} key={node.name}/>
                      ))}
                    </optgroup>
                  );
                },
              )}
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default Sidebar;
