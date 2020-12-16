const { getNodePath } = require('./src/utils/get-node-path');
const { nodeGqlQuery } = require('./src/utils/node-gql-query');

const path = require('path');
const { buildFileTree, buildFileTreeNode, unorderify, buildBreadcrumbs } = require('./src/utils/utils');

// main doc page template
const docPageTemplate = path.resolve(`src/templates/doc-page.js`);

async function createDocPages({ actions: { createPage }, graphql, reporter }) {
  // doc pages query
  const { data } = await graphql(nodeGqlQuery);

  const { getTreePart, addNode } = buildFileTree(buildFileTreeNode);

  data.allFile.nodes.forEach(({ name, relativeDirectory, children, children: [remarkNode] }) => {
      const child = children[0];
      const { frontmatter: { title, excerpt, sidebarTitle } } = child;
      const entryPath = getNodePath(relativeDirectory, child);

      // populate our tree representation with actual nodes
      addNode(unorderify(relativeDirectory), unorderify(name), {
        path: entryPath,
        title,
        excerpt,
        sidebarTitle,
      });

      // for debugging purpose in case there are errors in md/html syntax
      if (typeof remarkNode === 'undefined') {
        console.log('remarkNode is', remarkNode);
        console.log('children is', children);
        console.log(
          '\nmarkup is broken! check the following file: \n\n',
          `${relativeDirectory}/${name}`,
        );
        return;
      }

      const extendedRemarkNode = {
        ...remarkNode,
        frontmatter: {
          ...remarkNode.frontmatter,
          slug: entryPath,
          // injection of a link to an article in git repo
          fileOrigin: encodeURI(
            process.env.GATSBY_GITHUB_DOCS_URL +
            `/${relativeDirectory}/${name}.md`,
          ),
        },
      };

      // build the breadcrumbs data
      const breadcrumbs = buildBreadcrumbs(entryPath);
      createPage({
        path: entryPath,
        component: docPageTemplate,
        context: {
          remarkNode: extendedRemarkNode,
          title: title || unorderify(name),
          sidebarTree: getTreePart(['docs']),
          breadcrumbs,
        },
      });
    },
  );
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  // Adding default values for some fields and moving them under node.fields
  if (node.frontmatter) {
    createNodeField({
      node,
      name: 'excerpt',
      value: node.frontmatter.excerpt || '',
    });
  }
};

exports.createPages = async options => {
  await createDocPages(options);
};
