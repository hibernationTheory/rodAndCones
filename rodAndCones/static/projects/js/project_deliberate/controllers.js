var App = angular.module('App');

App.controller('TopicListCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('../static/projects/js/project_deliberate/topic_data/all_data.json').success(function(data) {
		$scope.topics = data;
		$scope.createChart = createChart
	});
}]);

function createChart(hostSelector, givenData) {
	console.log(hostSelector, givenData)
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
}

