# Ember-can

Simple authorisation addon for Ember.

[![npm version](https://badge.fury.io/js/ember-can.svg)](http://badge.fury.io/js/ember-can)
[![Ember Observer Score](http://emberobserver.com/badges/ember-can.svg)](http://emberobserver.com/addons/ember-can)
[![Build Status](https://travis-ci.org/minutebase/ember-can.svg?branch=master)](https://travis-ci.org/minutebase/ember-can)

## Breaking Changes

* v0.6.0 - support for unit testing abilities added - run `ember g ember-can`
* v0.5.0 - support for Ember 1.13+ using new Ember.Helper, removed injections
* v0.4.0 - stopped singularizing ability names to work with pods
* v0.3.0 - removed `if-can` helper, uses sub-expression instead

See [UPGRADING](UPGRADING.md) for more details.

## Quick Example

You want to conditionally allow creating a new blog post:

```handlebars
{{#if (can "write post")}}
  <button type="button" onclick={{action "new"}}>Write Post</button>
{{else}}
  You can't write a new post
{{/if}}
```

We define an ability for the `Post` resource in `/app/abilities/post.js`:

```javascript
import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  canWrite: Ember.computed('user.isAdmin', function() {
    return this.get('user.isAdmin');
  })
});
```

We can also re-use the same ability to check if a user has access to a route:

```javascript
import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  beforeModel() {
    let result = this._super(...arguments);

    if (!this.can('write post')) {
      return this.transitionTo('index');
    }

    return result;
  }
});
```

## Installation

Install this addon via ember-cli:

```
ember install ember-can
```

## Compatibility

| Ember Version     | Ember Can Release     |
| ----------------- | --------------------- |
| 1.9.x             | 0.2                   |
| 1.10 through 1.12 | 0.4                   |
| 1.13 and beyond   | 0.5+                  |

## Abilities

An ability class protects an individual model / resource which is available in the ability as `model`.

The ability checks themselves are simply standard Ember objects with computed properties:

```javascript
import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  // only admins can write a post
  canWrite: Ember.computed('user.isAdmin', function() {
    return this.get('user.isAdmin');
  }),

  // only the person who wrote a post can edit it
  canEdit: Ember.computed('user.id', 'model.author', function() {
    return this.get('user.id') === this.get('model.author');
  })
});
```

## Handlebars Helpers

The `can` helper is meant to be used with `{{if}}` and `{{unless}}` to protect a block.

The first parameter is a string which is used to find the ability class call the appropriate property (see [Looking up abilities](#looking-up-abilities)).

The second parameter is an optional model object which will be given to the ability to check permissions.

As activities are standard Ember objects and computed properties if anything changes then the view will
automatically update accordingly.

```handlebars
{{#if (can "edit post" post)}}
  ...
{{else}}
  ...
{{/if}}
```

As it's a sub-expression, you can use it anywhere a helper can be used.
For example to give a div a class based on an ability you can use an inline if:

```handlebars
<div class="{{if (can 'edit post' post) 'is-editable'}}">

</div>
```

## Additional attributes

If you need more than a single resource in an ability, you can pass them additional attributes.

You can do this in the helpers, for example this will set the `model` to `project` as usual,
but also `member` as a bound property.

```handlebars
{{#if (can "remove member from project" project member=member)}}
  ...
{{/if}}
```

Similarly in routes you can pass additional attributes after or instead of the resource:

```javascript
this.can('edit post', post, { author: bob });
this.can('write post', { project: project });
```

These will set `author` and `project` on the ability respectively so you can use them in the checks.

## Looking up abilities

In the example above we said `{{#if (can "write post")}}`, how do we find the ability class & know which property to use for that?

First we chop off the last word as the resource type which is looked up via the container.

The ability file can either be looked up in the top level `/app/abilities` directory, or via pod structure.

Then for the ability name we remove some basic stopwords (of, for in) at the end, prepend with "can" and camelCase it all.

For example:

| String                      | property           | resource                | pod                            |
|-----------------------------|--------------------|-------------------------|--------------------------------|
| write post                  | `canWrite`         | `/abilities/post.js`    | `app/pods/post/ability.js`     |
| manage members in projects  | `canManageMembers` | `/abilities/projects.js`| `app/pods/projects/ability.js` |
| view profile for user       | `canViewProfile`   | `/abilities/user.js`    | `app/pods/user/ability.js`     |

Current stopwords which are ignored are:

* for
* from
* in
* of
* to
* on

## Custom Ability Lookup

The default lookup is a bit "clever"/"cute" for some people's tastes, so you can override this if you choose.

Simply extend the default `CanService` in `app/services/can.js` and override `parse`.

`parse` takes the ability string eg "manage members in projects" and should return an object with `propertyName` and `abilityName`.

For example, to use the format "person.canEdit" instead of the default "edit person" you could do the following:

```javascript
// app/services/can.js
import { CanService } from 'ember-can';

export default CanService.extend({
  parse(str) {
    const [abilityName, propertyName] = str.split('.');
    return {
      propertyName,
      abilityName
    }
  }
});
```

## Injecting the user

How does the ability know who's logged in? This depends on how you implement it in your app!

If you're using an `Ember.Service` as your session, you can just inject it into the ability:

```javascript
// app/abilities/foo.js
import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service()
});
```

If you're using ember-simple-auth, you'll probably want to inject the `simple-auth-session:main` session
into the ability classes.

To do this, add an initializer like so:

```javascript
// app/initializers/inject-session-into-abilities.js
export default {
  name: 'inject-session-into-abilities',
  initialize(app) {
    app.inject('ability', 'session', 'simple-auth-session:main');
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
  ability: computed.ability('post'),

  // alias properties to the ability for easier access
  canEditPost: Ember.computed.reads('ability.canEdit')
});
```

`computed.ability` assumes that the property for the resource is the same as the ability resource.
If that's not the case, include it as the second parameter.

```javascript
import { computed } from 'ember-can';
import Ember from 'ember';

export default Ember.Controller.extend({
  // looks up the "post" ability and sets the model as the controller's "content" property
  ability: computed.ability('post', 'content')
});
```

## Testing
Make sure that you've either `ember install`-ed this addon, or run the addon
blueprint via `ember g ember-can`. This is an important step that teaches the
test resolver how to resolve abilities from the file structure.

### Unit testing abilities

An ability unit test will be created each time you generate a new ability via
`ember g ability <name>`. The package currently supports generating QUnit and
Mocha style tests.

### Unit testing in your app

To unit test modules that use the `can` helper, you'll need to explicitly add `needs` for the
ability and helper file like this:
``` needs: ['helper:can', 'ability:foo'] ```

### Integration testing in your app

For integration testing components, you should not need to specify anything explicitly. The
helper and your abilities should be available to your components automatically.

## Contributing

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
