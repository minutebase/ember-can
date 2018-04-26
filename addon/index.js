import Ability from 'ember-can/ability';

// Deprecations

// Deprecated usage of CanMixin
import CanMixin from 'ember-can/mixins/can';

// Deprecated import of 'computed' function
import { ability } from 'ember-can/computed';
import { deprecate } from '@ember/application/deprecations';

function computed() {
  deprecate('Importing "computed" from ember-can is deprecated and will be removed. Please migrate to `import { ability } from "ember-can/computed";`', false, {
    id: 'ember-can.deprecate-computed-import',
    until: '2.0.0',
    url: 'https://github.com/minutebase/ember-can#looking-up-abilities'
  });

  return ability(...arguments);
}

// Deprecated import of 'CanService' service
import Can from 'ember-can/services/can';

let CanService = Can.extend({
  init() {
    this._super(...arguments);

    deprecate('Importing "CanService" from ember-can is deprecated and will be removed. Please migrate to `import CanService from "ember-can/services/can";`', false, {
      id: 'ember-can.deprecate-service-import',
      until: '2.0.0',
      url: 'https://github.com/minutebase/ember-can#looking-up-abilities'
    });
  }
});

export { Ability, CanMixin, CanService, computed };
