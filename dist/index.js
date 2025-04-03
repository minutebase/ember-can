export { default as Ability } from './ability.js';

function extendResolver(resolver) {
  return class EmberCanResolver extends resolver {
    pluralizedTypes = {
      // @ts-expect-error Property 'pluralizedTypes' is used before its initialization.
      ...this.pluralizedTypes,
      ability: 'abilities'
    };
  };
}

export { extendResolver };
//# sourceMappingURL=index.js.map
