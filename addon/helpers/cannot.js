import CanHelper from 'ember-can/helpers/can';

export default class CannotHelper extends CanHelper {
  compute() {
    return !super.compute(...arguments);
  }
}
