import EmberObject from '@ember/object';
import { assert } from '@ember/debug';
import Service from '@ember/service';
import { getOwner } from '@ember/application';
import normalizeCombined from 'ember-can/utils/normalize';

export default Service.extend({
  parse(name) {
    return normalizeCombined(name);
  },

  build(abilityName, model, properties) {
    let ability = getOwner(this).lookup(`ability:${abilityName}`);
    assert(`No ability type found for ${abilityName}`, ability);

    // see if we've been given properties instead of model
    if (!properties && model && !(model instanceof EmberObject)) {
      properties = model;
      model = null;
    }

    if (model) {
      ability.set("model", model);
    }

    if (properties) {
      ability.setProperties(properties);
    }

    return ability;
  },

  can(abilityString, model, properties) {
    let { abilityName, propertyName } = this.parse(abilityString);
    let ability = this.build(abilityName, model, properties);

    return ability.get(propertyName);
  },

  cannot(abilityString, model, properties) {
    return !this.can(abilityString, model, properties);
  }
});
