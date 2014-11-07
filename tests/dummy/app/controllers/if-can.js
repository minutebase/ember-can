import Ember from 'ember';
import { computed } from 'ember-can';

var Post = Ember.Object.extend();

export default Ember.Controller.extend({
  canWritePost: computed.can("write post"),
  post: Post.create({
    author: 42,
    title: "Something"
  })
});