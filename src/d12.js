// import dependencies
import _isString from 'lodash/isString'
import _isNumber from 'lodash/isNumber'
import _isBoolean from 'lodash/isBoolean'
import _isPlainObject from 'lodash/isPlainObject'
import _isArray from 'lodash/isArray'
import _isInteger from 'lodash/isInteger'
import _isObjectLike from 'lodash/isObjectLike'
import _isDate from 'lodash/isDate'
import _isFunction from 'lodash/isFunction'

export function isString (obj) {
  return _isString(obj)
}

export function isNumber (obj) {
  return _isNumber(obj)
}

export function isBoolean (obj) {
  return _isBoolean(obj)
}

export function isPlainObject (obj) {
  return _isPlainObject(obj)
}

export function isArray(obj) {
  return _isArray(obj)
}

export function isInteger(obj) {
  return _isInteger(obj)
}

export function isObjectLike(obj) {
  return _isObjectLike(obj)
}

export function isDate(obj) {
  return _isDate(obj)
}

export function isFunction(obj) {
  return _isFunction(obj)
}

export function ingestObject (obj) {
  
  /* a method to ensure a plain object output */
  
  return isPlainObject(obj) ? obj : {}
  
}

export function ingestString (obj) {
  
  /* a method to ensure a string output */
  
  return isString(obj) ? obj : ''
  
}

export function ingestBoolean (obj) {

  /* a method to ensure a boolean output */
  
  return isBoolean(obj) ? obj : false
  
}

export function ingestArray (obj) {
  
  /* a method to ensure an array output */
  
  return isArray(obj) ? obj : []
  
}

export function ingestInteger (obj) {
  
  /* a method to ensure an integer output */
  
  return isInteger(obj) ? obj : 0
  
}

export function ingestNumber (obj) {
  
  /* a method to ensure an integer output */
  
  return isNumber(obj) ? obj : 0
  
}

export function objectSize (obj) {
  
  /* a method to determine number of keys in a plain object */
  
  return Object.keys(ingestObject(obj)).length;
  
}
  
export function ingestOptions (options, defaults) {
  
  /* a recursive method to merge an object of options into an object of defaults 
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
  options = ingestObject(options);

  // define ingest map helper function
  function _ingest_map (opts, defs) {
    let output = {};
    if (!objectSize(defs)) {
      for (let k in opts) {
        output[k] = opts[k]
      }
    } else {
      for (let key in defs) {
        if (key in opts) {
          if (typeof (opts[key]) === typeof (defs[key])) {
            if (isArray(opts[key])) {
              output[key] = _ingest_array(opts[key], defs[key])
            } else if (isPlainObject(opts[key])) {
              output[key] = _ingest_map(opts[key], defs[key])
            } else {
              output[key] = opts[key]
            }
          } else {
            output[key] = defs[key]
          }
        } else if (isArray(defs[key])){
          output[key] = []    
        } else {
          output[key] = defs[key]
        }
      }
    }
    return output
  }

  // define ingest array helper function
  function _ingest_array (opts, defs) {
    let output = [];
    let item = null;
    try { item = defs[0] } catch (e) {}
    for (let i = 0; i < opts.length; i++) {
      if (item == null) {
        output.push(opts)
      } else {
        if (typeof (opts[i]) === typeof (item)) {
          if (isArray(opts[i])) {
            output.push(_ingest_array(opts[i], item))
          } else if (isPlainObject(opts[i])) {
            output.push(_ingest_map(opts[i], item))
          } else {
            output.push(opts[i])
          }
        }
      }
    }
    return output
  }

  // start recursion
  return _ingest_map(options, defaults);
  
}

export function deepCopy (obj) {
  
  /* a method for cloning an object */

  // https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
  
  if (obj == null || !(isObjectLike(obj) || isDate(obj))) {
    return obj
  } else {
    let copy;
    if (isDate(obj)){
      copy = new obj.constructor();
    } else {
      copy = obj.constructor();
    }
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr])
    }
    return copy
  }
  
}

export function emptyObject (obj) {
  
  /* a method for deleting all the properties of an object */

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = null;
      delete obj[key]
    }
  }

}

export function joinWords (array, options) {

  /* a method for conjoining words */
  
  // ingest options
  let defaults = {
    conjunction: 'and', // adds value before last item in array
    prefix: '', // adds value before each item in array
    suffix: '' // adds value after each item in array
  };
  let kwargs = ingestOptions(options, defaults);
  
  // compose text
  let text = '';
  for (let i = 0; i < array.length; i++){
    if (text){
      if (i + 1 === array.length){
        text += ' ' + kwargs.conjunction + ' '
      } else {
        text += ', '
      }
    }
    text += kwargs.prefix + array[i] + kwargs.suffix
  }
  
  return text
  
}

export function validateString (input, criteria) {

  /* a method to test string input for valid criteria */

  // ingest criteria
  let defaults = {
    must_contain: {},
    must_not_contain: {},
    equal_to: {},
    max_length: 0,
    min_length: 0,
    discrete_values: [ '' ],
    excluded_values: [ '' ]
  };
  const tests = ingestOptions(criteria, defaults);

  // construct empty report
  let report = {
    required: '',
    prohibited: ''
  };

  // test input for required regex
  for (let key in tests.must_contain) {
    let test_pattern = new RegExp(key, 'i');
    if (!test_pattern.test(input)) {
      report.required = tests.must_contain[key];
      return report;
    }
  }
  
  // test input for expected value
  for (let key in tests.equal_to) {
    if (key !== input) {
      report.required = tests.equal_to[key];
      return report;
    }
  }

  // test input for min length
  if (tests.min_length) {
    if (input.length < tests.min_length) {
      report.required = 'must contain at least ' + tests.min_length.toString() + ' characters';
      return report;
    }
  }
  
  // test input for discrete values
  if (tests.discrete_values.length) {
    if (tests.discrete_values.indexOf(input) === -1){
      let words = joinWords(tests.discrete_values, {conjunction: 'or', prefix: '"', suffix: '"'});
      report.required = 'may only be ' + words;
      return report;
    }
  }
  
  // test input for prohibited regex
  for (let key in tests.must_not_contain) {
    let test_pattern = new RegExp(key, 'i');
    if (test_pattern.test(input)) {
      report.prohibited = tests.must_not_contain[key];
      return report;
    }
  }

  // test input for max length
  if (tests.max_length) {
    if (input.length > tests.max_length) {
      report.prohibited = 'cannot contain more than ' + tests.max_length.toString() + ' characters';
      return report;
    }
  }
  
  // test input for discrete values
  if (tests.excluded_values.length) {
    if (tests.excluded_values.indexOf(input) > -1){
      let words = joinWords(tests.excluded_values, {conjunction: 'or', prefix: '"', suffix: '"'});
      report.prohibited = 'cannot be ' + words;
      return report;
    }
  }

  // return clean report
  return report;
  
}

export function validateData (input, criteria) {
  
  /* a method to test data against valid criteria */
  
  let report = {
    required: '',
    prohibited: ''
  };
  
  const datatype = ingestString(criteria.datatype);
  
  if (datatype === 'string'){
    if (isString(input)){
      return validateString(input, criteria)
    } else {
      report.required = 'must be a string datatype.';
      return report;
    }
  }
  
  // TODO add validation of numbers, integers, arrays, maps and booleans
  
  return report;
  
}

