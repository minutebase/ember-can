import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Ability } from 'ember-can';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed, set } from '@ember/object';
import Sinon from 'sinon';

module('Addon | Helper | cannot', function (hooks) {
  setupRenderingTest(hooks);

  test('it is calling service correctly', async function (assert) {
    assert.expect(4);

    this.owner.register(
      'ability:post',
      class extends Ability {
        get canWrite() {
          return this.model?.write;
        }
      }
    );
    const service = this.owner.lookup('service:abilities');

    const spy = Sinon.spy(service, 'cannot');

    this.model = { name: 'can' };

    await render(
      hbs`{{if (cannot "write post" this.model prop="name") "false" "true"}}`
    );

    assert.true(spy.calledOnce);
    assert.strictEqual(spy.firstCall.args[0], 'write post');
    assert.strictEqual(spy.firstCall.args[1], this.model);
    assert.deepEqual(spy.firstCall.args[2], { prop: 'name' });
  });

  test('it reacts to model change', async function (assert) {
    assert.expect(4);

    this.owner.register(
      'ability:post',
      class extends Ability {
        get canWrite() {
          return this.model?.write;
        }
      }
    );

    class Model {
      @tracked write = true;
    }

    await render(hbs`{{if (cannot "write post" this.model) "false" "true"}}`);
    assert.dom(this.element).hasText('false');

    set(this, 'model', new Model());
    await settled();
    assert.dom(this.element).hasText('true');

    this.model.write = false;
    await settled();
    assert.dom(this.element).hasText('false');

    set(this, 'model', new Model());
    await settled();
    assert.dom(this.element).hasText('true');
  });

  test('it reacts to ability change', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'service:session',
      class extends Service {
        @tracked isLoggedIn = false;
      }
    );

    this.owner.register(
      'ability:post',
      class extends Ability {
        @service session;

        get canWrite() {
          return this.session.isLoggedIn;
        }
      }
    );

    await render(hbs`{{if (cannot "write post") "false" "true"}}`);
    assert.dom(this.element).hasText('false');

    this.owner.lookup('service:session').isLoggedIn = true;

    await settled();

    assert.dom(this.element).hasText('true');
  });

  test('it reacts to tracked properties change', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'service:session',
      class extends Service {
        @tracked isChange = false;

        get isLoggedIn() {
          return this.isChange;
        }
      }
    );

    this.owner.register(
      'ability:post',
      class extends Ability {
        @service session;

        get canWrite() {
          return this.session.isLoggedIn;
        }
      }
    );

    const session = this.owner.lookup('service:session');

    await render(hbs`{{if (cannot "write post") "false" "true"}}`);
    assert.dom(this.element).hasText('false');

    session.isChange = true;

    await settled();

    assert.dom(this.element).hasText('true');
  });

  test('it reacts to computed properties change', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'service:session',
      class extends Service {
        isChange = false;

        @computed('isChange')
        get isLoggedIn() {
          return this.isChange;
        }
      }
    );

    this.owner.register(
      'ability:post',
      class extends Ability {
        @service session;

        @computed('session.isLoggedIn')
        get canWrite() {
          return this.session.isLoggedIn;
        }
      }
    );

    const session = this.owner.lookup('service:session');

    await render(hbs`{{if (cannot "write post") "false" "true"}}`);
    assert.dom(this.element).hasText('false');

    set(session, 'isChange', true);

    await settled();

    assert.dom(this.element).hasText('true');
  });

  test('it reacts to changes when using methods', async function (assert) {
    assert.expect(3);

    this.owner.register(
      'service:session',
      class extends Service {
        @tracked isTrackedChanged = false;
        isComputedChanged = false;

        get isTracked() {
          return this.isTrackedChanged;
        }

        @computed('isComputedChanged')
        get isComputed() {
          return this.isComputedChanged;
        }
      }
    );

    this.owner.register(
      'ability:post',
      class extends Ability {
        @service session;

        canWrite() {
          return this.session.isTracked && this.session.isComputed;
        }
      }
    );

    const session = this.owner.lookup('service:session');

    await render(hbs`{{if (cannot "write post") "false" "true"}}`);
    assert.dom(this.element).hasText('false');

    session.isTrackedChanged = true;

    await settled();

    assert.dom(this.element).hasText('false');

    set(session, 'isComputedChanged', true);
    await settled();

    assert.dom(this.element).hasText('true');
  });
});
