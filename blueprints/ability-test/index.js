/* eslint-env node */
'use strict';

var EOL = require('os').EOL;

module.exports = {
  description: 'Generates an ability unit test.',

  shouldTransformTypeScript: true,

  locals: function (options) {
    var name = options.entity.name;

    var imports =
      "import { module, test } from 'qunit';" +
      EOL +
      "import { setupTest } from 'ember-qunit';";

    var test =
      "module('Unit | Ability | " +
      name +
      "', function(hooks) {" +
      EOL +
      '  setupTest(hooks);' +
      EOL +
      EOL +
      "  test('it exists', function(assert) {" +
      EOL +
      "    const ability = this.owner.lookup('ability:" +
      name +
      "');" +
      EOL +
      '    assert.ok(ability);' +
      EOL +
      '  });' +
      EOL +
      '});';

    return {
      imports: imports,
      test: test,
    };
  },
};
