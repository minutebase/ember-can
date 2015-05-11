import {
  test, module
} from 'qunit';

import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: IfCanHelper', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('if-can helper shows content when the user is allowed', function(assert) {
  visit('/login');
  visit('/');

  andThen(function() {
    assert.ok(find("#write-post").length, "shows the write button");
    assert.ok(!find("#cant-write").length, "doesn't show the can't write message");
  });
});

test('if-can helper hides content when the user is not allowed', function(assert) {
  visit('/logout');
  visit('/');

  andThen(function() {
    assert.ok(find("#cant-write").length, "shows the can't write message");
    assert.ok(!find("#write-post").length, "doesn't show the write button");
  });
});

test('if-can helper with resource shows content when the user is allowed', function(assert) {
  visit('/login');
  visit('/');

  andThen(function() {
    assert.ok(find("#edit-post").length, "shows the edit button");
    assert.ok(!find("#cant-edit").length, "doesn't show the can't edit message");
  });
});

test('if-can helper with resource hides content when the user is not allowed', function(assert) {
  visit('/logout');
  visit('/');

  andThen(function() {
    assert.ok(find("#cant-edit").length, "shows the can't edit message");
    assert.ok(!find("#edit-post").length, "doesn't show the edit button");
  });
});

test('if-can helper can have additional properties', function(assert) {
  visit("/logout");
  visit("/");

  andThen(function() {
    assert.ok(find("#can-with-additional").length, "shows the can message");
    assert.ok(!find("#cant-with-additional").length, "doesn't show can't message");
  });

  fillIn("#author-id-input", 42);

  andThen(function() {
    assert.ok(!find("#can-with-additional").length, "doesn't show the can message");
    assert.ok(find("#cant-with-additional").length, "shows the can't message");
  });
});


test('if-can computed property shows content when the user is allowed', function(assert) {
  visit('/login');
  visit('/');

  andThen(function() {
    assert.ok(find("#write-post-binding").length, "shows the allowed content");
    assert.ok(!find("#cant-write-post-binding").length, "doesn't show the else clause");
  });
});

test('if-can computed property hides content when the user is not allowed', function(assert) {
  visit('/logout');
  visit('/');

  andThen(function() {
    assert.ok(find("#cant-write-post-binding").length, "shows the else clause");
    assert.ok(!find("#write-post-binding").length, "hides the dis-allowed content");
  });
});

test('can mixin can be used to allow access to a route if the user is allowed access', function(assert) {
  visit('/login');
  visit('/new');

  andThen(function() {
    assert.equal(currentRouteName(), "new");
  });
});

test('can mixin can be used to restrict access to a route if the user is not allowed access', function(assert) {
  visit('/logout');
  visit('/new');

  andThen(function() {
    assert.equal(currentRouteName(), "index");
  });
});

test('changing the resource should update the helper contents', function(assert) {
  visit('/login');
  visit('/');

  andThen(function() {
    assert.ok(find("#edit-post").length, "shows the edit button");
    assert.ok(!find("#cant-edit").length, "doesn't show the can't edit message");
  });

  click("#select-non-editable");

  andThen(function() {
    assert.ok(!find("#edit-post").length, "doesn't show the edit button");
    assert.ok(find("#cant-edit").length, "shows the can't edit message");
  });
});