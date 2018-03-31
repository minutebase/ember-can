import { assert } from '@ember/debug';
import { set, get, computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default {
  ability: function(type, resourceName) {
    if (arguments.length === 1) {
      resourceName = type;
    }

    return computed(resourceName, function() {
      let ability = getOwner(this).lookup(`ability:${type}`);

      assert(`No ability class found for ${type}`, ability);

      let resource = get(this, resourceName);
      set(ability, 'model', resource);

      return ability;
    });
  }
};
