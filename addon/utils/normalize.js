import { classify } from '@ember/string';

const stopWords = ['of', 'in', 'for', 'to', 'from', 'on'];

export default function(string) {
  let parts = string.split(' ');
  let abilityName = parts.pop();
  let last = parts[parts.length - 1];

  if (stopWords.indexOf(last) !== -1) {
    parts.pop();
  }

  let ability = classify(parts.join(' '));
  let propertyName = `can${ability}`;

  return { propertyName, abilityName };
}
