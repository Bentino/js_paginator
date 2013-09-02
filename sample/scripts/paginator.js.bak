( function($) {
	
	$.fn.pagination = function( options ) {
		
		var settings = $.extend({}, $.fn.pagination.defaults, options );

		var pagination = 1;
		
		var items = null;
		var pages = null;
		
		var width = parseInt(settings.width);
		var height = parseInt(settings.height);
		var margin = parseInt(settings.margin);
		var row = parseInt(settings.row);
		var column = parseInt(settings.column);
		
		var page_width = (width + (margin * 2)) * column;
		var page_height = (height + (margin * 2)) * row;
		
		// Page html construction
		this.each(function(){ 

			$(this).css('display', 'block');
			$(this).css('min-height', page_height);
			
			if(settings.touch) {
				$(this).css('overflow-x', 'scroll');
				$(this).css('max-width', page_width + 30);
			} else {
				$(this).css('overflow', 'hidden');
				$(this).css('max-width', page_width);
			}
			
			if(settings.find) {
				items = $(this).find(settings.selector);
			}
			else {
				items = $(this).children(settings.selector);
			}
			
			pages = Math.ceil( ((items.length/settings.item)*10)/10 ); // Roundup page value
			

			// Creating page div element
			
			var counter = 0;
			var num = 1;
			var opendiv = false;
			
			var page_html = '';
			page_html += '<div class="viewport-container">';
			items.each(function(){
				if(counter%settings.item == 0) {

					if(num == 1) {
						page_html += '<div id="pagination-'+ pagination +'_no-'+ num +'" class="pagination-group pagination-' + pagination + ' no-'+ num +' current">';
						page_html += '<div class="views-row">';
						page_html += $(this).html();
						page_html += '</div>';
					} else {
						page_html += '</div>';
						page_html += '<div id="pagination-'+ pagination +'_no-'+ num +'" class="pagination-group pagination-' + pagination + ' no-'+ num +'">';
						page_html += '<div class="views-row">';
						page_html += $(this).html();
						page_html += '</div>';
					}
					num++;
				}
				else {
					page_html += '<div class="views-row">';
					page_html += $(this).html();
					page_html += '</div>';
				}
				counter++;
			});
			page_html += '</div>';
			
			$(this).html(page_html);
			
			
			// Creating page bullet
			if(!settings.touch) {
				if(settings.controller) {
					var html = '<div class="pagination"><ul><li class="prev controller"><button>prev</button></li>';
					for (var i=0; i < pages; i++) {
						if(i == 0) {
							html += '<li class="pager first"><button type="button" value="#pagination-'+ pagination +'_no-'+(i+1)+'">'+(i+1)+'</button></li>';
						} else if(i == pages-1) {
							html += '<li class="pager last"><button type="button" value="#pagination-'+ pagination +'_no-'+(i+1)+'">'+(i+1)+'</button></li>';
						} else {
							html += '<li class="pager"><button type="button" value="#pagination-'+ pagination +'_no-'+(i+1)+'">'+(i+1)+'</button></li>';
						}
					}
					html += '<li class="next controller"><button>next</button></li></ul></div>';
				}
				else {
					var html = '<div class="pagination"><ul>';
					for (var i=0; i < pages; i++) {
						if(i == 0) {
							html += '<li class="pager first"><button type="button" value="#pagination-'+ pagination +'_no-'+(i+1)+'">'+(i+1)+'</button></li>';
						} else if(i == pages-1) {
							html += '<li class="pager last"><button type="button" value="#pagination-'+ pagination +'_no-'+(i+1)+'">'+(i+1)+'</button></li>';
						} else {
							html += '<li class="pager"><button type="button" value="#pagination-'+ pagination +'_no-'+(i+1)+'">'+(i+1)+'</button></li>';
						}
					}
					html += '</ul></div>';	
				}
				
			}
			
			$(this).after(html);
			pagination++;
			
			// Assigned position
			var root = $(this).parent();
			var group = $(this).find('.pagination-group').css('position', 'relative');
			var items = $(this).find('.views-row');
			
			group.css('position', 'relative');
			group.css('display', 'block');
			group.css('width', $('.viewport-container').parent().width());
			
			items.css('width', '100%');
			items.css('height', 'auto');
			items.css('margin', settings.margin);
			items.css('float', 'left');
			items.css('overflow', 'hidden');
			
			// Set viewport width for horizontal scrolling
			if(settings.direction == 'horizontal') {
				group.css('float', 'left');
				$(this).find('.viewport-container').css('width', root.width() * pages);
			} else {
				group.css('width', page_width);
				$(this).find('.viewport-container').css('height', root.width() * pages);
			}
			
		}); // End page html construction
		
		// Default active state
		var pagination_element = $(this).parent().find('.pagination');
		var viewport_container_element = $(this).find('.viewport-container');
		
		pagination_element.find('ul li.pager:first').addClass('current');
		viewport_container_element.find('.pagination-group:first').addClass('current');
		
		// Event handling
		pagination_element.on('click', 'li.pager button', function() {
			switch (settings.direction) {
				case 'horizontal' :
					var id = $(this).attr('value');
			  		var selected = $(id);
					scrollAnimation( this, settings.direction, selected.width() );
					break;

				case 'vertical' :
					var id = $(this).attr('value');
			  		var selected = $(id);
					scrollAnimation( this, settings.direction, selected.height() );
					break;
			}
		});
		
		pagination_element.on('click', 'li.prev button', function() {
			switch (settings.direction) {
				case 'horizontal' :
					var current = $(this).parent().parent().find('.current');
					var id = current.find('button').attr('value');
					var selected = $(id);
					scrollByController( this, settings.direction, selected.width(), 'prev');
					break;

				case 'vertical' :
					var current = $(this).parent().parent().find('.current');
					var id = current.find('button').attr('value');
					var selected = $(id);
					scrollByController( this, settings.direction, selected.height(), 'prev');
					break;
			}
		});
		
		pagination_element.on('click', 'li.next button', function() {
			switch (settings.direction) {
				case 'horizontal' :
					var current = $(this).parent().parent().find('.current');
					var id = current.find('button').attr('value');
					var selected = $(id);
					scrollByController( this, settings.direction, selected.width(), 'next');
					break;

				case 'vertical' :
					var current = $(this).parent().parent().find('.current');
					var id = current.find('button').attr('value');
					var selected = $(id);
					scrollByController( this, settings.direction, selected.height(), 'next');
					break;
			}
		});
	};
	
	$.fn.pagination.defaults = {
		item: 1,
		width: '200px',
		height: '200px',
		row: 3,
		column: 3,
		margin: '5px',
		direction: 'vertical',
		selector: 'li',
		slideshow: false,
		showtime: 5000,
		controller: false,
		touch: false,
		find: false
	}
	
	function scrollAnimation(object, direction, length, control) {
	
		var id = $(object).attr('value');
  		var selected = $(id);
  		var before = selected.parent().children('.current');
  		
  		var group_name = selected.attr('class').match(/pagination-[0-9][0-9]*/).toString();
  		var group_items = $('.' + group_name);
  		
  		$(object).parent().parent().find('.current').removeClass('current');
  		$(object).parent().addClass('current');
  		
  		before.removeClass('current');
	  	selected.addClass('current');
	  	
	  	var offset = selected.attr('class').match(/no-[0-9]*/).toString().split('-').slice(-1);
	  	var scroll_length = length * (offset - 1);
	  	
	  	if(control == 'next') {
		  	scroll_length = length;
	  	} else if( control == 'prev') {
		  	scroll_length = -length;
	  	}
	  	
		switch (direction) {
			case 'horizontal': 
				group_items.animate({ left: -scroll_length }, 1000);
				break;
			case 'vertical': 
				group_items.animate({ top: -scroll_length }, 1000);
				break;
		}
	}
	
	function scrollByController(object, direction, length, control) {
	
		var current = $(object).parent().parent().find('.current');
		
		var id = current.find('button').attr('value');
		var selected = $(id);
				
		var group_name = selected.attr('class').match(/pagination-[0-9][0-9]*/).toString();
  		var group_items = $('.' + group_name);
		
		
		if(control == 'next') {
		
			var next = current.next();
			if(next.hasClass('pager')) {
			
				next.addClass('current');
				current.removeClass('current');
				
				var offset = next.find('button').attr('value').match(/no-[0-9]*/).toString().split('-').slice(-1);
				var scroll_length = length * (offset - 1);
				
				switch (direction) {
					case 'horizontal': 
						group_items.animate({ left: -scroll_length }, 1000);
						break;
					case 'vertical': 
						group_items.animate({ top: -scroll_length }, 1000);
						break;
				}
			}
		} else if(control == 'prev') {
		
			var prev = current.prev();
			if(prev.hasClass('pager')) {
			
				prev.addClass('current');
				current.removeClass('current');
				
				var offset = prev.find('button').attr('value').match(/no-[0-9]*/).toString().split('-').slice(-1);
				var scroll_length = length * (offset - 1);
				
				switch (direction) {
					case 'horizontal': 
						group_items.animate({ left: -scroll_length }, 1000);
						break;
					case 'vertical': 
						group_items.animate({ top: -scroll_length }, 1000);
						break;
				}
			}
		}
	}
	
}( jQuery ));