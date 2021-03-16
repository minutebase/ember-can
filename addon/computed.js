import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';

export function ability(abilityName, resourceName) {
  resourceName = resourceName || abilityName;

  return computed(resourceName, function() {
    let canService = getOwner(this).lookup('service:can');
    return canService.abilityFor(abilityName, get(this, resourceName));
  }).readOnly();
}
