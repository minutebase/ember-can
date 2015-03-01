import config from '../config/environment';

// TODO - ObjectControllers are deprecated, remove this when they go away
Ember.ObjectController.reopen({
  _abilities: null
});

export default {
  name: 'setup-ember-can-injections',
  initialize: function(container, application) {

    // make sure we create new ability instances each time, otherwise we stomp on each other's models
    container.optionsForType('ability', { singleton: false });

    // add pluralization rule for activity -> activities to the resolver
    // TODO - update this when there's a better way of accessing the resolver
    container.resolver.__resolver__.pluralizedTypes['ability'] = 'abilities';

    var canConfig = config['ember-can'];
    var injections = canConfig.inject || {};

    var name, injection;
    for (name in injections) {
      injection = injections[name];
      application.inject('ability', name, injection);
    }
  }
};