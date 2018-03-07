import Resolver from 'ember-resolver';

Resolver.reopen({
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  pluralizedTypes: {
    ability: 'abilities'
  }
});

export function initialize(/* application */) {}
export default { initialize };
