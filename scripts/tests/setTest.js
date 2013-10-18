var assert = require ('assert')
var chai = require('chai')
var expect = chai.expect
var Set = require('../set')
var set = Set()

function insertMany(){
	for(var i =0;i<50;i++){
		set.insert(i)
	}
}

describe('Set', function(){
	beforeEach(function(){
		set = new Set
	})
	describe('#insert', function(){
		it('returns true if inserting 1', function(){
			expect(set.insert(1)).to.eq(true)
		})
		it('return false if trying to insert same', function(){
			set.insert(1)
			set.insert(2)
			expect(set.insert(1)).to.eq(false)
		})
	})
	describe('#contains', function(){
		it ('false if empty', function(){
			expect(set.contains(1)).to.be.false
		})
		it('true if contained', function(){
			set.insert(1)
			expect(set.contains(1)).to.be.true
		})
		it('false if not contained', function(){
			set.insert(1)
			set.insert(3)
			expect(set.contains(2)).to.be.false
		})
		describe('after 50 inserted', function(){
			beforeEach(insertMany)
			it('false if not present', function(){
				expect(set.contains(50)).to.be.false
				expect(set.contains(-1)).to.be.false
			})
			it ('true if present', function(){
				for(var i =0;i<50;i++){
					expect(set.contains(i)).to.be.true
				}
			})
			it ('false if removed and then asked', function(){
				set.remove(25)
				expect(set.contains(25)).to.be.false
			})
			it('true if removed some in between', function(){
				set.remove(25)
				expect(set.contains(0)).to.be.true
				expect(set.contains(24)).to.be.true
				expect(set.contains(26)).to.be.true
				expect(set.contains(49)).to.be.true
			})
		})
	})
	describe('#remove', function(){
		it ('false if empty', function(){
			expect(set.remove(1)).to.be.false
		})
		it ('true if only contained', function(){
			set.insert(1)
			expect(set.remove(1)).to.be.true
		})
		describe('after 50 added', function(){
			beforeEach(insertMany)
			it('true if one of many contained', function(){
				expect(set.remove(25)).to.be.true
			})
			it ('false if not contained', function(){
				expect(set.remove(50)).to.be.false
			})
			function removeAndExpect(j){
				set.remove(j)
				for(var i =0;i<50;i++){
					if (i==j){
						expect(set.contains(i)).to.be.false
					}else{
						expect(set.contains(i)).to.be.true
					}
				}
				expect(set.contains(-1)).to.be.false
				expect(set.contains(50)).to.be.false
			}
			it('still contains others after middle removed', function(){
				removeAndExpect(25)
			})
			
			it ('still contains otehrs after first removed', function(){
				removeAndExpect(0)
			})
			it('still contains others after last removed', function(){
				removeAndExpect(49)
			})
			it('does not change anything if non existatn removed', function(){
				removeAndExpect(-1)
			})
		})
	})
	describe('#size', function(){
		it('0 if empty', function(){
			expect(set.size()).to.eq(0)
		})
		it ('1 after 1 added', function(){
			set.insert(1)
			expect(set.size()).to.eq(1)
		})
		it ('0 after 1 added and removed', function(){
			set.insert(1)
			set.remove(1)
			expect(set.size()).to.eq(0)
		})
	})
	describe('#height', function(){
		it('-1 if empty', function(){
			expect(set.height()).to.eq(-1)
		})
		it ('0 if just root', function(){
			set.insert(1)
			expect(set.height()).to.eq(0)
		})
		it ('1 if 2 added', function(){
			set.insert(1)
			set.insert(2)
			expect(set.height()).to.eq(1)
		})
		it('1 if 1,2,3 added', function(){
			set.insert(1)
			set.insert(2)
			set.insert(3)
			expect(set.height()).to.eq(1)
		})
		it ('1 if 3,2,1 added', function(){
			set.insert(3)
			set.insert(2)
			set.insert(1)
			expect(set.height()).to.eq(1)
		})
		it('1 if 2,3,1 added', function(){
			set.insert(2)
			set.insert(3)
			set.insert(1)
			expect(set.height()).to.eq(1)
		})
		it('1 if 2,1,3 added', function(){
			set.insert(2)
			set.insert(1)
			set.insert(3)
			expect(set.height()).to.eq(1)
		})
		it('1 if 1,3,2 added', function(){
			set.insert(1)
			set.insert(3)
			set.insert(2)
			expect(set.height()).to.eq(1)
		})
		it('1 if 3,1,2 added', function(){
			set.insert(3)
			set.insert(1)
			set.insert(2)
			expect(set.height()).to.eq(1)
		})
		it ('correct height for 1-64 in order', function(){
			insertAndExpect(1,1,0)
			insertAndExpect(2,3,1)
			insertAndExpect(4,7,2)
			insertAndExpect(8,15,3)
			insertAndExpect(16,31,4)
			insertAndExpect(32,63,5)
			insertAndExpect(64,64,6)
		})
		function insertAndExpect(start,end,expected){
			for(var i =start;i<=end;i++){
				set.insert(i)
				expect(set.height()).to.eq(expected)
			}
		}
	})
})

function print(){
	console.log('\nset: \n'+set.toString())
}