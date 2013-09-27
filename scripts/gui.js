

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
