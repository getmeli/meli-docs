import React, { useRef, useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import classNames from 'classnames';
import {
  InstantSearch,
  Index,
  connectStateResults,
  connectHits,
} from 'react-instantsearch-dom';
import Input from './search-input';
import * as hitComps from './hit-comps';

import styles from './search.module.scss';
import SearchIconSvg from 'images/search.inline.svg';
import AlgoliaIcon from './svg/icon-algolia.inline.svg';
import ArrowIcon from './svg/arrow.inline.svg';

const Hits = connectHits(({ showAll, hitComponent: Comp, hits }) =>
  hits?.length
    ? hits
        .slice(0, showAll ? hits.length : 5)
        .map((hit, i) => <Comp key={`hit-${i}`} hit={hit} />)
    : null
);

let comp = null;

const Stats = connectStateResults(({ setResultsExist, searchResults }) => {
  useEffect(() => {
    if (searchResults && searchResults.nbHits > 0) {
      const { nbHits } = searchResults;
      setResultsExist(true);
      comp = (
        <span className={styles.stats}>
          {`${nbHits} result${nbHits > 1 ? 's' : ''}`}
        </span>
      );
    } else setResultsExist(false);
  }, [searchResults]);

  return comp;
});

const useClickOutside = (ref, handler, events) => {
  if (!events) events = ['mousedown', 'touchstart'];
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler();
  useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, detectClickOutside);
    }
    return () => {
      for (const event of events) {
        document.removeEventListener(event, detectClickOutside);
      }
    };
  });
};

const Search = ({ inputLabel, indices }) => {
  if (
    !process.env.GATSBY_ALGOLIA_APP_ID ||
    !process.env.GATSBY_ALGOLIA_SEARCH_ONLY_KEY
  ) {
    return null;
  }
  const rootRef = useRef(null);
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const [allResultsShown, setAllResultsShown] = useState(false);
  const [resultsExist, setResultsExist] = useState(false);

  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_ONLY_KEY
  );
  useClickOutside(rootRef, () => setFocus(false));

  return (
    <div className={classNames(styles.wrapper)} ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
        placeholder={'Search documentation...'}
        showReset
      >
        <SearchIconSvg className={styles.icon} />
        <Input
          className={styles.input}
          label={inputLabel}
          queryLength={query.length}
          onFocus={() => setFocus(true)}
        />
        <div
          className={classNames(styles.hitsWrapper, {
            [styles.hitsWrapper_show]: query.length > 0 && focus,
          })}
        >
          {indices.map(({ name, hitComp }) => (
            <Index key={name} indexName={name}>
              <header
                className={classNames({
                  [styles.noResults]: !resultsExist,
                })}
              >
                <h3 className={styles.indexHeading}>
                  {resultsExist ? 'Search results for' : 'No results for'}
                  <span className={styles.indexHeadingKeyword}> "{query}"</span>
                </h3>
                <Stats setResultsExist={setResultsExist} />
              </header>
              {resultsExist && (
                <Hits
                  showAll={allResultsShown}
                  hitComponent={hitComps[hitComp](() => setFocus(false))}
                />
              )}
            </Index>
          ))}
          <div className={styles.footerSearch}>
            {resultsExist && (
              <button
                type={'button'}
                onClick={() => setAllResultsShown(!allResultsShown)}
                className={classNames('link', styles.toggleResultsBtn, {
                  [styles.toggleResultsBtn_open]: allResultsShown,
                })}
              >
                Show {allResultsShown ? 'less' : 'more'} <ArrowIcon />
              </button>
            )}
            <span className={styles.searchBy}>
              Search by
              <a href={'https://algolia.com'} target={'_blank'}>
                <AlgoliaIcon />
              </a>
            </span>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default Search;
