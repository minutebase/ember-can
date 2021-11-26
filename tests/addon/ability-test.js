import { test, module } from 'qunit';
import { setupTest } from 'ember-qunit';
import Ability from 'ember-can/ability';
import Sinon from 'sinon';

module('Addon | ability', function (hooks) {
  setupTest(hooks);

  test('parseProperty', function (assert) {
    Ability.parseProperty('writePost');

    assert.strictEqual(Ability.parseProperty('writePost'), 'canWritePost');
  });

  module('.getAbility', function () {
    test('supports fields', function (assert) {
      class MyAbility extends Ability {
        canWritePost = true;
      }

      const ability = new MyAbility(this.owner);

      assert.true(MyAbility.getAbility(ability, 'writePost'));
      assert.strictEqual(
        MyAbility.getAbility(ability, 'writeComment'),
        undefined
      );
    });

    test('supports methods', function (assert) {
      class MyAbility extends Ability {
        canWritePost() {
          return true;
        }
      }

      const ability = new MyAbility(this.owner);

      assert.true(MyAbility.getAbility(ability, 'writePost'));
      assert.strictEqual(
        MyAbility.getAbility(ability, 'writeComment'),
        undefined
      );
    });

    test('supports models and properties', function (assert) {
      class MyAbility extends Ability {
        canWritePost() {
          return true;
        }
      }

      const ability = new MyAbility(this.owner);

      const fake = Sinon.fake(ability.canWritePost);
      Sinon.replace(ability, 'canWritePost', fake);

      const model = { write: true };
      const properties = { post: true };

      assert.true(
        MyAbility.getAbility(ability, 'writePost', model, properties)
      );

      assert.strictEqual(fake.firstCall.args[0], model);
      assert.strictEqual(fake.firstCall.args[1], properties);
    });
  });
});
