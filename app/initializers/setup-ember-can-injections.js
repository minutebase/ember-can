import config from '../config/environment';

// TODO - hack, remove this when we find a better way of managing context in the if-can helper
// so that it doesn't try and proxy to null in if-can helper when setting activities for binding
// it's in here so we set it before any other controllers extend Em.ObjectController
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