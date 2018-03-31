import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service('session'),

  model: null,

  author: null,

  canWrite: computed("session.isAuthenticated", function() {
    return this.get("session.isAuthenticated");
  }),

  canEdit: computed("model.author", "session.isAuthenticated", function() {
    return this.get("session.isAuthenticated") && this.get("model.author") === this.get("session.user");
  }),

  canChangeAuthor: computed("model.author", "author.id", function() {
    return this.get("author") && this.get("model") && parseInt(this.get("author.id"), null) !== this.get("model.author");
  })
});
