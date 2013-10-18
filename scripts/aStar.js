

function aStar(start, end, funcs){
    var dis = funcs.distance(start, end)
    var queue = new BinaryHeap(compare)
    start = createNode(start,dis,0)
    end = createNode(end)
    visited = Set(funcs.compare)
    queue.insert(start)
    while (!queue.isEmpty()){
        var current = queue.poll()
        if (visited.contains(current.node))
            continue
        visited.insert(current.node)

        funcs.setCurrent(current.node)
        if (current.node == end.node){
            //console.log('PATH FOUND, marking route with blue') 
            var path = []
            var distance = current.dist
            while(current.parent){
                path.push(current)
                var next = current.parent
                funcs.markRoute(current.node, next.node)
                current=next
            }
            return {path:path,distance:distance}
        }
        var neighbors = funcs.neighbors(current.node)
        neighbors.forEach(function(neighbor){
            neighbor = createNode(neighbor)
            funcs.visualizeCompare(current.node, neighbor.node)
            neighbor.dist = current.dist + cost(current,neighbor)
            neighbor.est = heuristicEstimate(neighbor, end)
            queue.push(neighbor)
            neighbor.parent = current
            funcs.setUsed(current.node, neighbor.node,neighbor.dist,neighbor.est)
        })
        funcs.setUsed(current.node)
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

if (typeof module !=='undefined' && module.exports){
    module.exports = exports = aStar
    BinaryHeap = require('./heap')
    Set = require('./set')
}

