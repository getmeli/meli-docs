import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SearchBar } from './search-bar';

const searchIndexQuery = `
query localSearch {
  localSearchProdEn {
    index
    store
  }
}
`;

export function LocalSearch({ className }) {
  const [indexAndStore, setIndexAndStore] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .post('/__graphql', {
        query: searchIndexQuery,
      })
      .then(({ data }) => {
        setIndexAndStore(data.data?.localSearchProdEn);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <></>
  ) : error ? (
    <></>
  ) : (
    <SearchBar
      index={indexAndStore.index}
      store={indexAndStore.store}
      className={className}
    />
  );
}
