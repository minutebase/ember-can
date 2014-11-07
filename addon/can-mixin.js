import Ember from 'ember';
import can from './utils/can';

export default Ember.Mixin.create({
  can: function(abilityName, resource) {
    return can(this.container, abilityName, resource);
  }
});