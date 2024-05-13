import Resolver from 'ember-resolver';

Resolver.reopen({
  init() {
    this._super(...arguments);
    this.set('pluralizedTypes.ability', 'abilities');
  },
});

export function initialize() {}
export default { initialize };
