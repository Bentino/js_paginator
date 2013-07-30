( function($) {
	$.fn.pagination = function( options ) {
		
		var settings = $.extend({
			item: 1,
			width: '200px',
			height: '200px',
			row: 3,
			column: 3,
			margin: '5px',
			direction: 'vertical',
			selector: 'li',
			touch: false,
			find: false
		}, options );
		
		// Page html construction
		
		var pagination = 1;
		
		this.each(function(){
		
			var items = null;
			var pages = null;
			
			var width = parseInt(settings.width);
			var height = parseInt(settings.height);
			var margin = parseInt(settings.margin);
			var row = parseInt(settings.row);
			var column = parseInt(settings.column);
			
			var page_width = (width + (margin * 2)) * column;
			var page_height = (height + (margin * 2)) * row;

			$(this).css('display', 'block');
			$(this).css('height', page_height);
			
			if(settings.touch) {
				$(this).css('overflow-x', 'scroll');
				$(this).css('width', page_width + 30);
			} else {
				$(this).css('overflow', 'hidden');
				$(this).css('width', page_width);
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
				var html = '<div class="pagination"><ul>';
				for (var i=0; i < pages; i++) {
					html += '<li><button type="button" value="#pagination-'+ pagination +'_no-'+(i+1)+'">'+(i+1)+'</button></li>';
				}
				
				html += '</ul></div>';
			}
			
			$(this).after(html);
			pagination++;
			
			// Assigned position
			var group = $(this).find('.pagination-group').css('position', 'relative');
			var items = $(this).find('.views-row');
			
			group.css('position', 'relative');
			group.css('display', 'block')
			group.css('width', page_width);
			
			items.css('width', settings.width);
			items.css('height', settings.height);
			items.css('margin', settings.margin);
			items.css('float', 'left');
			items.css('overflow', 'hidden');
			
			// Set viewport width for horizontal scrolling
			if(settings.direction == 'horizontal') {
				group.css('float', 'left');
				$(this).find('.viewport-container').css('width', page_width * pages);
			} else {
				group.css('width', page_width);
			}
			
		}); // End page html construction
		
		// Default active state
		$('.pagination').each(function(){
			$(this).find('ul li:first').addClass('current');
		});
		$('viewport-container').each(function(){
			$(this).find('.pagination-group:first').addClass('current');
		});
		
		// Event handler
		var paginations = $('.pagination');
		
		if(settings.direction == 'horizontal') {
			paginations.on('click', 'li button', function() {
		  		
		  		var id = $(this).attr('value');
		  		var selected = $(id);
		  		var before = selected.parent().children('.current');
		  		
		  		var group_name = selected.attr('class').match(/pagination-[0-9][0-9]*/).toString();
		  		var group_items = $('.' + group_name);
		  		
		  		$(this).parent().parent().find('.current').removeClass('current');
		  		$(this).parent().addClass('current');
		  		
		  		before.removeClass('current');
			  	selected.addClass('current');
			  	
			  	var offset = selected.attr('class').match(/no-[0-9]*/).toString().split('-').slice(-1);
			  	var scroll_width = group_items.width() * (offset - 1);

			  	group_items.animate({ left: -scroll_width }, 1000);
			  	
		  	});	
		}
		else if(settings.direction == 'vertical') {
			paginations.on('click', 'li button', function() {
		  		
		  		var id = $(this).attr('value');
		  		var selected = $(id);
		  		var before = selected.parent().children('.current');
		  		
		  		var group_name = selected.attr('class').match(/pagination-[0-9][0-9]*/).toString();
		  		var group_items = $('.' + group_name);
		  		
		  		$(this).parent().parent().find('.current').removeClass('current');
		  		$(this).parent().addClass('current');
		  		
		  		before.removeClass('current');
			  	selected.addClass('current');
			  	
			  	var offset = selected.attr('class').match(/no-[0-9]*/).toString().split('-').slice(-1);
			  	var scroll_height = group_items.height() * (offset - 1);
			  	
			  	group_items.animate({ top: -scroll_height }, 1000);
			  	
		  	});	
		}

	  	return this;
	};
}( jQuery ));