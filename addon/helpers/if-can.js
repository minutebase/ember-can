import ifConditionHelper from '../utils/if-condition';
import can from '../utils/can';

export default function() {
  var options   = arguments[arguments.length - 1];
  var data      = options.data;
  var container = this.container || (data && data.view && data.view.container);

  options.conditional = function(results) {
    results.unshift(container);
    return can.apply(null, results);
  };

  return ifConditionHelper.apply(this, arguments);
}