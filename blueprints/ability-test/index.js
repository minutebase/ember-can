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
`import { moduleFor, test } from 'ember-qunit';`
      ;
      test =
`moduleFor('ability:${name}', 'Unit | Ability | ${name}', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  const ability = this.subject();
  assert.ok(ability);
});`
      ;
    } else if (testStyle === 'mocha') {
      imports =
`/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';`
      ;
      test =
`describeModule(
  'ability:${name}',
  '${name} Ability',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      const ability = this.subject();
      expect(ability).to.be.ok;
    });
  }
);`
      ;
    }

    return {
      imports: imports.replace(/\n/g, EOL),
      test: test.replace(/\n/g, EOL)
    };
  }
};
