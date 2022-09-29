const Sandworm = require('sandworm');
const {loadConfig} = require('./files');
const logger = require('./logger');
const {RECORDER_PORT} = require('./constants');

const loadSandworm = ({appPath, configOption, trustedModules}) => {
  const config = configOption || loadConfig(appPath);

  // Load Sandworm
  logger.log('Setting up intercepts...');
  Sandworm.init({
    devMode: true,
    trustedModules,
    aliases: config && config.aliases,
    trackingPort: RECORDER_PORT,
  });
  logger.log('Intercepts ready');
};

module.exports = {
  loadSandworm,
};
