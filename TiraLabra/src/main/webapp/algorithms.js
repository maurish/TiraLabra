var algorithms = {
    dijkstra:function(graph, start,goal){
        
    },
    aStar:function(graph, start, goal){
        
    },
    BFS:function(graph, start, goal){
        
    }
    
    
}

function BinaryHeap(){
    return MinHeap(2)
}
 //  childs are: ni-(n-2) to ni+1 where n is max amount of childs and i is index of node
 //  parent is: (i+(n-2)) / n   
function MinHeap(childs){
    var list = []                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    function heapify(i){
        
    }
    function insert(obj){
        list.push(obj)
    }
    
    
    function peek(){
        return list[0]
    }
    function size(){
        return list.length
    }
    function deleteMin(){
        
    }
    
    return {
        heapify:heapify,
        insert:insert,
        peek:peek,
        deleteMin:deleteMin,
        size:size
    }
}
