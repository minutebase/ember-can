import Ember from 'ember';

export default Ember.Mixin.create({
  canService: Ember.inject.service("can"),

  can: function(abilityName, resource, aditionalProperties) {
    return this.get("canService").can(abilityName, resource, aditionalProperties);
  },

  cannot: function(abilityName, resource, aditionalProperties) {
    return !this.can(abilityName, resource, aditionalProperties);
  }
});
