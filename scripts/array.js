function Array(){
	this.length=0
	this.isEmpty = function(){
		return !this.length
	}
	this.insert=function(val){
		this[this.length++]=val
	}
	this.remove = function(i){
		i = this.checkNumber(i)
		for(var j = i;j<this.length;j++){
			this[j]=this[j+1]
		}
		this.length--

	}
	this.get = function(i){
		i = this.checkNumber(i)
		return this[i]
	}
	this.checkNumber = function(i){
		if (typeof i != 'number')throw new Error('InvalidParameterException')
		if (i<0 || i>=this.length)throw new Error('IndexOutOfBoundsException') //check for overflows
		return i
	}
}

if (typeof module !=='undefined' && module.exports)
	module.exports = exports = Array	