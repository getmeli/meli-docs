import { useForm } from 'react-hook-form';
import { useFlexSearch } from 'react-use-flexsearch';
import React, { useEffect, useState } from 'react';
import styles from './search.module.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import classNames from 'classnames';
import { Link } from 'gatsby';

export const blurElId = 'blur-overlay';

function blurBackground() {
  document.getElementById(blurElId).setAttribute('data-blur', 'true');
}

function unblurBackground() {
  document.getElementById(blurElId).removeAttribute('data-blur');
}

export function SearchBar({ className, index, store }) {
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

  return (
    <>
      <FontAwesomeIcon
        icon={faSearch}
        onClick={() => setIsOpen(true)}
        className={classNames(styles.icon, className)}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={classNames(styles.modal)}
        overlayClassName={styles.overlay}
      >
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
              <div className={styles.hitEntry}>
                No results for <strong>{query}</strong>
              </div>
            ) : (
              <div className={styles.hitEntry}>
                Type to search
              </div>
            )
          ) : (
            results.map(result => (
              <Link to={result.path} key={result.id} className={styles.hitEntry} onClick={() => setIsOpen(false)}>
                {result.title}
              </Link>
            ))
          )}
        </div>
      </Modal>
    </>
  )
}
