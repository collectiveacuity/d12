/*!
* @name D12
* @description A Platonic Solid for Ideal Data
* @author rcj1492
* @license MIT
* @version 0.0.2
* @copyright 2018 Collective Acuity 
* @email support@collectiveacuity.com
* @url https://github.com/collectiveacuity/d12
*/
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isPlainObject = isPlainObject;
exports.isArray = isArray;
exports.isInteger = isInteger;
exports.ingestObject = ingestObject;
exports.ingestString = ingestString;
exports.ingestBoolean = ingestBoolean;
exports.ingestArray = ingestArray;
exports.ingestInteger = ingestInteger;
exports.ingestNumber = ingestNumber;
exports.objectSize = objectSize;
exports.ingestOptions = ingestOptions;
exports.deepCopy = deepCopy;
exports.emptyObject = emptyObject;
exports.validateString = validateString;
exports.validateData = validateData;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isString(obj) {
  return _lodash.default.isString(obj);
}

function isNumber(obj) {
  return _lodash.default.isNumber(obj);
}

function isBoolean(obj) {
  return _lodash.default.isBoolean(obj);
}

function isPlainObject(obj) {
  return _lodash.default.isPlainObject(obj);
}

function isArray(obj) {
  return _lodash.default.isArray(obj);
}

function isInteger(obj) {
  return _lodash.default.isInteger(obj);
}

function ingestObject(obj) {
  /* a method to ensure a plain object output */
  return _lodash.default.isPlainObject(obj) ? obj : {};
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
    var output = {};

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

function deepCopy(obj) {
  /* a method for cloning an object */
  // https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
  if (obj == null || !(_lodash.default.isObjectLike(obj) || _lodash.default.isDate(obj))) {
    return obj;
  } else {
    var copy;

    if (_lodash.default.isDate(obj)) {
      copy = new obj.constructor();
    } else {
      copy = obj.constructor();
    }

    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
    }

    return copy;
  }
}

function emptyObject(obj) {
  /* a method for deleting all the properties of an object */
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = null;
      delete obj[key];
    }
  }
}

function validateString(input, criteria) {
  /* a method to test string input for valid criteria */
  // ingest criteria
  var defaults = {
    must_contain: {},
    must_not_contain: {},
    equal_to: {},
    max_length: 0,
    min_length: 0
  };
  var tests = ingestOptions(criteria, defaults); // construct empty report

  var report = {
    required: '',
    prohibited: ''
  }; // test input for required regex

  for (var key in tests.must_contain) {
    var test_pattern = new RegExp(key, 'i');

    if (!test_pattern.test(input)) {
      report.required = tests.must_contain[key];
      return report;
    }
  } // test input for expected value


  for (var _key in tests.equal_to) {
    if (_key !== input) {
      report.required = tests.equal_to[_key];
      return report;
    }
  } // test input for min length


  if (tests.min_length) {
    if (input.length < tests.min_length) {
      report.required = 'must contain at least ' + tests.min_length.toString() + ' characters.';
      return report;
    }
  } // test input for prohibited regex


  for (var _key2 in tests.must_not_contain) {
    var _test_pattern = new RegExp(_key2, 'i');

    if (_test_pattern.test(input)) {
      report.prohibited = tests.must_not_contain[_key2];
      return report;
    }
  } // test input for max length


  if (tests.max_length) {
    if (input.length > tests.max_length) {
      report.prohibited = 'cannot contain more than ' + tests.max_length.toString() + ' characters.';
      return report;
    }
  } // return clean report


  return report;
}

function validateData(input, criteria) {
  /* a method to test data against valid criteria */
  var report = {
    required: '',
    prohibited: ''
  };
  var datatype = ingestString(criteria.datatype);

  if (datatype === 'string') {
    if (_lodash.default.isString(input)) {
      return validateString(input, criteria);
    } else {
      report.required = 'must be a string datatype.';
      return report;
    }
  } // TODO add validation of numbers, integers, arrays, maps and booleans


  return report;
}
