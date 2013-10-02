var stage = new Kinetic.Stage({
    container:'visualizator',
    width:1250,
    height:500
})

var mainLayer = new Kinetic.Layer()

var speed = 500
var start = node(20,30,'start')
var end = node(1050,450,'end')
var nodes = [
    start,
    node(150,150),
    node(250,50),
    node(400,200),
    node(20,200),
    node(40,450),
    node(150,250),
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
    vertice(nodes[5], end)
]
vertices.forEach(function(vertice){
    mainLayer.add(vertice)
})
nodes.forEach(function(node){
    mainLayer.add(node)
})
reset()
var functions = {
    distance:distance,
    neighbors:neighbors,
    visualizeCompare:visualizeCompare,
    setUsed: setUsed,
    markRoute:markRoute
}
stage.add(mainLayer)
$(function(){
    $('.new').on('click', function(){
        reset()
    })
    $('.go').on('click', function(){
        new aStar(start, end, functions)    
    })
    
})


function distance(node1, node2){
    return Math.sqrt(Math.pow(node1.getX()-node2.getX(),2) + Math.pow(node1.getY()-node2.getY(),2))
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
        node.setFill('red')
    })
    vertices.forEach(function(vertice){
        vertice.setStroke('green')
    })
    start.setFill('yellow')
    end.setFill('yellow')
    update()
    
}

function setUsed(node){
    node.setFill('gray')
    update()
}

function markRoute(node1, node2){
    vertice = findCommon(node1.vertices, node2.vertices)
    node1.setFill('blue')
    node2.setFill('blue')
    vertice.setStroke('blue')
    start.setFill('yellow')
    end.setFill('yellow')
    update()
}


// @TODO BAD CODE, REMOVE THIS ASAP, use non-blockin code instead ( callbacks)
function wait(ms) {
    var start = +(new Date());
    while (new Date() - start < ms);
}
