const {
  recordSandwormActivity,
  stopRecordingSandwormActivity,
  getRecordedActivity,
} = require('./recorder');
const {
  loadDependencies,
  loadConfig,
  writePermissions,
  loadPermissions,
  SANDWORM_PERMISSION_FILE_NAME,
  SANDWORM_CONFIG_FILE_NAME,
} = require('./files');
const {getPermissionsFromActivity, comparePermissions} = require('./permissions');
const logger = require('./logger');

module.exports = {
  recorder: {
    recordSandwormActivity,
    stopRecordingSandwormActivity,
    getRecordedActivity,
  },
  files: {
    loadDependencies,
    loadConfig,
    writePermissions,
    loadPermissions,
    SANDWORM_PERMISSION_FILE_NAME,
    SANDWORM_CONFIG_FILE_NAME,
  },
  permissions: {
    getPermissionsFromActivity,
    comparePermissions,
  },
  logger,
};
