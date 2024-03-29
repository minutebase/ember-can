import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class CannotHelper extends Helper {
  @service('abilities') abilities;

  compute([abilityString, model], properties = {}) {
    return this.abilities.cannot(abilityString, model, properties);
  }
}
