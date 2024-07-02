import CanHelper from 'ember-can/helpers/can';
import CannotHelper from 'ember-can/helpers/cannot';

export default interface Registry {
  can: typeof CanHelper;
  cannot: typeof CannotHelper;
}
