import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';
import { deprecate } from '@ember/debug';

export function ability(abilityName, resourceName) {
  deprecate(
    'Using ability() computed property is deprecated. Use getters and Can service directly.',
    false,
    {
      for: 'ember-can',
      since: {
        enabled: '4.0.0',
      },
      id: 'ember-can.deprecate-ability-computed',
      until: '5.0.0',
    }
  );

  resourceName = resourceName || abilityName;

  return computed(resourceName, function () {
    let canService = getOwner(this).lookup('service:abilities');
    return canService.abilityFor(abilityName, get(this, resourceName));
  }).readOnly();
}
