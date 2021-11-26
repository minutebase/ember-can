import { camelize } from '@ember/string';
import { setOwner } from '@ember/application';

export default class Ability {
  static parseProperty(propertyName) {
    return camelize(`can-${propertyName}`);
  }

  static getAbility(ability, propertyName, model, properties = {}) {
    const abilityValue = ability[this.parseProperty(propertyName)];

    if (typeof abilityValue === 'function') {
      return abilityValue.call(ability, model, properties);
    }

    return abilityValue;
  }

  constructor(owner) {
    setOwner(this, owner);
  }
}
