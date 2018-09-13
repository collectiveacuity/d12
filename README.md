<a href="https://www.npmjs.com/package/d12"><img alt="version" src="https://img.shields.io/npm/v/d12.svg"></a> 
<a href="https://www.npmjs.com/package/d12"><img alt="license" src="https://img.shields.io/npm/l/d12.svg"></a>
<a href="https://www.npmjs.com/package/d12"><img src="https://img.shields.io/coveralls/github/collectiveacuity/d12.svg"></a>

# D12
_A Platonic Solid for Ideal Data_  
**by [Collective Acuity](https://collectiveacuity.com)**

<table>
<tr><td>Downloads:</td><td>https://www.npmjs.com/package/d12</td></tr>
<tr><td>Source:</td><td>https://github.com/collectiveacuity/d12</td><tr>
<tr><td>Documentation:</td><td>TBD</td><tr>
</table>

Intro
-----
d12 is a javascript package for data ingestion and validation. d12 extends the methods in lodash to tackle the evaluation of more complex data structures in order to reduce code verbosity and make input validation easier.

## Installation

Using npm:
```bash
npm install d12
```

Usage
-----
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
}
let defaults = {
  token: '',
  dt: 0.0,
  timeout: 9000,
  method: 'header',
  offline: false
}
console.log(ingestOptions(options, defaults))
// { 
//   token: 'abc', 
//   dt: 1123456789.012, 
//   timeout: 9000, 
//   method: 'header', 
//   offline: false 
// }
```

Testing
-------
```bash
npm test
```

Building
--------
```bash
npm run build
```

Collaboration Notes
-------------------
A collaborator should always **FORK** the repo from the main master and fetch changes from the upstream repo before making pull requests. Please add unittests and documentation for any additional code in a pull request.


