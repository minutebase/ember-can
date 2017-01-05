import Ember from 'ember';

const { computed, getOwner } = Ember;

export default Ember.Helper.extend({
  helper: computed(function() {
    return getOwner(this).lookup('helper:can');
  }),

  compute(params, hash) {
    return !this.get('helper').compute(params, hash);
  }
});
