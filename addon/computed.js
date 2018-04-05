import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { deprecate } from '@ember/application/deprecations';

export default {
  ability(abilityName, resourceName) {
    deprecate('Usage of "ability" computed property is deprecated, create your own Ember.computed and use service "can#abilityFor".', false, {
      id: 'ember-can.deprecate-computed-ability',
      until: '2.0.0',
      url: 'https://github.com/minutebase/ember-can#looking-up-abilities'
    });

    resourceName = resourceName || abilityName;

    return computed(resourceName, function() {
      let canService = getOwner(this).lookup('service:can');
      return canService.abilityFor(abilityName, this.get(resourceName));
    });
  }
};
