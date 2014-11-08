import config from '../config/environment';

export default {
  name: 'setup-ember-can-injections',
  initialize: function(container, application) {

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