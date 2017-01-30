import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Helper.extend({
  helper: Ember.computed(function() {
    return getOwner(this).lookup('helper:can').create();
  }),

  compute(params, hash) {
    return !this.get('helper').compute(params, hash);
  }
});
