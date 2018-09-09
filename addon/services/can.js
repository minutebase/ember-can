import Service from '@ember/service';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';

import normalizeAbilityString from 'ember-can/utils/normalize';

export default Service.extend({
  parse(abilityString) {
    return normalizeAbilityString(abilityString);
  },


    return this.abilityFor(...arguments);
  },

  abilityFor(abilityName, model, properties = {}) {
    let ability = getOwner(this).lookup(`ability:${abilityName}`);
    assert(`No ability type found for ${abilityName}`, ability);

    ability.setProperties(assign({}, { model }, properties));
    return ability;
  },

  can(abilityString, model, properties) {
    let { abilityName, propertyName } = this.parse(abilityString);
    let ability = this.abilityFor(abilityName, model, properties);

    return ability.get(propertyName);
  },

  cannot(abilityString, model, properties) {
    return !this.can(abilityString, model, properties);
  }
});
