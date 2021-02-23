![Version](https://img.shields.io/npm/v/d12.svg)
![License](https://img.shields.io/npm/l/d12.svg)
![Coverage](https://img.shields.io/coveralls/github/collectiveacuity/d12.svg)

# D12
_A Platonic Solid for Ideal Data_  
**by [Collective Acuity](https://collectiveacuity.com)**

<table>
<tr><td>Downloads:</td><td><a href="https://www.npmjs.com/package/d12">https://www.npmjs.com/package/d12</a></td></tr>
<tr><td>Source:</td><td><a href="https://github.com/collectiveacuity/d12">https://github.com/collectiveacuity/d12</a></td><tr>
<tr><td>Documentation:</td><td><a href="https://collectiveacuity.github.io/d12">https://collectiveacuity.github.io/d12</a></td><tr>
</table>

## Intro
d12 is a javascript package for data ingestion and validation. d12 extends the methods in lodash to tackle the evaluation of more complex data structures in order to reduce code verbosity and make input validation easier.

## Installation
From NPM:
```shell
$ npm install d12
```
From GitHub:
```shell
$ git clone https://github.com/collectiveacuity/d12
$ cd d12
$ npm install
```

## Usage
__ingestObject__ : to ensure a plain object output
```javascript
import { ingestObject } from 'd12'
console.log(ingestObject({me: 'you'}))
// { me: 'you' }
console.log(ingestObject(['me','you']))
// { }
```
__ingestOptions__ : to merge an object of options into an object of defaults and preserve scope and typing
```javascript
import { ingestOptions } from 'd12'
let options = {
  token: 'abc',
  dt: 1123456789.012,
  timeout: '4000',
  extra: 'key'
};
let defaults = {
  token: '',
  dt: 0.0,
  timeout: 9000,
  method: 'header',
  offline: false
};
console.log(ingestOptions(options, defaults))
// => { 
//      token: 'abc', 
//      dt: 1123456789.012,
//      timeout: 9000, 
//      method: 'header', 
//      offline: false 
//    }
```
__parseDiff__ : to compare the difference between two objects and output only the fields with altered values
```javascript
import { parseDiff } from 'd12'
let current = {
  token: 'abc',
  dt: 1123456789.012,
  timeout: '4000',
  extra: 'key'
};
let previous = {
  token: 'abc',
  dt: 0.0,
  timeout: 9000,
  method: 'header',
  offline: false
};
console.log(parseDiff(current, previous))
// => {
//      dt: 1123456789.012,
//      timeout: '4000',
//      extra: 'key',
//      method: null,
//      offline: null 
//    }
```
__validateString__ : to test a string input against a set of valid criteria 
```javascript
import { validateString } from 'd12'
let criteria = {
  datatype: 'string',
  min_length: 8,
  max_length: 64,
  excluded_values: [ '12345678', 'password' ]
};
console.log(validateString('password', criteria))
// => { 
//      required: '',
//      prohibited: 'cannot be "12345678" or "password"'
//    }
```
__parseURL__ : to test validity of url syntax and parse components
```javascript
import { parseURL } from 'd12'

let url = 'https://user:password@my.domain.com:5050/some/path/to/index.html?token=me#fragment'
console.log(parseURL(url))
// => {
//      absolute: 'https://user:password@my.domain.com:5050',
//      scheme: 'https',
//      user: 'user',
//      password: 'password',
//      host: 'my.domain.com',
//      port: 5050,
//      path: '/some/path/to/index.html',
//      query: 'token=me',
//      fragment: 'fragment',
//      errors: {},
//      valid: true
//    }  
 
url = 'http://notavalidport.com:abc'
console.log(parseURL(url).errors)
// => {
//      port: 'abc'
//    }

```

## Testing
```shell
$ npm test
```

## Building
```shell
$ npm run build
```

## Reporting
```shell
$ npm run coverage
```

## Collaboration Notes
A collaborator should always **FORK** the repo from the main master and fetch changes from the upstream repo before making pull requests. Please add unittests and documentation for any additional code in a pull request.


