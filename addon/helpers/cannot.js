import Ember from 'ember';
import canHelper from 'ember-can/helpers/can';
import getOwner from 'ember-getowner-polyfill';

export default Ember.Helper.extend({
  helper: Ember.computed(function() {
    let container = getOwner(this);
    return canHelper.create({container});
  }),

  compute(params, hash) {
    return !this.get('helper').compute(params, hash);
  }
});
