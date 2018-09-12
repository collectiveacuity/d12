/*
 * D12 JAVASCRIPT MODULE
 * @description A Collection of Methods for Data Manipulation
 * @author rcj1492
 * @license MIT
 * @version 0.0.1
 * @email support@collectiveacuity.com
 */

// import dependencies
import _ from 'lodash'

export function ingestObject (obj) {
  
  /* a method to ensure a plain object output */
  
  let empty_map = new Object.constructor(null);
  if (obj === null || typeof (obj) === 'undefined') {
    return empty_map
  } else if (!_.isPlainObject(obj)) {
    return empty_map
  }
  return obj
  
}

export function objectSize (obj) {
  
  /* a method to determine number of keys in plain object */
  
  return Object.keys(obj).length;
  
}
  
export function ingestOptions (options, defaults) {
  
  /* a method to merge an object of options into an object of defaults */
  
  // verify input is a map
  options = ingestObject(options);

  // define ingest map helper function
  function _ingest_map (opts, defs) {
    let output = new Object.constructor(null);
    if (!objectSize(defs)) {
      for (let k in opts) {
        output[k] = opts[k]
      }
    } else {
      for (let key in defs) {
        if (key in opts) {
          if (typeof (opts[key]) === typeof (defs[key])) {
            if (_.isFunction(defs[key])) {
              if (_.isFunction(opts[key])) {
                output[key] = opts[key]
              } else {
                output[key] = defs[key]
              }
            } else if (_.isArray(opts[key])) {
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
          if (isFunction(item)) {
            if (isFunction(opts[i])) {
              output.push(opts[i])
            }
          } else if (_.isArray(opts[i])) {
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
  return _ingest_map(options, defaults)
  
}

