const {loadLockfile, loadManifest, loadInstalledPackages} = require('../files');
const generateNpmGraph = require('./generateNpmGraph');
const generatePnpmGraph = require('./generatePnpmGraph');
const generateYarnGraph = require('./generateYarnGraph');
const {postProcessGraph} = require('./utils');

const generateGraphPromise = async (appPath) => {
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

  const installedPackages = await loadInstalledPackages(appPath);

  const {root, allPackages} = graph;
  const processedRoot = postProcessGraph({root, installedPackages});

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

const generateGraphAsync = (appPath, done = () => {}) => {
  (async () => {
    const graph = await generateGraphPromise(appPath);
    done(graph);
  })();
}

const generateGraph = (appPath, done) => {
  if (typeof done === 'function') {
    return generateGraphAsync(appPath, done);
  }

  return generateGraphPromise(appPath);
};

module.exports = generateGraph;
