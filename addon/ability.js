import EmberObject from '@ember/object';
import { camelize } from '@ember/string';

export default EmberObject.extend({
  model: null,

  /**
   * Parse propertyName into ability property
   * eg: `createProject` will be parsed to `canCreateProject` using default definition
   * @public
   * @param  {[String]} propertyName [description]
   * @return {[String]}              [description]
   */
  parseProperty(propertyName) {
    return camelize(`can-${propertyName}`);
  },

  /**
   * Get parsed ability value based on propertyName
   * eg: `createProject` will return a value for `canCreateProject`
   * using default `parseProperty` definition
   * @private
   * @param  {String} propertyName property name, eg. `createProject`
   * @return {*}                   value of parsed `propertyName` property
   */
  getAbility(propertyName) {
    return this.get(this.parseProperty(propertyName));
  }
});
