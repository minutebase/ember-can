/**
 * Normalize string into an object with extracted propertyName and abilityName
 * eg. for 'create projects in account' -> `{ propertyName: 'createProjects', abilityName: 'account'}`
 * @private
 * @param  {String} string eg. 'create projects in account'
 * @return {Object}        extracted propertyName and abilityName
 */
export default function (string: string): {
    propertyName: string;
    abilityName: string;
};
//# sourceMappingURL=normalize.d.ts.map