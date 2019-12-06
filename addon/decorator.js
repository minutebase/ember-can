import { computed } from '@ember/object';
import { decoratorWithRequiredParams } from '@ember-decorators/utils/decorator';
import { reads } from '@ember/object/computed';
import { camelize } from '@ember/string';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import normalizeAbilityString from 'ember-can/utils/normalize';

export const can = decoratorWithRequiredParams(
  (
    target,
    key,
    desc,
    [abilityString, { model = null, additionalAttributes = {} } = {}]
  ) => {
    const { propertyName, abilityName } = normalizeAbilityString(abilityString);
    const abilityKey = `__${camelize(`${abilityName}-ability`)}`;
    const targetKey = '__target';

    target.reopen({
      [abilityKey]: computed(function() {
        const AbilityFactory = getOwner(this).factoryFor(
          `ability:${abilityName}`
        );

        assert(`No ability type found for '${abilityName}'`, AbilityFactory);

        const aliases = {
          // create an alias for the abilitys model to the data in the target
          ...(model ? { model: reads(`${targetKey}.${model}`) } : {}),
          // create an alias for each of the additional attributes to the data in target
          ...Object.entries(additionalAttributes).reduce((obj, [key, path]) => {
            return { ...obj, [key]: reads(`${targetKey}.${path}`) };
          }, {})
        };

        return AbilityFactory.create({ [targetKey]: this }).reopen(aliases);
      })
    });

    return reads(`${abilityKey}.${camelize(`can-${propertyName}`)}`)(
      target,
      key,
      desc
    );
  }
);

export default { can };
