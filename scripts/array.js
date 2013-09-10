function Array(){
	this.length=0
	this.isEmpty = function(){
		return !this.length
	}
	this.insert=function(val){
		this[this.length++]=val
	}
	this.remove = function(i){
		this.checkNumber(i)
		for(var j = i;j<this.length;j++){
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
		checkNumber(i)
		checkNumber(j)
		var tmp = this[i]
		this[i]=this[j]
		this[j]=tmp
	}
}

if (typeof module !=='undefined' && module.exports)
	module.exports = exports = Array	