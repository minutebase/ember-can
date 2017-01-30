import Ember from 'ember';

const { getOwner, typeOf } = Ember;

export default Ember.Helper.extend({
  helper: Ember.computed(function() {
    var helper = getOwner(this).lookup('helper:can');

    return typeOf(helper) === 'instance' ? helper : helper.create();
  }),

  compute(params, hash) {
    return !this.get('helper').compute(params, hash);
  }
});
