import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Ability } from 'ember-can';
import { computed } from '@ember/object';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

module('Integration | Helper | ability', function(hooks) {
  setupRenderingTest(hooks);

  module('with subproperty access', function() {
    test('it works with custom property parser', async function(assert) {
      assert.expect(1);

      this.owner.register('ability:post', Ability.extend({
        worksWell: computed('model', function() {
          return { can: true, subProperty: 'prop' };
        }),

        parseProperty(propertyName) {
          return propertyName; // without `can` prefix
        }
      }));

      await render(hbs`{{ability "works well post:subProperty"}}`);
      assert.dom(this.element).hasText('prop');
    });

    test('it works without model', async function(assert) {
      assert.expect(1);

      this.owner.register('ability:post', Ability.extend({
        canWrite: computed('model', function() {
          return { can: true, subProperty: 'prop' };
        }),
      }));

      await render(hbs`{{ability "write post:subProperty"}}`);
      assert.dom(this.element).hasText('prop');
    });

    test('it can receives model', async function(assert) {
      assert.expect(4);

      this.owner.register('ability:post', Ability.extend({
        canWrite: computed('model.write', function() {
          return { can: this.get('model.write'), subProperty: 'prop' };
        }),
      }));

      await render(hbs`{{ability "write post:subProperty" model}}`);
      assert.dom(this.element).hasText('prop');

      this.set('model', { write: false });
      assert.dom(this.element).hasText('prop');

      this.set('model', { write: true });
      assert.dom(this.element).hasText('prop');

      this.set('model', null);
      assert.dom(this.element).hasText('prop');
    });

    test('it works with default model', async function(assert) {
      assert.expect(4);

      this.owner.register('ability:post', Ability.extend({
        // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
        model: { write: true },

        canWrite: computed('model.write', function() {
          return { can: this.get('model.write'), subProperty: 'prop' };
        }).readOnly(),
      }));

      await render(hbs`{{ability "write post:subProperty" model}}`);
      assert.dom(this.element).hasText('prop');

      this.set('model', undefined);
      assert.dom(this.element).hasText('prop');

      this.set('model', null);
      assert.dom(this.element).hasText('prop');

      this.set('model', { write: false });
      assert.dom(this.element).hasText('prop');
    });

    test('it can receives properties', async function(assert) {
      assert.expect(2);

      this.owner.register('ability:post', Ability.extend({
        canWrite: computed('write', function() {
          return { can: this.get('write'), subProperty: 'prop' };
        }).readOnly(),
      }));

      this.set('write', false);
      await render(hbs`{{ability "write post:subProperty" write=write}}`);
      assert.dom(this.element).hasText('prop');

      this.set('write', true);
      assert.dom(this.element).hasText('prop');
    });

    test('it can receives model and properties', async function(assert) {
      assert.expect(2);

      this.owner.register('ability:post', Ability.extend({
        canWrite: computed('model.write', 'write', function() {
          return { can: this.get('model.write') && this.get('write'), subProperty: 'prop' };
        }).readOnly(),
      }));

      this.set('write', false);
      this.set('model', { write: false });

      await render(hbs`{{ability "write post:subProperty" model write=this.write}}`);

      assert.dom(this.element).hasText('prop');

      this.set('write', true);
      this.set('model', { write: true });

      assert.dom(this.element).hasText('prop');
    });

    test('it reacts on ability change', async function(assert) {
      assert.expect(2);

      this.owner.register('service:session', Service.extend({
        isLoggedIn: false
      }));

      this.owner.register('ability:post', Ability.extend({
        session: service(),

        canWrite: computed('session.isLoggedIn', function() {
          return { can: this.get('session.isLoggedIn'), subProperty: 'prop' };
        })
      }));

      await render(hbs`{{ability "write post:subProperty"}}`);
      assert.dom(this.element).hasText('prop');

      run(() => this.owner.lookup('service:session').set('isLoggedIn', true));
      assert.dom(this.element).hasText('prop');
    });
  });
});
