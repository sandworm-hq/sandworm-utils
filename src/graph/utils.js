const semverLib = require('semver');

const parseDependencyString = (depstring) => {
  const parts = depstring.split('@');
  const semver = parts.pop();
  let name;
  let localName;

  if (parts.length === 1) {
    // Parses js-sdsl@^4.1.4
    [name] = parts;
  } else if (parts.length === 2) {
    if (parts[0] === '') {
      // @pnpm/constant@6.1.0
      name = `@${parts[1]}`;
    } else {
      // execa@npm:safe-execa@^0.1.1
      [localName] = parts;
      name = parts[1].replace('npm:', '');
    }
  } else if (parts.length === 3) {
    // js-yaml@npm:@zkochan/js-yaml@^0.0.6
    [localName] = parts;
    name = `@${parts[2]}`;
  } else if (parts.length === 4) {
    // @pnpm/constant@npm:@test/constant@6.1.0
    localName = `@${parts[1]}`;
    name = `@${parts[3]}`;
  }

  return {name, semver, localName: localName || name};
};

const makeNode = (data) => ({
  ...data,
  flags: {},
  dependencies: {},
  devDependencies: {},
  optionalDependencies: {},
  peerDependencies: {},
  bundledDependencies: {},
  parents: {
    dependencies: {},
    devDependencies: {},
    optionalDependencies: {},
    peerDependencies: {},
    bundledDependencies: {},
  },
});

const processDependenciesForPackage = ({dependencies, newPackage, allPackages, placeholders}) => {
  Object.entries({
    ...(dependencies.dependencies && {dependencies: dependencies.dependencies}),
    ...(dependencies.devDependencies && {devDependencies: dependencies.devDependencies}),
    ...(dependencies.optionalDependencies && {
      optionalDependencies: dependencies.optionalDependencies,
    }),
    ...(dependencies.peerDependencies && {peerDependencies: dependencies.peerDependencies}),
    ...(dependencies.bundledDependencies && {
      bundledDependencies: dependencies.bundledDependencies,
    }),
  }).forEach(([dependencyType, dependencyObject]) => {
    Object.entries(dependencyObject || {}).forEach(
      ([originalDependencyName, originalSemverRule]) => {
        const {name: dependencyName, semver: semverRule} = parseDependencyString(
          `${originalDependencyName}@${originalSemverRule}`,
        );

        const dependencyPackage = allPackages.find(
          (pkg) => pkg.name === dependencyName && semverLib.satisfies(pkg.version, semverRule),
        );

        if (dependencyPackage) {
          // eslint-disable-next-line no-param-reassign
          newPackage[dependencyType][dependencyPackage.name] = dependencyPackage;
          dependencyPackage.parents[dependencyType][newPackage.name] = newPackage;
        } else {
          placeholders.push({
            dependencyName,
            semverRule,
            targetPackage: newPackage,
            dependencyType,
          });
        }
      },
    );
  });
};

const processPlaceholders = ({newPackage, placeholders}) => {
  placeholders
    .filter(
      ({dependencyName, semverRule}) =>
        newPackage.name === dependencyName && semverLib.satisfies(newPackage.version, semverRule),
    )
    .forEach((placeholder) => {
      // eslint-disable-next-line no-param-reassign
      placeholder.targetPackage[placeholder.dependencyType][newPackage.name] = newPackage;
      // eslint-disable-next-line no-param-reassign
      newPackage.parents[placeholder.dependencyType][placeholder.targetPackage.name] =
        placeholder.targetPackage;
      placeholders.splice(placeholders.indexOf(placeholder), 1);
    });
};

const postProcessGraph = ({
  root,
  processedNodes = [],
  flags = {},
  depth = 0,
}) => {
  if (!root) {
    return root;
  }

  Object.assign(root.flags, flags);

  Object.keys(root).forEach((key) => {
    const value = root[key];
    if (
      key !== 'flags' &&
      (value === undefined ||
        (Object.getPrototypeOf(value) === Object.prototype && Object.keys(value).length === 0))
    ) {
      // eslint-disable-next-line no-param-reassign
      delete root[key];
    }
  });

  if (depth === 0) {
    Object.values(root.dependencies || {}).forEach((dep) => {
      // eslint-disable-next-line no-param-reassign
      dep.flags.prod = true;
    });
  }

  if (!processedNodes.includes(root)) {
    // eslint-disable-next-line no-param-reassign
    processedNodes.push(root);

    [
      ...Object.values(root.dependencies || {}).map((dep) => ['prod', dep]),
      ...Object.values(root.devDependencies || {}).map((dep) => ['dev', dep]),
      ...Object.values(root.optionalDependencies || {}).map((dep) => ['optional', dep]),
      ...Object.values(root.peerDependencies || {}).map((dep) => ['peer', dep]),
      ...Object.values(root.bundledDependencies || {}).map((dep) => ['bundled', dep]),
    ].forEach(([rel, dep]) =>
      postProcessGraph({
        root: dep,
        processedNodes,
        flags: {
          ...(flags.prod && {prod: true}),
          ...((flags.dev || rel === 'dev') && {dev: true}),
          ...((flags.optional || rel === 'optional') && {optional: true}),
          ...((flags.peer || rel === 'peer') && {peer: true}),
          ...((flags.bundled || rel === 'bundled') && {bundled: true}),
        },
        depth: depth + 1,
      }),
    );
  }

  return root;
};

const addDependencyGraphData = ({
  root,
  processedNodes = [],
  packageData = [],
}) => {
  if (!root) {
    return root;
  }

  if (!processedNodes.includes(root)) {
    // eslint-disable-next-line no-param-reassign
    processedNodes.push(root);

    const currentPackageData = packageData.find(
      ({name, version}) => root.name === name && root.version === version,
    );

    if (currentPackageData) {
      let license;

      if (typeof currentPackageData.license === 'string') {
        // Standard SPDX field
        license = currentPackageData.license;
      } else if (Array.isArray(currentPackageData.licenses)) {
        // Some older packages use an array
        //  {
        //   "licenses" : [
        //     {"type": "MIT", "url": "..."},
        //     {"type": "Apache-2.0", "url": "..."}
        //   ]
        // }
        if (currentPackageData.licenses.length === 1) {
          license = currentPackageData.licenses[0].type;
        } else {
          license = `(${currentPackageData.licenses.map(({type}) => type).join(' OR ')})`;
        }
      } else if (typeof currentPackageData.license === 'object') {
        // Some older packages use an object
        // {
        //   "license" : {
        //     "type" : "ISC",
        //     "url" : "..."
        //   }
        // }
        license = currentPackageData.license.type;
      }

      Object.assign(root, {
        ...(currentPackageData.relativePath && {relativePath: currentPackageData.relativePath}),
        ...(currentPackageData.engines && {engines: currentPackageData.engines}),
        ...(currentPackageData.size && {size: currentPackageData.size}),
        ...(license && {license}),
      });
    }

    [
      ...Object.values(root.dependencies || {}),
      ...Object.values(root.devDependencies || {}),
      ...Object.values(root.optionalDependencies || {}),
      ...Object.values(root.peerDependencies || {}),
      ...Object.values(root.bundledDependencies || {}),
    ].forEach((dep) =>
      addDependencyGraphData({
        root: dep,
        processedNodes,
        packageData,
      }),
    );
  }

  return root;
};

module.exports = {
  makeNode,
  parseDependencyString,
  processDependenciesForPackage,
  processPlaceholders,
  postProcessGraph,
  addDependencyGraphData,
};
