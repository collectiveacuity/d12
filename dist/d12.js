/**
* D12 JAVASCRIPT MODULE
* @description A Platonic Solid for Ideal Data
* @author rcj1492
* @license MIT
* @version 0.0.1
* @copyright 2018 Collective Acuity 
* @email support@collectiveacuity.com
**/
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ingestObject = ingestObject;
exports.ingestString = ingestString;
exports.ingestBoolean = ingestBoolean;
exports.ingestArray = ingestArray;
exports.ingestInteger = ingestInteger;
exports.ingestNumber = ingestNumber;
exports.objectSize = objectSize;
exports.ingestOptions = ingestOptions;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ingestObject(obj) {
  /* a method to ensure a plain object output */
  return _lodash.default.isPlainObject(obj) ? obj : new Object.constructor(null);
}

function ingestString(obj) {
  /* a method to ensure a string output */
  return _lodash.default.isString(obj) ? obj : '';
}

function ingestBoolean(obj) {
  /* a method to ensure a boolean output */
  return _lodash.default.isBoolean(obj) ? obj : false;
}

function ingestArray(obj) {
  /* a method to ensure an array output */
  return _lodash.default.isArray(obj) ? obj : [];
}

function ingestInteger(obj) {
  /* a method to ensure an integer output */
  return _lodash.default.isInteger(obj) ? obj : 0;
}

function ingestNumber(obj) {
  /* a method to ensure an integer output */
  return _lodash.default.isNumber(obj) ? obj : 0;
}

function objectSize(obj) {
  /* a method to determine number of keys in a plain object */
  return Object.keys(ingestObject(obj)).length;
}

function ingestOptions(options, defaults) {
  /* a recursive method to merge an object of options into an object of defaults 
  * 
  * NOTE:
  * the ingestion process preserves the scope and type of the keys in defaults
  * and can recursively explore nested objects and arrays. an empty array in defaults
  * will add items from the corresponding key in options, otherwise it will only add 
  * items whose value matches the datatype of the first item declared in defaults.
  * no items declared in an array in defaults will be added to the output.
  * */
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
            if (_lodash.default.isArray(opts[key])) {
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
          if (_lodash.default.isArray(opts[i])) {
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
