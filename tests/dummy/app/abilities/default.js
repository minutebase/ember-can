import { Ability } from 'ember-can';

export default Ability.extend({
  isLoggedIn: function() {
    return this.session.get("isAuthenticated");
  }.checks("write post")
});