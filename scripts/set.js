function Set(compare){
	return new TreeSet(compare);
}
function TreeSet(compare){
	var size =0
	compare =  compare||function(a, b){
		if (typeof a !=='number' || typeof b !=='number'){
			throw new Exception('You need to implement pass compare method in constructor for non-number '+
				'objects. '+ typeof a + " "+typeof b)
		}
		return a-b
	}



	return {
		insert: insert,
		contains: contains,
		remove:remove,
		size:count,
		isEmpty: function(){return size==0}
	}

	function count(){
		return size
	}
	function insert(val){
		if (contains(val))
			return false
		// @TODO insert
		size+=1
		return true
	}

	function contains(){
		return false
		// @TODO implement
	}
	function remove(){
		// @TODO implement	

	}


	function Node(obj, parent, right, left){
		this.obj = obj
		this.parent = parent
		this.right = right
		this.left = left
	}
}


function HashSet(hash){
	var size =0
}


if (typeof module !=='undefined' && module.exports)
 module.exports = exports = Set