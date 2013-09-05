var stage = new Kinetic.Stage({
    container:'visualizator',
    width:500,
    height:500
})

var mainLayer = new Kinetic.Layer()

var rect = new Kinetic.Rect({
    x:10,
    y:10,
    width:100,
    height:100,
    stroke:'black',
    fill:'red',
    strokeWidth:1,
    draggable:true
})

var node = function(x, y){
    return new Kinetic.Circle({
        x:x,
        y:y,
        radius:10,
        draggable:true,
        stroke:'black',
        fill:'red',
        strokeWidth:1
    })

}
var vertice = function(node1, node2){
    var vertice = new Kinetic.Line({
        stroke:'green',
        strokeWidth:2
    })    
    node1.on('dragmove',update)
    node2.on('dragmove',update)
    update()
    return vertice
    function update(){
        vertice.setPoints([node1.getX(),node1.getY(),node2.getX(),node2.getY()])
    }
}
var nodes = [
    node(20,20),
    node(150,150),
    node(250,250)
]
var vertices = [
    vertice(nodes[0],nodes[2]),
    vertice(nodes[1],nodes[0]),
    vertice(nodes[1],nodes[2])
]
vertices.forEach(function(vertice){
    mainLayer.add(vertice)
})
nodes.forEach(function(node){
    mainLayer.add(node)
})


stage.add(mainLayer)