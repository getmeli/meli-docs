const {unorderify, slugify, stripDocRoot, compose} = require('./utils');
const chunk = require('chunk-text');

// this copypaste from gatsby-node sidebar node
// generation, we have to
// perform exactly the same operations for algolia

// helper
const flatten = arr =>
  arr.flatMap(({relativeDirectory, name, children: [entry]}, i) => {
    const {
      excerpt,
      objectID,
      frontmatter: {title},
    } = entry;
    console.log('processing file #', i, title);
    const chunks = chunk(excerpt, 300); // 300 chunk size that approximately equals 1 paragraph

    // perform the exact operations we perform in gatsby-node
    // during page generation
    const slug = compose(
      slugify,
      unorderify,
      stripDocRoot
    )(`/${relativeDirectory}/${title || name}`);
    return chunks.map((piece, i) => ({
      title,
      objectID: `${objectID}-${i}`,
      slug,
      content: piece,
    }));
  });

// main query
// keep the length of description really absurd to make sure the article comes in full
const docPagesQuery = `{
  docPages: allFile(
    filter: { absolutePath: { regex: "/docs/" }, ext:{in: [".md"]} }
  ) {
    nodes {
      name
      relativeDirectory
      children {
        ... on MarkdownRemark {
        objectID: id
        frontmatter {
          title
        }
        excerpt(pruneLength: 100000)
      }
    }
  }
}
}

`;

// additional config
const settings = {
  attributesToSnippet: ['content:20'],
  attributeForDistinct: 'title',
  distinct: true,
};

const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME || 'dev_METROLINE';

const queries = [
  {
    query: docPagesQuery,
    transformer: ({data}) => flatten(data.docPages.nodes),
    indexName,
    settings,
  },
];

module.exports = queries;
