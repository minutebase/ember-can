import { test, module } from 'qunit';
import normalize from 'ember-can/utils/normalize';

module('Unit | Util | normalize', function () {
  test('normalizes basic combined string', function (assert) {
    let norm = normalize('edit post');

    assert.equal('edit', norm.propertyName);
    assert.equal('post', norm.abilityName);
  });

  test('always singularize abilityName', function (assert) {
    let norm = normalize('edit posts');

    assert.equal('edit', norm.propertyName);
    assert.equal('post', norm.abilityName);
  });

  test('removes stopwords from combined string', function (assert) {
    let norm;

    norm = normalize('manage members in project');
    assert.equal('manageMembers', norm.propertyName);
    assert.equal('project', norm.abilityName);

    norm = normalize('add tags to post');
    assert.equal('addTags', norm.propertyName);
    assert.equal('post', norm.abilityName);

    norm = normalize('remove tags from post');
    assert.equal('removeTags', norm.propertyName);
    assert.equal('post', norm.abilityName);

    norm = normalize('change colour of door');
    assert.equal('changeColour', norm.propertyName);
    assert.equal('door', norm.abilityName);

    norm = normalize('set timezone for account');
    assert.equal('setTimezone', norm.propertyName);
    assert.equal('account', norm.abilityName);

    norm = normalize('comment on issues');
    assert.equal('comment', norm.propertyName);
    assert.equal('issue', norm.abilityName);
  });
});
