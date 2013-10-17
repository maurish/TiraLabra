function Set(compare){
	return new TreeSet(compare);
}
function TreeSet(compare){
	var size =0
	var root
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
		size:function(){return size},
		isEmpty: function(){return size==0}, 
		toString:toString
	}

	function toString(){
		return print(root)
	}
	function print(elem){
		if (!elem){
			return " " 
		}
		return print(elem.left)+elem.obj+print(elem.right)
	}
	function insert(val){
		if (!root){
			root = new Node(val)
			size++
			return true
		}
		var ret = insertTo(root, new Node(val))
		if (ret)size++
		return ret
	}
	function insertTo(cur, node){
		var comp = compare(cur.obj,node.obj)
		if(!comp){
			return false
		}
		if (comp<0){
			if (!cur.left){
				cur.left=node
				node.parent=cur
			}else
				insertTo(cur.left,node)
			

		}else{
			if (!cur.right){
				cur.right=node
				node.parent=cur
			}else
				insertTo(cur.right,node)
		}
		return true
	}

	function balance(elem){

	}

	function contains(elem){
		return !!find(elem)
	}
	function find(elem){
		var current = root
		while (current){
			var comp = compare(current.obj, elem)
			if (!comp)
				return current
			if (comp<0)
				current=current.left
			else
				current= current.right
			
		}
	}
	function remove(elem){
		elem = find(elem)
		if (!elem)return false
		if (elem.parent && elem === elem.parent.right){
			elem.parent.right=undefined
			// @TODO handle children
		}else if (elem.parent && elem === elem.parent.left){
			elem.parent.left=undefined
			// @TODO handle children
		}
		size--
		return true 
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