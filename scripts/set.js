function Set(compare){
	return new TreeSet(compare);
}
function TreeSet(compare){
	var size =0
	var root
	compare =  compare||function(a, b){
		if (typeof a !=='number' || typeof b !=='number'){
			throw new Error('You need to implement pass compare method in constructor for non-number '+
				'objects. '+ typeof a + " "+typeof b)
		}
		return b-a
	}



	return {
		insert: insert,
		contains: contains,
		remove:remove,
		size:function(){return size},
		isEmpty: function(){return size==0}, 
		toString:toString,
		height:function(){return height(root)},
		toList:toList
	}

	function toList(arr,node){
		if (!arr){
			arr  = []
			node = root
		}
		if(!node)return []
		if (node.left)
			toList(arr,node.left)
		arr.push(node.obj)
		if(node.right)
			toList(arr,node.right)
		return arr
	}

	function toString(){
		var ret = ""
		var que = []
		var next = []
		var rel = ""
		que.push(root)
		while (que.length || next.length){
			if (!que.length){
				que=next
				next=[]
				ret+="\n"
				ret+=rel+"\n"
				rel=""
			}


			var cur =que.shift()
			if (cur.left){
				next.push(cur.left)
				rel+="/"
			}
			if(cur.right){
				next.push(cur.right)
				rel+="\\"
			}
			ret+=+" "+cur.obj+" "
		}
		return ret
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
		var comp = compare(node.obj,cur.obj)

		//console.log('node',node.obj,'cur', cur.obj,'comp was', comp)
		if(!comp){
			return false
		}
		if (comp>0){
			//console.log('going left!')
			if (!cur.left){
				cur.left=node
				node.parent=cur
			}else{
				insertTo(cur.left,node)
			}

		}else{ // comp < 0
			if (!cur.right){
				cur.right=node
				node.parent=cur
			}else
				insertTo(cur.right,node)
		}
		while (balance(cur=cur.parent)!=2)
		return true
	}

	function balance(node){
		if (!node)return 2
		var factor = balanceFactor(node)
		if (Math.abs(factor)<2)
			return 0
		if (factor<0){
			if (height(node.right.right)>=height(node.right.left))
				node = rotateLeft(node)
			else
				node = rotateRightLeft(node)
		}else{
			if (height(node.left.left)>=height(node.left.right))
				node = rotateRight(node)
			else
				node = rotateLeftRight(node)
		}
		if (!node.parent)
			root = node
		return 1
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
	function balanceFactor(elem){
		return height(elem.left)-height(elem.right)
	}
	function height(elem){
		if (!elem)return -1
		return Math.max(height(elem.right), height(elem.left))+1
	}

	function prev(elem){
		if (elem.left)return max(elem.left)
		return elem
	}
	function next(elem){
		if (elem.right)return min(elem.right)
		return elem
	}
	function max(elem){
		if (elem.right)return max(elem.right)
		return elem
	}
	function min(elem){
		if(elem.left)return min(elem.left)
		return elem
	}
	function rotateLeft(node){
		var right = node.right
		right.parent = node.parent
		node.right = right.left
		if (node.right)
			node.right.parent = node
		right.left = node
		node.parent = right

		if (right.parent && right.parent.right == node)
			right.parent.right = right
		if (right.parent && right.parent.left == node)
			right.parent.left = right
		return right


	}
	function rotateRight(node){
		var left = node.left
		left.parent = node.parent
		node.left = left.right
		if (node.left)
			node.left.parent = node
		left.right = node
		node.parent = left

		if (left.parent && left.parent.left == node)
			left.parent.left = left
		if (left.parent && left.parent.right == node)
			left.parent.right = left
		return left
	}
	function rotateRightLeft(node){
		node.right = rotateRight(node.right)
		return rotateLeft(node)
	}
	function rotateLeftRight(node){
		node.left = rotateLeft(node.left)
		return rotateRight(node)
	}

	function remove(elem){
		elem = find(elem)
		if (!elem)return false
		removeNode(elem)
		size--
		return true
	}

	function removeNode(elem){
		if (!elem.left || !elem.right){
			if (!elem.parent){
				if (elem.left)
					root = elem.left
				if (elem.right)
					root=elem.right
				return
			}
			if (elem.parent.left == elem){
				if (elem.left)
					elem.parent.left=elem.left
				else 
					elem.parent.left=elem.right
				return
			}
			if (elem.left)
				elem.parent.right = elem.left
			else
				elem.parent.right = elem.right
			return
		}

		var successor = next(elem)
		elem.obj = successor.obj
		removeNode(successor)
		while (!balance(successor = successor.parent));
	}


	function Node(obj, parent, right, left){
		this.obj = obj
		this.parent = parent
		this.right = right
		this.left = left
	}
}


if (typeof module !=='undefined' && module.exports)
 module.exports = exports = Set
