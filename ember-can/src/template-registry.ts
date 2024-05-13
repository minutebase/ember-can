import CanHelper from './helpers/can.ts';
import CannotHelper from './helpers/cannot.ts';

export default interface Registry {
  Can: typeof CanHelper;
  Cannot: typeof CannotHelper;
}
