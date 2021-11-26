import EmberObject from '@ember/object';
import { camelize } from '@ember/string';

export default class Ability extends EmberObject {
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
   * @return {*}                   value of parsed `propertyName` property
   */
  getAbility(propertyName) {
    // eslint-disable-next-line ember/classic-decorator-no-classic-methods
    return this.get(this.parseProperty(propertyName));
  }
}
