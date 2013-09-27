assert = require('assert');
heap = require('../heap')(2, function(elem1, elem2){
	return elem1 - elem2;
});

assert(heap.isEmpty(),"Heap should be empty at first")
heap.insert(1)
assert(!heap.isEmpty(), "Heap should be not empty after inserting 1")
heap.insert(2)
assert.equal(heap.peek(), 1, "1 should be the item retrieved");
heap.insert(3)
heap.insert(4)
heap.insert(-5)
assert.equal(heap.peek(), -5, "heap should return -5 if items 1,2,3,4,-5 were added when peeked")
assert.equal(heap.poll(), -5, "heap should return -5 if items 1,2,3,4,-5 were added when polled")
assert.equal(heap.peek(), 1, "heap should return 1 if items 1,2,3,4,-5 were added and 1 polled, when polled")