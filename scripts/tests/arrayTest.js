var MyArray = require('../array')
var assert = require('assert')
var array = new MyArray


assert(array.isEmpty(),"Array should be empty at the beginning")
var empty = {}
array.insert(empty)
assert(!array.isEmpty(),"Array should not be empty if empty object inserted")
assert.equal(1, array.length, "Array length should be 1 after empty object inserted")
assert.equal(empty, array.get(0),"Array should return empty object")
array.remove(0);
assert(array.isEmpty(),"Array shoul be empty after inserting 1 and then removing 1")