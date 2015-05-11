import Ember from 'ember';
import { computed } from 'ember-can';

var Post = Ember.Object.extend();
var Person = Ember.Object.extend();

var editablePost = Post.create({
  author: 42,
  title: "Something"
});

var otherPost = Post.create({
  author: 99,
  title: "Something Else"
});

var bob = Person.create({
  id: 69,
  name: "Bob"
});

export default Ember.Controller.extend({
  ability:      computed.ability("post"),
  canWritePost: Ember.computed.alias("ability.canWrite"),
  post: editablePost,

  bob: bob,
  foo: false,

  actions: {
    selectEditable() {
      this.set("post", editablePost);
    },
    selectOther() {
      this.set("post", otherPost);
    },
    toggleFoo() {
      this.toggleProperty("foo");
    }
  }
});