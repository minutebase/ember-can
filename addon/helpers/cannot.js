import Ember from 'ember';

export default Ember.Helper.extend({
  helper: Ember.computed(function() {
    return Ember.getOwner(this).lookup('helper:can');
  }),

  compute(params, hash) {
    return !this.get('helper').compute(params, hash);
  }
});
