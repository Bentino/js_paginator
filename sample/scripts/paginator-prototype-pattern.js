+function ($) {
	
	var page_id = 1; // Global variable for pagination Id

	var Paginator = function (element, options) {
		this.element 			= $(element);
		this.canvas				= null;
		this.items				= null;
		this.page_active		= null;
		this.page_next			= null;
		this.page_prev			= null;
		this.indicator_active 	= null;
		this.indicator_next 	= null;
		this.indicator_prev 	= null;
		this.settings    		= options;
		
		this.items = this.element.children(this.settings.selector); 	// Get list items
		this.canvas = this.build();										// Build pagination element
		this.element.parent().append(this.canvas);						// Add to document
		
		this.page_active = this.canvas.find('.page-container ul > .page-element').first().addClass('active');
		this.indicator_active = this.canvas.find('.page-indicator ul > .page-no').first().addClass('active');
		this.page_next = this.canvas.find('.page-container ul > .active').next();
		this.page_prev = this.canvas.find('.page-container ul > .active').prev();

		this.binding();
		
		if(this.settings.autoslide) {
			var that = this;
			window.setInterval( function(){ 
				if(that.page_active.hasClass('last')) {
					that.canvas.find('.page-indicator .page-no.first a').trigger('click');
				} else {
					that.canvas.find('.page-indicator .active').next().find('a').trigger('click');
				}
			}, that.settings.autoslide);
		}
	}
	
	// Binding event handler for next, prev, page button
	Paginator.prototype.binding = function() {
	
		var that = this;
		var next_button = that.canvas.find('.page-indicator .right');
		var prev_button = that.canvas.find('.page-indicator .left');
		var page_button = that.canvas.find('.page-indicator .page-no');
		
		next_button.click(function(e){
			that.next_page(e.target);
		});
		
		prev_button.click(function(e){
			that.prev_page(e.target);
		});
		
		page_button.click(function(e){
			that.to_page(e.target);
		});
	}
	
	// Next item behavior
	Paginator.prototype.next_page = function(event_item) {
	
		var that = this;
		
		that.page_active = that.canvas.find('.page-container .active');
		that.page_next = that.page_active.next();
		that.page_next.toggleClass('next');
		
		that.indicator_active = that.canvas.find('.page-indicator .active');
		that.indicator_next = that.indicator_active.next('.page-no');
		
		if(that.page_next.length) {
		
			window.setTimeout( function() {
				that.page_active.toggleClass('left');
				that.page_next.toggleClass('left');
			}, 100);
			
			that.page_active.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
			function(e) {
				that.page_active.toggleClass('active left');
				that.page_next.toggleClass('active next left');
				
				that.indicator_active.toggleClass('active');
				that.indicator_next.toggleClass('active');
				
				// Update pointer
				that.page_active = that.canvas.find('.page-container .active');
				that.page_next = that.canvas.find('.page-container .active').next();
				that.page_prev = that.canvas.find('.page-container .active').prev();
				that.indicator_active = that.canvas.find('.page-indicator .active');
				that.indicator_next = that.indicator_active.next('.page-no');
				that.indicator_prev = that.indicator_active.prev('.page-no');
			});
		}
	}
	
	// Previous item behavior
	Paginator.prototype.prev_page = function(event_item) {
	
		var that = this;
		
		that.page_active = that.canvas.find('.page-container .active');
		that.page_prev = that.page_active.prev();
		that.page_prev.toggleClass('prev');
		
		that.indicator_active = that.canvas.find('.page-indicator .active');
		that.indicator_prev = that.indicator_active.prev('.page-no');
		
		if(that.page_prev.length) {
		
			window.setTimeout( function() {
				that.page_active.toggleClass('right');
				that.page_prev.toggleClass('right');
			}, 100);
			
			that.page_active.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
			function(e) {
			
				that.page_active.toggleClass('active right');
				that.page_prev.toggleClass('active prev right');
				
				that.indicator_active.toggleClass('active');
				that.indicator_prev.toggleClass('active');
				
				// Update pointer
				that.page_active = that.canvas.find('.page-container .active');
				that.page_next = that.canvas.find('.page-container .active').next();
				that.page_prev = that.canvas.find('.page-container .active').prev();
				that.indicator_active = that.canvas.find('.page-indicator .active');
				that.indicator_next = that.indicator_active.next('.page-no');
				that.indicator_prev = that.indicator_active.prev('.page-no');
			});
		}
	}
	
	Paginator.prototype.to_page = function(event_item) {
	
		var that = this;
		var pages = that.canvas.find('.page-container .page-element');
		var indicators = that.canvas.find('.page-indicator .page-no');
		
		that.page_active = that.canvas.find('.page-container .active'); 			// Get active page 
		that.indicator_active = that.canvas.find('.page-indicator .active');		// Get active indicator
		
		// Get selected ID from selected indicator
		var selected_name = $(event_item).parent().attr('class').match(/page-no-[0-9]*/)[0];
		var selected_id = selected_name.split('-').pop();
		
		// Get active ID from current active page
		var active_name = that.page_active.attr('class').match(/page-element-[0-9]*/)[0];
		var active_id = active_name.split('-').pop();
		
		if (active_id < selected_id) {
			that.page_next = pages.eq(selected_id-1);
			that.page_next.toggleClass('next');
			
			that.indicator_next = indicators.eq(selected_id-1);
			
			window.setTimeout( function() {
				that.page_active.toggleClass('left');
				that.page_next.toggleClass('left');
			}, 100);
			
			that.page_active.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
			function(e) {
			
				that.page_active.toggleClass('active left');
				that.page_next.toggleClass('active next left');
				
				that.indicator_active.toggleClass('active');
				that.indicator_next.toggleClass('active');
				
				// Update pointer
				that.page_active = that.canvas.find('.page-container .active');
				that.page_next = that.canvas.find('.page-container .active').next();
				that.page_prev = that.canvas.find('.page-container .active').prev();
				that.indicator_active = that.canvas.find('.page-indicator .active');
				that.indicator_next = that.indicator_active.next('.page-no');
				that.indicator_prev = that.indicator_active.prev('.page-no');
			});
			
		} else if(active_id > selected_id) {
			that.page_prev = pages.eq(selected_id-1);
			that.page_prev.toggleClass('prev');
			
			that.indicator_prev = indicators.eq(selected_id-1);
			
			window.setTimeout( function() {
				that.page_active.toggleClass('right');
				that.page_prev.toggleClass('right');
			}, 100);
			
			that.page_active.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
			function(e) {
			
				that.page_active.toggleClass('active right');
				that.page_prev.toggleClass('active prev right');
				
				that.indicator_active.toggleClass('active');
				that.indicator_prev.toggleClass('active');
				
				// Update pointer
				that.page_active = that.canvas.find('.page-container .active');
				that.page_next = that.canvas.find('.page-container .active').next();
				that.page_prev = that.canvas.find('.page-container .active').prev();
				that.indicator_active = that.canvas.find('.page-indicator .active');
				that.indicator_next = that.indicator_active.next('.page-no');
				that.indicator_prev = that.indicator_active.prev('.page-no');
			});
			
		}
		
	}
	
	// Construct HTML element
	Paginator.prototype.build = function() {
		
		var pages = Math.ceil( ((this.items.length/this.settings.item)*10)/10 ); // Roundup page value
		
		this.canvas = $('<div />').addClass('page-canvas');
		this.canvas.attr('id', 'page-canvas-'+page_id);
		page_id++;
		
		var container = $('<div />').addClass('page-container');
		var indicator = $('<div />').addClass('page-indicator');
		
		this.canvas.append(container);
		this.canvas.append(indicator);
		
		this.canvas.find('.page-container').append($('<ul />'));
		this.canvas.find('.page-indicator').append($('<ul />').addClass('pagination'));
		
		if(this.settings.controller) {
			var prev = $('<li class="page-button page-control left"><a href="#" onclick="return false;">« prev</a></li>');
			this.canvas.find('.page-indicator .pagination').append(prev);
		}
		
		var count = 0;
		var page = 0;
		var that = this;
		this.items.each(function(){
		
			if(count % that.settings.item == 0) {
			
				page++;
				
				var page_element = $('<li />').addClass('page-element page-element-'+ page).append(this);
				var page_button = $('<li class="page-button page-no page-no-'+ page +'"><a href="#" onclick="return false;">'+ page +'</a></li>');

				if(page == 1) {
					page_element.addClass('first');
					page_button.addClass('first');
				}
				else if(page == pages) {
					page_element.addClass('last');
					page_button.addClass('last');
				}
				
				that.canvas.find('.page-container ul').append(page_element);
				that.canvas.find('.page-indicator .pagination').append(page_button);
				
			} else {
				that.canvas.find('li.page-element-'+page).append(this);
			}
			count++;
		});
		
		if(this.settings.controller) {
			var next = $('<li class="page-button page-control right"><a href="#" onclick="return false;">next »</a></li>');
			this.canvas.find('.page-indicator .pagination').append(next);
		}

		return this.canvas;
	}
	
	// Default settings
	Paginator.DEFAULTS = {
        item: 1,
		direction: 'vertical',
		selector: 'li',
		autoslide: false,
		navigator: true,
		touch: false,
    }
    
    // Main function
    var old = $.fn.pagination;

	$.fn.paginator = function (option) {
	
		return this.each(function () {

			var $this   = $(this);
			var data    = $this.data('js.paginator');
			var options = $.extend({}, Paginator.DEFAULTS, $this.data(), typeof option == 'object' && option);
			
			if (!data) {
				$this.data(
					'js.paginator', (data = new Paginator($this, options))
				);
			}
			
		})
	}
	
	$.fn.paginator.Constructor = Paginator;
	
}(window.jQuery)