import {
  test, module
} from 'qunit';

import {
  normalizeCombined,
  normalizeAbility,
} from 'ember-can/utils/normalize';

module('normalize');

test('normalizes basic combined string', function() {
  var norm = normalizeCombined("edit post");
  equal("canEdit", norm.ability);
  equal("post", norm.type);
});

test('removes stopwords from combined string', function() {
  var norm;

  norm = normalizeCombined("manage members in project");
  equal("canManageMembers", norm.ability);
  equal("project", norm.type);

  norm = normalizeCombined("add tags to post");
  equal("canAddTags", norm.ability);
  equal("post", norm.type);

  norm = normalizeCombined("remove tags from post");
  equal("canRemoveTags", norm.ability);
  equal("post", norm.type);

  norm = normalizeCombined("change colour of door");
  equal("canChangeColour", norm.ability);
  equal("door", norm.type);

  norm = normalizeCombined("set timezone for account");
  equal("canSetTimezone", norm.ability);
  equal("account", norm.type);
});

test('normalizes abilities', function() {
  equal(normalizeAbility("manage members"), "canManageMembers", "prepends can and camelizes");
});
