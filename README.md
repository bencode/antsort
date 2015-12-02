# antsort


[![Build Status](https://travis-ci.org/bencode/antsort.svg?branch=master)](https://travis-ci.org/bencode/antsort)
[![Coverage Status](https://coveralls.io/repos/bencode/antsort/badge.svg?branch=master&service=github)](https://coveralls.io/github/bencode/antsort?branch=master)


`Another sort` - sort elements by level, before and afte.


```js
var sort = require('antsort');

var list = [
  {
    name: 'a',
    level: 3
  },

  {
    name: 'b',
    level: 4
  },

  {
    name: 'c',
    before: 'b'
  },

  {
    name: 'd',
    level: 3
  },

  {
    name: 'e',
    after: 'a'
  }
];


var sorted = sort(list);

sorted.map(item => item.name)
    .should.be.eql(['a', 'e', 'd', 'c', 'b']);
```
