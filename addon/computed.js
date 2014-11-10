import Ember from 'ember';

import { normalizeType } from 'ember-can/utils/normalize';

var get = Ember.get;
var set = Ember.set;

export default {
  ability: function(typeName, resourceName) {
    if (arguments.length === 1) {
      resourceName = typeName;
    }

    return Ember.computed(resourceName, function() {
      var container = this.container;
      var type      = normalizeType(typeName);
      var ability   = container.lookup("ability:"+type);

      Ember.assert("No ability class found for "+type, ability);

      var resource = get(this, resourceName);
      set(ability, "model", resource);
      return ability;
    });
  }
};