import Ember from 'ember';
import { computed } from 'ember-can';

var Post = Ember.Object.extend();

export default Ember.ObjectController.extend({
  ability:      computed.ability("post"),
  canWritePost: Ember.computed.alias("ability.canWrite"),
  post: Post.create({
    author: 42,
    title: "Something"
  })
});