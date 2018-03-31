var EOL = require('os').EOL;

module.exports = {
  description: 'Generates an ability unit test.',

  _getTestStyle: function() {
    if ('ember-cli-mocha' in this.project.addonPackages) {
      return 'mocha';
    } else if ('ember-cli-qunit' in this.project.addonPackages) {
      return 'qunit';
    }
  },

  locals: function(options) {
    var name = options.entity.name;

    var testStyle = this._getTestStyle();
    if (!testStyle) {
      this.ui.writeLine('Couldn\'t determine test style - using QUnit');
      testStyle = 'qunit';
    }

    var imports, test;
    if (testStyle === 'qunit') {
      imports =
        "import { moduleFor, test } from 'ember-qunit';";
      test =
        "moduleFor('ability:" + name + "', 'Unit | Ability | " + name + "', {" + EOL +
        "  // Specify the other units that are required for this test." + EOL +
        "  // needs: ['service:foo']" + EOL +
        "});" + EOL + EOL +
        "// Replace this with your real tests." + EOL +
        "test('it exists', function(assert) {" + EOL +
        "  const ability = this.subject();" + EOL +
        "  assert.ok(ability);" + EOL +
        "});";
    } else if (testStyle === 'mocha') {
      imports =
        "/* jshint expr:true */" + EOL +
        "import { expect } from 'chai';" + EOL +
        "import {" + EOL +
        "  describeModule," + EOL +
        "  it" + EOL +
        "} from 'ember-mocha';";
      test =
        "describeModule(" + EOL +
        "  'ability:" + name + "'," + EOL +
        "  '" + name + " Ability'," + EOL +
        "  {" + EOL +
        "    // Specify the other units that are required for this test." + EOL +
        "    // needs: ['service:foo']" + EOL +
        "  }," + EOL +
        "  function() {" + EOL +
        "    // Replace this with your real tests." + EOL +
        "    it('exists', function() {" + EOL +
        "      const ability = this.subject();" + EOL +
        "      expect(ability).to.be.ok;" + EOL +
        "    });" + EOL +
        "  }" + EOL +
        ");";
    }

    return {
      imports: imports,
      test: test
    };
  }
};
