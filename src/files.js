const path = require('path');
const fs = require('fs');
const {buildDepTreeFromFiles} = require('snyk-nodejs-lockfile-parser');
const logger = require('./logger');

const SANDWORM_CONFIG_FILE_NAME = '.sandworm.config.json';
const SANDWORM_PERMISSION_FILE_NAME = 'package-permissions.json';
const MANIFEST_FILE_NAME = 'package.json';
const NPM_LOCKFILE_NAME = 'package-lock.json';
const YARN_LOCKFILE_NAME = 'yarn.lock';

const loadJsonFile = (filePath) => {
  let content;
  if (fs.existsSync(filePath)) {
    content = JSON.parse(fs.readFileSync(filePath).toString());
  }
  return content;
};

const loadConfig = (appPath) => {
  let config;

  try {
    config = loadJsonFile(path.join(appPath, SANDWORM_CONFIG_FILE_NAME));
    if (config) {
      logger.log('Config loaded');
    }
  } catch (error) {
    logger.log('Error loading config:', error.message);
  }
  return config;
};

const loadPermissions = (appPath) =>
  loadJsonFile(path.join(appPath, SANDWORM_PERMISSION_FILE_NAME));

const loadDependenciesPromise = async (appPath, includeDevDependencies = true) => {
  const manifestPath = path.join(appPath, MANIFEST_FILE_NAME);
  const npmLockfilePath = path.join(appPath, NPM_LOCKFILE_NAME);
  const yarnLockfilePath = path.join(appPath, YARN_LOCKFILE_NAME);

  let lockfilePath;
  if (fs.existsSync(npmLockfilePath)) {
    lockfilePath = npmLockfilePath;
  } else if (fs.existsSync(yarnLockfilePath)) {
    lockfilePath = yarnLockfilePath;
  } else {
    throw new Error('Sandworm: Could not locate project lockfile.');
  }

  const packageTree = await buildDepTreeFromFiles(
    appPath,
    manifestPath,
    lockfilePath,
    includeDevDependencies,
  );
  const devDependencies = [];
  const prodDependencies = [];

  const parseDeps = (dependencies) => {
    if (!dependencies) {
      return;
    }
    Object.keys(dependencies).forEach((name) => {
      const lib = dependencies[name];
      if (lib.labels && lib.labels.scope === 'dev') {
        devDependencies.push(name);
      } else if (lib.labels && lib.labels.scope === 'prod') {
        prodDependencies.push(name);
      }
      parseDeps(lib.dependencies);
    });
  };

  parseDeps(packageTree.dependencies);
  return {devDependencies, prodDependencies, packageTree};
};

const loadDependenciesAsync = (appPath, includeDevDependencies = true, done = undefined) => {
  (async () => {
    done(await loadDependenciesPromise(appPath, includeDevDependencies));
  })();
};

const loadDependencies = (appPath, includeDevDependencies = true, done = undefined) => {
  if (done) {
    return loadDependenciesAsync(appPath, includeDevDependencies, done);
  }

  return loadDependenciesPromise(appPath, includeDevDependencies);
};

const writePermissionsAsync = (appPath, permissions, done) => {
  const outputPath = path.join(appPath, SANDWORM_PERMISSION_FILE_NAME);
  fs.writeFile(outputPath, JSON.stringify(permissions, null, 2), done);
};

const writePermissionsPromise = (appPath, permissions) =>
  new Promise((resolve) => {
    writePermissionsAsync(appPath, permissions, resolve);
  });

const writePermissions = (appPath, permissions, done) => {
  if (done) {
    return writePermissionsAsync(appPath, permissions, done);
  }

  return writePermissionsPromise(appPath, permissions);
}

module.exports = {
  loadConfig,
  loadDependencies,
  loadPermissions,
  writePermissions,
  SANDWORM_CONFIG_FILE_NAME,
  SANDWORM_PERMISSION_FILE_NAME,
};
