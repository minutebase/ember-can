import Ember from 'ember';
import { normalizeCombined } from '../utils/normalize';

var isHTMLBars = !!Ember.HTMLBars;

// TODO - find a better way of hooking up the ability to the view scope
// currently we set a unique property on the controller, which is rather nasty

var get = Ember.get;
var set = Ember.set;

var _guid = 0;
function guid() {
  return "_ability-"+(++_guid);
}

function bindViewProperty(ability, view, from, to) {
  var stream;
  if (from.isStream) {
    stream = from;
  } else {
    stream = view.getStream(from);
  }

  set(ability, to, stream.value());

  stream.subscribe(function(str) {
    set(ability, to, str.value());
  });
}

var EMPTY_TEMPLATE;

if (isHTMLBars) {
  EMPTY_TEMPLATE = {
    isHTMLBars: true,
    render: function() {
      return '';
    }
  };
} else {
  EMPTY_TEMPLATE = function(){ return ''; };
}

function makeHelper(isUnless) {
  // args when HTMLbars:   properties, hash, options, env
  // args when Handlebars: abilityName[, resourceName], options
  function helperFunc() {
    var abilityName, resourceName, options, hash, env, container, view, controller;

    if (isHTMLBars) {
      abilityName  = arguments[0][0];
      resourceName = arguments[0][1];
      hash         = arguments[1];
      options      = arguments[2];
      env          = arguments[3];
      container    = this.container;
      view         = env.data.view;
      controller   = get(view, "controller");
    } else {
      if (arguments.length === 2) {
        abilityName  = arguments[0];
        resourceName = null;
        options      = arguments[1];
      } else {
        abilityName  = arguments[0];
        resourceName = arguments[1];
        options      = arguments[2];
      }

      hash       = options.hash;
      view       = options.data.view;
      container  = view.container;
      controller = (options.contexts && options.contexts.length) ? options.contexts[0] : this;
    }

    var names   = normalizeCombined(abilityName);
    var ability = container.lookup("ability:"+names.type);

    Ember.assert("No ability type found for "+names.type, ability);

    if (resourceName) {
      bindViewProperty(ability, view, resourceName, "model");
    }

    // bind additional properties
    if (hash) {
      var key, prop;
      for (key in hash) {
        prop = hash[key];
        if (prop.isStream || options.hashTypes && options.hashTypes[key] === "ID") {
          bindViewProperty(ability, view, prop, key);
        } else {
          set(ability, key, prop);
        }
      }
    }

    if (isUnless) {
      var inverse = options.inverse || EMPTY_TEMPLATE;
      if (options.fn) {
        options.inverse = options.fn;
        options.fn      = inverse;
      } else {
        options.inverse  = options.template;
        options.template = inverse;
      }
    }

    // sets the ability to a unique property on the controller so that we can bind to it
    // TODO - find a better way of doing this, ideally we shouldn't need to touch the controller at all
    var holder = get(controller, "_abilities");
    if (!holder) {
      holder = Ember.Object.create();
      set(controller, "_abilities", holder);
    }

    var id = guid();
    set(holder, id, ability);

    // binds to abilities._ability-xxx.canYYY
    // where xxx is the ability instance and YYY is the property on that
    var propName = ["_abilities", id, names.ability].join(".");

    if (isHTMLBars) {
      env.helpers.boundIf.helperFunction.call(this, [propName], hash, options, env);
    } else {
      var fn = function(result) { return result; };
      return Ember.Handlebars.bind.call(this, propName, options, true, fn);
    }
  }

  if (isHTMLBars) {
    return {
      isHTMLBars: true,
      helperFunction: helperFunc,
      preprocessArguments: function() { }
    };
  } else {
    return helperFunc;
  }
}

export var ifHelper     = makeHelper();
export var unlessHelper = makeHelper(true);