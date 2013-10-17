function Array(comparator){
	comparator=comparator||function(e1,e2){return e1==e2}
	this.length=0
	this.isEmpty = function(){
		return !this.length
	}
	this.insert=function(val){
		this[this.length++]=val
	}
	this.remove = function(i){
		this.checkNumber(i)
		for(var j = i;j<this.length-1;j++){
			this[j]=this[j+1]
		}
		this.length--
	}
	this.get = function(i){
		this.checkNumber(i)
		return this[i]
	}
	this.checkNumber = function(i){
		if (typeof i != 'number')throw new Error('InvalidParameterException : ' + i + ' is not a number')
		if (i<0 || i>=this.length)throw new Error('IndexOutOfBoundsException : ' + i +" is not a proper index of the array") //check for overflows
	}
	this.swap = function(i,j){
		this.checkNumber(i)
		this.checkNumber(j)
		var tmp = this[i]
		this[i]=this[j]
		this[j]=tmp
	}
	this.toString = function(){
		var ret = "["
		if (this.length>0){
			ret+=this[0].toString()
		}
		for(var i =1;i<this.length;i++){
			ret+=","+this[i].toString()
		}
		ret+="]"
		return ret
	}
	this.indexOf = function(elem){
		for (var i =0;i<length;i++){
			if (comparator(elem,this[i])){
				return i
			}
		}
		return -1
	}
	this.contains = function(elem){
		return this.indexOf(elem)!=-1
	}
}

if (typeof module !=='undefined' && module.exports)
	module.exports = exports = Array	