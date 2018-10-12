// import dependencies
import _ from 'lodash'

export function ingestObject (obj) {
  
  /* a method to ensure a plain object output */
  
  return _.isPlainObject(obj) ? obj : {}
  
}

export function ingestString (obj) {
  
  /* a method to ensure a string output */
  
  return _.isString(obj) ? obj : ''
  
}

export function ingestBoolean (obj) {

  /* a method to ensure a boolean output */
  
  return _.isBoolean(obj) ? obj : false
  
}

export function ingestArray (obj) {
  
  /* a method to ensure an array output */
  
  return _.isArray(obj) ? obj : []
  
}

export function ingestInteger (obj) {
  
  /* a method to ensure an integer output */
  
  return _.isInteger(obj) ? obj : 0
  
}

export function ingestNumber (obj) {
  
  /* a method to ensure an integer output */
  
  return _.isNumber(obj) ? obj : 0
  
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
            if (_.isArray(opts[key])) {
              output[key] = _ingest_array(opts[key], defs[key])
            } else if (_.isPlainObject(opts[key])) {
              output[key] = _ingest_map(opts[key], defs[key])
            } else {
              output[key] = opts[key]
            }
          } else {
            output[key] = defs[key]
          }
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
          if (_.isArray(opts[i])) {
            output.push(_ingest_array(opts[i], item))
          } else if (_.isPlainObject(opts[i])) {
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
  
  if (obj == null || !(_.isObjectLike(obj) || _.isDate(obj))) {
    return obj
  } else {
    let copy;
    if (_.isDate(obj)){
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

export function validateString (input, criteria) {

  /* a method to test string input for valid criteria */

  // ingest criteria
  let defaults = {
    must_contain: {},
    must_not_contain: {},
    equal_to: {},
    max_length: 0,
    min_length: 0
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
      report.required = 'must contain at least ' + tests.min_length.toString() + ' characters.';
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
      report.prohibited = 'cannot contain more than ' + tests.max_length.toString() + ' characters.';
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
    if (_.isString(input)){
      return validateString(input, criteria)
    } else {
      report.required = 'must be a string datatype.';
      return report;
    }
  }
  
  // TODO add validation of numbers, integers, arrays, maps and booleans
  
  return report;
  
}

