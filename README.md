# Ember-can

<p align="center">
  <a href="http://badge.fury.io/js/ember-can" title="Package version">
    <img src="https://badge.fury.io/js/ember-can.svg"/>
  </a>

  <a href="https://emberobserver.com/addons/ember-can" title="Ember Observer">
    <img src="http://emberobserver.com/badges/ember-can.svg" alt="Ember Observer"/>
  </a>

  <a href="https://travis-ci.org/minutebase/ember-can" title="Travis CI status">
    <img src="https://travis-ci.org/minutebase/ember-can.svg?branch=master" alt="Travis CI Status"/>
  </a>

  <a href="https://david-dm.org/minutebase/ember-can" title="dependencies status">
    <img src="https://david-dm.org/minutebase/ember-can/status.svg"/>
  </a>
</p>

___

Simple authorisation addon for Ember.

## Installation

Install this addon via ember-cli:

```
ember install ember-can
```

## Compatibility

* Ember.js v3.28 or above
* Embroider or ember-auto-import v2

## Quick Example

You want to conditionally allow creating a new blog post:

```hbs
{{#if (can "create post")}}
  Type post content here...
{{else}}
  You can't write a new post!
{{/if}}
```

We define an ability for the `Post` model in `/app/abilities/post.js`:

```js
// app/abilities/post.js

import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default class PostAbility extends Ability {
  @service session;

  @computed('session.currentUser')
  get user() {
    return this.session.currentUser;
  }

  @readOnly('user.isAdmin') canCreate;
  get canCreate() {
    return this.user.isAdmin;
  }
}
```

We can also re-use the same ability to check if a user has access to a route:

```js
// app/routes/posts/new.js

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class NewPostRoute extends Route {
  @service abilities;

  beforeModel(transition) {
    let result = super.beforeModel(...arguments);

    if (this.abilities.cannot('create post')) {
      transition.abort();
      return this.transitionTo('index');
    }

    return result;
  }
}
```

And we can also check the permission before firing action:

```js
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CreatePostComponent extends Component {
  @service abilities;

  @action
  createPost() {
    if (this.abilities.can('create post', this.post)) {
      // create post!
    }
  }
});
```

## Helpers

### `can`

The `can` helper is meant to be used with `{{if}}` and `{{unless}}` to protect a block (but can be used anywhere in the template).

```hbs
{{can "doSth in myModel" model extraProperties}}
```
- `"doSth in myModel" ` - The first parameter is a string which is used to find the ability class call the appropriate property (see [Looking up abilities](#looking-up-abilities)).

- `model` - The second parameter is an optional model object which will be given to the ability to check permissions.

- `extraProperties` - The third parameter are extra properties which will be assigned to the ability

**As activities are standard Ember objects and computed properties if anything changes then the view will
automatically update accordingly.**

#### Example
```hbs
{{#if (can "edit post" post)}}
  ...
{{else}}
  ...
{{/if}}
```

As it's a sub-expression, you can use it anywhere a helper can be used.
For example to give a div a class based on an ability you can use an inline if:

```hbs
<div class={{if (can "edit post" post) "is-editable"}}>

</div>
```

### `cannot`

Cannot helper is a negation of `can` helper with the same API.

```hbs
{{cannot "doSth in myModel" model extraProperties}}
```


## Abilities

An ability class protects an individual model which is available in the ability as `model`.

**Please note that all abilites names have to be in singular form**

```js
// app/abilities/post.js

import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default class PostAbility extends Ability {
  // only admins can write a post
  @computed('user.isAdmin')
  get canWrite() {
    return this.user.isAdmin;
  }

  // only the person who wrote a post can edit it
  @computed('user.id', 'model.author')
  get canEdit() {
    return this.user.id === this.model.author;
  }
}

// Usage:
// {{if (can "write post" post) "true" "false"}}
// {{if (can "edit post" post user=author) "true" "false"}}
```

## Additional attributes

If you need more than a single resource in an ability, you can pass them additional attributes.

You can do this in the helpers, for example this will set the `model` to `project` as usual,
but also `member` as a bound property.

```hbs
{{#if (can "remove member from project" project member=member)}}
  ...
{{/if}}
```

Similarly using `abilities` service you can pass additional attributes after or instead of the resource:

```js
this.abilities.can('edit post', post, { author: bob });
this.abilities.cannot('write post', null, { project: project });
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
| manage members in project  | `canManageMembers` | `/abilities/project.js`| `app/pods/project/ability.js` |
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

Simply extend the default `AbilitiesService` in `app/services/abilities.js` and override `parse`.

`parse` takes the ability string eg "manage members in projects" and should return an object with `propertyName` and `abilityName`.

For example, to use the format "person.canEdit" instead of the default "edit person" you could do the following:

```js
// app/services/abilities.js
import Service from 'ember-can/services/abilities';

export default class AbilitiesService extends Service {
  parse(str) {
    let [abilityName, propertyName] = str.split('.');
    return { propertyName, abilityName };
  }
};
```

You can also modify the property prefix by overriding `parseProperty` in our ability file:

```js
// app/abilities/feature.js
import { Ability } from 'ember-can';
import { camelize } from '@ember/string';

export default class FeatureAbility extends Ability {
  parseProperty(propertyName) {
    return camelize(`is-${propertyName}`);
  },
};
```

## Injecting the user

How does the ability know who's logged in? This depends on how you implement it in your app!

If you're using an `Ember.Service` as your session, you can just inject it into the ability:

```js
// app/abilities/foo.js
import { Ability } from 'ember-can';
import { inject as service } from '@ember/service';

export default class FooAbility extends Ability {
  @service session;
}
```

The ability classes will now have access to `session` which can then be used to check if the user is logged in etc...

## Components & computed properties

In a  component, you may want to expose abilities as computed properties
so that you can bind to them in your templates.

```js
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class MyComponent extends Component {
  @service abilities; // inject abilities service

  post = null; // received from higher template

  @computed('post')
  get ability() {
    return this.abilities.abilityFor('post', this.post /*, customProperties */);
  }
}

// Template:
// {{if ability.canWrite "true" "false"}}
```

## Accessing abilities within an Ember engine

If you're using [engines](http://ember-engines.com/) and you want to access an *ability* within it, you will need it to be present in your Engine’s namespace. This is accomplished by doing what is called a "re-export":

```javascript
//my-engine/addon/abilities/foo-bar.js
export { default } from 'my-app/abilities/foo-bar';
```

## Upgrade guide

See [UPGRADING.md](https://github.com/minutebase/ember-can/blob/master/UPGRADING.md) for more details.

## Testing

Make sure that you've either `ember install`-ed this addon, or run the addon
blueprint via `ember g ember-can`. This is an important step that teaches the
test resolver how to resolve abilities from the file structure.

### Unit testing abilities

An ability unit test will be created each time you generate a new ability via
`ember g ability <name>`. The package currently supports generating QUnit and
Mocha style tests.

### Integration testing in your app

For testing you should not need to specify anything explicitly. Anyway, you can
stub the service following [the official EmberJS guide](https://guides.emberjs.com/release/testing/testing-components/#toc_stubbing-services) if needed.

## Development

### Installation

* `git clone https://github.com/minutebase/ember-can.git`
* `cd ember-can`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This version of the package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
