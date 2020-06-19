import * as d12 from '../src/d12'
import { describe } from 'mocha'
import { expect } from 'chai'
import _ from 'lodash'
import * as CRITERIA from '../src/criteria.json'

// http://www.chaijs.com/guide/styles/

let datatypes = {
  'the plain object': {me: 'you'},
  'the array': ['me', 'you'],
  'the string': 'me',
  'the function': d12.ingestObject,
  'the date object': new Date(),
  'the null value': null,
  'the boolean': true,
  'the number': 12.12,
  'the undefined object': d12.onomatopoeia,
  'the integer': 12,
  'the reference error': {}
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
  d: new Date(),
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
    nested: 'you',
    list: [ '' ]
  },
  func: d12.ingestObject,
  d: new Date(),
  list: ['string'],
  lists: [ [ ] ],
  empty: [ {} ],
  nested: {
    list: [ '' ]
  }
};

let alterations = {
  token: 'xyz',
  dt: 1123456789.012,
  timeout: 4000,
  top: {
    nested: 'you'
  },
  func: d12.ingestArray,
  d: new Date(),
  list: [ 'us' ],
  lists: [ [ 'me', 'you' ], ['us', 'them']],
  empty: []
};

function checkDatatypes(func, match, mismatch, type, title, alt=null){
  for (let key in datatypes){
    const value = datatypes[key];
    let name = JSON.stringify(value);
    if (key === 'the function'){
      name = 'd12.ingestObject'
    } else if (key === 'the reference error'){
      name = 'property of undefined'
    }
    let text = 'should return ' + key + ' ' + name + ' as';
    let outcome = mismatch;
    if (key === 'the reference error'){
      text += ' ' + title;
    } else if (type(value)){
      text += ' it is';
      outcome = match
    } else {
      text += ' ' + title
    }
    if (alt){
      it(text, function() { 
        try {
          if (key === 'the reference error'){
            expect(func(value, 'notamethod.notaproperty')).to.equal(outcome)
          } else {
            expect(func(value)).to.equal(outcome)
          }
        } catch(e) {
          if (key === 'the reference error'){
            expect(func(value, 'notamethod.notaproperty')).to.equal(alt)
          } else {
            expect(func(value)).to.equal(alt)
          }
        }
      });
    } else {
      it(text, function () {
        if (key === 'the reference error'){
          expect(func(value, 'notamethod.notaproperty')).to.equal(outcome)
        } else {
          expect(func(value)).to.equal(outcome)
        }
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
  
  describe('ingestMap()', function (){
    let func = function(x){ return Object.keys(d12.ingestMap(x)).length };
    checkDatatypes(func, 1, 0, _.isPlainObject, 'an empty map')
  });
  
  describe('objectSize()', function () {
    it('should return the length of a plain object', function () {
      expect(d12.objectSize(options)).to.be.a('number');
      expect(d12.objectSize(datatypes)).to.equal(11);
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
      expect(d12.ingestOptions(options, defaults)).to.have.property('func').to.be.a('function');
      expect(d12.ingestOptions(options, defaults)).to.have.property('d').to.be.a('date')
    });
    it('should only add items to a sub-array which match the default datatype', function(){
      expect(d12.ingestOptions(options, defaults)).to.have.property('list').with.lengthOf(2)
    });
    it('should recursively explore plain objects', function(){
      expect(d12.ingestOptions(options, defaults)).to.have.property('top').to.have.property('nested').to.equal('me')
      expect(d12.ingestOptions(options, defaults)).to.have.property('nested').to.have.property('list').with.lengthOf(0)
    });
    it('should recursively explore arrays', function(){
      expect(d12.ingestOptions(options, defaults)).to.have.property('lists').with.lengthOf(2)
    });
    it('should return all keys of an object in options if default object is empty', function(){
      expect(d12.ingestOptions(options, defaults).empty[0]).to.have.property('us')
    });
  });
  
  describe('deepCopy()', function () {
    it('should return a plain object with the same properties as original', function () {
      expect(Object.keys(d12.deepCopy(options))).to.have.lengthOf(Object.keys(options).length);
      expect(d12.deepCopy(options)).to.have.property('list').with.lengthOf(3)
    })
  });
  
  describe('emptyObject()', function () {
    it('should return an empty object', function () {
      expect(d12.objectSize(d12.emptyObject(d12.deepCopy(options)))).to.equal(0)
    });
    it('should not delete the properties of original object', function () {
      expect(options).to.have.property('token')
    })
  });
  
  describe('joinWords()', function() {
    it('should join [coffee,tea] into coffee or tea', function() {
      expect(d12.joinWords(['coffee','tea'],{conjunction:'or'})).to.equal('coffee or tea')
    });
    it('should join [fits,starts] into "fits" and "starts"', function() {
      expect(d12.joinWords(['fits','starts'],{prefix:'"',suffix:'"'})).to.equal('"fits" and "starts"')
    })
  });
  
  describe('parseDiff()', function() {
    it('should return deleted keys as null values', function() {
      expect(d12.parseDiff(alterations, options)).to.have.property('extra').to.equal(null)
    });
    it('should return only the items in a shorter array', function() {
      expect(d12.parseDiff(alterations, options)).to.have.property('list').with.lengthOf(1)
    })
  });
  
  describe('upsertValues()', function() {
    let parsed = d12.parseDiff(alterations, options);
    it('should delete keys with null values', function() {
      expect(d12.upsertValues(parsed, options)).to.not.have.property('extra')
    });
    it('should replace the entire array value', function() {
      expect(d12.upsertValues(parsed, options)).to.have.property('list').with.lengthOf(1)
    });
    it('should recreate the updated object parsed by parseDiff', function() {
      let upserted = d12.upsertValues(parsed, options);
      for (let k in upserted){
        if (!(d12.isObjectLike(upserted[k]))){
          expect(upserted[k]).to.equal(alterations[k])
        } else {
          expect(Object.keys(upserted[k]).length).to.equal(Object.keys(alterations[k]).length)
        }
      }
    })
  });
  
  describe('validateString()', function() {
    it('should pass "earnesthappycoders" without error messages', function() {
      expect(d12.validateString('earnesthappycoders', CRITERIA.account_password).required).to.equal('')
    });
    it('should pass "support@collectiveacuity.com" without error messages', function() {
      expect(d12.validateString('support@collectiveacuity.com', CRITERIA.email_address).required).to.equal('')
    });
    it('should report a required error for "password"', function() {
      expect(d12.validateString('password', CRITERIA.account_password).required).with.lengthOf(46);
    });
    it('should report a prohibited error for "noreply@collectiveacuity.com"', function() {
      expect(d12.validateString('noreply@collectiveacuity.com', CRITERIA.email_address).prohibited).with.lengthOf(40);
    });
    it('should report a prohibited error for "..reply@collectiveacuity.c', function() {
      expect(d12.validateString('..reply@collectiveacuity.c', CRITERIA.email_address, {order:'must_not_contain,must_contain'}).prohibited).with.lengthOf(19);
    });
    it('should report a required error for "..reply@collectiveacuity.c', function() {
      expect(d12.validateString('..reply@collectiveacuity.c', CRITERIA.email_address).required).with.lengthOf(29);
    });
  });
  
  describe('validateData()', function() {
    it('should pass "earnesthappycoders" without error messages', function() {
      expect(d12.validateData('password', CRITERIA.account_password).prohibited).to.equal('')
    });
    it('should pass "support@collectiveacuity.com" without error messages', function() {
      expect(d12.validateData('support@collectiveacuity.com', CRITERIA.email_address).prohibited).to.equal('')
    });
  });
  
  describe('parseURL()', function () {
    it('should throw an error if url input is not a string', function() {
      expect(function() { d12.parseURL(['http://notastring.butalist']) }).to.throw('url')
    })
    it('should return errors for an empty url', function() {
      const parsed = d12.parseURL('')
      expect(parsed).to.have.property('host').to.be.undefined;
      expect(parsed).to.have.property('valid').to.equal(false);
      expect(parsed).to.have.property('errors').to.have.property('protocol').to.be.a('string').with.lengthOf(0)
    });
    it('should parse https://www.google.com', function() {
      const parsed = d12.parseURL('https://www.google.com')
      expect(parsed).to.have.property('host').to.be.a('string');
      expect(parsed).to.have.property('protocol').to.equal('https');
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should parse ip address in http://8.8.8.8', function() {
      const parsed = d12.parseURL('http://8.8.8.8')
      expect(parsed).to.have.property('host').to.be.a('string');
      expect(parsed.host).to.match(/\d+/i);
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should report tld errors for https://google', function() {
      const parsed = d12.parseURL('https://google')
      expect(parsed).to.have.property('errors').to.have.property('tld');
      expect(parsed).to.have.property('valid').to.equal(false);
    });
    it('should report host errors for https://google.com.', function() {
      const parsed = d12.parseURL('https://google.com.')
      expect(parsed).to.have.property('errors').to.have.property('host');
      expect(parsed).to.have.property('valid').to.equal(false);
    });
    it('should parse port in http://8.8.8.8:80', function() {
      const parsed = d12.parseURL('http://8.8.8.8:80')
      expect(parsed).to.have.property('port').to.be.equal(80);
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should parse user in https://user:password@www.google.com', function() {
      const parsed = d12.parseURL('https://user:password@www.google.com')
      expect(parsed).to.have.property('user').to.equal('user');
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should report userinfo errors for https://user@www.google.com', function() {
      const parsed = d12.parseURL('https://user@www.google.com')
      expect(parsed).to.have.property('errors').to.have.property('userinfo');
      expect(parsed).to.have.property('valid').to.equal(false);
    });
    it('should report port errors for https://www.google.com:abc', function() {
      const parsed = d12.parseURL('https://www.google.com:abc')
      expect(parsed).to.have.property('errors').to.have.property('port');
      expect(parsed).to.have.property('valid').to.equal(false);
    });
    it('should parse password for https://user:password@www.google.com:443', function() {
      const parsed = d12.parseURL('https://user:password@www.google.com:443')
      expect(parsed).to.have.property('password').to.equal('password');
      expect(parsed).to.have.property('path').to.be.undefined;
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should parse no path in https://user:password@www.google.com/', function() {
      const parsed = d12.parseURL('https://user:password@www.google.com/')
      expect(parsed).to.have.property('path').to.be.undefined;
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should parse path in https://www.google.com/some/path', function() {
      const parsed = d12.parseURL('https://www.google.com/some/path')
      expect(parsed).to.have.property('path').to.equal('/some/path');
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should parse query in https://www.google.com?token=me', function() {
      const parsed = d12.parseURL('https://www.google.com?token=me')
      expect(parsed).to.have.property('query').to.equal('token=me');
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should parse fragment in https://www.google.com#fragment', function() {
      const parsed = d12.parseURL('https://www.google.com#fragment')
      expect(parsed).to.have.property('fragment').to.equal('fragment');
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should parse no path in https://www.google.com/#fragment', function() {
      const parsed = d12.parseURL('https://www.google.com#fragment')
      expect(parsed).to.have.property('fragment').to.equal('fragment');
      expect(parsed).to.have.property('valid').to.equal(true);
      expect(parsed).to.have.property('path').to.be.undefined;
    });
    it('should parse query and fragment in https://www.google.com?token=me#fragment', function() {
      const parsed = d12.parseURL('https://www.google.com?token=me#fragment')
      expect(parsed).to.have.property('fragment').to.equal('fragment');
      expect(parsed).to.have.property('query').to.equal('token=me');
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should parse no path in https://www.google.com/?token=me#fragment', function() {
      const parsed = d12.parseURL('https://www.google.com/?token=me#fragment')
      expect(parsed).to.have.property('fragment').to.equal('fragment');
      expect(parsed).to.have.property('query').to.equal('token=me');
      expect(parsed).to.have.property('valid').to.equal(true);
      expect(parsed).to.have.property('path').to.be.undefined;
    });
    it('should parse everything in https://u:p@www.google.com:443/path/to/index.html?t=me#frag', function() {
      const parsed = d12.parseURL('https://u:p@www.google.com:443/path/to/index.html?t=me#frag')
      expect(parsed).to.have.property('protocol').to.not.be.undefined;
      expect(parsed).to.have.property('user').to.not.be.undefined;
      expect(parsed).to.have.property('password').to.not.be.undefined;
      expect(parsed).to.have.property('host').to.not.be.undefined;
      expect(parsed).to.have.property('port').to.not.be.undefined;
      expect(parsed).to.have.property('path').to.not.be.undefined;
      expect(parsed).to.have.property('query').to.not.be.undefined;
      expect(parsed).to.have.property('absolute').to.equal('https://u:p@www.google.com:443')
      expect(parsed).to.have.property('fragment').to.not.be.undefined;
      expect(parsed).to.have.property('valid').to.equal(true);
    });
    it('should report fragment errors for https://u:p@www.google.com:443/path/to/index.html#frag?t=me', function() {
      const parsed = d12.parseURL('https://u:p@www.google.com:443/path/to/index.html#frag?t=me')
      expect(parsed).to.have.property('errors').to.have.property('fragment');
      expect(parsed).to.have.property('valid').to.equal(false);
    });
  })
  
});