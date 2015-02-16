// create an array of random numbers

var dataSet = [];
var dataSetSize = 100;
for (var i = 0; i < dataSetSize; i++) {
    var num = Math.random();
    dataSet.push(num);
}

function createInterfaceForViz(name, title) {
    // creates the corresponding interface components for the visualization

    // create the navigation text
    var span = $("<span></span>", {
        "class":"targets",
        "id":name
    });
    $(".wrapper").before(span);

    // create the navigation links
    var exampleLink = $("<a></a>", {
                "href": "#" + name,
                "text": name,
                "class":"nav-link"
            });

    var navItem = $("<li></li>", {
                "class":"nav-item"
            });

    $(".nav-list").append(navItem);
    exampleLink.appendTo(navItem);

    // create the pages
    var section = $("<section></section>", {
        "class":"page " + "page-" + name,
    });
    var header = $("<h2></h2>", {
        "class":"page-title",
        "text": title
    });
    $(".layout").append(section);
    header.appendTo(section);
};

var svgWidth = 1000;
var svgHeight = 300;
var elemWidth = 20;
var padding = 0;
var yMultiplier = 50;

createInterfaceForViz("ex01", "test");

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