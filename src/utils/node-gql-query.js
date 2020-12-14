const nodeGqlQuery = `
  query docPagesQuery {
    allFile(
      filter: { 
        ext: { eq: ".md" }, 
        relativeDirectory: { regex: "/docs/" } 
      }
      sort: { 
        fields: absolutePath, 
        order: ASC
      }
    ) {
      nodes {
        name
        relativeDirectory
        children {
          ... on MarkdownRemark {
            id
            html
            rawMarkdownBody
            frontmatter {
              title
              sidebarTitle
              excerpt
              isHomePage
              path
            }
          }
        }
      }
    }
  }
`;

module.exports = {
  nodeGqlQuery,
};
