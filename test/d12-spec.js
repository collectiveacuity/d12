import * as d12 from '../src/d12'
import { describe } from 'mocha'
import { expect } from 'chai'
import _ from 'lodash'

// http://www.chaijs.com/guide/styles/

let datatypes = {
  'the plain object': {me: 'you'},
  'the array': ['me', 'you'],
  'the string': 'me',
  'the function': d12.ingestObject,
  'the null value': null,
  'the boolean': true,
  'the number': 12.12,
  'the undefined object': d12.onomatopoeia,
  'the integer': 12
};

let options = {
  token: 'abc',
  dt: 1123456789.012,
  timeout: '4000',
  extra: 'key',
  top: {
    nested: 'me'
  },
  func: d12.ingestArray,
  list: [ 'me', 'you', true ],
  lists: [ [ 'me', 'you' ], ['us', 'them'] ],
  empty: [ { 'us': 'them' } ]
};

let defaults = {
  token: '',
  dt: 0.0,
  timeout: 9000,
  method: 'header',
  offline: false,
  top: {
    nested: 'you'
  },
  func: d12.ingestObject,
  list: ['string'],
  lists: [ [ ] ],
  empty: [ {} ]
};

function checkDatatypes(func, match, mismatch, type, title, alt=null){
  for (let key in datatypes){
    const value = datatypes[key];
    let name = JSON.stringify(value);
    if (key === 'the function'){
      name = 'd12.ingestObject'
    }
    let text = 'should return ' + key + ' ' + name + ' as';
    let outcome = mismatch;
    if (type(value)){
      text += ' it is';
      outcome = match
    } else {
      text += ' ' + title
    }
    if (alt){
      it(text, function() { 
        try {
          expect(func(value)).to.equal(outcome)
        } catch(e) {
          expect(func(value)).to.equal(alt)
        }
      });
    } else {
      it(text, function () {
        expect(func(value)).to.equal(outcome)
      })
    }
  }
}

describe('d12.js', function() {
  
  describe('ingestObject()', function (){
    let func = function(x){ return Object.keys(d12.ingestObject(x)).length };
    checkDatatypes(func, 1, 0, _.isPlainObject, 'an empty object')
  });
  
  describe('ingestString()', function (){
    let func = function(x){ return d12.ingestString(x).length; };
    checkDatatypes(func, 2, 0, _.isString, 'an empty string')
  });
  
  describe('ingestBoolean()', function (){
    let func = function(x){ return d12.ingestBoolean(x); };
    checkDatatypes(func, true, false, _.isBoolean, 'false')
  });
  
  describe('ingestArray()', function (){
    let func = function(x){ return d12.ingestArray(x).length; };
    checkDatatypes(func, 2, 0, _.isArray, 'an empty array')
  });
  
  describe('ingestInteger()', function (){
    let func = function(x){ return d12.ingestInteger(x); };
    checkDatatypes(func, 12, 0, _.isInteger, 'zero')
  });
  
  describe('ingestNumber()', function (){
    let func = function(x){ return d12.ingestNumber(x); };
    checkDatatypes(func, 12.12, 0, _.isNumber, 'zero', 12)
  });
  
  describe('objectSize()', function () {
    it('should return the length of a plain object', function () {
      expect(d12.objectSize(options)).to.be.a('number');
      expect(d12.objectSize(datatypes)).to.equal(9);
    });
  });
  
  describe('ingestOptions()', function (){
    it('should return a plain object with all the keys in the default object', function(){
      expect(d12.ingestOptions(options, defaults)).to.have.property('offline')
    });
    it('should return a plain object with only the keys in the default object', function(){
      expect(d12.ingestOptions(options, defaults)).to.not.have.property('extra')
    });
    it('should return key values from options that match default datatypes', function(){
      expect(d12.ingestOptions(options, defaults)).to.have.property('dt').to.equal(1123456789.012);
      expect(d12.ingestOptions(options, defaults)).to.have.property('func').to.be.a('function')
    });
    it('should only add items to a sub-array which match the default datatype', function(){
      expect(d12.ingestOptions(options, defaults)).to.have.property('list').with.lengthOf(2)
    });
    it('should recursively explore plain objects', function(){
      expect(d12.ingestOptions(options, defaults)).to.have.property('top').to.have.property('nested').to.equal('me')
    });
    it('should recursively explore arrays', function(){
      expect(d12.ingestOptions(options, defaults)).to.have.property('lists').with.lengthOf(2)
    });
    it('should return all keys of an object in options if default object is empty', function(){
      expect(d12.ingestOptions(options, defaults).empty[0]).to.have.property('us')
    });
  })
  
});