const logWithColor = (message, color) => {
  const prefixedMessage = `[🪱 Sandworm]: ${message}`;
  if (color) {
    // eslint-disable-next-line no-console
    console.log(`${color}%s\x1b[0m`, prefixedMessage);
  } else {
    // eslint-disable-next-line no-console
    console.log(prefixedMessage);
  }
};

const log = (message) => {
  logWithColor(message);
};

const warn = (message) => {
  logWithColor(message, '\x1b[33m');
};

const error = (message) => {
  logWithColor(message, '\x1b[31m');
};

const success = (message) => {
  logWithColor(message, '\x1b[32m');
};

const logTestPluginFirstRunMessage = () => {
  warn("It looks like this is the first time you're running Sandworm.");
  warn(
    "A `package-permissions.json` file has been created in your app's root directory, with the per-module permissions detected during your test suite run.",
  );
  warn(
    'Please audit this file to understand why each item is required, then commit the file to your repository.',
  );
  warn('The next test run will validate permissions against this snapshot.');
};

module.exports = {
  log,
  warn,
  error,
  success,
  logTestPluginFirstRunMessage,
};
