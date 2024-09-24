import Service from '@ember/service';
import Ability from '../ability.ts';
import normalizeAbilityString from '../-private/normalize.ts';
export default class AbilitiesService extends Service {
    /**
     * Parse abilityString into an object with extracted propertyName and abilityName
     * eg. for 'create projects in account' -> `{ propertyName: 'createProjects', abilityName: 'account'}`
     * @public
     * @param  {String} string eg. 'create projects in account'
     * @return {Object}        extracted propertyName and abilityName
     */
    parse(abilityString: string): ReturnType<typeof normalizeAbilityString>;
    /**
     * Create an instance of Ability
     * @public
     * @param  {String} abilityName     name of ability class
     * @param  {*}      model
     * @param  {Object} [properties={}] extra properties (to be set on the ability instance)
     * @return {Ability}                Ability instance of requested ability
     */
    abilityFor(abilityName: string, model?: unknown, properties?: Record<string, unknown>): Ability;
    /**
     * Returns a value for requested ability in specified ability class
     * @public
     * @param  {String} propertyName name of ability, eg `createProjects`
     * @param  {String} abilityName  name of ability class
     * @param  {*}      model
     * @param  {Object} properties   extra properties (to be set on the ability instance)
     * @return {*}                   value of ability
     */
    valueFor(propertyName: string, abilityName: string, model?: unknown, properties?: Record<string, unknown>): unknown;
    /**
     * Returns `true` if ability is permitted
     * @public
     * @param  {[type]} abilityString eg. 'create projects in account'
     * @param  {*}      model
     * @param  {[type]} properties    extra properties (to be set on the ability instance)
     * @return {Boolean}              value of ability converted to boolean
     */
    can(abilityString: string, model?: unknown, properties?: Record<string, unknown>): boolean;
    /**
     * Returns `true` if ability is not permitted
     * @public
     * @param  {[type]} abilityString eg. 'create projects in account'
     * @param  {*}      model
     * @param  {[type]} properties    extra properties (to be set on the ability instance)
     * @return {Boolean}              value of ability converted to boolean
     */
    cannot(abilityString: string, model?: unknown, properties?: Record<string, unknown>): boolean;
}
//# sourceMappingURL=abilities.d.ts.map