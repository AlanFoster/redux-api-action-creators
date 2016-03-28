"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function _default(configuration) {
  var _success = configuration.success;
  var _pending = configuration.pending;


  return {
    pending: function pending() {
      return {
        type: _pending
      };
    },
    success: function success(_ref) {
      var request = _ref.request;
      var response = _ref.response;

      return {
        type: _success,
        request: request,
        response: response
      };
    }
  };
}exports.default = _default;
;