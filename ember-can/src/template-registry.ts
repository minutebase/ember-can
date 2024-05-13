import CanHelper from './helpers/can';
import CannotHelper from './helpers/cannot';

export default interface Registry {
  Can: typeof CanHelper;
  Cannot: typeof CannotHelper;
}
