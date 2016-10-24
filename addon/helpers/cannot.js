import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

export default Ember.Helper.extend({
  can: Ember.inject.service(),

  helper: Ember.computed(function() {
    return getOwner(this).lookup('helper:can');
  }),

  compute(params, hash) {
    return !this.get('helper').compute.call(this, params, hash);
  },

  destroy() {
    this.get('helper').destroy.call(this);
    return this._super();
  }
});
