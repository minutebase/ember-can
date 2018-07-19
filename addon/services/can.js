import Service from '@ember/service';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';
import { deprecate } from '@ember/application/deprecations';
import { assign } from '@ember/polyfills';

import normalizeAbilityString from 'ember-can/utils/normalize';

export default Service.extend({
  parse(abilityString) {
    return normalizeAbilityString(abilityString);
  },

  build() {
    deprecate('Usage of "build" is deprecated, use "abilityFor" instead.', false, {
      id: 'ember-can.deprecate-service-build',
      until: '2.0.0',
      url: 'https://github.com/minutebase/ember-can#looking-up-abilities'
    });

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
