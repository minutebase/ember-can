import { test, module } from 'qunit';
import Service, { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import { Ability } from 'ember-can';
import { can } from 'ember-can/decorator';
import { setupTest } from 'ember-qunit';

module('Unit | decorator', async function(hooks) {
  setupTest(hooks);

  test('can', function(assert) {
    assert.expect(8);

    let computeCount = 0;

    this.owner.register('service:kiosk', Service.extend({ isOpen: false }));

    this.owner.register(
      'ability:magazine',
      Ability.extend({
        kiosk: service(),

        canRead: computed('model', 'hasGlasses', 'kiosk.isOpen', function() {
          computeCount++;
          return (
            this.model !== 'forbidden' && this.hasGlasses && this.kiosk.isOpen
          );
        })
      })
    );

    const obj = class Obj extends EmberObject {
      @can('read magazine', {
        model: 'model',
        additionalAttributes: { hasGlasses: 'hasGlasses' }
      })
      hasPermissionToReadMagazine;
    }.create(this.owner.ownerInjection(), {
      model: 'forbidden',
      hasGlasses: false
    });

    assert.notOk(obj.hasPermissionToReadMagazine);
    assert.equal(computeCount, 1);

    obj.set('model', 'allowed');

    assert.notOk(obj.hasPermissionToReadMagazine);
    assert.equal(computeCount, 2);

    obj.set('hasGlasses', true);

    assert.notOk(obj.hasPermissionToReadMagazine);
    assert.equal(computeCount, 3);

    this.owner.lookup('service:kiosk').set('isOpen', true);

    assert.ok(obj.hasPermissionToReadMagazine);
    assert.equal(computeCount, 4);
  });
});
