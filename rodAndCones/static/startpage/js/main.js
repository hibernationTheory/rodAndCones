var $container = $('#container');
var $parent = $container.parent()
var innerWidth = $parent.innerWidth();
console.log(innerWidth);
// initialize
$container.masonry({
	columnWidth: innerWidth,
	itemSelector: '.item'
});

var msnry = $container.data('masonry');