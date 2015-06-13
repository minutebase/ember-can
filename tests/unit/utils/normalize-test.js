import {
  test, module
} from 'qunit';

import {
  normalizeCombined,
  normalizeAbility,
} from 'ember-can/utils/normalize';

module('normalize');

test('normalizes basic combined string', function(assert) {
  var norm = normalizeCombined("edit post");
  assert.equal("canEdit", norm.ability);
  assert.equal("post", norm.type);
});

test('removes stopwords from combined string', function(assert) {
  var norm;

  norm = normalizeCombined("manage members in project");
  assert.equal("canManageMembers", norm.ability);
  assert.equal("project", norm.type);

  norm = normalizeCombined("add tags to post");
  assert.equal("canAddTags", norm.ability);
  assert.equal("post", norm.type);

  norm = normalizeCombined("remove tags from post");
  assert.equal("canRemoveTags", norm.ability);
  assert.equal("post", norm.type);

  norm = normalizeCombined("change colour of door");
  assert.equal("canChangeColour", norm.ability);
  assert.equal("door", norm.type);

  norm = normalizeCombined("set timezone for account");
  assert.equal("canSetTimezone", norm.ability);
  assert.equal("account", norm.type);
});

test('normalizes abilities', function(assert) {
  assert.equal(normalizeAbility("manage members"), "canManageMembers", "prepends can and camelizes");
});
