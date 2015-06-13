import Ember from 'ember';

import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service(),

  model: null,

  author: null,

  canWrite: Ember.computed("session.isAuthenticated", {
    get() {
      return this.get("session.isAuthenticated");
    }
  }),

  canEdit: Ember.computed("model.title", "session.isAuthenticated", {
    get() {
      return this.get("session.isAuthenticated") && this.get("model.author") === this.get("session.user");
    }
  }),

  canChangeAuthor: Ember.computed("model.author", "author.id", {
    get() {
      return this.get("author") && this.get("model") && parseInt(this.get("author.id"), null) !== this.get("model.author");
    }
  })
});