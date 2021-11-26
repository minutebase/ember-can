import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { addObserver, removeObserver } from '@ember/object/observers';
import { setProperties, get } from '@ember/object';

export default class CanHelper extends Helper {
  @service('can') can;

  ability;
  propertyName;

  compute([abilityString, model], properties) {
    let { abilityName, propertyName } = this.can.parse(abilityString);
    let ability = this.can.abilityFor(abilityName, model, properties);

    propertyName = ability.parseProperty(propertyName);

    this._removeAbilityObserver();
    this._addAbilityObserver(ability, propertyName);

    return get(ability, propertyName);
  }

  // eslint-disable-next-line ember/classic-decorator-hooks
  destroy() {
    this._removeAbilityObserver();
    return super.destroy(...arguments);
  }

  _addAbilityObserver(ability, propertyName) {
    setProperties(this, { ability, propertyName });
    // eslint-disable-next-line ember/no-observers
    addObserver(this, `ability.${propertyName}`, this, 'recompute');
  }

  _removeAbilityObserver() {
    removeObserver(this, `ability.${this.propertyName}`, this, 'recompute');
    this.ability && this.ability.destroy();
    setProperties(this, { ability: null, propertyName: null });
  }
}
