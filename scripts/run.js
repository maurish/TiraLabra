var stage = new Kinetic.Stage({
    container:'visualizator',
    width:1250,
    height:500
})

var mainLayer = new Kinetic.Layer()
var verticeLayer = new Kinetic.Layer()
var topLayer = new Kinetic.Layer()

var speed = 500
var start = node(20,30,'s')
var end = node(1050,450,'e')
var nodes = [
    start,
    node(150,150),
    node(250,50),
    node(700,100),
    node(520,200),
    node(440,450),
    node(50,250),
    node(700,190),
    node(750,350),
    end
]

var vertices = [
    vertice(start,nodes[1]),
    vertice(nodes[0],nodes[2]),
    //vertice(nodes[0],nodes[3]),
    vertice(nodes[1],nodes[6]),
    vertice(nodes[1],nodes[3]),
    vertice(nodes[2],nodes[3]),
    vertice(nodes[3],nodes[4]),
    vertice(nodes[4],nodes[5]),
    //vertice(start, nodes[4]),
    vertice(nodes[3], nodes[6]),
    vertice(nodes[6], nodes[4]),
    vertice(nodes[3], nodes[5]),
    vertice(nodes[3],nodes[7]),
    vertice(nodes[7],nodes[8]),
    vertice(nodes[8], nodes[5]),
    vertice(nodes[8], end),
    vertice(nodes[3],end),
    vertice(nodes[5], end)
]
vertices.forEach(function(vertice){
    verticeLayer.add(vertice)
})
nodes.forEach(function(node){
    mainLayer.add(node)
})
var functions = {
    distance:distance,
    neighbors:neighbors,
    visualizeCompare:visualizeCompare,
    setUsed: setUsed,
    markRoute:markRoute
}

var funcs = (function(){
    var log = []
    var interval
    return {
        distance:distance,
        neighbors:neighbors,
        visualizeCompare:compare,
        setUsed: used,
        markRoute:route,
        go:go,
        stop:stop,
        setCurrent:current,
        compare:function(n1,n2){
            return (parseInt(n1.getX())*1000+parseInt(n1.getY())) - (parseInt(n2.getX())*1000+parseInt(n2.getY()))
        }
    }
    function compare(node1,node2){
        log.push(function(){
            visualizeCompare(node1,node2)
        })
    }
    function current(node){
        log.push(function(){

        node.setFill('orange')
        update()
        })
    }
    function used(node1, node2, dist, est){
        log.push(function(){
            if (node2){
                findCommon(node1.vertices,node2.vertices).setStroke('gray')
                node2.tip.refresh(Math.floor(dist),Math.floor(est))
            }
            else
                setUsed(node1)
            update()
        })
    }
    function stop(){
        clearInterval(interval)
        log=[]
    }

    function route(node1, node2){
        log.push(function(){
            markRoute(node1,node2)
        })
    }

    function go(){

        interval = setInterval(next, $('.speed').val())
    }
    function next(){
        if (!log.length){
            stop()
            return
        }

        log.shift()()
    }
})()

reset()
stage.add(verticeLayer)
stage.add(mainLayer)
stage.add(topLayer)

//var gui = GUI({container:'visualizator'});
$(function(){
    $('.new').on('click', function(){
        reset()
    })
    $('.go').on('click', function(){
        reset()
        //var result = new aStar(start, end, funcs)  
        //var result = new dijkstra(start,end,funcs)
        if ($('.alg').val()==1){
            dijkstra(start, end, funcs) 
        } else {
            aStar(start, end, funcs)
        }
        funcs.go()
    })
    $('.node').on('click', function(){
        var newnode = node(Math.random()*1000,Math.random()*500)
        nodes.push(newnode)
        mainLayer.add(newnode)
        reset()
        update()
    })
    
    var node1
    mainLayer.on('mousedown', function(e){
        if (node1){
            if (e.targetNode==node1){
                node1=null;
                reset()
                return
            }
            var ver = vertice(node1,e.targetNode)
            vertices.push(ver)
            verticeLayer.add(ver)
            reset()
            node1=null
        }else{
            node1=e.targetNode
            node1.fire('select')
        }
    })
    mainLayer.on('dragstart', function(){
        node1=null;
    })
    mainLayer.on('dragend', function(){
        node1=null
    })
})


function distance(node1, node2){ // distance using pythagoras
    var x = node1.getX() - node2.getX()
    var y = node1.getY() - node2.getY()
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
}

function neighbors(node){
    var ret = []
    node.vertices.forEach(function(vertice){
        ret.push(getOtherNode(vertice, node))
    })
    return ret
}

function getOtherNode(vertice, node){
    if (vertice.node1===node)
        return vertice.node2
    return vertice.node1
}

function visualizeCompare(node1, node2){
    //wait(500)
    var vertice = findCommon(node1.vertices, node2.vertices)
    vertice.fire('compare')
}
function findCommon(arr1, arr2){
    var ret;
    arr1.forEach(function(item){
        if (arr2.indexOf(item)!=-1)
            ret= item
    })
    return ret
}


function reset(){
    nodes.forEach(function(node){
        node.reset()
    })
    vertices.forEach(function(vertice){
        vertice.setStroke('green')
    })
    start.setFill('yellow')
    end.setFill('yellow')
    update()
    funcs.stop()
}



function setUsed(node){
    node.setFill('gray')
    update()
}

function markRoute(node1, node2){
    var vertice = findCommon(node1.vertices, node2.vertices)
    node1.setFill('blue')
    node2.setFill('blue')
    vertice.setStroke('blue')
    start.setFill('yellow')
    end.setFill('yellow')
    update()
}
