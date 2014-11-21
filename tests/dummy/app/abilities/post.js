import { Ability } from 'ember-can';

export default Ability.extend({
  model: null,

  author: null,

  canWrite: function() {
    return this.get("session.isAuthenticated");
  }.property("session.isAuthenticated"),

  canEdit: function() {
    return this.get("session.isAuthenticated") && this.get("model.author") === this.get("session.user");
  }.property("model.title", "session.isAuthenticated"),

  canChangeAuthor: function() {
    return this.get("author") && this.get("model") && parseInt(this.get("author.id"), null) !== this.get("model.author");
  }.property("model.author", "author.id")
});