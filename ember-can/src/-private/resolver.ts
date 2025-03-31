import type Resolver from 'ember-resolver';

export default function extendResolver(
  resolver: typeof Resolver,
): typeof Resolver {
  return class EmberCanResolver extends resolver {
    pluralizedTypes: Record<string, string> = {
      // @ts-expect-error Property 'pluralizedTypes' is used before its initialization.
      ...this.pluralizedTypes,
      ability: 'abilities',
    };
  };
}
