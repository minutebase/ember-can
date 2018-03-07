import Ember from 'ember';

export default Ember.Helper.extend({
  can: Ember.inject.service(),

  compute([name, resource], hash) {
    let service = this.get('can');
    let ability = service.build(name, resource, hash);
    let { propertyName } = service.parse(name);

    if (this._ability) {
      this._ability.removeObserver(this._abilityProp, this, 'recompute');
    }

    this._ability = ability;
    this._abilityProp = propertyName;

    ability.addObserver(propertyName, this, 'recompute');

    return ability.get(propertyName);
  },

  destroy() {
    if (this._ability) {
      this._ability.removeObserver(this._abilityProp, this, 'recompute');
    }

    return this._super();
  }
});
