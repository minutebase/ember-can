import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { Ability } from 'ember-can';

module('Unit | Service | abilities', function (hooks) {
  setupTest(hooks);

  test('can', function (assert) {
    assert.expect(1);

    let service = this.owner.lookup('service:abilities');

    this.owner.register(
      'ability:super-model',
      class extends Ability {
        get canTouchThis() {
          return this.model.yeah;
        }
      }
    );

    assert.true(service.can('touchThis in superModel', { yeah: true }));
  });

  test('cannot', function (assert) {
    assert.expect(1);

    let service = this.owner.lookup('service:abilities');

    this.owner.register(
      'ability:super-model',
      class extends Ability {
        get canTouchThis() {
          return this.model.yeah;
        }
      }
    );

    assert.true(service.cannot('touchThis in superModel', { yeah: false }));
  });

  test('valueFor', function (assert) {
    assert.expect(1);

    let service = this.owner.lookup('service:abilities');

    this.owner.register(
      'ability:super-model',
      class extends Ability {
        get canTouchThis() {
          return this.model.yeah;
        }
      }
    );

    assert.strictEqual(
      service.valueFor('touchThis', 'superModel', { yeah: 'Yeah!' }),
      'Yeah!'
    );
  });

  test('abilityFor', function (assert) {
    assert.expect(3);

    let service = this.owner.lookup('service:abilities');

    this.owner.register('ability:super-model', class extends Ability {});

    let ability = service.abilityFor('superModel');

    assert.ok(ability);
    assert.ok(ability instanceof Ability);

    assert.throws(
      () => service.abilityFor('abilityNotFound'),
      'No ability type found for abilityNotFound'
    );
  });

  test('parse', function (assert) {
    assert.expect(2);

    let service = this.owner.lookup('service:abilities');

    assert.deepEqual(service.parse('manage members in project'), {
      propertyName: 'manageMembers',
      abilityName: 'project',
    });

    assert.deepEqual(service.parse('add tags to post'), {
      propertyName: 'addTags',
      abilityName: 'post',
    });
  });
});
