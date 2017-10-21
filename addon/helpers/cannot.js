import Ember from 'ember';

const { getOwner, typeOf } = Ember;

export default Ember.Helper.extend({
  can: Ember.inject.service(),

  helper: Ember.computed(function() {
    var helper = getOwner(this).lookup('helper:can');

    return typeOf(helper) === 'instance' ? helper : helper.create();
  }),

  compute(params, hash) {
    return !this.get('helper').compute.call(this, params, hash);
  },

  destroy() {
    this.get('helper').destroy.call(this);
    return this._super();
  }
});
