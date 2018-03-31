import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  canService: service('can'),

  can(abilityName, resource, properties) {
    return this.get('canService').can(abilityName, resource, properties);
  },

  cannot(abilityName, resource, properties) {
    return !this.can(abilityName, resource, properties);
  }
});
