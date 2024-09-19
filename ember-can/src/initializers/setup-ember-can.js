import {
  dependencySatisfies,
  macroCondition,
  importSync,
} from '@embroider/macros';

if (macroCondition(dependencySatisfies('ember-resolver', '< 13.0.0'))) {
  const resolver = importSync('ember-resolver').default;

  resolver.reopen({
    init() {
      this._super();
      this.pluralizedTypes = {
        ...this.pluralizedTypes,
        ability: 'abilities',
      };
    },
  });
}

export function initialize() {}
export default { initialize };
