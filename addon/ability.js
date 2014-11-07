import Ember from 'ember';

var a_slice = [].slice;

if (Ember.EXTEND_PROTOTYPES === true || Ember.EXTEND_PROTOTYPES.Function) {
  Function.prototype.checks = function() {
    var names = a_slice.call(arguments);
    this.__ember_can_checks__ = names;
    return this;
  };
}

export function checks() {
  var func  = a_slice.call(arguments, -1)[0];
  var names = a_slice.call(arguments, 0, -1);
  func.__ember_can_checks__ = names;
  return func;
}

export function normalize(name) {
  return Ember.String.classify(name);
}

export default Ember.Object.extend({

  setupChecks: Ember.on("init", function() {
    var fn, key, names, i, len, name;
    var map = {};

    for (key in this) {
      fn = this[key];

      if (!fn || !fn.__ember_can_checks__) { continue; }
      names = fn.__ember_can_checks__;

      for (i=0, len=names.length; i<len; i++) {
        name = normalize(names[i]);
        if (!map[name]) { map[name] = []; }
        map[name].push(key);
      }
    }
    this._checks = map;
  }),

  can: function(abilityName, resource) {
    var name     = normalize(abilityName);
    var handlers = this._checks[name] || [];

    var fnName = "can"+name;
    if (this[fnName]) {
      handlers.unshift(fnName); // checks by explicit name first
    }

    Ember.assert("No ability handler found for "+abilityName, handlers.length);

    var handler, i, len;
    for (i=0, len=handlers.length; i<len; i++) {
      handler = handlers[i];
      if (!this[handler](resource)) {
        return false;
      }
    }

    return true;
  }
});