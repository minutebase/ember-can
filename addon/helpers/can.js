import Helper from '@ember/component/helper';

import { inject as service } from '@ember/service';

export default Helper.extend({
  can: service(),

  ability: null,
  propertyName: null,

  compute([abilityString, model], properties) {
    let service = this.get('can');
    let { abilityName, propertyName } = service.parse(abilityString);
    let ability = service.abilityFor(abilityName, model, properties);

    this._removeAbilityObserver();
    this._addAbilityObserver(ability, propertyName);

    return ability.get(propertyName);
  },

  destroy() {
    this._removeAbilityObserver();
    return this._super(...arguments);
  },

  _addAbilityObserver(ability, propertyName) {
    this.setProperties({ ability, propertyName });
    this.addObserver(`ability.${propertyName}`, this, 'recompute');
  },

  _removeAbilityObserver() {
    this.removeObserver(`ability.${this.get('propertyName')}`, this, 'recompute');
  }
});
