import { test, skip, module } from 'qunit';
import { setupTest } from 'ember-qunit';
import Ability from 'ember-can/ability';
import Sinon from 'sinon';

module('Addon | ability', function (hooks) {
  setupTest(hooks);

  test('parseProperty', function (assert) {
    assert.strictEqual(
      Ability.create().parseProperty('writePost'),
      'canWritePost'
    );
  });

  module('.getAbility', function () {
    test('supports fields', function (assert) {
      class MyAbility extends Ability {
        canWritePost = true;
      }

      const ability = MyAbility.create();

      assert.true(ability.getAbility('writePost'));

      assert.strictEqual(ability.getAbility('writeComment'), undefined);
    });

    test('supports getters', function (assert) {
      class MyAbility extends Ability {
        get canWritePost() {
          return true;
        }
      }

      const ability = MyAbility.create();

      assert.true(ability.getAbility('writePost'));
      assert.strictEqual(ability.getAbility('writeComment'), undefined);
    });

    skip('supports methods', function (assert) {
      class MyAbility extends Ability {
        canWritePost() {
          return true;
        }
      }

      const ability = MyAbility.create();

      assert.true(ability.getAbility('writePost'));
      assert.strictEqual(ability.getAbility('writeComment'), undefined);
    });

    skip('supports models and properties', function (assert) {
      class MyAbility extends Ability {
        canWritePost() {
          return true;
        }
      }

      const ability = MyAbility.create();

      const fake = Sinon.fake(ability.canWritePost);
      Sinon.replace(ability, 'canWritePost', fake);

      const model = { write: true };
      const properties = { post: true };

      assert.true(ability.getAbility('writePost', model, properties));

      assert.strictEqual(fake.firstCall.args[0], model);
      assert.strictEqual(fake.firstCall.args[1], properties);
    });
  });
});
