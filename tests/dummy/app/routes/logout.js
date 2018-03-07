import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  session: service(),

  setupController: function() {
    this.get("session").set("isAuthenticated", false);
    this.get("session").set("user", null);
  }
});