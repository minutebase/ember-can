import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Ability } from 'ember-can';
import { computed } from '@ember/object';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

module('Integration | Helper | can', function(hooks) {
  setupRenderingTest(hooks);

  module('classic class', function() {
    test('it works with native class', async function(assert) {
      assert.expect(1);

      this.owner.register('ability:post', class extends Ability {
        worksWell = true;

        parseProperty(propertyName) {
          return propertyName; // without `can` prefix
        }
      });

      await render(hbs`{{if (can "works well post") "true" "false"}}`);
      assert.dom(this.element).hasText('true');
    });

    test('it works without model', async function(assert) {
      assert.expect(1);

      this.owner.register('ability:post', Ability.extend({
        canWrite: true
      }));

      await render(hbs`{{if (can "write post") "true" "false"}}`);
      assert.dom(this.element).hasText('true');
    });

    test('it can receives model', async function(assert) {
      assert.expect(4);

      this.owner.register('ability:post', Ability.extend({
        canWrite: computed('model.write', function() {
          return this.get('model.write');
        }),
      }));

      await render(hbs`{{if (can "write post" model) "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      this.set('model', { write: false });
      assert.dom(this.element).hasText('false');

      this.set('model', { write: true });
      assert.dom(this.element).hasText('true');

      this.set('model', null);
      assert.dom(this.element).hasText('false');
    });

    test('it works with default model', async function(assert) {
      assert.expect(4);

      this.owner.register('ability:post', Ability.extend({
        model: computed({
          get() {
            if ('_model' in this) {
              return this._model;
            }

            return { write: true }
          },

          set(key, value) {
            this._model = value;
            return value;
          }
        }),

        canWrite: computed('model.write', function() {
          return this.get('model.write');
        }).readOnly(),
      }));

      await render(hbs`{{if (can "write post" model) "true" "false"}}`);
      assert.dom(this.element).hasText('true');

      this.set('model', undefined);
      assert.dom(this.element).hasText('true');

      this.set('model', null);
      assert.dom(this.element).hasText('false');

      this.set('model', { write: false });
      assert.dom(this.element).hasText('false');
    });

    test('it can receives properties', async function(assert) {
      assert.expect(2);

      this.owner.register('ability:post', Ability.extend({
        canWrite: computed('write', function() {
          return this.get('write');
        }).readOnly(),
      }));

      this.set('write', false);
      await render(hbs`{{if (can "write post" write=write) "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      this.set('write', true);
      assert.dom(this.element).hasText('true');
    });

    test('it can receives model and properties', async function(assert) {
      assert.expect(2);

      this.owner.register('ability:post', Ability.extend({
        canWrite: computed('model.write', 'write', function() {
          return this.get('model.write') && this.get('write');
        }).readOnly(),
      }));

      this.set('write', false);
      this.set('model', { write: false });
      await render(hbs`{{if (can "write post" model write=write) "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      this.set('write', true);
      this.set('model', { write: true });
      assert.dom(this.element).hasText('true');
    });

    test('it reacts on ability change', async function(assert) {
      assert.expect(2);

      this.owner.register('service:session', Service.extend({
        isLoggedIn: false
      }));

      this.owner.register('ability:post', Ability.extend({
        session: service(),

        canWrite: computed('session.isLoggedIn', function() {
          return this.get('session.isLoggedIn');
        })
      }));

      await render(hbs`{{if (can "write post") "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      run(() => this.owner.lookup('service:session').set('isLoggedIn', true));
      assert.dom(this.element).hasText('true');
    });
  });

  module('native class', function() {
    test('it works with custom property parser', async function(assert) {
      assert.expect(1);

      this.owner.register('ability:post', class extends Ability {
        parseProperty(propertyName) {
          return propertyName; // without `can` prefix
        }

        worksWell = true
      });

      await render(hbs`{{if (can "works well post") "true" "false"}}`);
      assert.dom(this.element).hasText('true');
    });

    test('it works without model', async function(assert) {
      assert.expect(1);

      this.owner.register('ability:post', class extends Ability {
        canWrite = true
      });

      await render(hbs`{{if (can "write post") "true" "false"}}`);
      assert.dom(this.element).hasText('true');
    });

    test('it can receives model', async function(assert) {
      assert.expect(4);

      this.owner.register('ability:post', class extends Ability {
        @computed('model.write')
        get canWrite() {
          return this.get('model.write');
        }
      });

      await render(hbs`{{if (can "write post" model) "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      this.set('model', { write: false });
      assert.dom(this.element).hasText('false');

      this.set('model', { write: true });
      assert.dom(this.element).hasText('true');

      this.set('model', null);
      assert.dom(this.element).hasText('false');
    });

    test('it works with default model', async function(assert) {
      assert.expect(4);

      this.owner.register('ability:post', class extends Ability {
        model = { write: true }

        @computed('model.write')
        get canWrite() {
          return this.get('model.write');
        }
      });

      await render(hbs`{{if (can "write post" model) "true" "false"}}`);
      assert.dom(this.element).hasText('true');

      this.set('model', undefined);
      assert.dom(this.element).hasText('true');

      this.set('model', null);
      assert.dom(this.element).hasText('false');

      this.set('model', { write: false });
      assert.dom(this.element).hasText('false');
    });

    test('it can receives properties', async function(assert) {
      assert.expect(2);

      this.owner.register('ability:post', class extends Ability {
        @computed('write')
        get canWrite() {
          return this.get('write');
        }
      });

      this.set('write', false);
      await render(hbs`{{if (can "write post" write=write) "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      this.set('write', true);
      assert.dom(this.element).hasText('true');
    });

    test('it can receives model and properties', async function(assert) {
      assert.expect(2);

      this.owner.register('ability:post', class extends Ability {
        @computed('model.write', 'write')
        get canWrite() {
          return this.get('model.write') && this.get('write');
        }
      });

      this.set('write', false);
      this.set('model', { write: false });
      await render(hbs`{{if (can "write post" model write=write) "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      this.set('write', true);
      this.set('model', { write: true });
      assert.dom(this.element).hasText('true');
    });

    test('it reacts on ability change', async function(assert) {
      assert.expect(2);

      this.owner.register('service:session', class extends Service {
        isLoggedIn = false
      });

      this.owner.register('ability:post', class extends Ability {
        @service session;

        @computed('session.isLoggedIn')
        get canWrite() {
          return this.get('session.isLoggedIn');
        }
      });

      await render(hbs`{{if (can "write post") "true" "false"}}`);
      assert.dom(this.element).hasText('false');

      run(() => this.owner.lookup('service:session').set('isLoggedIn', true));
      assert.dom(this.element).hasText('true');
    });
  });
});
