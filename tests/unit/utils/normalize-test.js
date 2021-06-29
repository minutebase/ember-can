import { test, module } from 'qunit';
import normalize from 'ember-can/utils/normalize';

module('Unit | Util | normalize', function () {
  test('normalizes basic combined string', function (assert) {
    let norm = normalize('edit post');

    assert.equal(norm.propertyName, 'edit');
    assert.equal(norm.abilityName, 'post');
  });

  test('always singularize abilityName', function (assert) {
    let norm = normalize('edit posts');

    assert.equal(norm.propertyName, 'edit');
    assert.equal(norm.abilityName, 'post');
  });

  test('removes stopwords from combined string', function (assert) {
    let norm;

    norm = normalize('manage members in project');
    assert.equal(norm.propertyName, 'manageMembers');
    assert.equal(norm.abilityName, 'project');

    norm = normalize('add tags to post');
    assert.equal(norm.propertyName, 'addTags');
    assert.equal(norm.abilityName, 'post');

    norm = normalize('remove tags from post');
    assert.equal(norm.propertyName, 'removeTags');
    assert.equal(norm.abilityName, 'post');

    norm = normalize('change colour of door');
    assert.equal(norm.propertyName, 'changeColour');
    assert.equal(norm.abilityName, 'door');

    norm = normalize('set timezone for account');
    assert.equal(norm.propertyName, 'setTimezone');
    assert.equal(norm.abilityName, 'account');

    norm = normalize('comment on issues');
    assert.equal(norm.propertyName, 'comment');
    assert.equal(norm.abilityName, 'issue');
  });
});
