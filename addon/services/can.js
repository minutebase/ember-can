import EmberObject from '@ember/object';
import { assert } from '@ember/debug';
import Service from '@ember/service';
import { getOwner } from '@ember/application';
import normalizeCombined from 'ember-can/utils/normalize';

export default Service.extend({
  parse(name) {
    return normalizeCombined(name);
  },

  build(abilityString, resource, properties) {
    let { abilityName } = this.parse(abilityString);
    let ability = getOwner(this).lookup(`ability:${abilityName}`);

    assert(`No ability type found for ${abilityName}`, ability);

    // see if we've been given properties instead of resource
    if (!properties && resource && !(resource instanceof EmberObject)) {
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
