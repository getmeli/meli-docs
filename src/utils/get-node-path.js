const {
  slugify,
  unorderify,
  compose,
  stripDocRoot,
} = require('./utils');

const builder = compose(slugify, unorderify, stripDocRoot);

function getNodePath(
  relativeDirectory,
  node,
) {
  const { frontmatter: { title, isHomePage, sidebarTitle, path } } = node;
  return isHomePage ? '/' : builder(`/${relativeDirectory}/${path || sidebarTitle || title || name}`);
}

module.exports = {
  getNodePath,
};
