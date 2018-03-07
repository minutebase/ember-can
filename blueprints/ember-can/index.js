var EOL = require('os').EOL;

module.exports = {
  name: 'ember-can',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.insertIntoFile(
      'tests/helpers/resolver.js',
      "resolver.pluralizedTypes.ability = 'abilities';" + EOL,
      {
        before: "export default resolver"
      }
    );
  }
};
