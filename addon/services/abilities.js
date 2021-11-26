import Service from '@ember/service';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

import Ability from '../ability';
import normalizeAbilityString from 'ember-can/utils/normalize';

export default class AbilitiesService extends Service {
  _cache = new Map();

  /**
   * Returns `true` if ability is permitted
   * @public
   * @param  {String} abilityString eg. 'create projects in account'
   * @param  {*}      model
   * @param  {Object} properties    extra properties (to be set on the ability instance)
   * @return {Boolean}              value of ability converted to boolean
   */
  can(abilityString, model, properties = {}) {
    let { propertyName, abilityName } = this.parse(abilityString);
    return !!this.valueFor(propertyName, abilityName, model, properties);
  }

  /**
   * Returns `true` if ability is not permitted
   * @public
   * @param  {String} abilityString eg. 'create projects in account'
   * @param  {*}      model
   * @param  {Object} properties    extra properties (to be set on the ability instance)
   * @return {Boolean}              value of ability converted to boolean
   */
  cannot(abilityString, model, properties = {}) {
    return !this.can(abilityString, model, properties);
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
  valueFor(propertyName, abilityName, model, properties = {}) {
    const ability = this.abilityFor(abilityName);

    return ability.constructor.getAbility(
      ability,
      propertyName,
      model,
      properties
    );
  }

  /**
   * Create an instance of Ability
   * @public
   * @param  {String} abilityName     name of ability class
   * @return {Ability}                Ability instance of requested ability
   */
  abilityFor(abilityName) {
    const abilityClass = getOwner(this).resolveRegistration(
      `ability:${abilityName}`
    );

    if (!this._cache.has(abilityClass)) {
      this._cache.set(abilityClass, new abilityClass(getOwner(this)));
    }

    const ability = this._cache.get(abilityClass);

    assert(`No ability type found for '${abilityName}'`, ability);

    assert(
      `Ability '${abilityName}' is not extended by ember-can Ability`,
      ability instanceof Ability
    );

    return ability;
  }

  /**
   * Parse abilityString into an object with extracted propertyName and abilityName
   * eg. for 'create projects in account' -> `{ propertyName: 'createProjects', abilityName: 'account'}`
   * @public
   * @param  {String} abilityString eg. 'create projects in account'
   * @return {Object}               extracted propertyName and abilityName
   */
  parse(abilityString) {
    return normalizeAbilityString(abilityString);
  }
}
