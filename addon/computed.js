import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default {
  ability: function(type, resourceName) {
    if (arguments.length === 1) {
      resourceName = type;
    }

    return Ember.computed(resourceName, function() {
      var container = this.container;
      var ability   = container.lookup("ability:"+type);

      Ember.assert("No ability class found for "+type, ability);

      var resource = get(this, resourceName);
      set(ability, "model", resource);
      return ability;
    });
  }
};
