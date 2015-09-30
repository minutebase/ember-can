import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default {
  ability: function(type, resourceName) {
    if (arguments.length === 1) {
      resourceName = type;
    }

    return Ember.computed(resourceName, function() {
      const container = this.container;
      const ability   = container.lookup("ability:"+type);

      Ember.assert("No ability class found for "+type, ability);

      const resource = get(this, resourceName);
      set(ability, "model", resource);
      return ability;
    });
  }
};
