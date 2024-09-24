import Helper from '@ember/component/helper';
import type Ability from '../services/abilities.ts';
interface CanSignature {
    Args: {
        Positional: [abilityString: string, model?: unknown];
        Named: Record<string, unknown>;
    };
    Return: boolean;
}
export default class CanHelper extends Helper<CanSignature> {
    abilities: Ability;
    compute([abilityString, model]: CanSignature['Args']['Positional'], properties?: CanSignature['Args']['Named']): boolean;
}
export {};
//# sourceMappingURL=can.d.ts.map