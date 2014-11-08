# Ember-can

Simple (work in progress) authorisation addon for Ember.

## Note

This is a work in progress, some of this readme is currently a lie.

The `{{if-can}}` helper approach seems a bad way to go, as it's unaware of the underlying binding rules for an authorisation.

E.g. `{{if-can "write post"}}` doesn't know that depends on `user.isAdmin` etc and so can't update if that property changes.

I think a better approach is "bindings all the way", and instead of a handlebars helper we can have a mixin which makes available the rules.

So `{{if-can "write post"}}` would change to `{{if canWritePost}}` which will update as expected.

Resource permissions are slightly trickier, but doable with item controllers & mixins etc so that `{{if canEditPost}}` knows what the current
post is.

## Quick Example

You want to conditionally show/hide a button based on whether the logged in user is an admin:

```handlebars
{{#if-can "write post"}}
  <button {{action "new"}}>Write Post</button>
{{else}}
  You can't write a new post
{{/if-can}}
```

We define an ability for the user in `/app/abilities/default.js`:

```javascript
import { Ability, checks } from 'ember-can';

export default Ability.extend({
  isAdmin: function() {
    return this.user && this.user.get("isAdmin");
  }.checks("write post")
});
```

Alternatively if you want to restrict access to a route:

```javascript
import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  beforeModel: function() {
    if (!this.can("write post")) {
      this.transitionTo("index");
    }
  }
});
```

## Defining Abilities

You can have multiple checks for the same ability, they are checked in the order they are defined
and stop at the first failure.

For example, if a user needs to be logged in as an admin to edit a post *and* be the author of the post, we
can address that like so:

```javascript
import { Ability, checks } from 'ember-can';

export default Ability.extend({
  isLoggedIn: function() {
    return !!this.user;
  }.checks("edit post"),

  isAdmin: function() {
    return this.user.get("isAdmin");
  }.checks("edit post"),

  isOwner: function(post) {
    return this.user.get("id") === post.get("owner");
  }.checks("edit post")
});
```

Note that you could also do the same thing by simply calling other utility functions,
which can be more readable depending on your domain:

```javascript
import { Ability } from 'ember-can';

export default Ability.extend({
  isLoggedIn: function() {
    return !!this.user;
  },

  isAdmin: function() {
    return this.user.get("isAdmin");
  },

  isOwner: function(post) {
    return this.user.get("id") === post.get("owner");
  },

  canEditPost: function(post) {
    return this.isLoggedIn() && this.isAdmin() && this.isOwner(post);
  }.checks("edit post")
});
```

## Role based abilities

You can define different abilities based on the user's role, or any other property, by defining a resolver.

For example, we could have different ability classes based on whether the user is logged in and if they
are an admin etc:

```javascript
import { Resolver } from 'ember-can';
export default Resolver.extend({
  lookup: function() {
    if (!this.user) {
      return "guest";
    } else if (this.user.get("isAdmin")) {
      return "admin";
    } else {
      return "member";
    }
  }
});
```

## Injecting the user

How does the ability know who's logged in? This depends on how you implement it in your app!

If you're using ember-simple-auth, you'll probably want to inject the `simple-auth-session:main` session
into the ability classes:

```json
{
  "ember-can": {
    "inject": { "session": "simple-auth-session:main" },
  }
}
```

## Controllers, components & computed properties

In a controller or component, you may want to expose abilities as computed properties
so that you can bind to them in your templates.

As this is a fairly common need, there's a computed property variant of `can` and `cannot` you can use.

```javascript
import { computed } from 'ember-can';
import Ember from 'ember';

export default Ember.Controller.extend({
  canEditPost: computed.can("edit post", "post")
});
```

Which is pretty much equivalent to:

```javascript
import { CanMixin } from 'ember-can';
import Ember from 'ember';

export default Ember.Controller.extend(CanMixin, {
  canEditPost: function() {
    var post = this.get("post");
    return this.can("edit post", this.get("post"));
  }.property("post")
});
```

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
