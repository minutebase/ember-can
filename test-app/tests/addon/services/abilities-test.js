import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { Ability } from 'ember-can';
import Sinon from 'sinon';

module('Unit | Service | abilities', function (hooks) {
  setupTest(hooks);

  test('can', function (assert) {
    let service = this.owner.lookup('service:abilities');

    this.owner.register(
      'ability:super-model',
      class extends Ability {
        get canTouchThis() {
          return this.model.yeah;
        }
      },
    );

    assert.true(service.can('touchThis in superModel', { yeah: true }));
  });

  test('cannot', function (assert) {
    let service = this.owner.lookup('service:abilities');

    this.owner.register(
      'ability:super-model',
      class extends Ability {
        get canTouchThis() {
          return this.model.yeah;
        }
      },
    );

    assert.true(service.cannot('touchThis in superModel', { yeah: false }));
  });

  test('valueFor', function (assert) {
    const fakeAbility = Sinon.fake(({ yeah }) => yeah);

    this.owner.register(
      'ability:super-model',
      class extends Ability {
        canTouchThis() {
          return fakeAbility(...arguments);
        }
      },
    );

    let service = this.owner.lookup('service:abilities');

    assert.strictEqual(
      service.valueFor(
        'touchThis',
        'superModel',
        { yeah: 'Yeah!' },
        { props: true },
      ),
      'Yeah!',
    );

    assert.true(fakeAbility.calledOnce);
    assert.deepEqual(fakeAbility.firstCall.args[0], { yeah: 'Yeah!' });
    assert.deepEqual(fakeAbility.firstCall.args[1], { props: true });
  });

  test('abilityFor', function (assert) {
    let service = this.owner.lookup('service:abilities');

    this.owner.register('ability:super-model', class extends Ability {});

    let ability = service.abilityFor('superModel');

    assert.ok(ability);
    assert.ok(ability instanceof Ability);

    assert.throws(
      () => service.abilityFor('abilityNotFound'),
      'No ability type found for abilityNotFound',
    );
  });

  test('parse', function (assert) {
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
