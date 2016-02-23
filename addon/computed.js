import Ember from 'ember';

export default {
  ability: function(type, resourceName) {
    if (arguments.length === 1) {
      resourceName = type;
    }

    return Ember.computed(resourceName, function() {
      const ability = Ember.getOwner(this).lookup("ability:" + type);

      Ember.assert("No ability class found for " + type, ability);

      const resource = Ember.get(this, resourceName);
      Ember.set(ability, "model", resource);
      return ability;
    });
  }
};
