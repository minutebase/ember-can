import '@glint/environment-ember-loose';
import { TemplateFactory } from 'ember-cli-htmlbars';

// Types for compiled templates
declare module 'ember-can/templates/*' {
  const tmpl: TemplateFactory;
  export default tmpl;
}
