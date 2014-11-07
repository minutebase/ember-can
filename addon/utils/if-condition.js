import Ember from 'ember';

// From https://gist.github.com/slindberg/9924116

/**
 * Bound Conditional if/else Block
 *
 * Executes the given block if all arguments are equal
 * NOTE: this helper is meant to be used by other helpers by specifying
 * a callback as the `conditional` option
 */
export default function() {
  var args = [].slice.call(arguments);
  var options = args.pop();
  var context = (options.contexts && options.contexts[0]) || this;

  if (!options.conditional) {
    throw new Error("A conditional callback must be specified when using the if-condition helper");
  }

  // Gather all bound property names to pass in order to observe them
  var properties = options.types.reduce(function(results, type, index) {
    if (type === 'ID') {
      results.push(args[index]);
    }
    return results;
  }, []);

  // Resolve actual values for all params to pass to the conditional callback
  var normalizer = function() {
    return Ember.Handlebars.resolveParams(context, args, options);
  };

  // This effectively makes the helper a bound helper
  // NOTE: 'content' path is used so that multiple properties can be bound to using the `childProperties` argument,
  // however this means that it can only be used with a controller that proxies values to the 'content' property
  return Ember.Handlebars.bind.call(context, 'content', options, true, options.conditional, normalizer, properties);
}
