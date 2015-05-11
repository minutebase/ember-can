import Ember from 'ember';

import {
  normalizeCombined
} from '../utils/normalize';

const {
  on,
  computed,
  assert,
  addObserver,
  removeObserver
} = Ember;

export default Ember.Component.extend({
  tagName: '',
  positionalParams: ["abilityDescription", "model"],

  ability: null,
  isAble: false,

  predecateName: computed("abilityDescription", {
    get() {
      const name = this.getAttr("abilityDescription");
      const { ability } = normalizeCombined(name);
      return ability;
    }
  }),

  abilityName: computed("abilityDescription", {
    get() {
      const name = this.getAttr("abilityDescription");
      const { type } = normalizeCombined(name);
      return type;
    }
  }),

  // Called on initial render, and any time the attrs change
  willRender() {
    this.teardownObserver();

    const abilityName = this.get("abilityName");
    const ability = this.container.lookup("ability:"+abilityName);

    assert("No ability type found for "+abilityName, ability);

    for (let k in this.attrs) {
      if (k === "abilityDescription") {
        continue;
      }

      ability.set(k, this.getAttr(k));
    }

    // We need to observe the predecate for changes, not possible to consume dynamic
    // computed property at the moment - https://github.com/emberjs/ember.js/pull/10501#issuecomment-99405991
    addObserver(ability, this.get("predecateName"), this, this.abilityPredecateChanged);

    this.set("ability", ability);

    this.abilityPredecateChanged();
  },

  abilityPredecateChanged() {
    const predecate = this.get("predecateName");
    this.set("isAble", this.get(`ability.${predecate}`));
  },

  teardownObserver: on("willDestroyElement", function() {
    const ability = this.get("ability");
    if (!ability) {
      return;
    }

    removeObserver(ability, this.get("predecateName"), this, this.abilityPredecateChanged);
  })
});