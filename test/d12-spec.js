import * as d12 from '../src/d12'
import { describe } from 'mocha'
import { expect } from 'chai'

describe('d12.js', function() {
  describe('ingestObject()', function() {
    it('should return a plain object {"me": "you"} as it is {"me": "you"}', function() {
      expect(Object.keys(d12.ingestObject({'me': 'you'})).length).to.equal(1)
    });
    it('should return the array ["me","you"] as an empty object {}', function() {
      expect(Object.keys(d12.ingestObject(['me','you'])).length).to.equal(0)
    });
    it('should return a string "me" as an empty object {}', function() {
      expect(Object.keys(d12.ingestObject('me')).length).to.equal(0)
    });
    it('should return a function d12.ingestObject as an empty object {}', function() {
      expect(Object.keys(d12.ingestObject(d12.ingestObject)).length).to.equal(0)
    });
  });
});