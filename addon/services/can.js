import Service from '@ember/service';
import Ability from 'ember-can/ability';
import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';

import normalizeAbilityString from 'ember-can/utils/normalize';

export default Service.extend({
  /**
   * Parse ablityString into an object with extracted propertyName and abilityName
   * eg. for 'create projects in account' -> `{ propertyName: 'createProjects', abilityName: 'account'}`
   * @public
   * @param  {String} string eg. 'create projects in account'
   * @return {Object}        extracted propertyName and abilityName
   */
  parse(abilityString) {
    return normalizeAbilityString(abilityString);
  },

  /**
   * Create an instance of Ability
   * @public
   * @param  {String} abilityName     name of ability class
   * @param  {*}      model
   * @param  {Object} [properties={}] extra properties (to be set on the ability instance)
   * @return {Ability}                Ability instance of requested ability
   */
  abilityFor(abilityName, model, properties = {}) {
    let AbilityFactory = getOwner(this).factoryFor(`ability:${abilityName}`);

    assert(`No ability type found for '${abilityName}'`, AbilityFactory );

    if (typeof model !== 'undefined') {
      properties = assign({}, { model }, properties);
    }

    let ability = AbilityFactory.create(properties);
    assert(`Ability '${abilityName}' has to inherit from ember-can Ability`, ability instanceof Ability);

    return ability;
  },

  /**
   * Returns a value for requested ability in specified ability class
   * @public
   * @param  {[type]} abilityString eg. 'create projects in account'
   * @param  {*}      model
   * @param  {Object} properties   extra properties (to be set on the ability instance)
   * @return {*}                   value of ability
   */
  valueFor(abilityString, model, properties) {
    let { abilityName, propertyName, subProperty } = this.parse(abilityString);

    let ability = this.abilityFor(abilityName, model, properties);
    let result = ability.getAbility(propertyName);

    ability.destroy();

    if (!subProperty) {
      return result;
    }

    return get(result, subProperty);
  },

  /**
   * Returns `true` if ability is permitted
   * @public
   * @param  {[type]} abilityString eg. 'create projects in account'
   * @param  {*}      model
   * @param  {[type]} properties    extra properties (to be set on the ability instance)
   * @return {Boolean}              value of ability converted to boolean
   */
  can(abilityString, model, properties) {
    let { abilityName, propertyName, subProperty } = this.parse(abilityString);

    assert(`Using 'abilityString:subProperty' syntax is forbidden in can and cannot helpers, use ability helper instead`, !subProperty);

    let result = this.valueFor(abilityString, model, properties);
    if (typeof result === 'object') {
      assert(`Ability property ${propertyName} in '${abilityName}' is an object and must have a 'can' property`, 'can' in result);
      return !!result.can
    }
    return !!result;
  },

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
});
