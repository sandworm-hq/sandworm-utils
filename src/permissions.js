const getPermissionsFromActivity = (activity) => {
  const permissions = [];
  activity.forEach(({module, family, method}) => {
    const descriptor = permissions.find(({module: m}) => m === module);
    const methodSlug = `${family}.${method}`;

    if (descriptor) {
      if (!descriptor.permissions.includes(methodSlug)) {
        descriptor.permissions.push(methodSlug);
      }
    } else {
      permissions.push({module, permissions: [methodSlug]});
    }
  });

  return permissions;
};

const getPackagePermissions = ({
  permissions = [],
  devDependencies = [],
  prodDependencies = [],
  ignoredModules = [],
}) =>
  permissions
    // Filter out dev dependencies
    .filter(({module}) => {
      const moduleNames = module.split('>');
      const devModules = moduleNames.filter(
        (name) => devDependencies.includes(name) && !prodDependencies.includes(name),
      );
      return devModules.length === 0;
    })
    // Filter out explicitly ignored modules
    .filter(({module}) => !ignoredModules.includes(module));

const comparePermissions = (oldPermissions = [], newPermissions = []) => {
  if (!Array.isArray(oldPermissions) || !Array.isArray(newPermissions)) {
    throw new Error('Sandworm: compared permissions must be Arrays');
  }

  const changes = [];
  const messages = [];
  const oldModules = oldPermissions.map(({module}) => module);
  const newModules = newPermissions.map(({module}) => module);

  // Removed modules
  oldModules
    .filter((module) => !newModules.includes(module))
    .forEach((module) => changes.push({module, type: 'removed-module'}));
  // Added modules
  newModules
    .filter((module) => !oldModules.includes(module))
    .forEach((module) => changes.push({module, type: 'added-module'}));

  oldPermissions.forEach(({module, permissions: oldModulePermissions}) => {
    const newModule = newPermissions.find(({module: m}) => m === module);
    if (newModule) {
      const newModulePermissions = newModule.permissions;

      // Removed permissions
      oldModulePermissions
        .filter((permission) => !newModulePermissions.includes(permission))
        .forEach((permission) => changes.push({module, permission, type: 'removed-permission'}));
      // Added permissions
      newModulePermissions
        .filter((permission) => !oldModulePermissions.includes(permission))
        .forEach((permission) => changes.push({module, permission, type: 'added-permission'}));
    }
  });

  changes.forEach(({module, type, permission}) => {
    switch (type) {
      case 'removed-module':
        messages.push(`  * Existing \`${module}\` module is no longer in use`);
        break;
      case 'added-module':
        messages.push(`  * New module \`${module}\` has been added`);
        break;
      case 'removed-permission':
        messages.push(
          `  * Permission \`${permission}\` is no longer in use for module \`${module}\``,
        );
        break;
      case 'added-permission':
        messages.push(`  * Permission \`${permission}\` has been added to module \`${module}\``);
        break;
      default:
        break;
    }
  });

  return {changes, messages};
};

module.exports = {
  getPermissionsFromActivity,
  comparePermissions,
  getPackagePermissions,
};
