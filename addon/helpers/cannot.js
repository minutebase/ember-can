import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

export default Ember.Helper.extend({
  helper: Ember.computed(function() {
    return getOwner(this).lookup('helper:can');
  }),

  compute(params, hash) {
    return !this.get('helper').compute(params, hash);
  }
});
