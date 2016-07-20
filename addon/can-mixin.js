import Ember from 'ember';

export default Ember.Mixin.create({
  canService: Ember.inject.service('can'),

  can: function(abilityName, resource, additionalProperties) {
    return this.get('canService').can(abilityName, resource, additionalProperties);
  },

  cannot: function(abilityName, resource, additionalProperties) {
    return !this.can(abilityName, resource, additionalProperties);
  }
});
