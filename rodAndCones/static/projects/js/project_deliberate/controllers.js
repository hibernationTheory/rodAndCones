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

App.directive('complementColor', function() {
  return {
    link:function($scope, element, attrs) {
      $scope.$evalAsync(function() {
        complementColor(element);
      })
    }
  }
});

App.directive('brightenColor', function() {
  return {
    link:function($scope, element, attrs) {
      $scope.$evalAsync(function() {
        brightenColor(element);
      })
    }
  }
});

App.directive('shortenText', function() {
  return {
    link:function($scope, element, attrs) {
      $scope.$evalAsync(function() {
        shortenText(element);
      })
    }
  }
});

App.controller('searchFilter', function($scope, $element) {
  var elementCategory = $element.data('item-category');
  console.log(elementCategory);
  this.category = elementCategory;
  $scope.showElement = showElement;
})

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

var showElement = function(query, selection, id) {
  var element = document.getElementById(id);
  var el_category = element.dataset.itemCategory;
  var el_name = element.dataset.itemName;
  var el_name = el_name.toLowerCase();

  var match_selection;
  var match_query;

  if (!query && !selection) {
    return true;
  }

  if (selection) {
    if (selection.toLowerCase().trim() === el_category.toLowerCase().trim()) {
      match_selection = true;
    } else {
      match_selection = false;
    }
  } else {
    match_selection = true;
  }

  if (query) {
    var query = query.toLowerCase();
    if (el_name.indexOf(query) !== -1) {
        match_query = true;
    } else {
      match_query = false;
    }
  } else {
    match_query = true;
  }

  if ( match_query && match_selection ) {
    return true;
  } else {
    return false;
  }
}

App.controller('itemContainer', function($scope, $element) {
  // not using this for now, it displays the child count not at the same things get hidden. 
  // (but one item later)
  var childrenCount = $element.get(0).childElementCount;

  $scope.$watch(function() {
    var children = $element.get(0).childNodes;
    var topicItems = 0;
    var hiddenItems = 0;

    for (var i = 0; i < children.length; i++) {
      var node = children[i];
      if (node.className && node.className.indexOf("topic-item") !== -1) {
        topicItems += 1;
        if (node.className.indexOf("ng-hide") !== -1 ) {
          hiddenItems += 1;
        }
      }
    }
    if (topicItems == hiddenItems) {
      console.log('allHidden');
    }
  });
});


var complementColor = function(element) {
  var el = element[0]
  var color = el.getAttribute('data-color');
  var complementery = tinycolor(color).complement().toHexString();
  el.style.backgroundColor = complementery;
}

var brightenColor = function(element) {
  var el = element[0]
  var color = el.getAttribute('data-color');

  var brightness = tinycolor(color).getBrightness();
  if (brightness <= 96) {
    var brightenAmount = 20;
  } else {
    var brightenAmount = 20;
  }

  var colors = tinycolor(color).brighten(brightenAmount).toHexString()
  el.style.backgroundColor = colors;
  changeColor(element);
}

var shortenText = function(element) {
  var el = element[0]
  var text = el.innerText;
  if (text) {
    var words = text.split(" ");
    var newText = words.splice(0, 30).join(" ");
    newText = newText + " [...]";
  } else {
    return null;
  }
  el.innerText = newText; 
}

function createChart(hostSelector, givenData) {
	/* this is working fine but needs to work in a way that it would clear the previous graph when updated */
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

