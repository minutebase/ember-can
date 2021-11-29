import { camelize } from '@ember/string';
import { setOwner } from '@ember/application';
import { get } from '@ember/object';

export default class Ability {
  static parseProperty(propertyName) {
    return camelize(`can-${propertyName}`);
  }

  static getAbility(ability, propertyName, model, properties = {}) {
    const abilityValue = get(ability, this.parseProperty(propertyName));

    if (typeof abilityValue === 'function') {
      return abilityValue.call(ability, model, properties);
    }

    return abilityValue;
  }

  constructor(owner) {
    setOwner(this, owner);
  }
}
