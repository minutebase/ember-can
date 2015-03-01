import Ember from 'ember';

import helper from '../helpers/can';

export default {
  name: 'setup-ember-can-helpers',
  initialize: function() {
    Ember.HTMLBars._registerHelper('can', helper);
  }
};