# Upgrading

Whilst experimenting with the API & benefiting from changes in Ember, we've had a few backwards incompatible changes.

Here are the details on updating from previous versions.

## From v2.0.0

### New features
1. If you pass `undefined` as a model to `can` or `cannot` it do not override a model defined in class definition.
2. You can override property parser per each Ability class, overriding `parseProperty()` method to use eg. custom prefix like `is` (isReadable) instead of `can` (canReadable)
3. You can now get a value for specific ability using CanService#valueFor, eg. `this.can.valueFor('createProjects', 'account', model, properties)`

### Deprecations
1. You will not longer be able to import `CanMixin` as it will be removed. You can reproduce its behavior using `can` service and its methods.
2. `import { CanService } from 'ember-can'` -> `import CanService from 'ember-can/services/can'`
3. `import { ability } from 'ember-can'` -> `import { ability } from 'ember-can/computed'`
4. `build` method of `can` service will be replaced by `abilityFor`

### Notable changes
1. You have to pass a `null` model if you want to pass only parameters to `can` or `cannot` methods of `can` service. Eg: `this.get('canService').can('post', null, { test: true })`
2. The `model` passed to helpers or `can` service methods, as from now on, can be anything instead of an Ember.Object instance.
3. `can` and `cannot` methods will always return a boolean
4. Abilities are now an instance of the Ability class, so setting model or properties on it will not modify the class constructor anymore.
5. Ability class name will be always singularized automatically, eg. `edit posts` -> `edit post`. All abilities files should be created with SINGULAR form!

## From v0.5.x
We now automatically generate an abilities test file when generating an ability.
This required a modification to the test resolver that runs when you `ember install`
this addon for the first time. When upgrading to v0.6.0+ you'll need to run the
addon's generator like this:
```
ember g ember-can
```

## From v0.4.x

Prior to v0.5 we supported defining injections in `/config/environment.js`, this has been removed in preference
to using service injection.

If you're not using a service, then you simply need to define an initializer which sets up the injection.

For example, previously you could inject like so:

```javascript
ENV['ember-can'] = {
  inject: {
    session: 'simple-auth-session:main'
  }
};
```

This would now be replaced with this initializer:

```javascript
export default {
  name: 'inject-session-into-abilities',
  initialize(app) {
    app.inject('ability', 'session', 'simple-auth-session:main');
  }
};
```

## From v0.3.x

Prior to v0.4.x we always singularized the ability name before looking it up, under the assumption that all abilities were located at `/app/abilities/`.

With pod structure, this assumption is incorrect and it's perfectly reasonable to have an ability at `/app/pods/posts/ability.js`.

In v0.4.0 we now leave the ability name alone, so you can do `if (can "edit posts")` and it will look for `/app/abilities/posts.js` or `/app/pods/posts/ability.js` according to the usual resolver rules.

If you were previously relying on the singularizing, you'll need to explicitly use the singular form, changing `if (can "edit posts")` to `if (can "edit post")`.

## From v0.2.x

Version 0.3.x moves from using custom block helpers (`if-can` and `unless-can`)
to a single `can` helper which instead can be used with `{{if}}` and `{{unless}}`.

Updating from v0.2.x is a simple matter of replacing `{{if-can ...}}` and `{{unless-can ...}}` with `{{if (can ...)}}`

For example becomes:

```handlebars
{{#if-can "write post"}}
  ...
{{else}}
  ...
{{/if-can}}
```

with

```handlebars
{{#if (can "write post")}}
  ...
{{else}}
  ...
{{/if}}
```
