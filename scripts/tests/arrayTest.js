var MyArray = require('../array')
var assert = require('assert')
var array = new MyArray


assert(array.isEmpty(),"Array should be empty at the beginning")
var empty = {}
array.insert(empty)
assert(!array.isEmpty(),"Array should not be empty if empty object inserted")
assert.strictEqual(1, array.length, "Array length should be 1 after empty object inserted")
assert.strictEqual(empty, array.get(0),"Array should return empty object")
assert.throws(function(){array.remove("0")},Error, "Array should throw error if you give it string as parameter when invoking remove")
array.remove(0);
assert(array.isEmpty(),"Array shoul be empty after inserting 1 and then removing 1")
assert.throws(function(){array.remove(0)}, Error, "Array should throw new error when trying to remove from empty array")
array.insert(1)
array.insert(2)
array.insert(3)

array.remove(1)
assert.equal(array.get(0),1)
assert.equal(array.get(1),3)
assert.equal(array.length,2)