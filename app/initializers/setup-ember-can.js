/* globals requirejs */
import require from 'require';
var Resolver;

// This is a bit of a hack, but there is no way to detect
// which module is needed via normal `import` statements
if (requirejs.entries['ember-resolver'] || requirejs.entries['ember-resolver/index']) {
  // ember-resolver is provided when the consuming
  // application uses ember-resolver@^2.0.0 from NPM
  Resolver = require('ember-resolver')['default'];
} else {
  // ember/resolver is provided when the consuming
  // application uses ember-resolver@^0.1.x from Bower
  Resolver = require('ember/resolver')['default'];
}

Resolver.reopen({
  pluralizedTypes: {
    ability: 'abilities'
  }
});

export default {
  name: 'setup-ember-can',
  initialize: function(application) {
    // make sure we create new ability instances each time, otherwise we stomp on each other's models
    if (application.optionsForType) { // it's a container / registry in 1.13.x
      application.optionsForType('ability', { singleton: false });
    } else { // Ember 2.0.x
      application.registerOptionsForType('ability', { singleton: false });
    }
  }
};
