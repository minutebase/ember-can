import Ember from 'ember';
import can from '../utils/can';

function boundIfCan(context, container, activityName, resourceName, options) {
  var fn = function(resource) {
    return can(container, activityName, resource);
  };
  return Ember.Handlebars.bind.call(context, resourceName, options, true, fn, null, []);
}

function unboundIfCan(context, container, activityName, options) {
  var template;
  if (can(container, activityName)) {
    template = options.fn;
  } else {
    template = options.inverse;
  }

  return template(context, { data: options.data });
}

export default function(activityName, resourceName, options) {
  if (arguments.length === 2) {
    options      = resourceName;
    resourceName = null;
  }

  var data      = options.data;
  var container = this.container || (data && data.view && data.view.container);
  var context   = (options.contexts && options.contexts.length) ? options.contexts[0] : this;

  if (resourceName) {
    return boundIfCan(context, container, activityName, resourceName, options);
  } else {
    return unboundIfCan(context, container, activityName, options);
  }
}
