const files = require('./files');
const logger = require('./logger');
const permissions = require('./permissions');
const recorder = require('./recorder');
const sandworm = require('./sandworm');
const getDependencyGraph = require('./graph');
const {addDependencyGraphData} = require('./graph/utils');

module.exports = {
  files,
  logger,
  permissions,
  recorder,
  sandworm,
  getDependencyGraph,
  addDependencyGraphData,
};
