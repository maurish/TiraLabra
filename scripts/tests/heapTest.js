assert = require('assert');
heap = require('../heap')(2);
console.log(heap)

assert(heap.isEmpty(),"Heap should be empty at first")
heap.insert(1)
assert(!heap.isEmpty(), "Heap should be not empty after inserting 1")