# Ember-can

Simple authorisation addon for Ember.

[![Build Status](https://travis-ci.org/MinuteBase/ember-can.svg?branch=master)](https://travis-ci.org/MinuteBase/ember-can)

## Quick Example

You want to conditionally allow creating a new blog post:

```handlebars
{{#if-can "write post"}}
  <button {{action "new"}}>Write Post</button>
{{else}}
  You can't write a new post
{{/if-can}}
```

We define an ability for the `Post` resource in `/app/abilities/post.js`:

```javascript
import { Ability } from 'ember-can';

export default Ability.extend({
  canWrite: function() {
    return this.get("user.isAdmin");
  }.property("user.isAdmin")
});
```

We can also re-use the same ability to check if a user has access to a route:

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

## Installation

Install this addon via npm:

```
npm install --save-dev ember-can
```

## Abilities

An ability class protects an individual model / resource which is available in the ability as `model`.

The ability checks themselves are simply standard Ember objects with computed properties:

```javascript
import { Ability } from 'ember-can';

export default Ability.extend({

  // only admins can write a post
  canWrite: function() {
    return this.get("user.isAdmin");
  }.property("user.isAdmin"),

  // only the person who wrote a post can edit it
  canEdit: function() {
    return this.get("user.id") === this.get("model.author");
  }.property("user.id", "model.author")

});
```

## Handlebars Helpers

There's a `{{if-can}}` and corresponding `{{if-unless}}` helper which behave just like their `{{if}}` and `{{unless}}` counterparts.

The first parameter is a string which is used to find the ability class call the appropriate property (see "Looking up abilities" below).

The second parameter is an optional model object which will be given to the ability to check permissions.

As activities are standard Ember objects and computed properties if anything changes then the view will
automatically update accordingly.

### if-can

```handlebars
{{#if-can "edit post" post}}
...
{{else}}
...
{{/if-can}}
```

### unless-can

```handlebars
{{#unless-can "write post"}}
  You cannot write new posts.
{{/unless-can}}
```

### Additional attributes

If you need more than a single resource in an ability, you can pass them additional attributes like so:

```handlebars
{{#if-can "remove member from project" project member=member}}
...
{{/if-can}}
```

## Looking up abilities

In the example above we said `{{#if-can "write post"}}`, how do we find the ability class & know which property to use for that?

First we chop off the last word and use the singular version as the resource type.

Then for the ability name we remove some basic stopwords (of, for in) at the end, prepend with "can" and camelCase it all.

For example:

| String                      | property           | resource                |
|-----------------------------|--------------------|-------------------------|
| write post                  | `canWrite`         | `/abilities/post.js`    |  
| manage members in projects  | `canManageMembers` | `/abilities/project.js` |
| view profile for user       | `canViewProfile`   | `/abilities/user.js`    |  

Current stopwords which are ignored are:

* for
* from
* in
* of
* to

## Injecting the user

How does the ability know who's logged in? This depends on how you implement it in your app!

If you're using ember-simple-auth, you'll probably want to inject the `simple-auth-session:main` session
into the ability classes.

To do this, edit your app's `/config/environment.js` like so:

```javascript
ENV["ember-can"] = {
  "inject": {
    "session": "simple-auth-session:main"
  }
};
```

The ability classes will now have access to `session` which can then be used to check if the user is logged in etc...

## Controllers, components & computed properties

In a controller or component, you may want to expose abilities as computed properties
so that you can bind to them in your templates.

To do that there's a helper to lookup the ability for a resource, which you can
then alias properties:

```javascript
import { computed } from 'ember-can';
import Ember from 'ember';

export default Ember.Controller.extend({
  post: null, // set by the router

  // looks up the "post" ability and sets the model as the controller's "post" property
  ability: computed.ability("post"),

  // alias properties to the ability for easier access
  canEditPost: Ember.computed.alias("ability", "canEdit")
});
```

`computed.ability` assumes that the property for the resource is the same as the ability resource.
If that's not the case, include it as the second parameter.

For example, in an `ObjectController` we probably want to use the `content`:

```javascript
import { computed } from 'ember-can';
import Ember from 'ember';

export default Ember.ObjectController.extend({
  // looks up the "post" ability and sets the model as the controller's "content" property
  ability: computed.ability("post", "content")
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
