// TODO - get rid of the can util & this weird test setup

import {
  test, module
} from 'qunit';

import Ember from 'ember';
import can from 'ember-can/utils/can';
import Service from 'ember-can/services/can';

var ability, post, container;

module('can', {
  beforeEach: function() {
    ability = Ember.Object.create();
    post    = Ember.Object.create({ title: "A Post" });

    var service = Service.create();

    // mock out the container, we know it works
    container = {
      lookup: function(what) {
        if (what === "service:can") {
          return service;
        } else {
          return ability;
        }
      }
    };

    service.set("container", container);
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