import Ember from 'ember';

export default {
  name: 'session',
  initialize: function(container, app) {
    var Session = Ember.Object.extend();
    app.register("session:main", Session);
    app.inject("controller", "session", "session:main");
    app.inject("route", "session", "session:main");
  }
};