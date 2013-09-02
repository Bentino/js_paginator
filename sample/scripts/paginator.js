+function ($) {
	
	var pages;
	var page_id = 1;
	
	var pagination = {
	
		object: null,
		settings: null,
		defaults: {
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
		},
		
		init: function(query_object, options) {
			var that = this;
			
			that.object = query_object;
			that.settings = options;
			
			var page_canvas = that.build();
			
			var active_page = page_canvas.find('.page-container ul > .page-element').first().addClass('active');
			var active_indicator = page_canvas.find('.page-indicator ul > .page-no').first().addClass('active');
			
			var next_page = active_page.next();
			var prev_page = active_page.prev();
			
			var next_indicator = active_indicator.next();
			var prev_indicator = active_indicator.prev();
			
/*
			next_page.toggleClass('next');
			prev_page.toggleClass('prev');
*/
				
			page_canvas.find('.page-indicator .left').click( function() {
				that.prev(page_canvas);
			});
			
			
			page_canvas.find('.page-indicator .right').click( function() {
				that.next(page_canvas);
			});
			
			page_canvas.find('.page-indicator .page-no').click(function(){
				console.log('number');
			});
			
			return page_canvas;
		},
		
		build: function() {
			var items = this.object.children(this.settings.selector);
			var pages = Math.ceil( ((items.length/this.settings.item)*10)/10 ); // Roundup page value
			var settings = this.settings;
			
			var canvas = $('<div />').addClass('page-canvas');
			canvas.attr('id', 'page-canvas-'+page_id);
			page_id++;
			
			var container = $('<div />').addClass('page-container');
			var indicator = $('<div />').addClass('page-indicator');
			
			canvas.append(container);
			canvas.append(indicator);
			
			canvas.find('.page-container').append($('<ul />'));
			canvas.find('.page-indicator').append($('<ul />').addClass('pagination'));
			
			if(this.settings.controller) {
				var prev = $('<li class="page-button page-control left"><a href="#" onclick="return false;">« prev</a></li>');
				canvas.find('.page-indicator .pagination').append(prev);
			}
			
			var count = 0;
			var page = 0;
			
			items.each(function(){
			
				if(count % settings.item == 0) {
				
					page++;
					
					var page_element = $('<li />').addClass('page-element page-element-'+ page).append(this);
					var page_button = $('<li class="page-button page-no page-no-'+ page +'"><a href="#" onclick="return false;">'+ page +'</a></li>');
					
					canvas.find('.page-container ul').append(page_element);
					canvas.find('.page-indicator .pagination').append(page_button);
					
				} else {
					canvas.find('li.page-element-'+page).append(this);
				}
				count++;
			});
			
			if(settings.controller) {
				var next = $('<li class="page-button page-control right"><a href="#" onclick="return false;">next »</a></li>');
				canvas.find('.page-indicator .pagination').append(next);
			}

			return canvas;
		},
		
		to: function(page) {
			
		},
		
		next: function(c) {
		
			var canvas = c;

			active = canvas.find('.page-container .active');
			next = active.next();
			next.toggleClass('next');
			prev = active.prev();
			
			if(next.length) {
				
				active.toggleClass('left');
				next.toggleClass('left');
					
/*
				active.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
				function(e) {
					active.toggleClass('active left');
					next.toggleClass('active next left');
				});
*/
			}
		},
		
		prev: function(c) {
		
			var canvas = c;

			active = canvas.find('.page-container .active');
			prev = active.prev();
			
			if(prev.length) {
			
				active.toggleClass('right');
				prev.toggleClass('right');
					
/*
				active.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
				function(e) {
					active.toggleClass('active right');
					prev.toggleClass('active right');
				});
*/
			}
		},
		
		pause: function() {
			
		}
		
	}
		
	// ---- Main function ----
	$.fn.pagination = function(options)
	{
		return this.each(function(){
			
			var settings = {};
			var data = $(this).data('js.paginator');
			
			$.extend(settings, pagination.defaults, options);
			
			if(!data) {
			
				var object = $(this).clone();	
				var paginator = pagination.init(object, settings);
				
				$(this).hide();
				$(this).parent().append(paginator);
				
				$(this).data('js.paginator', paginator);
			}

		});
	};
	// ---- End Main Function ----
	
}(window.jQuery)