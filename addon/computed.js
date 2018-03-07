import Ember from 'ember';

const { get, set, getOwner } = Ember;

export default {
  ability: function(type, resourceName) {
    if (arguments.length === 1) {
      resourceName = type;
    }

    return Ember.computed(resourceName, function() {
      let ability = getOwner(this).lookup(`ability:${type}`);

      Ember.assert(`No ability class found for ${type}`, ability);

      let resource = get(this, resourceName);
      set(ability, 'model', resource);

      return ability;
    });
  }
};
