import { Ability } from 'ember-can';

export default class extends Ability {
  get canCreate() {
    return true;
  }
}
