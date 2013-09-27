var node = function(x, y){
    var node = new Kinetic.Circle({
        x:x,
        y:y,
        radius:10,
        draggable:true,
        stroke:'black',
        fill:'red',
        strokeWidth:1
    })
    node.vertices= []
    node.on('dragstart', toggleColor)
    node.on('dragend', toggleColor)
    node.on('activate', activate)
    node.on('passify', passify)
    return node
    function toggleColor(){
        reset()
        node.setFill(node.getFill()=='blue'?'red':'blue')
        update()
    }
    function activate(){
        node.setFill('green')
        update()
    }
    function passify(){
        node.setFill('gray')
        update()
    }
    

}
function update(){
    mainLayer && mainLayer.draw()
}
var vertice = function(node1, node2){
    var vertice = new Kinetic.Line({
        stroke:'green',
        strokeWidth:2
    })
    node1.vertices.push(vertice)
    node2.vertices.push(vertice)
    vertice.node1=node1
    vertice.node2=node2
    node1.on('dragmove',updatePoints)
    node2.on('dragmove',updatePoints)
    vertice.on('compare', compare)
    updatePoints()
    return vertice
    function updatePoints(){
        vertice.setPoints([node1.getX(),node1.getY(),node2.getX(),node2.getY()])
    }
    function compare(){
        vertice.setStroke('red')
        update()
    }
}
