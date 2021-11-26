import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Ability } from 'ember-can';
import { reads, and } from '@ember/object/computed';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

module('Integration | Helper | can', function (hooks) {
  setupRenderingTest(hooks);

  module('classic class', function () {
    test('it works with custom property parser', async function (assert) {
      assert.expect(1);

      this.owner.register(
        'ability:post',
        Ability.extend({
          worksWell: true,

          parseProperty(propertyName) {
            return propertyName; // without `can` prefix
          },
        })
      );

      await render(hbs`{{if (can "works well post") "true" "false"}}`);
      assert.dom(this.element).hasText('true');
    });

    test('it works without model', async function (assert) {
      assert.expect(1);

      this.owner.register(
        'ability:post',
        Ability.extend({
          canWrite: true,
        })
      );

      await render(hbs`{{if (can "write post") "true" "false"}}`);
      assert.dom(this.element).hasText('true');
    });

    test('it can receives model', async function (assert) {
      assert.expect(4);

      this.owner.register(
        'ability:post',
        Ability.extend({
          canWrite: reads('model.write'),
        })
      );

      await render(hbs`{{if (can "write post" this.model) "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      this.set('model', { write: false });
      assert.dom(this.element).hasText('false');

      this.set('model', { write: true });
      assert.dom(this.element).hasText('true');

      this.set('model', null);
      assert.dom(this.element).hasText('false');
    });

    test('it works with default model', async function (assert) {
      assert.expect(4);

      this.owner.register(
        'ability:post',
        Ability.extend({
          // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
          model: { write: true },

          canWrite: reads('model.write').readOnly(),
        })
      );

      await render(hbs`{{if (can "write post" this.model) "true" "false"}}`);
      assert.dom(this.element).hasText('true');

      this.set('model', undefined);
      assert.dom(this.element).hasText('true');

      this.set('model', null);
      assert.dom(this.element).hasText('false');

      this.set('model', { write: false });
      assert.dom(this.element).hasText('false');
    });

    test('it can receives properties', async function (assert) {
      assert.expect(2);

      this.owner.register(
        'ability:post',
        Ability.extend({
          canWrite: reads('write').readOnly(),
        })
      );

      this.set('write', false);
      await render(
        hbs`{{if (can "write post" write=this.write) "true" "false"}}`
      );
      assert.dom(this.element).hasText('false');

      this.set('write', true);
      assert.dom(this.element).hasText('true');
    });

    test('it can receives model and properties', async function (assert) {
      assert.expect(2);

      this.owner.register(
        'ability:post',
        Ability.extend({
          canWrite: and('model.write', 'write').readOnly(),
        })
      );

      this.set('write', false);
      this.set('model', { write: false });

      await render(
        hbs`{{if (can "write post" this.model write=this.write) "true" "false"}}`
      );

      assert.dom(this.element).hasText('false');

      this.set('write', true);
      this.set('model', { write: true });

      assert.dom(this.element).hasText('true');
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
        Ability.extend({
          session: service(),

          canWrite: reads('session.isLoggedIn'),
        })
      );

      await render(hbs`{{if (can "write post") "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      run(() => this.owner.lookup('service:session').set('isLoggedIn', true));
      assert.dom(this.element).hasText('true');
    });
  });
});
