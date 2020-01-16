import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { addObserver, removeObserver } from '@ember/object/observers';
import { setProperties } from '@ember/object';

export default Helper.extend({
  can: service(),

  ability: null,
  propertyName: null,

  compute([abilityString, model], properties) {
    let { abilityName, propertyName } = this.can.parse(abilityString);
    let ability = this.can.abilityFor(abilityName, model, properties);

    propertyName = ability.parseProperty(propertyName);

    this._removeAbilityObserver();
    this._addAbilityObserver(ability, propertyName);

    return ability[propertyName];
  },

  destroy() {
    this._removeAbilityObserver();
    return this._super(...arguments);
  },

  _addAbilityObserver(ability, propertyName) {
    setProperties(this, { ability, propertyName });
    addObserver(this, `ability.${propertyName}`, this, 'recompute');
  },

  _removeAbilityObserver() {
    removeObserver(this, `ability.${this.propertyName}`, this, 'recompute');
    this.ability && this.ability.destroy();
    setProperties(this, { ability: null, propertyName: null });
  }
});
