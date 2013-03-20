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