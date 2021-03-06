var chai = require('chai')
var expect = chai.expect
var Heap = require('../heap')
var heap 


describe('Heap', function(){
	beforeEach(function(){
		heap = Heap( function(elem1, elem2){
			return elem1 - elem2;
		})
	})
	describe('#isEmpty', function(){
		it ('true initially', function(){
			expect(heap.isEmpty()).to.be.true
		})
		it('false after adding', function(){
			heap.insert(1)
			expect(heap.isEmpty()).to.be.false
		})
		it('true after adding and removing', function(){
			heap.insert(1)
			heap.poll()
			expect(heap.isEmpty()).to.be.true
		})
		it('false after adding, removing and adding', function(){
			heap.insert(1)
			heap.poll()
			heap.insert(1)
			expect(heap.isEmpty()).to.be.false
		})
	})
	describe('#poll', function(){
		it('retrieves the only pushed item', function(){
			heap.insert(1)
			expect(heap.poll()).to.eq(1)
		})
		it('retrieves the lowest from 2 items', function(){
			heap.insert(1)
			heap.insert(2)
			expect(heap.poll()).to.eq(1)
		})
		it('retrieves the lowest after 50 positive inserted and polled', function(){
			for(var i =0;i<50;i++){
				heap.insert(i)
			}
			for(var i = 0; i < 50; i++){
				expect(heap.poll()).to.eq(i)
			}
		})
		it ('retrieves the lowest after 50 negative inserted polled', function(){
			for(var i =0;i>-50;i--){
				heap.insert(i)
			}
			for(var i = -49; i <= 0; i++){
				expect(heap.poll()).to.eq(i)
			}
		})
	})
	describe('#peek', function(){
		it ('undefined if empty', function(){
			expect(heap.peek()).to.be.undefined
		})
		it ('the only item inserted', function(){
			heap.push(1)
			expect(heap.peek()).to.eq(1)
		})
		it('to be the the lowest if two pushed', function(){
			heap.push(1)
			heap.push(-5)
			expect(heap.peek()).to.eq(-5)
		})
	})
	describe('#push', function(){
		it ('not crash', function(){
			expect(function(){heap.push(1)}).not.to.throw()
		})
	})
	describe('#size', function(){
		it('0 initially', function(){
			expect(heap.size()).to.eq(0)
		})
		it ('1 after added 1', function(){
			heap.push(1)
			expect(heap.size()).to.eq(1)
		})
		it('0 if added 1 and polled', function(){
			heap.push(1)
			heap.poll()
			expect(heap.size()).to.eq(0)
		})
	})
})