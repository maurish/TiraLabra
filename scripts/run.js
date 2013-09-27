var stage = new Kinetic.Stage({
    container:'visualizator',
    width:500,
    height:500
})

var mainLayer = new Kinetic.Layer()

var nodes = [
    node(20,20),
    node(150,150),
    node(250,50),
    node(400,200)
]
var vertices = [
    vertice(nodes[0],nodes[2]),
    vertice(nodes[1],nodes[0]),
    vertice(nodes[1],nodes[2]),
    vertice(nodes[0],nodes[3]),
    vertice(nodes[1],nodes[3]),
    vertice(nodes[2],nodes[3])
]
vertices.forEach(function(vertice){
    mainLayer.add(vertice)
})
nodes.forEach(function(node){
    mainLayer.add(node)
})


stage.add(mainLayer)