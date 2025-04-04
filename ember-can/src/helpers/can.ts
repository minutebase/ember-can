import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import type Ability from '../services/abilities.ts';

interface CanSignature {
  Args: {
    Positional: [abilityString: string, model?: unknown];
    Named: Record<string, unknown>;
  };
  Return: boolean;
}

export default class CanHelper extends Helper<CanSignature> {
  @service declare abilities: Ability;

  compute(
    [abilityString, model]: CanSignature['Args']['Positional'],
    properties: CanSignature['Args']['Named'] = {},
  ): boolean {
    return this.abilities.can(abilityString ?? '', model, properties);
  }
}
