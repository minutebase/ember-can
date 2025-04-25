import Service from '@ember/service';
import '@ember/object';
import '@ember/string';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/owner';
import normalizeAbilityString from '../-private/normalize.js';

class AbilitiesService extends Service {
  /**
   * Parse abilityString into an object with extracted propertyName and abilityName
   * eg. for 'create projects in account' -> `{ propertyName: 'createProjects', abilityName: 'account'}`
   * @public
   * @param  {String} string eg. 'create projects in account'
   * @return {Object}        extracted propertyName and abilityName
   */
  parse(abilityString) {
    return normalizeAbilityString(abilityString);
  }

  /**
   * Create an instance of Ability
   * @public
   * @param  {String} abilityName     name of ability class
   * @param  {*}      model
   * @param  {Object} [properties={}] extra properties (to be set on the ability instance)
   * @return {Ability}                Ability instance of requested ability
   */
  abilityFor(abilityName, model, properties = {}) {
    const AbilityFactory = getOwner(this)?.factoryFor(`ability:${abilityName}`);
    assert(`No ability type found for '${abilityName}'`, AbilityFactory);
    if (typeof model !== 'undefined') {
      properties = {
        model,
        ...properties
      };
    }
    const ability = AbilityFactory.create(properties);
    assert(`Ability '${abilityName}' has to inherit from ember-can Ability`, isAbilityClass(ability) // "ability instanceof Ability" is not working cause of a bug in ember-auto-import see https://github.com/embroider-build/ember-auto-import/issues/588
    );
    return ability;
  }

  /**
   * Returns a value for requested ability in specified ability class
   * @public
   * @param  {String} propertyName name of ability, eg `createProjects`
   * @param  {String} abilityName  name of ability class
   * @param  {*}      model
   * @param  {Object} properties   extra properties (to be set on the ability instance)
   * @return {*}                   value of ability
   */
  valueFor(propertyName, abilityName, model, properties) {
    const ability = this.abilityFor(abilityName, model, properties);
    const result = ability.getAbility(propertyName, model, properties);
    ability.destroy();
    return result;
  }

  /**
   * Returns `true` if ability is permitted
   * @public
   * @param  {[type]} abilityString eg. 'create projects in account'
   * @param  {*}      model
   * @param  {[type]} properties    extra properties (to be set on the ability instance)
   * @return {Boolean}              value of ability converted to boolean
   */
  can(abilityString, model, properties) {
    const {
      propertyName,
      abilityName
    } = this.parse(abilityString);
    return !!this.valueFor(propertyName, abilityName, model, properties);
  }

  /**
   * Returns `true` if ability is not permitted
   * @public
   * @param  {[type]} abilityString eg. 'create projects in account'
   * @param  {*}      model
   * @param  {[type]} properties    extra properties (to be set on the ability instance)
   * @return {Boolean}              value of ability converted to boolean
   */
  cannot(abilityString, model, properties) {
    return !this.can(abilityString, model, properties);
  }
}
function isAbilityClass(possibleAbilityClass) {
  const abilityClass = possibleAbilityClass;
  return abilityClass.parseProperty !== undefined && typeof abilityClass.parseProperty === 'function' && abilityClass.getAbility !== undefined && typeof abilityClass.getAbility === 'function';
}

export { AbilitiesService as default };
//# sourceMappingURL=abilities.js.map
