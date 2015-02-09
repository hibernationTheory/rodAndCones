var $container = $('#container');
$container.imagesLoaded(function() {
	// initialize
	$container.masonry({
		columnWidth: 60,
		itemSelector: '.item'
	});
});

// masonry related info from : http://designshack.net/
// http://masonry.desandro.com/