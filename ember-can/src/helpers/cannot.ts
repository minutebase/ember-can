import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import type Ability from 'ember-can/services/abilities';

interface CannotSignature {
  Args: {
    Positional: [abilityString: string, model?: unknown];
    Named: Record<string, unknown>;
  };
  Return: boolean;
}

export default class CannotHelper extends Helper<CannotSignature> {
  @service declare abilities: Ability;

  compute(
    [abilityString, model]: CannotSignature['Args']['Positional'],
    properties: CannotSignature['Args']['Named'] = {},
  ): boolean {
    return this.abilities.cannot(abilityString ?? '', model, properties);
  }
}
