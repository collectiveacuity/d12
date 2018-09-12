"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ingest = ingest;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * D12 JAVASCRIPT MODULE
 * @description A Collection of Methods for Data Manipulation
 * @author rcj1492
 * @license MIT
 * @version 0.0.1
 * @email support@collectiveacuity.com
 */
// import dependencies
function ingest(input_options, default_options) {
  // define helper
  function mapSize(map_object) {
    var count = 0;
    $.each(map_object, function (i, elem) {
      count++;
    });
    return count;
  } // define helper


  function isFunction(obj) {
    if (obj == null || typeof obj === 'undefined') {
      return false;
    } else if ({}.toString.call(obj) !== '[object Function]') {
      return false;
    }

    return true;
  } // define helper


  function ingestMap(map_object) {
    var empty_map = {};

    if (map_object == null || typeof map_object === 'undefined') {
      return empty_map;
    } else if (_typeof(map_object) !== 'object') {
      return empty_map;
    } else if ($.isArray(map_object)) {
      return empty_map;
    } else if (!mapSize(map_object)) {
      return empty_map;
    }

    return map_object;
  } // define helper


  function isMap(obj) {
    if (obj == null || typeof obj === 'undefined') {
      return false;
    } else if (_typeof(obj) !== 'object') {
      return false;
    } else if ($.isArray(obj)) {
      return false;
    }

    return true;
  } // verify input is a map


  input_options = ingestMap(input_options); // define ingest map helper function

  function _ingest_map(input, defaults) {
    var output = {};

    if (!mapSize(defaults)) {
      for (var k in input) {
        output[k] = input[k];
      }
    } else {
      for (var key in defaults) {
        if (key in input) {
          if (_typeof(input[key]) === _typeof(defaults[key])) {
            if (isFunction(defaults[key])) {
              if (isFunction(input[key])) {
                output[key] = input[key];
              } else {
                output[key] = defaults[key];
              }
            } else if ($.isArray(input[key])) {
              output[key] = _ingest_array(input[key], defaults[key]);
            } else if (isMap(input[key])) {
              output[key] = _ingest_map(input[key], defaults[key]);
            } else {
              output[key] = input[key];
            }
          } else {
            output[key] = defaults[key];
          }
        } else {
          output[key] = defaults[key];
        }
      }
    }

    return output;
  } // define ingest array helper function


  function _ingest_array(input, defaults) {
    var output = [];
    var item = null;

    try {
      item = defaults[0];
    } catch (e) {}

    for (var i = 0; i < input.length; i++) {
      if (item == null) {
        output.push(input);
      } else {
        if (_typeof(input[i]) === _typeof(item)) {
          if (isFunction(item)) {
            if (isFunction(input[i])) {
              output.push(input[i]);
            }
          } else if ($.isArray(input[i])) {
            output.push(_ingest_array(input[i], item));
          } else if (isMap(input[i])) {
            output.push(_ingest_map(input[i], item));
          } else {
            output.push(input[i]);
          }
        }
      }
    }

    return output;
  } // start recursion


  return _ingest_map(input_options, default_options);
}
