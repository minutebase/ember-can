import Ember from 'ember';
import { normalizeCombined } from '../utils/normalize';

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

export default function(properties, hash, options, env) {
  var abilityName  = properties[0];
  var resource     = properties[1];
  var view         = env.data.view;
  var container    = view.container;
  var controller   = get(view, "controller");

  var names   = normalizeCombined(abilityName);
  var ability = container.lookup("ability:"+names.type);

  Ember.assert("No ability type found for "+names.type, ability);

  if (resource) {
    bindViewProperty(ability, view, resource, "model");
  }

  // bind additional properties
  var key, prop;
  for (key in hash) {
    prop = hash[key];
    if (prop.isStream || options.hashTypes && options.hashTypes[key] === "ID") {
      bindViewProperty(ability, view, prop, key);
    } else {
      set(ability, key, prop);
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
  var propName = ["controller._abilities", id, names.ability].join(".");

  return view.getStream(propName);
}
