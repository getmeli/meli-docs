// seo-compoenent-specific fn that creates correct path for the og:image
// createMetaImagePath(image: Object|String, defautlSiteUrl: String, defaultImage: String) -> String
const createMetaImagePath = (image, defaultSiteUrl, defaultImage) => {
  switch (typeof image) {
    case 'object':
      return defaultSiteUrl + image.childImageSharp.fluid.src;
    case 'string':
      return defaultSiteUrl + image;
    default:
      return defaultSiteUrl + defaultImage;
  }
};

// ultimate slugifier, origin: https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
const slugify = string => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz-----';
  const p = new RegExp(a.split('').join('|'), 'g');
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+|\.+/g, '-') // Replace spaces and dots with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w/-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
    .replace(/\/-/g, '/'); // Trim - from every part of the path
};

// creates a file tree structure
// buildFileTree(nodeBuild: Function) -> Object
const buildFileTree = nodeBuilder => {
  const root = nodeBuilder('_root');

  const addNode = (path, name, meta = {}) => {
    let parent = root;
    const parts = path.split('/');
    parts.push(name);
    parts.forEach(part => {
      parent.children[part] = parent.children[part] || nodeBuilder(part);
      parent = parent.children[part];
    });

    parent.meta = { ...meta };
  };

  const getTree = () => root;

  const getTreePart = (parts = []) => {
    let base = getTree();
    if (!parts.length) return base;
    const pathToPart = ['children'].concat(
      parts.flatMap(part => [part, 'children'])
    );
    pathToPart.forEach(piece => {
      if (base[piece]) {
        base = base[piece];
      }
    });
    return base;
  };

  return {
    addNode,
    getTree,
    getTreePart,
  };
};

// builds a single file tree node
// buildFileTreeNode(name: String) -> Object
const buildFileTreeNode = (name, meta = {}, children = {}) => ({
  name,
  meta,
  children,
});

// takes a string like 'docs/001-Directory/01-file' or just '001-Directory'
// and removes all the order numbers like 'docs/Directory/file' or 'Directory'
// unorderify(str: String) -> String
const unorderify = str => str.replace(/(\/?)\d{1,}-/g, '$1');

// basic compose function
const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// buildBreadcrumbs(path: String) -> Array<Object>
const buildBreadcrumbs = path => {
  let accumulatedPath = '';
  return path.split('/').map(part => {
    accumulatedPath += `/${part}`;
    const slug = accumulatedPath.replace(/\/\//g, '/'); // replace multiple slashes with exactly one
    return {
      name: part || 'docs',
      path: slug,
    };
  });
};

// makes a consequence of random digits in form of a string to be served as a key prop
// getRandomKey() -> String
const getRandomKey = () =>
  `k${Math.random()
    .toString()
    .replace('.', '')}`;

// strips the 'docs' parth from the file path
const stripDocRoot = str => str.replace(/^\/docs/, '');

module.exports = {
  createMetaImagePath,
  slugify,
  buildFileTree,
  buildFileTreeNode,
  unorderify,
  compose,
  buildBreadcrumbs,
  getRandomKey,
  stripDocRoot,
};
