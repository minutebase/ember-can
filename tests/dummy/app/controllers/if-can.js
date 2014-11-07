import Ember from 'ember';
import { computed } from 'ember-can';

export default Ember.Controller.extend({
  canWritePost: computed.can("write post")
});