import config from '../config/environment';

export default {
  name: 'setup-ember-can-injections',
  initialize: function(container, application) {
    var canConfig = config['ember-can'];
    var injections = canConfig.inject || {};

    var name, injection;
    for (name in injections) {
      injection = injections[name];
      application.inject('abilitie', name, injection);
    }
  }
};