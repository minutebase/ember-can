import AbilityHelper from 'ember-can/helpers/ability';
import { assert } from '@ember/debug';

export default AbilityHelper.extend({
  compute([abilityString]) {
    let { abilityName, propertyName, subProperty } = this.can.parse(abilityString);

    assert(`Using 'abilityString:subProperty' syntax is forbidden in can and cannot helpers, use ability helper instead`, !subProperty);

    let result = this._super(...arguments);
    if (typeof result === 'object') {
      assert(`Ability property ${propertyName} in '${abilityName}' is an object and must have a 'can' property`, 'can' in result);
      return result.can
    }
    return result;
  }
});
