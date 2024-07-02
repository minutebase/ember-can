import Ability from 'ember-can/ability';

export default class Post extends Ability {
  get canWrite() {
    return true;
  }
}
