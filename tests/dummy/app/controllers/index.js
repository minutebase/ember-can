import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { computed } from 'ember-can';

let Post = EmberObject.extend();
let Person = EmberObject.extend();

let editablePost = Post.create({
  author: 42,
  title: "Something"
});

let otherPost = Post.create({
  author: 99,
  title: "Something Else"
});

let bob = Person.create({
  id: 69,
  name: "Bob"
});

export default Controller.extend({
  ability:      computed.ability("post"),
  canWritePost: alias("ability.canWrite"),
  post: editablePost,

  bob: bob,
  foo: false,

  actions: {
    selectEditable: function() {
      this.set("post", editablePost);
    },
    selectOther:    function() {
      this.set("post", otherPost);
    }
  }
});
