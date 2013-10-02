var node = function(x, y, text){
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
    node.on('dragstart',dragColor)
    node.on('dragend', reset)
    node.on('activate', activate)
    node.on('passify', passify)
    if(text){
        text = new Kinetic.Text({
            text:text,
            x:x-10,
            y:y-25,
            fill:'black',
            fontFamily:'Verdana'
        })
        node.on('dragmove', function(){
            text.setX(node.getX()-10)
            text.setY(node.getY()-25)
        })
        mainLayer.add(text)
    }
    return node
    function dragColor(){
        reset()
        node.setFill('blue')
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
    var text = new Kinetic.Text({
        text:'asdasd',
        fill:'black',
        rotation:45,
        fontSize:13,
        fontFamily:'Verdana'
    })
    node1.vertices.push(vertice)
    node2.vertices.push(vertice)
    vertice.node1=node1
    vertice.node2=node2
    node1.on('dragmove',updatePoints)
    node2.on('dragmove',updatePoints)
    vertice.on('compare', compare)
    updatePoints()
    mainLayer.add(text)
    return vertice
    function updatePoints(){
        vertice.setPoints([node1.getX(),node1.getY(),node2.getX(),node2.getY()])
       
        text.setText(parseInt(distance(node1,node2)))
        var width  =node1.getX()-node2.getX()
        var height = node1.getY()-node2.getY()
        var angle = Math.atan(height/width)
        text.setRotation(angle)
        
        var distanceFromLine = 15
        var x = (node1.getX()+node2.getX())/2 + (Math.sin(angle)*distanceFromLine)
        var y = (node1.getY()+node2.getY())/2 - (Math.cos(angle)*distanceFromLine)
        text.setX(x)
        text.setY(y)
    }
    function compare(){
        vertice.setStroke('red')
        update()
    }
}
