const path = require('path');
const lockfiles = require('./lockfiles');
const sandworm = require('./sandworm');
const {loadJsonFile} = require('./utils');

module.exports = {
  ...lockfiles,
  ...sandworm,
  loadManifest: (appPath) => loadJsonFile(path.join(appPath, 'package.json')),
};
