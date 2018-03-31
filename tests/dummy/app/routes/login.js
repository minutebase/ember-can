import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  session: service('session'),

  setupController: function() {
    this.get("session").set("isAuthenticated", true);
    this.get("session").set("user", 42);
  }
});
