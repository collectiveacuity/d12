/*!
* @name D12
* @description A Platonic Solid for Ideal Data
* @author rcj1492
* @license MIT
* @version 0.0.6
* @copyright 2018-2019 Collective Acuity 
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
exports.isObjectLike = isObjectLike;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.ingestObject = ingestObject;
exports.ingestString = ingestString;
exports.ingestBoolean = ingestBoolean;
exports.ingestArray = ingestArray;
exports.ingestInteger = ingestInteger;
exports.ingestNumber = ingestNumber;
exports.ingestMap = ingestMap;
exports.objectSize = objectSize;
exports.ingestOptions = ingestOptions;
exports.deepCopy = deepCopy;
exports.emptyObject = emptyObject;
exports.joinWords = joinWords;
exports.parseDiff = parseDiff;
exports.upsertValues = upsertValues;
exports.validateString = validateString;
exports.validateData = validateData;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isInteger2 = _interopRequireDefault(require("lodash/isInteger"));

var _isObjectLike2 = _interopRequireDefault(require("lodash/isObjectLike"));

var _isDate2 = _interopRequireDefault(require("lodash/isDate"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _get2 = _interopRequireDefault(require("lodash/get"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isString(obj) {
  return (0, _isString2.default)(obj);
}

function isNumber(obj) {
  return (0, _isNumber2.default)(obj);
}

function isBoolean(obj) {
  return (0, _isBoolean2.default)(obj);
}

function isPlainObject(obj) {
  return (0, _isPlainObject2.default)(obj);
}

function isArray(obj) {
  return (0, _isArray2.default)(obj);
}

function isInteger(obj) {
  return (0, _isInteger2.default)(obj);
}

function isObjectLike(obj) {
  return (0, _isObjectLike2.default)(obj);
}

function isDate(obj) {
  return (0, _isDate2.default)(obj);
}

function isFunction(obj) {
  return (0, _isFunction2.default)(obj);
}

function ingestObject(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure a plain object output */
  if (path) {
    return isPlainObject((0, _get2.default)(obj, path)) ? obj : {};
  } else {
    return isPlainObject(obj) ? obj : {};
  }
}

function ingestString(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure a string output */
  if (path) {
    return isString((0, _get2.default)(obj, path)) ? obj : '';
  } else {
    return isString(obj) ? obj : '';
  }
}

function ingestBoolean(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure a boolean output */
  if (path) {
    return isBoolean((0, _get2.default)(obj, path)) ? obj : false;
  } else {
    return isBoolean(obj) ? obj : false;
  }
}

function ingestArray(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure an array output */
  if (path) {
    return isArray((0, _get2.default)(obj, path)) ? obj : [];
  } else {
    return isArray(obj) ? obj : [];
  }
}

function ingestInteger(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure an integer output */
  if (path) {
    return isInteger((0, _get2.default)(obj, path)) ? obj : 0;
  } else {
    return isInteger(obj) ? obj : 0;
  }
}

function ingestNumber(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure an integer output */
  if (path) {
    return isNumber((0, _get2.default)(obj, path)) ? obj : 0;
  } else {
    return isNumber(obj) ? obj : 0;
  }
}

function ingestMap(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure a plain object output */
  if (path) {
    return isPlainObject((0, _get2.default)(obj, path)) ? obj : {};
  } else {
    return isPlainObject(obj) ? obj : {};
  }
}

function objectSize(obj) {
  /* a method to determine number of keys in a plain object */
  return Object.keys(ingestObject(obj)).length;
}

function ingestOptions(options, defaults) {
  /* a recursive method to merge a map of options into a map of defaults 
  * 
  * NOTE:
  * the ingestion process preserves the scope and type of the keys in defaults
  * and can recursively explore nested objects and arrays. an empty array in defaults
  * will add items from the corresponding key in options, otherwise it will only add 
  * items whose value matches the datatype of the first item declared in defaults.
  * no items declared in an array in defaults will be added to the output.
  * 
  * example:
  * 
  * let options = {
  *   token: 'abc',
  *   dt: 1123456789.012,
  *   timeout: '4000',
  *   places: [ 'karachi', 3, 'tallinn', { place: 'berlin' }, 'london' ]
  *   extra: 'key'
  * }
  * let defaults = {
  *   token: '',
  *   dt: 0.0,
  *   timeout: 9000,
  *   method: 'header',
  *   places: [ '' ]
  *   offline: false
  * }
  * console.log(ingestOptions(options, defaults))
  * $ { 
  * $   token: 'abc', 
  * $   dt: 1123456789.012, 
  * $   timeout: 9000, 
  * $   method: 'header',
  * $   places: [ 'karachi', 'tallinn', 'london' ] 
  * $   offline: false
  * $ }
  * */
  // verify input is a map
  options = ingestMap(options); // define ingest map helper function

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
            if (isArray(opts[key])) {
              output[key] = _ingest_array(opts[key], defs[key]);
            } else if (isPlainObject(opts[key])) {
              output[key] = _ingest_map(opts[key], defs[key]);
            } else {
              output[key] = opts[key];
            }
          } else {
            output[key] = defs[key];
          }
        } else if (isArray(defs[key])) {
          output[key] = [];
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
          if (isArray(opts[i])) {
            output.push(_ingest_array(opts[i], item));
          } else if (isPlainObject(opts[i])) {
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
  if (obj == null || !isObjectLike(obj)) {
    return obj;
  } else {
    if (isDate(obj)) {
      return obj;
    }

    var copy = obj.constructor();

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

function joinWords(array, options) {
  /* a method for conjoining words */
  // ingest options
  var defaults = {
    conjunction: 'and',
    // adds value before last item in array
    prefix: '',
    // adds value before each item in array
    suffix: '' // adds value after each item in array

  };
  var kwargs = ingestOptions(options, defaults); // compose text

  var text = '';

  for (var i = 0; i < array.length; i++) {
    if (text) {
      if (i + 1 === array.length) {
        text += ' ' + kwargs.conjunction + ' ';
      } else {
        text += ', ';
      }
    }

    text += kwargs.prefix + array[i] + kwargs.suffix;
  }

  return text;
}

function parseDiff(altered, original) {
  /* a method to reduce an object to only the fields with altered values */
  // NOTE: deleted fields are returned as a null value
  function parse(a, o) {
    var n = {}; // examine all keys in altered

    for (var k in a) {
      if (k in o) {
        if (a[k] == null && o[k] != null) {
          n[k] = a[k];
        } else if (isPlainObject(a[k])) {
          if (isPlainObject(o[k])) {
            var nested = parse(a[k], o[k]);

            if (objectSize(nested)) {
              n[k] = nested;
            }
          } else {
            n[k] = a[k];
          }
        } else if (a[k] !== o[k]) {
          n[k] = a[k];
        }
      } else {
        n[k] = a[k];
      }
    } // mark any missing key as a null value


    for (var _k in o) {
      if (!(_k in a)) {
        n[_k] = null;
      }
    }

    return n;
  } // ingest inputs


  var maps = {
    altered: ingestObject(altered),
    original: ingestObject(original),
    parsed: {}
  }; // run recursive function

  if (objectSize(maps.altered)) {
    maps.parsed = parse(maps.altered, maps.original);
  }

  return maps.parsed;
}

function upsertValues(upsert, existing) {
  /* a method to upsert values into an existing object */
  // NOTE:    declaring a value for a key as null will remove that key from its parent
  // define recursive helper function
  function runUpsert(u, e) {
    for (var k in u) {
      if (u[k] == null && k in e) {
        delete e[k];
      } else if (isPlainObject(u[k])) {
        if (k in e && isPlainObject(e[k])) {
          e[k] = runUpsert(u[k], e[k]);
        } else {
          e[k] = u[k];
        }
      } else {
        e[k] = u[k];
      }
    }

    return e;
  } // ingest inputs


  var maps = {
    upsert: deepCopy(ingestObject(upsert)),
    existing: deepCopy(ingestObject(existing)),
    updated: {}
  }; // run recursive function

  if (objectSize(maps.upsert)) {
    maps.updated = runUpsert(maps.upsert, maps.existing);
  }

  return maps.updated;
}

function validateString(input, criteria) {
  /* a method to test string input for valid criteria */
  // ingest criteria
  var defaults = {
    must_contain: {},
    must_not_contain: {},
    equal_to: {},
    max_length: 0,
    min_length: 0,
    discrete_values: [''],
    excluded_values: ['']
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
      report.required = 'must contain at least ' + tests.min_length.toString() + ' characters';
      return report;
    }
  } // test input for discrete values


  if (tests.discrete_values.length) {
    if (tests.discrete_values.indexOf(input) === -1) {
      var words = joinWords(tests.discrete_values, {
        conjunction: 'or',
        prefix: '"',
        suffix: '"'
      });
      report.required = 'may only be ' + words;
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
      report.prohibited = 'cannot contain more than ' + tests.max_length.toString() + ' characters';
      return report;
    }
  } // test input for discrete values


  if (tests.excluded_values.length) {
    if (tests.excluded_values.indexOf(input) > -1) {
      var _words = joinWords(tests.excluded_values, {
        conjunction: 'or',
        prefix: '"',
        suffix: '"'
      });

      report.prohibited = 'cannot be ' + _words;
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
    if (isString(input)) {
      return validateString(input, criteria);
    } else {
      report.required = 'must be a string datatype.';
      return report;
    }
  } // TODO add validation of numbers, integers, arrays, maps and booleans


  return report;
}
