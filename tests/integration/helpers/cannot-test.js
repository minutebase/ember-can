import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Ability } from 'ember-can';
import { computed, get } from '@ember/object';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

module('Integration | Helper | cannot', function (hooks) {
  setupRenderingTest(hooks);

  test('it works without model', async function (assert) {
    assert.expect(1);

    this.owner.register(
      'ability:post',
      class extends Ability {
        canWrite = true;
      }
    );

    await render(hbs`{{if (cannot "write post") "true" "false"}}`);
    assert.dom(this.element).hasText('false');
  });

  test('it can receives model', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'ability:post',
      class extends Ability {
        @computed('model.write')
        get canWrite() {
          return get(this, 'model.write');
        }
      }
    );

    this.set('model', { write: false });
    await render(hbs`{{if (cannot "write post" model) "true" "false"}}`);
    assert.dom(this.element).hasText('true');

    this.set('model', { write: true });
    assert.dom(this.element).hasText('false');
  });

  test('it can receives properties', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'ability:post',
      class extends Ability {
        @computed('write')
        get canWrite() {
          return this.write;
        }
      }
    );

    this.set('write', false);
    await render(hbs`{{if (cannot "write post" write=write) "true" "false"}}`);
    assert.dom(this.element).hasText('true');

    this.set('write', true);
    assert.dom(this.element).hasText('false');
  });

  test('it can receives model and properties', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'ability:post',
      class extends Ability {
        @computed('model.write', 'write')
        get canWrite() {
          return get(this, 'model.write') && this.write;
        }
      }
    );

    this.set('write', false);
    this.set('model', { write: false });
    await render(
      hbs`{{if (cannot "write post" model write=write) "true" "false"}}`
    );
    assert.dom(this.element).hasText('true');

    this.set('write', true);
    this.set('model', { write: true });
    assert.dom(this.element).hasText('false');
  });

  test('it reacts on ability change', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'service:session',
      Service.extend({
        isLoggedIn: false,
      })
    );

    this.owner.register(
      'ability:post',
      class extends Ability {
        @service() session;

        @computed('session.isLoggedIn')
        get canWrite() {
          return get(this, 'session.isLoggedIn');
        }
      }
    );

    await render(hbs`{{if (cannot "write post") "true" "false"}}`);
    assert.dom(this.element).hasText('true');

    run(() => this.owner.lookup('service:session').set('isLoggedIn', true));
    assert.dom(this.element).hasText('false');
  });
});
