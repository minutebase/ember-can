export default function(container, abilityName, resource, properties) {
  const service = container.lookup("service:can");
  return service.can(abilityName, resource, properties);
}