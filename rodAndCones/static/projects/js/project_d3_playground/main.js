// THINGS TO DO : 
// Need to style notes section properly.
// Make the svg the size of the tab window, right now it is causing it to extend.

var desktops = document.querySelectorAll('.desktop');

function hide(element) {
	element.style.setProperty('left', '-100%', element.style.getPropertyPriority('left'));
}

function hideAll() {
	for (var i = 0; i < desktops.length; i++) {
		hide(desktops[i]);
	}
}

function show(element) {
	element.style.setProperty('left', '0', element.style.getPropertyPriority('left'));
}

function installLinkEvents(linkSelector, linkIdBaseName, desktopBaseName) {
	// mix of jquery and js, make it one or the other
	linkIdBaseNameLen = linkIdBaseName.length;
	$(linkSelector).each(function() {
		// derive name
		var id = $(this).attr("id");
		var suffix = id.slice(linkIdBaseNameLen+1,id.length);
		var desktopName = desktopBaseName + "-" + suffix;
		this.addEventListener('click', function () {
			hideAll();
			show(document.getElementById(desktopName));
		}, false);
	})
}

installLinkEvents(".desktop-link", "link", "desktop");



// D3 examples

// D3 Generic Functions //

function createSvgEl(parentSelector, width, height, idNum) {
	var svg = d3.select(parentSelector)
	.append("svg")
	.attr({
		"width": width,
		"height": height,
		"id": "svg-" + idNum
	});

	var svgData = {}
	svgData["width"] = width;
	svgData["height"] = height;
	svgData["svg"] = svg;

	return svgData;
}

function createRandomDataset(amount) {
	var dataset = [];
	for (var i = 0; i < amount; i++) {
		var num = Math.random();
		dataset.push(num);
	}
	return dataset;
}

function setScaleData(dataset, svgData) {
	var domainX = [0, dataset.length];
	var domainY = [0, d3.max(dataset)];

	var width = svgData["width"];
	var height = svgData["height"];

	var scaleX = d3.scale.linear().domain(domainX).range([0, width]);
	var scaleY = d3.scale.linear().domain(domainY).range([height, 0]);
	var scaleSize = d3.scale.linear().domain(domainY).range([0, height]);
	var scaleColor = d3.scale.linear().domain(domainY).range([0, 255]);

	var scale = {}
	scale["scaleX"] = scaleX;
	scale["scaleY"] = scaleY;
	scale["scaleSize"] = scaleSize;
	scale["scaleColor"] = scaleColor;

	return scale;
}

function enterDataElements(svgData, visEl, dataset, scaleData) {
	var svg = svgData["svg"];

	var dataElements = svg.selectAll(visEl)
	.data(dataset)
	.enter()
	.append(visEl)
	.attr({
		"x":function(d,i) {
			return scaleData["scaleX"](i);
			},
		"y":function(d,i) {
			return scaleData["scaleY"](d);
			},
		"width": svgData["width"] / dataset.length,
		"height": function(d, i) { return scaleData["scaleSize"](d)},
		"fill": function(d,i) {return "rgb(0,0," + Math.floor(scaleData["scaleColor"](d)) + ")"}
	});

	return dataElements;
};

// D3 Generic Functions END //

function createDataVis(selector, id) {
	var svgData = createSvgEl(selector, "800", "300", id);
	var dataset = createRandomDataset(50);
	var scaleData = setScaleData(dataset, svgData);
	var dataElements = enterDataElements(svgData, "rect", dataset, scaleData);
}

var D3_FUNCTIONS = [createDataVis, createDataVis];

// TAB MENU RELATED //

$(document).ready(function() {
	$('.tabs li').click(function(){               //on tab click
		if ($(this).hasClass('selected')===false) { //if tab is not selected
			$('.tabs li').removeClass('selected');    //remove class 'selected'
			$(this).addClass('selected');             //mark selected tab
		}
		var tabSelection = $(this).attr('id');    //determine tab relation
		$('.content').fadeOut('fast', function(){ //fade out content
			$('div .page').css('display','none');   //hide all content
			$('.'+tabSelection).css('display',"");  //display selected tab
			$('.content').fadeIn('slow');           //fade the content in slowly
		});
	});


	$(".desktop-link").each(function(i) {
		console.log(i);
		var currentFunction = D3_FUNCTIONS[i];
		var strIndex = (i+1).toString();
		currentFunction("#vis-" + strIndex, strIndex);
	});

// TAB MENU RELATED END //

});