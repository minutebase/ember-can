import Ember from 'ember';
import { normalize } from '../ability';

export default function(container, abilityName, resource) {
  var name         = normalize(abilityName);
  var resolver     = container.lookup("abilitie:resolver");
  var abilityClass = resolver.lookup(name, resource);

  Ember.assert("No ability handler class setup for "+abilityName, abilityClass);

  var ability = container.lookup("abilitie:"+abilityClass);

  Ember.assert("Expected to find ability class for "+abilityClass+" but none was found, make sure you've added one", ability);

  return ability.can(name, resource);
}