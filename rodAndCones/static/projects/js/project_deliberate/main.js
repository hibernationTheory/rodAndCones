var init = function() {

/* FADE IN IMAGE AFTER LOAD*/


/* SCROLL MAGIC STUFF */

// init controller
var controller_parallax = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
var controller = new ScrollMagic.Controller();

// build scenes
new ScrollMagic.Scene({triggerElement: "#parallax-01"})
        .setTween("#parallax-01 > div", {y: "80%", ease: Linear.easeNone})
        //.addIndicators()
        .addTo(controller_parallax);

var scene = new ScrollMagic.Scene({
                            triggerElement: "#main-body", duration:500
                        })
                        .setTween("#parallax-01", {opacity: "0.1"}) // trigger a TweenMax.to tween
                        .addTo(controller);

var $topicCharts = $(".topic-chart");
var chartsLength = $topicCharts.length;
var triggerEl;
for (var i = 1; i <= chartsLength; i++) {
    var currentTopic = "#" + "topic-chart-" + i;
    triggerEl = currentTopic;
    var topicChartAnim = new ScrollMagic.Scene({triggerElement:triggerEl, duration:300})
                            .setTween(currentTopic, {opacity:"1"})
                            .addTo(controller)};

/* SCROLL MAGIC STUFF END */

function scroolToTop(target, duration, ratio) {
    if (duration == undefined) {
        duration = 1000;
    }

    if (ratio == undefined) {
        ratio = 1;
    }
    $('html,body').animate({
      scrollTop: target.offset().top / ratio
    }, duration);
    return false;
}

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        scroolToTop(target);
      }
    }
  });
});

/* SEARCH FORM FOCUS */

$("#search-form").on("focus", function() {
    var target = $(this);
    scroolToTop(target, 800, 1);
})

/* ZOOM BUBBLES */

var ZoomBubbles = function(initData) {
    this.width = initData.width;
    this.height = initData.height;
    this.diameter = initData.diameter || d3.min([window.innerWidth, window.innerHeight]);
    this.margin = initData.margin || 0;
    this.padding = initData.padding || 0;
    this.color = initData.color || d3.scale.category10();
    this.format = initData.format || d3.format(",d");
    this.chartClass = initData.chartClass || "temp-class"; 
    }

ZoomBubbles.prototype.createShapeBase = function(baseSelector) {
    var width = this.width;
    var height = this.height;
    var chartClass = this.chartClass;

    var svg = d3.select(baseSelector).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", chartClass)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
    return svg;
}

ZoomBubbles.prototype.drawShape = function(base, data) {
    var margin = this.margin;
    var diameter = this.diameter;
    var self = this;

    var pack = d3.layout.pack()
        .padding(2)
        .size([diameter - margin, diameter - margin])
        .value(function(d) { return d.size; })

    var focus = data,
        nodes = pack.nodes(data),
        view;

    var shape = base.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .style("fill", function(d) { 
            return d.children ? null : d.color; 
        })
        //.attr("stroke", function(d) {
        //    return d3.rgb(d.color).darker();  
        //})
        .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

    var text = base.selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .style("fill-opacity", function(d) { return d.parent === data ? 1 : 0; })
        .style("display", function(d) { return d.parent === data ? null : "none"; })
        .text(function(d) { return d.name; });

    var node = base.selectAll("circle,text");

    d3.select("body")
        .on("click", function() { zoom(data); });

    zoomTo([data.x, data.y, data.r * 2 + margin]);

    function zoom(d) {
      var focus0 = focus; focus = d;

      var transition = d3.transition()
          .duration(d3.event.altKey ? 7500 : 750)
          .tween("zoom", function(d) {
            var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
            return function(t) { zoomTo(i(t)); };
          });

      transition.selectAll("text")
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
          .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
          .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
          .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    function zoomTo(v) {
      var k = diameter / v[2]; view = v;
      node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      shape.attr("r", function(d) { return d.r * k; });
    }
}

ZoomBubbles.prototype.createAndDrawShape = function (baseSelector, data) {
    var shape, base;
    var self = this;
    base = this.createShapeBase(baseSelector);
    d3.json('../../static/projects/js/project_deliberate/data_packed.json' ,function(error, data) {
      shape = self.drawShape(base, data);
    });
}

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(51,91%,62%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var initData = {
    "width":1700,
    "height":1500,
    "diameter":700,
    "format":d3.format(",d"),
    "color": d3.scale.category20(),
    "chartClass":"test"
}

var svgSelector = "#svg-content"
var svgContent = $(svgSelector);
if (svgContent.length) {
  zoomBubbles = new ZoomBubbles(initData);
  zoomBubbles.createAndDrawShape(svgSelector)  
}

}

document.ready = init();


