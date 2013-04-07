function aStar(start, end){
    var queue = new BinaryHeap()
    queue.insert(createNode(start,0))
    
    while (!queue.isEmpty()){
        var current = queue.deleteMin()
        if (current == end){ //@TODO better check
            return //@TODO draw path?
        }
        for (var i = 0; i < current.neighbors; i++) {
            var neighbor = current.neighbors[i]
            var distance = current.distance + cost(current,neighbor)
            var estimate = neighbor.distance + heuristicEstimate(current,goal)
            if (!neighbor.parent ||neighbor.distance>distance){
                if (!neighbor.parent) queue.insert(neighbor)
                else queue.peek() //@TODO need to heapify or bubbleup the heap, key has changed
                neighbor.parent=current
                neighbor.distance=distance
            }
        }
    }
    
    function cost(start, end){
        return heuristicEstimate(start,end)
    }
    
    function heuristicEstimate(start,end){
        return 0
    }
    
    function crateNode(estimate, distance, node){
       var ret = new Number(estimate)
       ret.distance = distance
       ret.parent=ret
       return ret
    }
}