import Ember from 'ember';

export default Ember.Mixin.create({
  canService: Ember.inject.service('can'),

  can(abilityName, resource, properties) {
    return this.get('canService').can(abilityName, resource, properties);
  },

  cannot(abilityName, resource, properties) {
    return !this.can(abilityName, resource, properties);
  }
});
