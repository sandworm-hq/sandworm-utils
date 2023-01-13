const {loadLockfile, loadManifest, loadInstalledPackages} = require('../files');
const generateNpmGraph = require('./generateNpmGraph');
const generatePnpmGraph = require('./generatePnpmGraph');
const generateYarnGraph = require('./generateYarnGraph');
const {postProcessGraph, addDependencyGraphData} = require('./utils');

const generateGraphPromise = async (
  appPath,
  {packageData, loadDataFromDisk = false} = {},
) => {
  const lockfile = await loadLockfile(appPath);
  const manifest = loadManifest(appPath);
  let graph;

  if (lockfile.manager === 'npm') {
    graph = await generateNpmGraph(lockfile.data);
  } else if (lockfile.manager === 'yarn-classic') {
    graph = await generateYarnGraph({
      data: lockfile.data,
      manifest,
    });
  } else if (lockfile.manager === 'yarn') {
    graph = await generateYarnGraph({
      data: lockfile.data,
      manifest,
    });
  } else if (lockfile.manager === 'pnpm') {
    graph = await generatePnpmGraph({
      data: lockfile.data?.packages || {},
      manifest,
    });
  }

  const {root, allPackages} = graph;
  const processedRoot = postProcessGraph({root});

  let additionalPackageData = packageData;

  if (!packageData && loadDataFromDisk) {
    additionalPackageData = await loadInstalledPackages(appPath);
  }

  if (additionalPackageData) {
    addDependencyGraphData({root, packageData: additionalPackageData});
  }

  return {
    root: {
      ...(processedRoot || {}),
      meta: {lockfileVersion: lockfile.lockfileVersion, packageManager: lockfile.manager},
    },
    all: allPackages,
    devDependencies: allPackages.filter(({flags}) => flags.dev),
    prodDependencies: allPackages.filter(({flags}) => flags.prod),
  };
};

const generateGraphAsync = (appPath, options, done = () => {}) => {
  (async () => {
    const graph = await generateGraphPromise(appPath, options);
    done(graph);
  })();
};

const generateGraph = (appPath, {packageData, loadDataFromDisk = false} = {}, done = undefined) => {
  if (typeof done === 'function') {
    return generateGraphAsync(appPath, {packageData, loadDataFromDisk}, done);
  }

  return generateGraphPromise(appPath, {packageData, loadDataFromDisk});
};

module.exports = generateGraph;
