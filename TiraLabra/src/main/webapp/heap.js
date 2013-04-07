function BinaryHeap(){
    return MinHeap(2)
}
//  childs are: n * i + 1  to n * i + n
//  parent is: floor((i - 1) / n)
function MinHeap(childs){
    var list = []                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    
    function insert(obj){
        list.push(obj)
        bubbleUp(list.length-1)
    }
    
    function bubbleUp(i){
        while (i!=0 && list[i]<list[parent(i)]){
            swap(i,parent(i))
            i=parent(i)
        }
    }
    
    
    function peek(){
        return list[0]
    }
    function size(){
        return list.length
    }
    function deleteMin(){
        if (list.length==0)return 0;
        var ret = list[0]
        list[0]=list[list.length-1]
        list.pop()
        heapify(0)
        return ret
    }
    function heapify(i){
        var min = minIndex(i)
        if (i!=min){
            swap(min, i)
            heapify(min)
        }
    }
    function swap(i, j){
        var tmp = list[i]
        list[i]=list[j]
        list[j]=tmp
    }
    function minIndex(i){
        var min = i
        var childs = child(i)
        for (var j=0;j<childs.length;j++){
            var next = childs[j]
            if ( list[next]<list[min]){
                min=next
            }
        }
        return min
    }
    
    function parent(i){
        return Math.floor((i-1)/childs)
    }
    function child(i){
        var ret = []
        for (var j = childs*i+1; j <= childs*i+childs && j<list.length; j++) {
            ret.push(j)
        }
        return ret
    }
    function hasNext(){
        return list.length!=0
    }
    
    function isEmpty(){
        return list.length==0
    }
    
    return {
        heapify:heapify,
        insert:insert,
        peek:peek,
        deleteMin:deleteMin,
        size:size,
        hasNext:hasNext,
        isEmpty:isEmpty
    }
}
