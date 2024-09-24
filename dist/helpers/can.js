import Helper from '@ember/component/helper';
import { inject } from '@ember/service';
import { g, i } from 'decorator-transforms/runtime';

class CanHelper extends Helper {
  static {
    g(this.prototype, "abilities", [inject]);
  }
  #abilities = (i(this, "abilities"), void 0);
  compute([abilityString, model], properties = {}) {
    return this.abilities.can(abilityString ?? '', model, properties);
  }
}

export { CanHelper as default };
//# sourceMappingURL=can.js.map
