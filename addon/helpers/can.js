import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class CanHelper extends Helper {
  @service('abilities') abilities;

  compute([abilityString, model], properties = {}) {
    return this.abilities.can(abilityString, model, properties);
  }
}
