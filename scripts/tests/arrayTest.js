var MyArray = require('../array')
var chai = require('chai')
var expect = chai.expect
var array = new MyArray





describe('Array', function(){
	beforeEach(function(){
		array = new MyArray
	})
	describe('#isEmpty()', function(){
		it('true initially', function(){
			expect(array.isEmpty()).to.be.true
		})
		it('false after inserting', function(){
			array.insert({})
			expect(array.isEmpty()).to.be.false
		})
	})
	describe('length', function(){
		it('0 at the beginning', function(){
			expect(array.length).to.eq(0)
		})
		it('1 after inserting', function(){
			array.insert({})
			expect(array.length).to.eq(1)
		})
		it('0 after inserting and removing', function(){
			array.insert({})
			array.remove(0)
			expect(array.length).to.eq(0)
		})
		it ('1 after inserting 2 and removing 1', function(){
			array.insert({})
			array.insert({})
			array.remove(1)
			expect(array.length).to.eq(1)
		})
	})
	describe('#insert', function(){
		describe('allows', function(){
			function insert(val){
				expect(function(){array.insert(val)}).to.not.throw()
			}
			it('number', function(){
				insert(1)
			})
			it('array', function(){
				insert(new Array)
				insert([1,2,3,4])
			})
			it('object', function(){
				insert({key:'value'})
			})
			it('string', function(){
				insert('asd')
			})
			it('boolean', function(){
				insert(true)
			})
			it('date', function(){
				insert(new Date)
			})
			it('regex', function(){
				insert(/testings/)
			})
			it('itself', function(){
				insert(array)
			})
		})

	})
	describe('#remove', function(){

	})
	describe('#get', function(){
		it('error if outOfBounds', function(){
			expect(function(){array.get(0)}).to.throw()
		})
		it('return correct element', function(){
			array.insert(0)
			array.insert(1)
			expect(array.get(0)).to.eq(0)
			expect(array.get(1)).to.eq(1)
		})
		it('return itself if inserted and retrieved',function(){
			array.insert(array)
			expect(array.get(0)).to.eq(array)
		})
		it('work with array[0] -syntax', function(){
			var empty = {}
			array.insert(empty)
			expect(array[0]).to.eq(empty)
		})

	})
	describe('#swap', function(){
		it('2 elements', function(){
			array.insert(0)
			array.insert(1)
			array.swap(0,1)
			expect(array.get(0)).to.eq(1)
			expect(array.get(1)).to.eq(0)
		})
	})
	describe('#contains', function(){

	})
	describe('#indexOf',function(){

	})
})