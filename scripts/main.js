(function($, window, document) {
	
	$(function() {
		$('#after .content').pagination({
			item: 1,
		  	width: '960px',
		  	height: '200px',
		  	margin: '10px',
		  	row: 1,
		  	column: 1,
		  	selector: 'section',
		  	direction: 'horizontal'
		});
	});
	
}(window.jQuery, window, document));