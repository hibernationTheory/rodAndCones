// init controller
var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

// build scenes
new ScrollMagic.Scene({triggerElement: "#parallax-01"})
        .setTween("#parallax-01 > div", {y: "80%", ease: Linear.easeNone})
        //.addIndicators()
        .addTo(controller);

/* PACKED BUBBLES */

var PackedBubbles = function(data) {
    this.diameter = data.diameter;
    this.color = data.color;
    this.format = data.format;
    this.chartClass = data.chartClass; 
}

PackedBubbles.prototype.createShapeBase = function(baseSelector) {
    var width = this.diameter;
    var height = this.diameter;
    var chartClass = this.chartClass;

    var svg = d3.select(baseSelector).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", chartClass)

    return svg;
}

PackedBubbles.prototype.drawShape = function(base, data) {
    var diameter = this.diameter;
    var self = this;

    var pack = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .value(function(d) { return d.size; })

    var g = base.append("g");

    var shape = g.datum(data)
        .selectAll(".node")
        .data(pack.nodes)
        .enter().append("g")
        .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    shape.append("title")
        .text(function(d) { return d.name + (d.children ? "" : ": " + self.format(d.size)); });

    shape.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { 
            return (d.children ? self.color(d.name) : d.color); 
        })
        .attr("stroke", function(d) {
            return d3.rgb(d.color).darker();  
        });

    shape.filter(function(d) { return !d.children; })
        .append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.name.substring(0, d.r / 3); })
        .attr("fill", function(d) {
            var hsl = d3.hsl(d.color);
            if (hsl["l"] < 0.5) {
                return d3.rgb(d.color).brighter(2);
            } else {
                return d3.rgb(d.color).darker(2); 
            }  
        });
    
    return shape;
}

PackedBubbles.prototype.createAndDrawShape = function (baseSelector, data) {
    var shape, base;
    var self = this;
    base = this.createShapeBase(baseSelector);
    d3.json('../../static/projects/js/project_deliberate/data_packed.json' ,function(error, data) {
      shape = self.drawShape(base, data);
    });
}

/* PACKED BUBBLES END */

var initData = {
    "diameter":1000,
    "format":d3.format(",d"),
    "color":d3.scale.category20c(),
    "chartClass":"test"
}

bubbles = new PackedBubbles(initData);
bubbles.createAndDrawShape("#svg-content")