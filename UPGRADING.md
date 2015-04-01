# Upgrading

Whilst experimenting with the API & benefiting from changes in Ember, we've had a few backwards incompatible changes.

Here are the details on updating from previous versions.

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
