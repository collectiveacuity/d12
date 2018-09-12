# D12
_A Platonic Solid for Ideal Data_  
**by [Collective Acuity](https://collectiveacuity.com)**

Intro
-----
d12 is a javascript package for data ingestion and validation. d12 extends the methods in lodash to tackle the evaluation of more complex data structures in order to reduce code verbosity and make input type validation easier.

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


