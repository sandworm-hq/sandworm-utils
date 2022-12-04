const path = require('path');
const lockfiles = require('./lockfiles');
const sandworm = require('./sandworm');
const packages = require('./packages');
const {loadJsonFile} = require('./utils');

module.exports = {
  ...lockfiles,
  ...sandworm,
  ...packages,
  loadManifest: (appPath) => loadJsonFile(path.join(appPath, 'package.json')),
};
