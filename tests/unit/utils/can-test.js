import {
  test, module
} from 'qunit';

import Ember from 'ember';
import can from 'ember-can/utils/can';

var ability, post, container;

module('can', {
  beforeEach: function() {
    ability = Ember.Object.create();
    post    = Ember.Object.create({ title: "A Post" });

    // mock out the container, we know it works
    container = {
      lookup: function() {
        return ability;
      }
    };
  }
});


test("sets the model if supplied", function(assert) {
  can(container, "edit post", post);
  assert.equal(ability.get("model"), post, "sets the model");
});

test("sets additional properties with the model", function(assert) {
  can(container, "edit post", post, { foo: "bar" });
  assert.equal(ability.get("foo"), "bar", "sets the additional properties");
});

test("sets additional properties with no model", function(assert) {
  can(container, "edit post", { foo: "bar" });
  assert.equal(ability.get("foo"), "bar", "sets the additional properties");
});