/* eslint-env node */
'use strict';

var path = require('path');

module.exports = {
  description: 'Generates an ember-can ability',

  anonymousOptions: ['name'],

  shouldTransformTypeScript: true,

  fileMapTokens: function () {
    return {
      __name__: function (options) {
        // The name defaults to the blueprint name, which is 'fragment', but
        // it needs to be named 'model' for the resolver to find it
        if (options.pod) {
          return 'ability';
        }
        return options.dasherizedModuleName;
      },
      __path__: function (options) {
        if (options.pod) {
          return path.join(options.podPath, options.dasherizedModuleName);
        }
        // In non-pod format, fragments go in the 'models' directory
        return 'abilities';
      },
    };
  },
};
