import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Ability } from 'ember-can';
import { reads, and } from '@ember/object/computed';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

module('Addon | Helper | cannot', function (hooks) {
  setupRenderingTest(hooks);

  test('it works without model', async function (assert) {
    assert.expect(1);

    this.owner.register(
      'ability:post',
      Ability.extend({
        canWrite: true,
      })
    );

    await render(hbs`{{if (cannot "write post") "true" "false"}}`);
    assert.dom(this.element).hasText('false');
  });

  test('it can receives model', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'ability:post',
      Ability.extend({
        canWrite: reads('model.write'),
      })
    );

    this.set('model', { write: false });
    await render(hbs`{{if (cannot "write post" this.model) "true" "false"}}`);
    assert.dom(this.element).hasText('true');

    this.set('model', { write: true });
    assert.dom(this.element).hasText('false');
  });

  test('it can receives properties', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'ability:post',
      Ability.extend({
        canWrite: reads('write'),
      })
    );

    this.set('write', false);
    await render(
      hbs`{{if (cannot "write post" write=this.write) "true" "false"}}`
    );
    assert.dom(this.element).hasText('true');

    this.set('write', true);
    assert.dom(this.element).hasText('false');
  });

  test('it can receives model and properties', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'ability:post',
      Ability.extend({
        canWrite: and('model.write', 'write'),
      })
    );

    this.set('write', false);
    this.set('model', { write: false });
    await render(
      hbs`{{if (cannot "write post" this.model write=this.write) "true" "false"}}`
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
      class extends Service {
        isLoggedIn = false;
      }
    );

    this.owner.register(
      'ability:post',
      Ability.extend({
        session: service(),

        canWrite: reads('session.isLoggedIn'),
      })
    );

    await render(hbs`{{if (cannot "write post") "true" "false"}}`);
    assert.dom(this.element).hasText('true');

    run(() => this.owner.lookup('service:session').set('isLoggedIn', true));
    assert.dom(this.element).hasText('false');
  });
});
