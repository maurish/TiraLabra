var chai = require('chai')
var expect = chai.expect
var aStar = require('../aStar')
var dijkstra = require('../dijkstra')
var dataSet = require(process.argv[0].val || './data')
var data
function noop(){}
function collect(arr){
	var ret =[]
	arr.forEach(function(obj){
		ret.push(obj.to)
	})
	return ret
}
var functions = {
	distance: function(n1,n2){
		if (n1==n2)return 0
		var res 
		data.graph[n1].forEach(function(n){
			if (n2==n.to)
				res = n.distance
		})
		if (!res)return 99999
		return res
	},
	compare: function(n1,n2){return parseInt(n1) - parseInt(n2)},
	setCurrent:noop,
	markRoute:noop,
	neighbors: function(node){return collect(data.graph[node])},
	visualizeCompare:noop,
	setUsed:noop
}
function expectPath(path,expected){
	path = pathToArray(path)
	expect(path).to.eql(expected)
	

}
function pathToArray(path){
	var ret = []
	path = path[0]
	while (path){
		ret.push(path.node)
		path=path.parent
	}
	return ret
}

describe('aStar', function(){
	describe('simple graph', function(){
		before(function(){
			data = dataSet.simple
		})
		it('return correnct distance', function(){
			var result = aStar(data.start,data.end, functions)
			expect(result.distance).to.eq(50)
		})
		it('takes correct path', function(){
			var result = aStar(data.start,data.end,functions)
			expectPath(result.path,['2','1'])
		})
	})
	describe('V-shaped graph', function(){
		before(function(){
			data = dataSet.v
		})
		it ('returns correct distance', function(){
			var result = aStar(data.start,data.end, functions)
			expect(result.distance).to.eq(250)
		})
		it('takes correct path ', function(){
			var result = aStar(data.start,data.end, functions)
			expectPath(result.path,['3','2','1'])
		})
	})
	describe('complex graph', function(){
		before(function(){
			data = dataSet.complex
		})

		it('returns correct distance', function(){
			var result = aStar(data.start,data.end, functions)
			expect(result.distance).to.eq(102)
		})
		it('takes correct path', function(){
			var result = aStar(data.start,data.end, functions)
			expectPath(result.path,['15','8','6','2','1'])
		})
	})
})


describe('dijkstra', function(){
	describe('simple graph', function(){
		before(function(){
			data = dataSet.simple
		})
		it('return correnct distance', function(){
			var result = dijkstra(data.start,data.end, functions)
			expect(result.distance).to.eq(50)
		})
		it('takes correct path', function(){
			var result = dijkstra(data.start,data.end,functions)
			expectPath(result.path,['2','1'])
		})
	})
	describe('V-shaped graph', function(){
		before(function(){
			data = dataSet.v
		})
		it ('returns correct distance', function(){
			var result = dijkstra(data.start,data.end, functions)
			expect(result.distance).to.eq(250)
		})
		it('takes correct path ', function(){
			var result = dijkstra(data.start,data.end, functions)
			expectPath(result.path,['3','2','1'])
		})
	})
	describe('complex graph', function(){
		before(function(){
			data = dataSet.complex
		})

		it('returns correct distance', function(){
			var result = dijkstra(data.start,data.end, functions)
			expect(result.distance).to.eq(102)
		})

		it('takes correct path', function(){
			var result = dijkstra(data.start,data.end, functions)
			expectPath(result.path,['15','8','6','2','1'])
		})
	})
})