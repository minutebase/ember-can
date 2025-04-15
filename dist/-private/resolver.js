function extendResolver(resolver) {
  return class EmberCanResolver extends resolver {
    pluralizedTypes = {
      // @ts-expect-error Property 'pluralizedTypes' is used before its initialization.
      ...this.pluralizedTypes,
      ability: 'abilities'
    };
  };
}

export { extendResolver as default };
//# sourceMappingURL=resolver.js.map
