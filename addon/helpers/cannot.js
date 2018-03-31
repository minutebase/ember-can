import CanHelper from 'ember-can/helpers/can';

export default CanHelper.extend({
  compute() {
    return !this._super(...arguments);
  }
});
