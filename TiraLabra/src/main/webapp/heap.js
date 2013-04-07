function BinaryHeap(){
    return MinHeap(2)
}
//  childs are: n * i + 1  to n * i + n
//  parent is: floor((i - 1) / n)
function MinHeap(childs){
    var list = []                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    function heapify(i){
        
    }
    function insert(obj){
        list.push(obj)
        bubbleUp(list.length)
    }
    
    
    function peek(){
        return list[0]
    }
    function size(){
        return list.length
    }
    function deleteMin(){
        
    }
    function parent(i){
        return Math.floor((i-1)/childs)
    }
    function child(i){
        var ret = []
        for (var j = childs*i+1; j <= childs*i+childs; j++) {
            ret.push(j)
        }
        return ret
    }
    
    return {
        heapify:heapify,
        insert:insert,
        peek:peek,
        deleteMin:deleteMin,
        size:size
    }
}
