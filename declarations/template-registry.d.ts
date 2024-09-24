import CanHelper from './helpers/can.ts';
import CannotHelper from './helpers/cannot.ts';
export default interface Registry {
    can: typeof CanHelper;
    cannot: typeof CannotHelper;
}
//# sourceMappingURL=template-registry.d.ts.map