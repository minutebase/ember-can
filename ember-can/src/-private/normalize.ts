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
export default function (string: string) {
  const parts = string.split(' ');
  const abilityName = singularize(parts.pop() as string);
  const last = parts[parts.length - 1];

  if (stopWords.includes(last as string)) {
    parts.pop();
  }

  const propertyName = camelize(parts.join(' '));

  return { propertyName, abilityName };
}
