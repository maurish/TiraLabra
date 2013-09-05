function Array(){
	this.length=0
	this.isEmpty = function(){
		return !this.length
	}
	this.insert=function(val){
		this[this.length++]=val
	}
	this.remove = function(i){
		i = checkNumber(i)
		for(var j = i;j<this.length;j++){
			this[j]=this[j+1]
		}
		this.length--
	}
	this.get = function(i){
		i = checkNumber(i)
		return this[i]
	}
	function checkNumber(i){
		i = parseInt(i)
		if (i<0||i>=this.length)throw new Error('IndexOutOfBoundsException') //check for overflows
		return i
	}
}

if (module && module.exports)
	module.exports = exports = Array	