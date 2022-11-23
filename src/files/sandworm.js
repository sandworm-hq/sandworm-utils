const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const {loadJsonFile} = require('./utils');

const SANDWORM_CONFIG_FILE_NAME = '.sandworm.config.json';
const SANDWORM_PERMISSION_FILE_NAME = 'package-permissions.json';

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
};

module.exports = {
  loadConfig,
  loadPermissions,
  writePermissions,
  SANDWORM_CONFIG_FILE_NAME,
  SANDWORM_PERMISSION_FILE_NAME,
};
