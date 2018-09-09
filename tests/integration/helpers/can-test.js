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

  test('it works without model', async function(assert) {
    assert.expect(1);

    this.owner.register('ability:post', Ability.extend({
      canWrite: true
    }));

    await render(hbs`{{if (can "write post") "true" "false"}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('it can receives model', async function(assert) {
    assert.expect(4);

    this.owner.register('ability:post', Ability.extend({
      canWrite: computed('model.write', function() {
        return this.get('model.write');
      }),
    }));

    await render(hbs`{{if (can "write post" model) "true" "false"}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.set('model', { write: false });
    assert.equal(this.element.textContent.trim(), 'false');

    this.set('model', { write: true });
    assert.equal(this.element.textContent.trim(), 'true');

    this.set('model', null);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('it works with default model', async function(assert) {
    assert.expect(4);

    this.owner.register('ability:post', Ability.extend({
      model: computed(function() {
        return { write: true }
      }),

      canWrite: computed('model.write', function() {
        return this.get('model.write');
      }),
    }));

    await render(hbs`{{if (can "write post" model) "true" "false"}}`);
    assert.equal(this.element.textContent.trim(), 'true');

    this.set('model', undefined);
    assert.equal(this.element.textContent.trim(), 'true');

    this.set('model', null);
    assert.equal(this.element.textContent.trim(), 'false');

    this.set('model', { write: false });
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('it can receives properties', async function(assert) {
    assert.expect(2);

    this.owner.register('ability:post', Ability.extend({
      canWrite: computed('write', function() {
        return this.get('write');
      }),
    }));

    this.set('write', false);
    await render(hbs`{{if (can "write post" write=write) "true" "false"}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.set('write', true);
    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('it can receives model and properties', async function(assert) {
    assert.expect(2);

    this.owner.register('ability:post', Ability.extend({
      canWrite: computed('model.write', 'write', function() {
        return this.get('model.write') && this.get('write');
      }),
    }));

    this.set('write', false);
    this.set('model', { write: false });
    await render(hbs`{{if (can "write post" model write=write) "true" "false"}}`);
    assert.equal(this.element.textContent.trim(), 'false');

    this.set('write', true);
    this.set('model', { write: true });
    assert.equal(this.element.textContent.trim(), 'true');
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
    assert.equal(this.element.textContent.trim(), 'false');

    run(() => this.owner.lookup('service:session').set('isLoggedIn', true));
    assert.equal(this.element.textContent.trim(), 'true');
  });
});
