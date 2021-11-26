import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Ability } from 'ember-can';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';

module('Addon | Helper | can', function (hooks) {
  setupRenderingTest(hooks);

  test('it can reacts to model change', async function (assert) {
    assert.expect(4);

    this.owner.register(
      'ability:post',
      class extends Ability {
        canWrite(model) {
          return model?.write;
        }
      }
    );

    class Model {
      @tracked write = true;
    }

    await render(hbs`{{if (can "write post" this.model) "true" "false"}}`);
    assert.dom(this.element).hasText('false');

    this.set('model', new Model());
    await settled();
    assert.dom(this.element).hasText('true');

    this.model.write = false;
    await settled();
    assert.dom(this.element).hasText('false');

    this.set('model', new Model());
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

        canWrite() {
          return this.session.isLoggedIn;
        }
      }
    );

    await render(hbs`{{if (can "write post") "true" "false"}}`);
    assert.dom(this.element).hasText('false');

    this.owner.lookup('service:session').isLoggedIn = true;

    await settled();

    assert.dom(this.element).hasText('true');
  });

  test('it works with computed properties', async function (assert) {
    assert.expect(2);

    this.owner.register(
      'service:session',
      class extends Service {
        user = null;

        @computed('user')
        get isLoggedIn() {
          return !!this.user;
        }
      }
    );

    this.owner.register(
      'ability:post',
      class extends Ability {
        @service session;

        canWrite() {
          return this.session.isLoggedIn;
        }
      }
    );

    await render(hbs`{{if (can "write post") "true" "false"}}`);
    assert.dom(this.element).hasText('false');

    const session = this.owner.lookup('service:session');
    session.set('user', true);

    await settled();

    assert.dom(this.element).hasText('true');
  });
});
