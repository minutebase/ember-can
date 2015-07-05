import Resolver from 'ember/resolver';

Resolver.reopen({
  pluralizedTypes: {
    ability: 'abilities'
  }
});

export default {
  name: 'setup-ember-can',
  initialize: function(container) {

    // make sure we create new ability instances each time, otherwise we stomp on each other's models
    container.optionsForType('ability', { singleton: false });
  }
};
