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
		it ('true if one of many contained', function(){
			insertMany()
			expect(set.remove(25)).to.be.true
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
})

function print(){
	console.log(set.toString())
}