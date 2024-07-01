import EmberObject from '@ember/object';
import { camelize } from '@ember/string';
import { get } from '@ember/object';

export default class EmberObjectAbility extends EmberObject {
  /**
   * Parse propertyName into ability property
   * eg: `createProject` will be parsed to `canCreateProject` using default definition
   * @public
   * @param  {[String]} propertyName [description]
   * @return {[String]}              [description]
   */
  parseProperty(propertyName: string): string {
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
  getAbility(
    propertyName: string,
    model?: Record<string, unknown>,
    properties?: Record<string, unknown>,
  ): unknown {
    const abilityValue = get(this, this.parseProperty(propertyName));

    if (typeof abilityValue === 'function') {
      return abilityValue.call(this, model, properties);
    }

    return abilityValue;
  }
}
