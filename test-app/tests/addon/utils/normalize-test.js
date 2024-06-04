import { test, module } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Addon | Util | normalize', function (hooks) {
  setupTest(hooks);

  test('normalizes basic combined string', function (assert) {
    const ability = this.owner.lookup('service:abilities');

    let norm = ability.parse('edit post');

    assert.strictEqual(norm.propertyName, 'edit');
    assert.strictEqual(norm.abilityName, 'post');
  });

  test('always singularize abilityName', function (assert) {
    const ability = this.owner.lookup('service:abilities');

    let norm = ability.parse('edit posts');

    assert.strictEqual(norm.propertyName, 'edit');
    assert.strictEqual(norm.abilityName, 'post');
  });

  test('removes stopwords from combined string', function (assert) {
    let norm;

    const ability = this.owner.lookup('service:abilities');

    norm = ability.parse('manage members in project');
    assert.strictEqual(norm.propertyName, 'manageMembers');
    assert.strictEqual(norm.abilityName, 'project');

    norm = ability.parse('add tags to post');
    assert.strictEqual(norm.propertyName, 'addTags');
    assert.strictEqual(norm.abilityName, 'post');

    norm = ability.parse('remove tags from post');
    assert.strictEqual(norm.propertyName, 'removeTags');
    assert.strictEqual(norm.abilityName, 'post');

    norm = ability.parse('change colour of door');
    assert.strictEqual(norm.propertyName, 'changeColour');
    assert.strictEqual(norm.abilityName, 'door');

    norm = ability.parse('set timezone for account');
    assert.strictEqual(norm.propertyName, 'setTimezone');
    assert.strictEqual(norm.abilityName, 'account');

    norm = ability.parse('comment on issues');
    assert.strictEqual(norm.propertyName, 'comment');
    assert.strictEqual(norm.abilityName, 'issue');
  });
});
