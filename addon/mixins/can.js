import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { deprecate } from '@ember/application/deprecations';

export default Mixin.create({
  canService: service('can'),

  init() {
    this._super(...arguments);

    deprecate('Usage of ember-can mixin is deprecated, define your own "can" and "cannot" methods base on "can" service.', false, {
      id: 'ember-can.deprecate-can-mixin',
      until: '2.0.0',
      url: 'https://github.com/minutebase/ember-can#quick-example'
    });
  },

  can(abilityName, resource, properties) {
    return this.get('canService').can(abilityName, resource, properties);
  },

  cannot(abilityName, resource, properties) {
    return !this.can(abilityName, resource, properties);
  }
});
