import EmberObject from '@ember/object';
export default class EmberObjectAbility extends EmberObject {
    /**
     * Parse propertyName into ability property
     * eg: `createProject` will be parsed to `canCreateProject` using default definition
     * @public
     * @param  {[String]} propertyName [description]
     * @return {[String]}              [description]
     */
    parseProperty(propertyName: string): string;
    /**
     * Get parsed ability value based on propertyName
     * eg: `createProject` will return a value for `canCreateProject`
     * using default `parseProperty` definition
     * @param  {String} propertyName property name, eg. `createProject`
     * @param  {any} model
     * @param  {Object} properties
     * @return {*}                   value of parsed `propertyName` property
     */
    getAbility(propertyName: string, model?: unknown, properties?: Record<string, unknown>): unknown;
}
//# sourceMappingURL=ability.d.ts.map