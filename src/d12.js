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
import _get from 'lodash/get'

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

export function ingestObject (obj, path='') {
  
  /* a method to ensure a plain object output */
  
  if (path){
    return isPlainObject(_get(obj, path)) ? obj : {}
  } else {
    return isPlainObject(obj) ? obj : {}
  }
  
}

export function ingestString (obj, path='') {
  
  /* a method to ensure a string output */
  
  if (path) {
    return isString(_get(obj, path)) ? obj : ''
  } else {
    return isString(obj) ? obj : ''
  }
  
}

export function ingestBoolean (obj, path='') {

  /* a method to ensure a boolean output */
  
  if (path) {
    return isBoolean(_get(obj, path)) ? obj : false
  } else {
    return isBoolean(obj) ? obj : false
  }
  
}

export function ingestArray (obj, path='') {
  
  /* a method to ensure an array output */
  
  if (path) {
    return isArray(_get(obj, path)) ? obj : []
  } else {
    return isArray(obj) ? obj : []
  }
  
}

export function ingestInteger (obj, path='') {
  
  /* a method to ensure an integer output */
  
  if (path) {
    return isInteger(_get(obj, path)) ? obj : 0
  } else {
    return isInteger(obj) ? obj : 0
  }
  
}

export function ingestNumber (obj, path='') {
  
  /* a method to ensure an integer output */
  
  if (path){
    return isNumber(_get(obj, path)) ? obj : 0
  } else {
    return isNumber(obj) ? obj : 0
  }
  
}

export function ingestMap (obj, path='') {
  
  /* a method to ensure a plain object output */
  
  if (path){
    return isPlainObject(_get(obj, path)) ? obj : {}
  } else {
    return isPlainObject(obj) ? obj : {}
  }
  
}

export function objectSize (obj) {
  
  /* a method to determine number of keys in a plain object */
  
  return Object.keys(ingestObject(obj)).length;
  
}
  
export function ingestOptions (options, defaults) {
  
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
  options = ingestMap(options);

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
        } else if (isArray(defs[key])) {
          output[key] = []
        } else if (isPlainObject(defs[key])) {
          output[key] = _ingest_map({}, defs[key])  
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
  
  if (obj == null || !(isObjectLike(obj))) {
    return obj
  } else {
    if (isDate(obj)){
      return obj
    }
    let copy = obj.constructor();
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

export function parseDiff (altered, original) {
  
  /* a method to reduce an object to only the fields with altered values */
  
  // NOTE: deleted fields are returned as a null value
  
  function parse (a, o){
    let n = {};
    // examine all keys in altered
    for (let k in a){
      if (k in o) {
        if (a[k] == null && o[k] != null){
          n[k] = a[k]
        } else if (isPlainObject(a[k])) {
          if (isPlainObject(o[k])){
            let nested = parse(a[k], o[k]);
            if (objectSize(nested)){
              n[k] = nested
            }
          } else {
            n[k] = a[k]
          }
        } else if (a[k] !== o[k]){
          n[k] = a[k]
        }
      } else {
        n[k] = a[k]
      }
    }
    // mark any missing key as a null value
    for (let k in o){
      if (!(k in a)){
        n[k] = null
      }
    }
    return n
  }
  
  // ingest inputs
  let maps = {
    altered: ingestObject(altered),
    original: ingestObject(original),
    parsed: {}
  };

  // run recursive function
  if (objectSize(maps.altered)) {
    maps.parsed = parse(maps.altered, maps.original)
  }

  return maps.parsed
  
}

export function upsertValues (upsert, existing) {
  
  /* a method to upsert values into an existing object */
  
  // NOTE:    declaring a value for a key as null will remove that key from its parent

  // define recursive helper function
  function runUpsert (u, e) {
    for (let k in u) {
      if (u[k] == null && (k in e)) {
        delete e[k]
      } else if (isPlainObject(u[k])) {
        if ((k in e) && isPlainObject(e[k])) {
          e[k] = runUpsert(u[k], e[k])
        } else {
          e[k] = u[k]
        }
      } else {
        e[k] = u[k]
      }
    }
    return e
  }

  // ingest inputs
  let maps = {
    upsert: deepCopy(ingestObject(upsert)),
    existing: deepCopy(ingestObject(existing)),
    updated: {}
  };

  // run recursive function
  if (objectSize(maps.upsert)) {
    maps.updated = runUpsert(maps.upsert, maps.existing)
  }

  return maps.updated
  
}

export function validateString (input, criteria, options) {

  /* a method to test string input for valid criteria */

  // ingest options
  let opts = {
    order: 'must_contain,equal_to,min_length,discrete_values,must_not_contain,max_length,excluded_values' // sequence of tests to run
  };
  const kwargs = ingestOptions(options, opts);
  
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
  function mustContain() {
    for (let key in tests.must_contain) {
      let test_pattern = new RegExp(key, 'i');
      if (!test_pattern.test(input)) {
        return tests.must_contain[key];
      }
    }
  }
  
  // test input for expected value
  function equalTo() {
    for (let key in tests.equal_to) {
      if (key !== input) {
        return tests.equal_to[key];
      }
    }
  }
  
  // test input for min length
  function minLength() {
    if (tests.min_length) {
      if (input.length < tests.min_length) {
        return 'must contain at least ' + tests.min_length.toString() + ' characters';
      }
    }
  }
    
    // test input for discrete values
  function discreteValues() {
    if (tests.discrete_values.length) {
      if (tests.discrete_values.indexOf(input) === -1) {
        let words = joinWords(tests.discrete_values, {conjunction: 'or', prefix: '"', suffix: '"'});
        return 'may only be ' + words;
      }
    }
  }
  
  // test input for prohibited regex
  function mustNotContain() {
    for (let key in tests.must_not_contain) {
      let test_pattern = new RegExp(key, 'i');
      if (test_pattern.test(input)) {
        return tests.must_not_contain[key];
      }
    }
  }
  
  // test input for max length
  function maxLength() {
    if (tests.max_length) {
      if (input.length > tests.max_length) {
        return 'cannot contain more than ' + tests.max_length.toString() + ' characters';
      }
    }
  }
    
  // test input for discrete values
  function excludedValues() {
    if (tests.excluded_values.length) {
      if (tests.excluded_values.indexOf(input) > -1) {
        let words = joinWords(tests.excluded_values, {conjunction: 'or', prefix: '"', suffix: '"'});
        return 'cannot be ' + words;
      }
    }
  }
  
  // determine order of tests
  let functions = {
    must_contain: mustContain,
    must_not_contain: mustNotContain,
    equal_to: equalTo,
    max_length: maxLength,
    min_length: minLength,
    discrete_values: discreteValues,
    excluded_values: excludedValues
  };
  let types = {
    must_contain: 'required',
    must_not_contain: 'prohibited',
    equal_to: 'required',
    max_length: 'prohibited',
    min_length: 'required',
    discrete_values: 'required',
    excluded_values: 'prohibited'
  };
  let order = kwargs.order.split(',');
  let sequence = [];
  let names = [];
  for (let i = 0; i < order.length; i++){
    let test = order[i];
    if (test in functions){
      names.push(test);
      sequence.push(functions[test])
    }
  }
  
  // run tests
  for (let i = 0; i < sequence.length; i++){
    let result = sequence[i]();
    if (result){
      let name = names[i];
      if (types[name] === 'required'){
        report.required = result
      } else if (types[name] === 'prohibited'){
        report.prohibited = result
      }
      return report
    }
  }
  
  // return clean report
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
export function validateData (input, criteria, options) {
  
  // ingest options
  let opts = {
    order: 'must_contain,equal_to,min_length,discrete_values,must_not_contain,max_length,excluded_values' // sequence of tests to run
  };
  const kwargs = ingestOptions(options, opts);
  
  // define default output
  let report = {
    required: '',
    prohibited: ''
  };
  
  const datatype = ingestString(criteria.datatype);
  
  if (datatype === 'string'){
    if (isString(input)){
      return validateString(input, criteria, kwargs)
    } else {
      report.required = 'must be a string datatype.';
      return report;
    }
  }
  
  // TODO add validation of numbers, integers, arrays, maps and booleans
  
  return report;
  
}

/**
 * Tests string for valid url syntax and parses components of url.
 *
 * @param {string}  url   an url string to parse
 * @return {object}       a map with components of url
 */
export function parseURL(url) {
  
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
  let errors = { }
  let valid = true;
  let absolute, userinfo, hostname, user, password;
  let host, port, path, query, fragment, tail, schema;
  
  // match main elements of schema
  if (isString(url)){
    schema = url.match(/(^https?)\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  } else {
    throw new TypeError('url arg must be a string')
  }
  let protocol = schema ? schema[1] : null;
  let authority = schema ? schema[2] : null;
  
  // report error if not http or https
  if (!protocol){
    errors.protocol = url;
  }
  
  if (authority){
  
    // parse userinfo and hostname
    let segments = authority.match(/(.*)@(.*)/)
    if (segments){
      userinfo = segments[1]
      hostname = segments[2]
    } else {
      hostname = authority
    }
    
    // parse user and password
    if (userinfo){
      let permissions = userinfo.match(/(.*):(.*)/)
      user = permissions ? permissions[1] : null;
      password = permissions ? permissions[2] : null;
      if (!permissions){
        errors.userinfo = userinfo
      }
    }
      
    // parse host and port
    let ports = hostname.match(/(.*):(.*)/)
    host = ports ? ports[1] : hostname;
    if (ports){
      port = parseInt(ports[2]) ? parseInt(ports[2]) : null
      if (!port){
        errors.port = ports[2]
      }
    }
  } else {
    errors.authority = url;
  }
  
  // validate top-level domain
  if (host){
    if (!host.match(/\./)){
      errors.tld = host;
    } else if (host.match(/^\./) || host.match(/\.$/)){
      errors.host = host;
    }
  }
  
  // parse the tail
  if (authority){
    let head = '.*' + authority.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
    let regex = new RegExp(head)
    tail = url.replace(regex, '')
    // find indices for splitting tail components
    if (tail){
      let parts;
      let question = tail.indexOf('?');
      let pound = tail.indexOf('#');
      if (question === -1 && pound === -1){
        path = tail;
      } else if (question === -1){
        parts = tail.split('#')
        path = parts[0]
        fragment = parts[1]
      } else if (pound === -1){
        parts = tail.split('?')
        path = parts[0]
        query = parts[1]
      // parse existence of both query and fragment  
      } else {
        let first = Math.min(question, pound)
        let second = ''
        if (first){
          path = tail.slice(0,first)
          second = tail.slice(first)
        } else {
          second = tail
        }
        if (question < pound){
          parts = second.split('#')
          query = parts[0].slice(1)
          fragment = parts[1]
        } else {
          parts = second.split('?')
          fragment = parts[0].slice(1)
          query = parts[1]
          errors.fragment = tail;
        }
        
      }
        
      if (!path || path === '/'){
        path = undefined
      }
    }
  }
  
  // compose absolute address
  if (protocol && authority){
    absolute = `${protocol}://${authority}`
  }
  
  // determine validity
  if (Object.keys(errors).length){
    valid = false
  }
  
  // return report
  return { 
    absolute: absolute,
    scheme: protocol,
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
  }

}

