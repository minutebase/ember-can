import Ember from 'ember';
import { normalizeCombined } from './normalize';

export default function(container, abilityName, resource) {
  var names   = normalizeCombined(abilityName);
  var ability = container.lookup("ability:"+names.type);

  Ember.assert("No ability type found for "+names.type, ability);

  if (resource) {
    ability.set("model", resource);
  }

  return ability.get(names.ability);
}