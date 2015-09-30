import {
  test, module
} from 'qunit';

import {
  normalizeCombined
} from 'ember-can/utils/normalize';

module('normalize');

test('normalizes basic combined string', function(assert) {
  var norm = normalizeCombined("edit post");
  assert.equal("canEdit", norm.propertyName);
  assert.equal("post", norm.abilityName);
});

test('removes stopwords from combined string', function(assert) {
  var norm;

  norm = normalizeCombined("manage members in project");
  assert.equal("canManageMembers", norm.propertyName);
  assert.equal("project", norm.abilityName);

  norm = normalizeCombined("add tags to post");
  assert.equal("canAddTags", norm.propertyName);
  assert.equal("post", norm.abilityName);

  norm = normalizeCombined("remove tags from post");
  assert.equal("canRemoveTags", norm.propertyName);
  assert.equal("post", norm.abilityName);

  norm = normalizeCombined("change colour of door");
  assert.equal("canChangeColour", norm.propertyName);
  assert.equal("door", norm.abilityName);

  norm = normalizeCombined("set timezone for account");
  assert.equal("canSetTimezone", norm.propertyName);
  assert.equal("account", norm.abilityName);
});
