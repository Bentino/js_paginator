(function($, window, document) {
	
	$(function() {
/*
		$('#after .content').pagination({
			item: 2,
		  	width: '960px',
		  	height: '200px',
		  	margin: '10px',
		  	row: 1,
		  	column: 1,
		  	selector: 'section',
		  	controller: true,
		  	direction: 'horizontal'
		});
*/
		$('#after .content').paginator({
			item: 2,
		  	selector: 'section',
		  	autoslide: 5000,
		  	controller: true,
		});
		
	});
	
}(window.jQuery, window, document));