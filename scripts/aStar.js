function aStar(start, end, funcs){
    var dis = funcs.distance(start, end)
    var queue = new BinaryHeap(compare)
    start = createNode(start,dis,0)
    end = createNode(end)
    visited = []
    queue.insert(start)
    i =0
    while (!queue.isEmpty()){
        var current = queue.poll()
        if (visited.indexOf(current.node)!=-1)
            continue
        visited.push(current.node)
        console.log('current is', current.node.getX(), current.node.getY())
        if (current.node == end.node){
            console.log('PATH FOUND, marking route with blue') 
            var path = []
            while(current.parent){
                path.push(current)
                var next = current.parent
                funcs.markRoute(current.node, next.node)
                current=next
            }
            return path
        }
        var neighbors = funcs.neighbors(current.node)
        neighbors.forEach(function(neighbor){
            neighbor = createNode(neighbor)
            funcs.visualizeCompare(current.node, neighbor.node)
            neighbor.dist = current.dist + cost(current,neighbor)
            neighbor.est = heuristicEstimate(neighbor, end)
            queue.push(neighbor)
            neighbor.parent = current
            //console.log('node',neighbor.node.getX(),neighbor.node.getY(),'total cost through here is: ', neighbor.dist+neighbor.est)
        })
        funcs.setUsed(current.node)
        if (i++ >10)return
    }
    
    function cost(start, end){
        return heuristicEstimate(start,end)
    }
    
    function heuristicEstimate(start,end){
        return funcs.distance(start.node,end.node)
    }
    
    function createNode(node, estimate, distance, parent){
        return {
            dist:distance,
            est:estimate,
            node:node,
            parent:parent
        }
    }


    function compare(node1, node2){
        return (node1.dist+node1.est)-(node2.dist+node2.est)
    }
}