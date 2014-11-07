import Ember from 'ember';
import can from './utils/can';

var get = Ember.get;

export default {
  can: function(activityName, resourceName) {
    var fn = function() {
      var resource;
      if (resourceName) {
        resource = get(this, resourceName);
      }

      var container = this.container;
      return can(container, activityName, resource);
    };

    if (resourceName) {
      return Ember.computed(resourceName, fn);
    } else {
      return Ember.computed(fn);
    }
  }
};