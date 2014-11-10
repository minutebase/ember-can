import { Ability } from 'ember-can';

export default Ability.extend({
  model: null,

  canWrite: function() {
    return this.get("session.isAuthenticated");
  }.property("session.isAuthenticated"),

  canEdit: function() {
    return this.get("session.isAuthenticated") && this.get("model.author") === this.get("session.user");
  }.property("model.title", "session.isAuthenticated")
});