assert = require ('assert')
set = require('../set')()


assert(set.isEmpty(), 'Set should beEmpty before adding any members')
set.insert(1)
assert(!set.isEmpty(), 'Set should not be empty after 1 added')

assert.equal(set.size(),1,'set size should be 1 if 1 added')

assert(set.contains(1), 'set should contain the only member it was added')
