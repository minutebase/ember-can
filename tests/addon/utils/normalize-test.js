import { test, module } from 'qunit';
import { setupTest } from 'ember-qunit';
import normalize from 'ember-can/utils/normalize';

module('Addon | Util | normalize', function (hooks) {
  setupTest(hooks);

  test('normalizes basic combined string', function (assert) {
    let norm = normalize('edit post');

    assert.strictEqual(norm.propertyName, 'edit');
    assert.strictEqual(norm.abilityName, 'post');
  });

  test('always singularize abilityName', function (assert) {
    let norm = normalize('edit posts');

    assert.strictEqual(norm.propertyName, 'edit');
    assert.strictEqual(norm.abilityName, 'post');
  });

  test('removes stopwords from combined string', function (assert) {
    let norm;

    norm = normalize('manage members in project');
    assert.strictEqual(norm.propertyName, 'manageMembers');
    assert.strictEqual(norm.abilityName, 'project');

    norm = normalize('add tags to post');
    assert.strictEqual(norm.propertyName, 'addTags');
    assert.strictEqual(norm.abilityName, 'post');

    norm = normalize('remove tags from post');
    assert.strictEqual(norm.propertyName, 'removeTags');
    assert.strictEqual(norm.abilityName, 'post');

    norm = normalize('change colour of door');
    assert.strictEqual(norm.propertyName, 'changeColour');
    assert.strictEqual(norm.abilityName, 'door');

    norm = normalize('set timezone for account');
    assert.strictEqual(norm.propertyName, 'setTimezone');
    assert.strictEqual(norm.abilityName, 'account');

    norm = normalize('comment on issues');
    assert.strictEqual(norm.propertyName, 'comment');
    assert.strictEqual(norm.abilityName, 'issue');
  });
});
