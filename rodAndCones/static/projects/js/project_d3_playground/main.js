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

document.getElementById('link-one').addEventListener('click', function () {
	hideAll();
	show(document.getElementById('one'));
}, false);

document.getElementById('link-two').addEventListener('click', function () {
	hideAll();
	show(document.getElementById('two'));
}, false);

document.getElementById('link-three').addEventListener('click', function () {
	hideAll();
	show(document.getElementById('three'));
}, false);

document.getElementById('link-four').addEventListener('click', function () {
	hideAll();
	show(document.getElementById('four'));
}, false);

document.getElementById('link-five').addEventListener('click', function () {
	hideAll();
	show(document.getElementById('five'));
}, false);

show(document.getElementById('one'));


// TABS

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
});

// D3 examples

// First Create the Host SVG

function createSvgEl(parentSelector, width, height) {
	var svg = d3.select(parentSelector)
	.append("svg")
	.attr("width", width)
	.height("height", height);

	var svgData = {}
	svgData["width"] = width;
	svgData["height"] = height;
	svgData["svg"] = svg;

	return svgData;
}