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
    strokeWidth:1
})

mainLayer.add(rect)

stage.add(mainLayer)


var que = new BinaryHeap()
que = new MinHeap(5);
function peek(){
    console.log('peeking: '+que.peek())
}
function poll(){
    var ret = que.deleteMin()
    console.log('polling: '+ret)
    return ret
}
function insert(numb){
    console.log('inserting:'+numb)
    que.insert(numb)
}
var a = new Number(4);
a.tieto = function(){
    console.log('toimii')
    }
insert(a)
insert(3)
insert(2)
insert(5)
insert(6)
insert(8)
insert(7)
for (var i = 0; i < 100; i++) {
    insert(100-i)
}
while (que.hasNext()){
    poll()
}

    
    