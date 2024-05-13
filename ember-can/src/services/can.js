import AbilitiesService from './abilities.ts';
import { deprecate } from '@ember/debug';

function deprecateMethod() {
  deprecate(
    'Using CanService has been deprecated in favor of AbilitiesService. You should replace all occurrences with new `abilities` service.',
    false,
    {
      id: 'ember-can.can-service',
      until: '5.0.0',
      for: 'ember-can',
      since: {
        enabled: '4.1.0',
      },
    },
  );
}

export default class CanService extends AbilitiesService {
  /**
   * @deprecated Use new AbilitiesService methods
   */
  parse() {
    deprecateMethod();
    return super.parse(...arguments);
  }

  /**
   * @deprecated Use new AbilitiesService methods
   */
  abilityFor() {
    deprecateMethod();
    return super.abilityFor(...arguments);
  }

  /**
   * @deprecated Use new AbilitiesService methods
   */
  valueFor() {
    deprecateMethod();
    return super.valueFor(...arguments);
  }

  /**
   * @deprecated Use new AbilitiesService methods
   */
  can() {
    deprecateMethod();
    return super.can(...arguments);
  }

  /**
   * @deprecated Use new AbilitiesService methods
   */
  cannot() {
    deprecateMethod();
    return super.cannot(...arguments);
  }
}
