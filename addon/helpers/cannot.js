import Ember from 'ember';
import canHelper from 'ember-can/helpers/can';

export default Ember.Helper.extend({
  helper: Ember.computed(function() {
    let container = this.container;
    return canHelper.create({container});
  }),

  compute(params, hash) {
    return !this.get('helper').compute(params, hash);
  }
});
