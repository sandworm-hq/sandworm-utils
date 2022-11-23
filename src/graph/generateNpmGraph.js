const {
  processDependenciesForPackage,
  processPlaceholders,
  makeNode,
} = require('./utils');

const packageNameFromPath = (path) => {
  // TODO: For locally linked packages this might not include a `node_modules` string
  const parts = path.split('node_modules');
  return parts[parts.length - 1].slice(1);
};

const generateNpmGraph = ({packages}) => {
  const allPackages = [];
  const placeholders = [];
  let root = null;

  Object.entries(packages).forEach(([packageLocation, packageData]) => {
    const {
      name: originalName,
      version,
      resolved,
      integrity,
      dev,
      optional,
      license,
      engines,
    } = packageData;
    const name = originalName || packageNameFromPath(packageLocation);

    const newPackage = makeNode({
      name,
      version,
      relativePath: packageLocation,
      ...(resolved && {resolved}),
      ...(integrity && {integrity}),
      ...(license && {license}),
      ...(engines && {engines}),
      ...(dev && {dev}),
      ...(optional && {optional}),
    });

    if (packageLocation === '') {
      root = newPackage;
    }

    processDependenciesForPackage({
      dependencies: packageData,
      newPackage,
      allPackages,
      placeholders,
    });

    processPlaceholders({newPackage, placeholders});

    allPackages.push(newPackage);
  });

  return {root, allPackages};
};

module.exports = generateNpmGraph;
