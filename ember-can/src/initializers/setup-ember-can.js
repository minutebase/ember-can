export function initialize(application) {
  if (
    application.__registry__ &&
    application.__registry__.resolver &&
    application.__registry__.resolver.pluralizedTypes
  ) {
    application.__registry__.resolver.pluralizedTypes['ability'] = 'abilities';
  }
}
export default { initialize };
