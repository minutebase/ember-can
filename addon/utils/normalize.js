import Ember from 'ember';

const classify = Ember.String.classify;

const stopwords = [
  "of", "in", "for", "to", "from", "on"
];

export function normalizeCombined(str) {
  const parts = str.split(' ');

  const abilityName = parts.pop();

  const last = parts[parts.length - 1];
  if (stopwords.indexOf(last) !== -1) {
    parts.pop();
  }

  const propertyName = normalizeAbilityMethod(parts.join(" "));

  return {
    propertyName, abilityName
  };
}

function normalizeAbilityMethod(str) {
  return 'can' + classify(str);
}
