+function ($) {
	
	var page_id = 1; // Global variable for pagination Id

	var Paginator = function (element, options) {
		this.element 			= element;
		this.canvas				= null;
		this.items				= null;
		this.pages				= null;
		this.current_page		= null;
		this.current_indicator	= null;
		this.selected_page		= null;
		this.selected_indicator = null;
		this.is_moving			= false;
		this.timer				= null;
		this.settings    		= options;
		
		this.items = this.element.children(this.settings.selector); 	// Get list items
		this.canvas = this.build();										// Build pagination element
		this.element.parent().append(this.canvas);						// Add to document
		this.element.hide();
		
		this.pages = this.canvas.find('.page-element');
		this.current_page = this.canvas.find('.page-container ul > .page-element').first().addClass('active');
		this.current_indicator = this.canvas.find('.page-indicator ul > .page-no').first().addClass('active');

		this.binding();
		
		if(this.settings.autoslide) {
			var that = this;
			that.timer = window.setInterval( function(){ that.autoslide(); }, that.settings.autoslide);
		}
		this.adjust_height();
	}
	
	Paginator.prototype.autoslide = function() {
		if( this.current_page.hasClass('last') ) {
			this.to_page(this.current_page, this.canvas.find('.first'), 'right');
		} else {
			this.next_page();
		}
	}
	
	// Binding event handler for next, prev, page button
	Paginator.prototype.binding = function() {
	
		var that = this;
		var next_button = that.canvas.find('.page-indicator .right');
		var prev_button = that.canvas.find('.page-indicator .left');
		var page_button = that.canvas.find('.page-indicator .page-no');
		
		if(that.settings.autoslide && that.settings.pauseonhover) {
			that.canvas.mouseenter(function(e){
				clearInterval(that.timer);
			});
			that.canvas.mouseleave(function(e){
				that.timer = window.setInterval( function(){ that.autoslide() }, that.settings.autoslide);
			});
		}
		
		next_button.click(function(e){
			that.next_page();
		});
		
		prev_button.click(function(e){
			that.prev_page();
		});
		
		page_button.click(function(e){
			
			// Get Page Canvas ID
			var canvas_id = $(e.target).parent().parent().parent().parent().attr('id');
			
			// Get selected ID from selected indicator
			var selected_name = $(e.target).parent().attr('class').match(/page-no-[0-9]*/)[0];
			var selected_id = selected_name.split('-').pop();
			
			if(!that.is_moving) {
				that.selected_page = $('#'+canvas_id+' .page-element-'+selected_id);
			}
			// Get active ID from current active page
			var current_name = that.current_page.attr('class').match(/page-element-[0-9]*/)[0];
			var current_id = current_name.split('-').pop();
			
			if (current_id < selected_id) { 
				that.to_page(that.current_page, that.selected_page,'left');
			} else if(current_id > selected_id) { 
				that.to_page(that.current_page, that.selected_page,'right');
			}

		});
		
		$(window).resize(function(){
			that.adjust_height();
		});
		
		
		that.pages.on('webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend', function(e) {
			e.stopPropagation();

			if(that.selected_page) {

				that.is_moving = false;
				
				that.current_page.removeClass('active');
				that.current_page.removeClass('left');
				that.current_page.removeClass('right');
					
				that.selected_page.addClass('active');
				that.selected_page.removeClass('next');
				that.selected_page.removeClass('prev');
				that.selected_page.removeClass('left');
				that.selected_page.removeClass('right');
								
				that.current_indicator.removeClass('active');
				that.selected_indicator.addClass('active');
				
				that.current_page = that.selected_page;
				that.selected_page = null;
				
				that.current_indicator = that.selected_indicator;
				that.selected_indicator = null;
				
			}

		});
	}
	
	Paginator.prototype.to_page = function(from, to, direction) {
		var that = this;
		if(!that.is_moving) {
			var canvas_id = that.canvas.attr('id');
			
			that.current_page = from;
			that.selected_page = to;
			
			
			var current_name = that.current_page.attr('class').match(/page-element-[0-9]*/)[0];
			var current_id = current_name.split('-').pop();
			that.current_indicator = $('#' + canvas_id + ' .page-no-' + current_id);
			
			var selected_name = that.selected_page.attr('class').match(/page-element-[0-9]*/)[0];
			var selected_id = selected_name.split('-').pop();
			that.selected_indicator = $('#' + canvas_id + ' .page-no-' + selected_id);
			
			if(direction == 'left') {
				that.selected_page.addClass('next');
				window.setTimeout( function() {
					that.is_moving = true;
					that.current_page.addClass('left');
					that.selected_page.addClass('left');
				}, 100);
				
			} else if (direction == 'right') {
				that.selected_page.addClass('prev');
				window.setTimeout( function() {
					that.is_moving = true;
					that.current_page.addClass('right');
					that.selected_page.addClass('right');
				}, 100);
			}

		}
	}
	
	// Next item behavior
	Paginator.prototype.next_page = function() {
	
		if(!this.is_moving) {
			if(this.current_page.next('.page-element').length) {
			
				var next_page = this.current_page.next('.page-element');
				var next_indicator = this.current_indicator.next('.page-no');

				this.to_page(this.current_page, next_page, 'left');
			}
		}
	}
	
	// Previous item behavior
	Paginator.prototype.prev_page = function() {
	
		if(!this.is_moving) {
			if(this.current_page.prev('.page-element').length) {
			
				var prev_page = this.current_page.prev('.page-element');				
				var next_indicator = this.current_indicator.prev('.page-no');
				
				this.to_page(this.current_page, prev_page, 'right');
			}
		}
	}
	
	Paginator.prototype.adjust_height = function() {
		var max_height = 0;
		this.pages.css('min-height', 'inherit');
		this.pages.each(function(){
			if($(this).height() > max_height) {
				max_height = $(this).height();
			}
		});
		//console.log('canvas ' + page_id + ': ' + max_height);
		this.pages.css('min-height', max_height);
	}
	
	// Construct HTML element
	Paginator.prototype.build = function() {
		
		var pages = Math.ceil( ((this.items.length/this.settings.item)*10)/10 ); // Roundup page value
		
		this.canvas = $('<div />').addClass('page-canvas normal');
		if(this.settings.speed == 'fast') {
			this.canvas.removeClass('normal');
			this.canvas.addClass('fast');
		} else if (this.settings.speed == 'slow') {
			this.canvas.removeClass('normal');
			this.canvas.addClass('slow');
		}
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
				that.canvas.find('li.page-element-'+page).append($(this).clone());
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
		pauseonhover: true,
		speed: 'normal',
		navigator: true,
		touch: false,
    }
    
    // Main function
    var old = $.fn.pagination;

	$.fn.paginator = function (option) {

		var $this   = $(this);
		var data    = $this.data('js.paginator');
		var options = $.extend({}, Paginator.DEFAULTS, $this.data(), typeof option == 'object' && option);
		
		if (!data) {
			$this.data(
				'js.paginator', (data = new Paginator($this, options))
			);
		}
		return data;

/*
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
*/
	}
	
	$.fn.paginator.Constructor = Paginator;
	
}(window.jQuery)