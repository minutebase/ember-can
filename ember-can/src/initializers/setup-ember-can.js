import Resolver from 'ember-resolver';

Resolver.reopen({
  init() {
    this._super();
    this.pluralizedTypes = {
      ...this.pluralizedTypes,
      ability: 'abilities',
    };
  },
});

export function initialize() {}
export default { initialize };
