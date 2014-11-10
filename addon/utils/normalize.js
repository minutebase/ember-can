import Ember from 'ember';

var classify    = Ember.String.classify;
var singularize = Ember.String.singularize;

var stopwords = [
  "of", "in", "for", "to", "from"
];

export function normalizeCombined(abilityName) {
  var parts   = abilityName.split(' ');

  var typeStr = parts.pop();
  var type    = normalizeType(typeStr);

  var last = parts[parts.length-1];
  if (stopwords.indexOf(last) !== -1) {
    parts.pop();
  }

  var ability = normalizeAbility(parts.join(" "));

  return {
    ability: ability,
    type:    type
  };
}

export function normalizeAbility(ability) {
  return 'can'+classify(ability);
}

export function normalizeType(type) {
  return singularize(type);
}