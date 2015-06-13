import Ember from 'ember';
import { normalizeCombined } from '../utils/normalize';

export default Ember.Helper.extend({
  compute([name, resource], hash) {
    const names   = normalizeCombined(name);
    const ability = this.container.lookup("ability:"+names.type);

    Ember.assert("No ability type found for "+names.type, ability);

    ability.set("model", resource);
    ability.setProperties(hash);

    if (this._ability) {
      this._ability.removeObserver(this._abilityProp, this, "recompute");
    }

    this._ability     = ability;
    this._abilityProp = names.ability;

    ability.addObserver(names.ability, this, "recompute");

    return ability.get(names.ability);
  },

  destroy() {
    this._ability.removeObserver(this._abilityProp, this, "recompute");
    return this._super();
  }
});