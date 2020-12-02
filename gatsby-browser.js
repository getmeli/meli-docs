/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */


require('./src/styles/app.scss');

import React from "react"
import { Ackee } from './src/hooks/use-analytics';

export const wrapRootElement = ({ element }) => (
  <Ackee>{element}</Ackee>
)
