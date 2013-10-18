var i = 1
var node = function(x, y, text){
    var node = new Kinetic.Circle({
        x:x,
        y:y,
        radius:12,
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
    node.on('select', select)
    var tip = new Kinetic.Text({
        text:"",
        x:x-6,
        y:y-25,
        fill:'black',
        fontFamily:'Verdana'
    })
    var id = new Kinetic.Text({
        text:text||i++,
        x:x-4,
        y:y-5,
        fill:'black',
        fontFamily:'Verdana'
    })
    topLayer.add(id)
    var distance 
    var estimate
    tip.refresh = function(dist,est){
        if (typeof distance == 'string' ||distance > dist){
            distance= dist
        }
        if (typeof estimate == 'string' ||estimate > est){
            estimate = est
        }
        if (est){
            tip.setText(distance+"/"+estimate)
        }else{
            tip.setText(distance)
        }
        
    }
    node.reset = function(){
        node.setFill('red')
        distance = ""
        estimate = ""
        tip.refresh(distance,estimate)
    }
    node.on('dragmove', function(){
        tip.setX(node.getX()-10)
        tip.setY(node.getY()-25)
        id.setX(node.getX()-3)
        id.setY(node.getY()-5)
    })
    id.on('select', function(){
        node.fire('select')
    })
    node.tip = tip
    mainLayer.add(tip)
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
    function select(){
        node.setFill('green')
        update()
    }

}
function update(){
    mainLayer && mainLayer.draw()
    verticeLayer && verticeLayer.draw()
    topLayer && topLayer.draw()
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
        update()
    }
    function compare(){
        vertice.setStroke('red')
        update()
    }
}
function GUI(settings){
    var defaults = {
        time:500, 
        width:1250, 
        height:500
    }
    settings = $.extend(defaults, settings)
    var nodes = []
    var vertices = []
    var stage = new Kinetic.Stage(settings)

    var mainLayer = new Kinetic.Layer()
    return {
        visualize:visualize,
        addNode:insertNode,
        go:go,
        reset:reset,
        clear:clear
    }
    function visualize(steps){

    }
    function insertNode(x,y,text){

    }
    function insertVertice(node1, node2){

    }
    function go(){
        stage.add(mainLayer);
    }
     function update(){
        mainLayer.draw()
    }
    function clear(){
        vertices.clear()
        nodes.clear()
        update()
    }
}
