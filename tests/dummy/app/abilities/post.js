import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  model: null,

  author: null,

  canWrite: Ember.computed("session.isAuthenticated", function() {
    return this.get("session.isAuthenticated");
  }),

  canEdit: Ember.computed("model.author", "session.isAuthenticated", function() {
    return this.get("session.isAuthenticated") && this.get("model.author") === this.get("session.user");
  }),

  canChangeAuthor: Ember.computed("model.author", "author.id", function() {
    return this.get("author") && this.get("model") && parseInt(this.get("author.id"), null) !== this.get("model.author");
  })
});
