import React from 'react'
import { SearchModal } from './search-modal';
import { graphql, useStaticQuery } from 'gatsby';

const searchIndexQuery = graphql`
query localSearch {
  localSearchProdEn {
    index
    store
  }
}
`;

export function LocalSearch({ className }) {
  //const { localSearchProdEn: { index, store } } = useStaticQuery(searchIndexQuery);

  return (
    // <SearchModal
    //   index={index}
    //   store={store}
    //   className={className}
    // />
    <></>
  )
}
