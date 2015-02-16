function createInterfaceForViz(name, title, subtitle, description, index) {
    // creates the corresponding interface components for the visualization

    var value = 0;
    var negValue = 0;
    if (index == 0) {
        value = 0;
    } else {
        value = (index * 100) + "%"
        negValue = "-" + value;
    }

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

    section.css("top", value);

    var header = $("<h2></h2>", {
        "class":"page-title",
        "text": title
    });
    header.css("text-shadow", "1px 1px 0 #333");

    var infoSection = $("<h3></h3>", {
        "text":subtitle
    })

    var detailedInfo = $("<p></p>", {
        "class":"page-info",
        "html":description
    })

    $(".layout").append(section);
    header.appendTo(section);
    infoSection.appendTo(section);
    detailedInfo.appendTo(section);
};

var SVG_WIDTH = 1000;
var SVG_HEIGHT = 300;

// create an array of random numbers

var DATASET = [];
var DATASET_SIZE = 100;
for (var i = 0; i < DATASET_SIZE; i++) {
    var num = Math.random();
    DATASET.push(num);
}

(function() {
    var elemWidth = 20;
    var padding = 0;
    var yMultiplier = 50;
    var exampleID = "ex01"
    var exampleTitle = "Example 01"
    var index = 0;

    var subtitle = "A basic D3 example for creating a Barchart"
    var description = "Using a random dataset to create a simple barchart. </br> Notes: </br> \
    - to be able to center an svg inside a div, you need to change it's display to block (inline by default) </br> \
    - at that point, you can apply margin: auto, </br>\
    - you need to set the x, y, width, height on the rect's inside svg. </br>\
    "
    createInterfaceForViz(exampleID, exampleTitle, subtitle, description, index);

    // create the svg canvas
    d3.select(".page-" + exampleID).append("svg").attr({
        "width":SVG_WIDTH,
        "height":SVG_HEIGHT,
        "class":"svg-" + exampleID
    });

    d3.select(".svg-" + exampleID)
        .selectAll("rect")
        .data(DATASET)
        .enter()
        .append("rect")
        .attr({
            "x":function(d,i) {
                return i*elemWidth;
                },
            "y":function(d,i) {
                return SVG_HEIGHT-d*yMultiplier;
                },
            "width":elemWidth,
            "height": function(d, i) {
                   return d*yMultiplier; 
                },
            "fill":"red"
    });
})();

(function() {
    var elemWidth = 20;
    var padding = 0;
    var yMultiplier = 50;
    var exampleID = "ex02"
    var exampleTitle = "Example 02"
    var index = 1;

    var subtitle = "Using d3 scales"
    var description = ""
    createInterfaceForViz(exampleID, exampleTitle, subtitle, description, index);

    scaleX = d3.scale().linear().domain([0,1]).linear([0, SVG_WIDTH]);
    scaleY = d3.scale().linear().domain([0,1]).linear([0, 1*yMultiplier]);

    // create the svg canvas
    d3.select(".page-" + exampleID).append("svg").attr({
        "width":SVG_WIDTH,
        "height":SVG_HEIGHT,
        "class":"svg-" + exampleID
    });

    d3.select(".svg-" + exampleID)
        .selectAll("rect")
        .data(DATASET)
        .enter()
        .append("rect")
        .attr({
            "x":function(d,i) {
                return i*elemWidth;
                },
            "y":function(d,i) {
                return SVG_HEIGHT-d*yMultiplier;
                },
            "width":elemWidth,
            "height": function(d, i) {
                   return d*yMultiplier; 
                },
            "fill":"red"
    });
})();



