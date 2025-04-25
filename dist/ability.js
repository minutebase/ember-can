import EmberObject, { get } from '@ember/object';
import { camelize } from '@ember/string';

class EmberObjectAbility extends EmberObject {
  /**
   * Parse propertyName into ability property
   * eg: `createProject` will be parsed to `canCreateProject` using default definition
   * @public
   * @param  {[String]} propertyName [description]
   * @return {[String]}              [description]
   */
  parseProperty(propertyName) {
    return camelize(`can-${propertyName}`);
  }

  /**
   * Get parsed ability value based on propertyName
   * eg: `createProject` will return a value for `canCreateProject`
   * using default `parseProperty` definition
   * @param  {String} propertyName property name, eg. `createProject`
   * @param  {any} model
   * @param  {Object} properties
   * @return {*}                   value of parsed `propertyName` property
   */
  getAbility(propertyName, model, properties) {
    const abilityValue = get(this, this.parseProperty(propertyName));
    if (typeof abilityValue === 'function') {
      return abilityValue.call(this, model, properties);
    }
    return abilityValue;
  }
}

export { EmberObjectAbility as default };
//# sourceMappingURL=ability.js.map
