import Ember from 'ember';

export default Ember.Object.extend({
  lookup: function(/* abilityName, resource */) {
    return "default";
  }
});