/**
* D12 JAVASCRIPT MODULE
* @description A Collection of Methods for Data Manipulation
* @author rcj1492
* @license MIT
* @version 0.0.1
* @email support@collectiveacuity.com
**/
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ingestObject = ingestObject;
exports.objectSize = objectSize;
exports.ingestOptions = ingestOptions;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ingestObject(obj) {
  /* a method to ensure a plain object output */
  var empty_map = new Object.constructor(null);

  if (obj === null || typeof obj === 'undefined') {
    return empty_map;
  } else if (!_lodash.default.isPlainObject(obj)) {
    return empty_map;
  }

  return obj;
}

function objectSize(obj) {
  /* a method to determine number of keys in plain object */
  return Object.keys(obj).length;
}

function ingestOptions(options, defaults) {
  /* a recursive method to merge an object of options into an object of defaults */
  // verify input is a map
  options = ingestObject(options); // define ingest map helper function

  function _ingest_map(opts, defs) {
    var output = new Object.constructor(null);

    if (!objectSize(defs)) {
      for (var k in opts) {
        output[k] = opts[k];
      }
    } else {
      for (var key in defs) {
        if (key in opts) {
          if (_typeof(opts[key]) === _typeof(defs[key])) {
            if (_lodash.default.isFunction(defs[key])) {
              if (_lodash.default.isFunction(opts[key])) {
                output[key] = opts[key];
              } else {
                output[key] = defs[key];
              }
            } else if (_lodash.default.isArray(opts[key])) {
              output[key] = _ingest_array(opts[key], defs[key]);
            } else if (_lodash.default.isPlainObject(opts[key])) {
              output[key] = _ingest_map(opts[key], defs[key]);
            } else {
              output[key] = opts[key];
            }
          } else {
            output[key] = defs[key];
          }
        } else {
          output[key] = defs[key];
        }
      }
    }

    return output;
  } // define ingest array helper function


  function _ingest_array(opts, defs) {
    var output = [];
    var item = null;

    try {
      item = defs[0];
    } catch (e) {}

    for (var i = 0; i < opts.length; i++) {
      if (item == null) {
        output.push(opts);
      } else {
        if (_typeof(opts[i]) === _typeof(item)) {
          if (isFunction(item)) {
            if (isFunction(opts[i])) {
              output.push(opts[i]);
            }
          } else if (_lodash.default.isArray(opts[i])) {
            output.push(_ingest_array(opts[i], item));
          } else if (_lodash.default.isPlainObject(opts[i])) {
            output.push(_ingest_map(opts[i], item));
          } else {
            output.push(opts[i]);
          }
        }
      }
    }

    return output;
  } // start recursion


  return _ingest_map(options, defaults);
}
