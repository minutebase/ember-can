import Resolver from 'ember-resolver';

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
