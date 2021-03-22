import { useForm } from 'react-hook-form';
import { useFlexSearch } from 'react-use-flexsearch';
import React, { useEffect, useState } from 'react';
import * as styles from './search.module.scss';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import classNames from 'classnames';
import { Link } from 'gatsby';

export const blurElId = '___gatsby';

function blurBackground() {
  const el = document.getElementById(blurElId);
  if (el) {
    el.setAttribute('data-blur', 'true');
  }
}

function unblurBackground() {
  const el = document.getElementById(blurElId);
  if (el) {
    el.removeAttribute('data-blur');
  }
}

function highlight(content, query) {
  if (!query) {
    return content;
  }
  const sanitizedKeyword = (query || '').replace(/\W/g, '');
  const patternWithOffset = new RegExp(`.{0,40}(${sanitizedKeyword}).{0,40}`, 'gi');
  const matches = content.match(patternWithOffset);
  if (!matches) {
    return content;
  }
  const queryRegex = new RegExp(sanitizedKeyword, 'gi');
  return matches
    .map(str => str.replace(queryRegex, match => (
      `<strong class="highlight">${match}</strong>`
    )))
    .join(' ... ');
}

export function SearchModal({ className, index, store }) {
  const { register, watch, handleSubmit } = useForm({ mode: 'onChange' });
  const [isOpen, setIsOpen] = useState(false);
  const query = watch('query');

  const results = useFlexSearch(query, index, store);

  useEffect(() => {
    if (isOpen) {
      blurBackground();
    } else {
      unblurBackground();
    }
  }, [isOpen]);

  const setRef = el => {
    if (el) {
      el.focus();
    }
    register()(el);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <FontAwesomeIcon
        icon={faSearch}
        onClick={() => setIsOpen(true)}
        className={classNames(styles.icon, className)}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={classNames(styles.modal)}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <div className="container">
          <div className={styles.close}>
            <div>
              Press <strong className={styles.shortcut}>ESC</strong> to close
              <FontAwesomeIcon
                icon={faTimes}
                className={classNames(styles.icon, styles.closeIcon)}
                onClick={closeModal}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit(() => undefined)}>
            <div className="form-group">
              <input
                type="text"
                name="query"
                className={styles.searchInput}
                placeholder="Search"
                ref={setRef}
                autoComplete="off"
              />
            </div>
          </form>
          <div>
            {results.length === 0 ? (
              query ? (
                <div className={classNames(styles.hitEntry, styles.noHover)}>
                  No results for <strong>{query}</strong>
                </div>
              ) : (
                <div className={classNames(styles.hitEntry, styles.noHover)}>
                  Type to search
                </div>
              )
            ) : (
              results.map(result => (
                <Link to={result.path} key={result.id} className={styles.hitEntry} onClick={closeModal}>
                  <div className={styles.entryTitle}>
                    <strong>{result.title}</strong>
                  </div>
                  <div
                    className={styles.entryBody}
                    dangerouslySetInnerHTML={{ __html: highlight(result.body, query) }}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
