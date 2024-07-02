import Resolver from 'ember-resolver';

Resolver.reopen({
  init() {
    this._super();
    this.pluralizedTypes = {
      ...this.pluralizedTypes,
      ability: 'abilities'
    };
  }
});
function initialize() {}
var setupEmberCan = {
  initialize
};

export { setupEmberCan as default, initialize };
//# sourceMappingURL=setup-ember-can.js.map
