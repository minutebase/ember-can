import Ember from 'ember';
import can from 'ember-can/utils/can';

var ability, post, container;

module('can', {
  setup: function() {
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


test("sets the model if supplied", function() {
  can(container, "edit post", post);
  equal(ability.get("model"), post, "sets the model");
});

test("sets additional properties with the model", function() {
  can(container, "edit post", post, { foo: "bar" });
  equal(ability.get("foo"), "bar", "sets the additional properties");
});

test("sets additional properties with no model", function() {
  can(container, "edit post", { foo: "bar" });
  equal(ability.get("foo"), "bar", "sets the additional properties");
});