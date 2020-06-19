/*!
* @name D12
* @description A Platonic Solid for Ideal Data
* @author rcj1492
* @license MIT
* @version 0.0.7
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
exports.parseURL = parseURL;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isString(obj) {
  return (0, _isString2["default"])(obj);
}

function isNumber(obj) {
  return (0, _isNumber2["default"])(obj);
}

function isBoolean(obj) {
  return (0, _isBoolean2["default"])(obj);
}

function isPlainObject(obj) {
  return (0, _isPlainObject2["default"])(obj);
}

function isArray(obj) {
  return (0, _isArray2["default"])(obj);
}

function isInteger(obj) {
  return (0, _isInteger2["default"])(obj);
}

function isObjectLike(obj) {
  return (0, _isObjectLike2["default"])(obj);
}

function isDate(obj) {
  return (0, _isDate2["default"])(obj);
}

function isFunction(obj) {
  return (0, _isFunction2["default"])(obj);
}

function ingestObject(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure a plain object output */
  if (path) {
    return isPlainObject((0, _get2["default"])(obj, path)) ? obj : {};
  } else {
    return isPlainObject(obj) ? obj : {};
  }
}

function ingestString(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure a string output */
  if (path) {
    return isString((0, _get2["default"])(obj, path)) ? obj : '';
  } else {
    return isString(obj) ? obj : '';
  }
}

function ingestBoolean(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure a boolean output */
  if (path) {
    return isBoolean((0, _get2["default"])(obj, path)) ? obj : false;
  } else {
    return isBoolean(obj) ? obj : false;
  }
}

function ingestArray(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure an array output */
  if (path) {
    return isArray((0, _get2["default"])(obj, path)) ? obj : [];
  } else {
    return isArray(obj) ? obj : [];
  }
}

function ingestInteger(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure an integer output */
  if (path) {
    return isInteger((0, _get2["default"])(obj, path)) ? obj : 0;
  } else {
    return isInteger(obj) ? obj : 0;
  }
}

function ingestNumber(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure an integer output */
  if (path) {
    return isNumber((0, _get2["default"])(obj, path)) ? obj : 0;
  } else {
    return isNumber(obj) ? obj : 0;
  }
}

function ingestMap(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  /* a method to ensure a plain object output */
  if (path) {
    return isPlainObject((0, _get2["default"])(obj, path)) ? obj : {};
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
        } else if (isPlainObject(defs[key])) {
          output[key] = _ingest_map({}, defs[key]);
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

function validateString(input, criteria, options) {
  /* a method to test string input for valid criteria */
  // ingest options
  var opts = {
    order: 'must_contain,equal_to,min_length,discrete_values,must_not_contain,max_length,excluded_values' // sequence of tests to run

  };
  var kwargs = ingestOptions(options, opts); // ingest criteria

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

  function mustContain() {
    for (var key in tests.must_contain) {
      var test_pattern = new RegExp(key, 'i');

      if (!test_pattern.test(input)) {
        return tests.must_contain[key];
      }
    }
  } // test input for expected value


  function equalTo() {
    for (var key in tests.equal_to) {
      if (key !== input) {
        return tests.equal_to[key];
      }
    }
  } // test input for min length


  function minLength() {
    if (tests.min_length) {
      if (input.length < tests.min_length) {
        return 'must contain at least ' + tests.min_length.toString() + ' characters';
      }
    }
  } // test input for discrete values


  function discreteValues() {
    if (tests.discrete_values.length) {
      if (tests.discrete_values.indexOf(input) === -1) {
        var words = joinWords(tests.discrete_values, {
          conjunction: 'or',
          prefix: '"',
          suffix: '"'
        });
        return 'may only be ' + words;
      }
    }
  } // test input for prohibited regex


  function mustNotContain() {
    for (var key in tests.must_not_contain) {
      var test_pattern = new RegExp(key, 'i');

      if (test_pattern.test(input)) {
        return tests.must_not_contain[key];
      }
    }
  } // test input for max length


  function maxLength() {
    if (tests.max_length) {
      if (input.length > tests.max_length) {
        return 'cannot contain more than ' + tests.max_length.toString() + ' characters';
      }
    }
  } // test input for discrete values


  function excludedValues() {
    if (tests.excluded_values.length) {
      if (tests.excluded_values.indexOf(input) > -1) {
        var words = joinWords(tests.excluded_values, {
          conjunction: 'or',
          prefix: '"',
          suffix: '"'
        });
        return 'cannot be ' + words;
      }
    }
  } // determine order of tests


  var functions = {
    must_contain: mustContain,
    must_not_contain: mustNotContain,
    equal_to: equalTo,
    max_length: maxLength,
    min_length: minLength,
    discrete_values: discreteValues,
    excluded_values: excludedValues
  };
  var types = {
    must_contain: 'required',
    must_not_contain: 'prohibited',
    equal_to: 'required',
    max_length: 'prohibited',
    min_length: 'required',
    discrete_values: 'required',
    excluded_values: 'prohibited'
  };
  var order = kwargs.order.split(',');
  var sequence = [];
  var names = [];

  for (var i = 0; i < order.length; i++) {
    var test = order[i];

    if (test in functions) {
      names.push(test);
      sequence.push(functions[test]);
    }
  } // run tests


  for (var _i = 0; _i < sequence.length; _i++) {
    var result = sequence[_i]();

    if (result) {
      var name = names[_i];

      if (types[name] === 'required') {
        report.required = result;
      } else if (types[name] === 'prohibited') {
        report.prohibited = result;
      }

      return report;
    }
  } // return clean report


  return report;
}
/**
 * Tests data against valid criteria.
 *
 * @param {object}  input     an object of any datatype to validate
 * @param {object}  criteria  a map containing validation criteria
 * @param {object}  options   a map of options for validation steps
 * @return {object}           a map with required and prohibited error keys
 */


function validateData(input, criteria, options) {
  // ingest options
  var opts = {
    order: 'must_contain,equal_to,min_length,discrete_values,must_not_contain,max_length,excluded_values' // sequence of tests to run

  };
  var kwargs = ingestOptions(options, opts); // define default output

  var report = {
    required: '',
    prohibited: ''
  };
  var datatype = ingestString(criteria.datatype);

  if (datatype === 'string') {
    if (isString(input)) {
      return validateString(input, criteria, kwargs);
    } else {
      report.required = 'must be a string datatype.';
      return report;
    }
  } // TODO add validation of numbers, integers, arrays, maps and booleans


  return report;
}
/**
 * Tests string for valid url syntax and parses components of url.
 *
 * @param {string}  url   an url string to parse
 * @return {object}       a map with components of url
 */


function parseURL(url) {
  /* a method to parse the components of a url and validate syntax 
  *   
  *   return {
  *     absolute: absolute,   // composition of protocol, user, password, host and port
  *     protocol: protocol,   // string
  *     user: user,           // string or undefined  **optional
  *     password: password,   // string or undefined  **optional
  *     host: host,           // string
  *     port: port,           // integer or undefined **optional
  *     path: path,           // string or undefined  **optional
  *     query: query,         // string or undefined  **optional
  *     fragment: fragment,   // string or undefined  **optional
  *     errors: errors,       // map with components which have errors      
  *     valid: valid          // boolean              ** true if url is valid, false if url is invalid
  *   }
  * */
  // define default properties
  var errors = {};
  var valid = true;
  var absolute, userinfo, hostname, user, password;
  var host, port, path, query, fragment, tail, schema; // match main elements of schema

  if (isString(url)) {
    schema = url.match(/(^https?)\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  } else {
    throw new TypeError('url arg must be a string');
  }

  var protocol = schema ? schema[1] : null;
  var authority = schema ? schema[2] : null; // report error if not http or https

  if (!protocol) {
    errors.protocol = url;
  }

  if (authority) {
    // parse userinfo and hostname
    var segments = authority.match(/(.*)@(.*)/);

    if (segments) {
      userinfo = segments[1];
      hostname = segments[2];
    } else {
      hostname = authority;
    } // parse user and password


    if (userinfo) {
      var permissions = userinfo.match(/(.*):(.*)/);
      user = permissions ? permissions[1] : null;
      password = permissions ? permissions[2] : null;

      if (!permissions) {
        errors.userinfo = userinfo;
      }
    } // parse host and port


    var ports = hostname.match(/(.*):(.*)/);
    host = ports ? ports[1] : hostname;

    if (ports) {
      port = parseInt(ports[2]) ? parseInt(ports[2]) : null;

      if (!port) {
        errors.port = ports[2];
      }
    }
  } else {
    errors.authority = url;
  } // validate top-level domain


  if (host) {
    if (!host.match(/\./)) {
      errors.tld = host;
    } else if (host.match(/^\./) || host.match(/\.$/)) {
      errors.host = host;
    }
  } // parse the tail


  if (authority) {
    var head = '.*' + authority.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    var regex = new RegExp(head);
    tail = url.replace(regex, ''); // find indices for splitting tail components

    if (tail) {
      var parts;
      var question = tail.indexOf('?');
      var pound = tail.indexOf('#');

      if (question === -1 && pound === -1) {
        path = tail;
      } else if (question === -1) {
        parts = tail.split('#');
        path = parts[0];
        fragment = parts[1];
      } else if (pound === -1) {
        parts = tail.split('?');
        path = parts[0];
        query = parts[1]; // parse existence of both query and fragment  
      } else {
        var first = Math.min(question, pound);
        var second = '';

        if (first) {
          path = tail.slice(0, first);
          second = tail.slice(first);
        } else {
          second = tail;
        }

        if (question < pound) {
          parts = second.split('#');
          query = parts[0].slice(1);
          fragment = parts[1];
        } else {
          parts = second.split('?');
          fragment = parts[0].slice(1);
          query = parts[1];
          errors.fragment = tail;
        }
      }

      if (!path || path === '/') {
        path = undefined;
      }
    }
  } // compose absolute address


  if (protocol && authority) {
    absolute = "".concat(protocol, "://").concat(authority);
  } // determine validity


  if (Object.keys(errors).length) {
    valid = false;
  } // return report


  return {
    absolute: absolute,
    protocol: protocol,
    user: user,
    password: password,
    host: host,
    port: port,
    path: path,
    query: query,
    fragment: fragment,
    errors: errors,
    valid: valid
  };
}
