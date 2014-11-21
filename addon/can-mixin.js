import Ember from 'ember';
import can from './utils/can';

export default Ember.Mixin.create({
  can: function(abilityName, resource, aditionalProperties) {
    return can(this.container, abilityName, resource, aditionalProperties);
  }
});