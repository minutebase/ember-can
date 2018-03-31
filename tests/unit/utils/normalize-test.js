import { test, module } from 'qunit';
import normalize from 'ember-can/utils/normalize';

module('normalize', function() {
  test('normalizes basic combined string', function(assert) {
    let norm = normalize("edit post");

    assert.equal("canEdit", norm.propertyName);
    assert.equal("post", norm.abilityName);
  });

  test('removes stopwords from combined string', function(assert) {
    let norm;

    norm = normalize("manage members in project");
    assert.equal("canManageMembers", norm.propertyName);
    assert.equal("project", norm.abilityName);

    norm = normalize("add tags to post");
    assert.equal("canAddTags", norm.propertyName);
    assert.equal("post", norm.abilityName);

    norm = normalize("remove tags from post");
    assert.equal("canRemoveTags", norm.propertyName);
    assert.equal("post", norm.abilityName);

    norm = normalize("change colour of door");
    assert.equal("canChangeColour", norm.propertyName);
    assert.equal("door", norm.abilityName);

    norm = normalize("set timezone for account");
    assert.equal("canSetTimezone", norm.propertyName);
    assert.equal("account", norm.abilityName);

    norm = normalize("comment on issues");
    assert.equal("canComment", norm.propertyName);
    assert.equal("issues", norm.abilityName);
  });
});
