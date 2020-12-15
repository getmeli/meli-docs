/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require('./src/styles/app.scss');

import React from "react"
import { blurElId } from './src/components/shared/local-search/search-modal';

export const wrapRootElement = ({ element }) => {
  return <div id={blurElId}>
    {element}
  </div>;
}
