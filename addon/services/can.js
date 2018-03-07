import Ember from 'ember';
import normalizeCombined from 'ember-can/utils/normalize';

const { getOwner } = Ember;

export default Ember.Service.extend({
  parse(name) {
    return normalizeCombined(name);
  },

  build(abilityString, resource, properties) {
    let { abilityName } = this.parse(abilityString);
    let ability = getOwner(this).lookup(`ability:${abilityName}`);

    Ember.assert(`No ability type found for ${abilityName}`, ability);

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
    let names = this.parse(abilityString);
    let ability = this.build(abilityString, resource, properties);

    return ability.get(names.propertyName);
  },

  cannot(abilityString, resource, properties) {
    return !this.can(abilityString, resource, properties);
  }
});
