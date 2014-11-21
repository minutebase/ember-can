import Ember from 'ember';
import { normalizeCombined } from './normalize';

export default function(container, abilityName, resource, additionalProperties) {
  var names   = normalizeCombined(abilityName);
  var ability = container.lookup("ability:"+names.type);

  Ember.assert("No ability type found for "+names.type, ability);

  // see if we've been given additionalProperties instead of resource
  // note we can't do arguments.length because CanMixin always sends all args
  if (!additionalProperties && resource && !(resource instanceof Ember.Object)) {
    additionalProperties = resource;
    resource             = null;
  }

  if (resource) {
    ability.set("model", resource);
  }

  if (additionalProperties) {
    ability.setProperties(additionalProperties);
  }

  return ability.get(names.ability);
}