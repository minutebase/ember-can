import config from '../config/environment';

export default {
  name: 'setup-ember-can',
  initialize: function(container, application) {

    // make sure we create new ability instances each time, otherwise we stomp on each other's models
    container.optionsForType('ability', { singleton: false });

    // add pluralization rule for activity -> activities to the resolver
    // TODO - update this when there's a better way of accessing the resolver
    container.resolver.__resolver__.pluralizedTypes['ability'] = 'abilities';
  }
};