import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { click, fillIn, findAll, currentRouteName, visit } from '@ember/test-helpers';

module('Acceptance | IfCanTest', function(hooks) {
  setupApplicationTest(hooks);

  test('if-can helper shows content when the user is allowed', async function(assert) {
    await visit('/login');
    await visit('/');

    assert.ok(!!findAll("#write-post").length, "shows the write button");
    assert.ok(!findAll("#cant-write").length, "doesn't show the can't write message");
  });

  test('if-cannot helper shows content when the user is allowed', async function(assert) {
    await visit('/login');
    await visit('/');

    assert.ok(!findAll("#cannot-write").length, "doesn't show the can't write message");
    assert.ok(!!findAll("#cannot-can-write-post").length, "shows the write button");
  });

  test('if-can helper hides content when the user is not allowed', async function(assert) {
    await visit('/logout');
    await visit('/');

    assert.ok(!!findAll("#cant-write").length, "shows the can't write message");
    assert.ok(!findAll("#write-post").length, "doesn't show the write button");
  });

  test('if-can helper with resource shows content when the user is allowed', async function(assert) {
    await visit('/login');
    await visit('/');

    assert.ok(!!findAll("#edit-post").length, "shows the edit button");
    assert.ok(!findAll("#cant-edit").length, "doesn't show the can't edit message");
  });

  test('if-can helper with resource hides content when the user is not allowed', async function(assert) {
    await visit('/logout');
    await visit('/');

    assert.ok(!!findAll("#cant-edit").length, "shows the can't edit message");
    assert.ok(!findAll("#edit-post").length, "doesn't show the edit button");
  });

  test('if-can helper can have additional properties', async function(assert) {
    await visit("/logout");
    await visit("/");

    assert.ok(!!findAll("#can-with-additional").length, "shows the can message");
    assert.ok(!findAll("#cant-with-additional").length, "doesn't show can't message");

    await fillIn("#author-id-input", 42);

    assert.ok(!findAll("#can-with-additional").length, "doesn't show the can message");
    assert.ok(!!findAll("#cant-with-additional").length, "shows the can't message");
  });


  test('if-can computed property shows content when the user is allowed', async function(assert) {
    await visit('/login');
    await visit('/');

    assert.ok(!!findAll("#write-post-binding").length, "shows the allowed content");
    assert.ok(!findAll("#cant-write-post-binding").length, "doesn't show the else clause");
  });

  test('if-can computed property hides content when the user is not allowed', async function(assert) {
    await visit('/logout');
    await visit('/');

    assert.ok(!!findAll("#cant-write-post-binding").length, "shows the else clause");
    assert.ok(!findAll("#write-post-binding").length, "hides the dis-allowed content");
  });

  test('can mixin can be used to allow access to a route if the user is allowed access', async function(assert) {
    await visit('/login');
    await visit('/new');

    assert.equal(currentRouteName(), "new");
  });

  test('can mixin can be used to restrict access to a route if the user is not allowed access', async function(assert) {
    await visit('/logout');
    await visit('/new');

    assert.equal(currentRouteName(), "index");
  });

  test('changing the resource should update the helper contents', async function(assert) {
    await visit('/login');
    await visit('/');

    assert.ok(!!findAll("#edit-post").length, "shows the edit button");
    assert.ok(!findAll("#cant-edit").length, "doesn't show the can't edit message");

    await click("#select-non-editable");

    assert.ok(!findAll("#edit-post").length, "doesn't show the edit button");
    assert.ok(!!findAll("#cant-edit").length, "shows the can't edit message");
  });
});
