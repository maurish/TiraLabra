var stage = new Kinetic.Stage({
    container:'visualizator',
    width:500,
    height:500
})

var mainLayer = new Kinetic.Layer()

var speed = 500

var nodes = [
    node(20,20),
    node(150,150),
    node(250,50),
    node(400,200),
    node(20,200)
]
var vertices = [
    vertice(nodes[0],nodes[1]),
    vertice(nodes[0],nodes[2]),
    vertice(nodes[0],nodes[3]),
    vertice(nodes[1],nodes[2]),
    vertice(nodes[1],nodes[3]),
    vertice(nodes[2],nodes[3]),
    vertice(nodes[3], nodes[4])
]
vertices.forEach(function(vertice){
    mainLayer.add(vertice)
})
nodes.forEach(function(node){
    mainLayer.add(node)
})

var functions = {
    distance:distance,
    neighbors:neighbors,
    visualizeCompare:visualizeCompare,
    setUsed: setUsed
}
stage.add(mainLayer)
setTimeout(function(){
    new aStar(nodes[0], nodes[4], functions)
},500)


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
    wait(500)
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

function setUsed(node){
    node.setFill('gray')
    update()
}


// @TODO BAD CODE, REMOVE THIS ASAP, use non-blockin code instead ( callbacks)
function wait(ms) {
    var start = +(new Date());
    while (new Date() - start < ms);
}
