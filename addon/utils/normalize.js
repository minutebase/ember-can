import { camelize } from '@ember/string';
import { singularize } from 'ember-inflector';

const stopWords = ['of', 'in', 'for', 'to', 'from', 'on', 'as'];

/**
 * Normalize string into an object with extracted propertyName and abilityName
 * eg. for 'create projects in account' -> `{ propertyName: 'createProjects', abilityName: 'account'}`
 * @private
 * @param  {String} string eg. 'create projects in account'
 * @return {Object}        extracted propertyName and abilityName
 */
export default function(string) {
  let parts = string.split(' ');
  let abilityName = singularize(parts.pop());
  let last = parts[parts.length - 1];

  if (stopWords.includes(last)) {
    parts.pop();
  }

  let propertyName = camelize(parts.join(' '));

  return { propertyName, abilityName };
}
