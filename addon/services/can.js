import Ember from 'ember';
import { normalizeCombined } from '../utils/normalize';

const { getOwner } = Ember;

export default Ember.Service.extend({
  parse(name) {
    return normalizeCombined(name);
  },

  build(abilityString, resource, properties) {
    const names   = this.parse(abilityString);
    const ability = getOwner(this).lookup(`ability:${names.abilityName}`);

    Ember.assert(`No ability type found for ${names.abilityName}`, ability);

    // see if we've been given properties instead of resource
    if (!properties && resource && !(resource instanceof Ember.Object)) {
      properties = resource;
      resource   = null;
    }

    if (resource) {
      ability.set("model", resource);
    }

    if (properties) {
      ability.setProperties(properties);
    }

    return ability;
  },

  can(abilityString, resource, properties) {
    const names   = this.parse(abilityString);
    const ability = this.build(abilityString, resource, properties);
    return ability.get(names.propertyName);
  },

  cannot(abilityString, resource, properties) {
    return !this.can(abilityString, resource, properties);
  }
});
