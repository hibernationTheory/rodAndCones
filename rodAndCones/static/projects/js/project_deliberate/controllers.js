var App = angular.module('App');

App.directive('changeColor', function() {
  return {
    link:function($scope, element, attrs) {
      $scope.$evalAsync(function() {
        changeColor(element);
      })
    }
  }
});

App.directive('setTetrad', function() {
  return {
    link:function($scope, element, attrs) {
      $scope.$evalAsync(function() {
        setTetrad(element);
      })
    }
  }
});

var changeColor = function(element) {
  var el = element[0]
  var color = el.style.backgroundColor;
  var brightness = tinycolor(color).getBrightness();
  if (brightness <= 96) {
    el.style.color = "#ddd";
  } else {
    el.style.color = "#404040"
  }
};

var setTetrad = function(element) {
  var el = element[0]
  var color = el.getAttribute('data-color');
  var colors = tinycolor(color).tetrad();
  var complementery = complement(color).toHexString()
  //var tetrad = colors.map(function(t) { return t.toHexString(); });
  el.style.backgroundColor = complementery;
}

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function createChart(hostSelector, givenData) {
	/* this is working fine but needs to work in a way that it would clear the previous graph when updated */
	console.log(hostSelector, givenData)
	/*
	var w = 150;
	var h = 150;
	console.log(w, h);
    var canvas = d3.select(hostSelector).append("svg")
                    .attr('width', w)
                    .attr('height', h);
    var data =[givenData, 10-givenData];
    var radius =w/2;
    console.log(radius);
    var color =  d3.scale.ordinal()
        .range(["orange", "lightgray"]);

    var group = canvas.append("g")
         .attr('transform', 'translate(' + radius + ',' + radius+ ')');

    var arc =d3.svg.arc()
            .innerRadius(radius-100)
            .outerRadius(radius);

    var pie = d3.layout.pie()
        .value(function(d){  return d; })

     var arcs = group.selectAll(".arc")
          .data(pie(data))
          .enter()
          .append("g")
          .attr('class', 'arc')

    arcs.append("path")
        .attr('d', arc)
        .attr('fill', function(d){ return color(d.data);})
    */
}

