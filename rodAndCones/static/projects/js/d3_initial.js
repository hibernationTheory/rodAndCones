// create an array of random numbers

var dataSet = [];
var dataSetSize = 100;
for (var i = 0; i < dataSetSize; i++) {
    var num = Math.random();
    dataSet.push(num);
}

var svgWidth = 1000;
var svgHeight = 300;
var elemWidth = 20;
var padding = 0;
var yMultiplier = 50;

// create the svg canvas
d3.select(".page-ex01").append("svg").attr({
    "width":svgWidth,
    "height":svgHeight,
    "class":"svg-ex01"
});

d3.select(".svg-ex01")
    .selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr({
        "x":function(d,i) {
            return i*elemWidth;
            },
        "y":function(d,i) {
            return svgHeight-d*yMultiplier;
            },
        "width":elemWidth,
        "height": function(d, i) {
               return d*yMultiplier; 
            },
        "fill":"red"
});