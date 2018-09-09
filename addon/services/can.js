import Service from '@ember/service';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';

import normalizeAbilityString from 'ember-can/utils/normalize';

export default Service.extend({
  parse(abilityString) {
    return normalizeAbilityString(abilityString);
  },

  abilityFor(abilityName, model, properties = {}) {
    let Ability = getOwner(this).factoryFor(`ability:${abilityName}`);

    assert(`No ability type found for '${abilityName}'`, Ability);

    if (typeof model != 'undefined') {
      properties = assign({}, { model }, properties);
    }

    return Ability.create(properties);
  },

  valueFor(propertyName, abilityName, model, properties) {
    let ability = this.abilityFor(abilityName, model, properties);
    let result = ability.getAbility(propertyName);

    run(() => ability.destroy());

    return result;
  },

  can(abilityString, model, properties) {
    let { propertyName, abilityName } = this.parse(abilityString);
    return !!this.valueFor(propertyName, abilityName, model, properties);
  },

  cannot(abilityString, model, properties) {
    return !this.can(abilityString, model, properties);
  }
});
