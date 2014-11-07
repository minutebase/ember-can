import { Ability } from 'ember-can';

export default Ability.extend({
  isLoggedIn: function() {
    return this.session.get("isAuthenticated");
  }.checks("write post"),

  isAuthor: function(post) {
    return post.get("author") === this.session.get("user");
  }.checks("edit post")
});