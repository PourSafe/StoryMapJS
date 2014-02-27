/*	StoryMap
	Designed and built by Zach Wise at VéritéCo

	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
	
================================================== */
/* 
	TODO
	Message for Data Loading
*/ 

/*	Required Files
	CodeKit Import
	http://incident57.com/codekit/
================================================== */
// @codekit-prepend "core/VCO.js";
// @codekit-prepend "core/VCO.Util.js";
// @codekit-prepend "data/VCO.Data.js";
// @codekit-prepend "core/VCO.Class.js";
// @codekit-prepend "core/VCO.Events.js";
// @codekit-prepend "core/VCO.Browser.js";
// @codekit-prepend "core/VCO.Load.js";

// @codekit-prepend "language/VCO.Language.js";

// @codekit-prepend "animation/VCO.Ease.js";
// @codekit-prepend "animation/VCO.Animate.js";

// @codekit-prepend "dom/VCO.Point.js";
// @codekit-prepend "dom/VCO.DomMixins.js";
// @codekit-prepend "dom/VCO.Dom.js";
// @codekit-prepend "dom/VCO.DomUtil.js";
// @codekit-prepend "dom/VCO.DomEvent.js";

// @codekit-prepend "ui/VCO.Draggable.js";
// @codekit-prepend "ui/VCO.Swipable.js";
// @codekit-prepend "ui/VCO.SizeBar.js";
// @codekit-prepend "ui/VCO.Message.js";

// @codekit-prepend "media/VCO.MediaType.js";
// @codekit-prepend "media/VCO.Media.js";

// @codekit-prepend "media/types/VCO.Media.Blockquote.js";
// @codekit-prepend "media/types/VCO.Media.Flickr.js";
// @codekit-prepend "media/types/VCO.Media.GoogleDoc.js";
// @codekit-prepend "media/types/VCO.Media.GooglePlus.js";
// @codekit-prepend "media/types/VCO.Media.IFrame.js";
// @codekit-prepend "media/types/VCO.Media.Image.js";
// @codekit-prepend "media/types/VCO.Media.SoundCloud.js";
// @codekit-prepend "media/types/VCO.Media.Storify.js";
// @codekit-prepend "media/types/VCO.Media.Text.js";
// @codekit-prepend "media/types/VCO.Media.Twitter.js";
// @codekit-prepend "media/types/VCO.Media.Vimeo.js";
// @codekit-prepend "media/types/VCO.Media.DailyMotion.js";
// @codekit-prepend "media/types/VCO.Media.Vine.js";
// @codekit-prepend "media/types/VCO.Media.Website.js";
// @codekit-prepend "media/types/VCO.Media.Wikipedia.js";
// @codekit-prepend "media/types/VCO.Media.YouTube.js";
// @codekit-prepend "media/types/VCO.Media.Slider.js";

// @codekit-prepend "slider/VCO.Slide.js";
// @codekit-prepend "slider/VCO.SlideNav.js";
// @codekit-prepend "slider/VCO.StorySlider.js";

// @codekit-prepend "map/leaflet/VCO.Leaflet.js";
// @codekit-prepend "map/leaflet/VCO.Leaflet.TileLayer.Zoomify.js";

// @codekit-prepend "map/VCO.StamenMaps.js";
// @codekit-prepend "map/VCO.MapMarker.js";
// @codekit-prepend "map/VCO.Map.js";

// @codekit-prepend "map/leaflet/VCO.MapMarker.Leaflet.js";
// @codekit-prepend "map/leaflet/VCO.Map.Leaflet.js";


VCO.StoryMap = VCO.Class.extend({
	
	includes: VCO.Events,
	
	/*	Private Methods
	================================================== */
	initialize: function (elem, data, options) {
		var self = this;
		
		// Ready
		this.ready = false;
		
		// DOM ELEMENTS
		this._el = {
			container: {},
			storyslider: {},
			map: {},
			sizebar: {}
		};
		
		// Determine Container Element
		if (typeof elem === 'object') {
			this._el.container = elem;
		} else {
			this._el.container = VCO.Dom.get(elem);
		}
		
		// Slider
		this._storyslider = {};
		
		// Map
		this._map = {};
		
		// SizeBar
		this._sizebar = {};
		
		// Loaded State
		this._loaded = {storyslider:false, map:false};
		
		// Data Object
		// Test Data compiled from http://www.pbs.org/marktwain/learnmore/chronology.html
		this.data = {
			uniqueid: 				"",
			slides: 				[
				{
					uniqueid: 				"",
					type: 					"overview", // Optional
					background: {			// OPTIONAL
						url: 				"http://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Mark_Twain_by_Abdullah_Fr%C3%A8res%2C_1867.jpg/418px-Mark_Twain_by_Abdullah_Fr%C3%A8res%2C_1867.jpg",
						color: 				"",
						opacity: 			50
					},
					date: 					"1835",
					text: {
						headline: 			"Mark Twain",
						text: 				"Samuel Langhorne Clemens (November 30, 1835 – April 21, 1910), better known by his pen name Mark Twain, was an American author and humorist. He wrote The Adventures of Tom Sawyer (1876) and its sequel, Adventures of Huckleberry Finn (1885), the latter often called \"the Great American Novel.\""
					},
					media: null
				},
				{
					uniqueid: 				"",
					date: 					"1835",
					location: {
						lat: 				39.491711,
						lon: 				-91.793260,
						name: 				"Florida, Missouri",
						zoom: 				12,
						icon: 				"http://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/blue-pushpin.png",
						line: 				true
					},
					text: {
						headline: 			"Florida, Missouri",
						text: 				"Born in Florida, Missouri. Halley’s comet visible from earth."
					},
					media: {
						url: 				"http://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Mark_Twain_birthplace.jpg/800px-Mark_Twain_birthplace.jpg",
						credit:				"",
						caption:			"Mark Twain's birthplace, Florida, Missouri"
					}
				}
			]
		};
	
		this.options = {
			script_path:            "",
			height: 				this._el.container.offsetHeight,
			width: 					this._el.container.offsetWidth,
			layout: 				"landscape", 	// portrait or landscape
			base_class: 			"",
			map_size_sticky: 		3, 				// Set as division 1/3 etc
			map_center_offset:  	null, 			// takes object {top:0,left:0}
			start_at_slide: 		0,
			sizebar_height: 		0,
			// animation
			duration: 				1000,
			ease: 					VCO.Ease.easeInOutQuint,
			// interaction
			dragging: 				true,
			trackResize: 			true,
			map_type: 				"stamen:toner-lite",
			map_subdomains: 		"",
			map_as_image: 			false,
			map_background_color: 	"#d9d9d9",
			zoomify: {
				path: 				"",
				width: 				"",
				height: 			"",
				tolerance: 			0.8,
				attribution: 		""
			},
			map_height: 			300,
			storyslider_height: 	600,
			slide_padding_lr: 		100, 			// padding on slide of slide
			sizebar_default_y: 		0,
			path_gfx: 				"gfx",
			map_popup: 				false,
			zoom_distance: 			100,
			calculate_zoom: 		true,   		// Allow map to determine best zoom level between markers (recommended)
			use_custom_markers: 	false,  		// Allow use of custom map marker icons
			line_follows_path: 		true,   		// Map history path follows default line, if false it will connect previous and current only
			line_color: 			"#DA0000",
			line_color_inactive: 	"#CCC",
			line_join: 				"miter",
			line_weight: 			3,
			line_opacity: 			0.80,
			line_dash: 				"5,5",
			show_lines: 			true,
			show_history_line: 		true,
			api_key_flickr: 		"f2cc870b4d233dd0a5bfe73fd0d64ef0",
			language:               "en"		
		};
		
		// Current Slide
		this.current_slide = this.options.start_at_slide;
		
		// Animation Objects
		this.animator_map = null;
		this.animator_storyslider = null;
		
		// Merge Options
		VCO.Util.mergeData(this.options, options);
		
		if (this.options.layout == "landscape") {
			this.options.map_center_offset = {left: -200, top: 0};
		}
		
		// Zoomify Layout
		if (this.options.map_type == "zoomify" && this.options.map_as_image) {
			this.options.map_size_sticky = 2;
		}
		
		// Load language
		if(this.options.language == 'en') {
		    this.options.language = VCO.Language;
		    this._initData(data);
		} else {
			VCO.Load.js(this.options.script_path + "/locale/" + this.options.language + ".js", function() {
				self._initData(data);
			});
		}
		return this;
	},

	/*	Navigation
	================================================== */
	goTo: function(n) {
		if (n != this.current_slide) {
			this.current_slide = n;
			this._storyslider.goTo(this.current_slide);
			this._map.goTo(this.current_slide);
		}
	},

	updateDisplay: function() {
		if (this.ready) {
			this._updateDisplay();
		}
	},
	
	/*	Private Methods
	================================================== */
	
	// Initialize the data
	_initData: function(data) {
		var self = this;
		
		if (typeof data === 'string') {
			
			VCO.getJSON(data, function(d) {
				if (d && d.storymap) {
					VCO.Util.mergeData(self.data, d.storymap);
				}
				self._onDataLoaded();
			});
		} else if (typeof data === 'object') {
			if (data.storymap) {
				self.data = data.storymap;
			} else {
				trace("data must have a storymap property")
			}
			self._onDataLoaded();
		} else {
			self._onDataLoaded();
		}
	},
	
	// Initialize the layout
	_initLayout: function () {
		var self = this;
		
		this._el.container.className += ' vco-storymap';
		this.options.base_class = this._el.container.className;
		
		// Create Layout
		this._el.sizebar		= VCO.Dom.create('div', 'vco-sizebar', this._el.container);
		this._el.map 			= VCO.Dom.create('div', 'vco-map', this._el.container);
		this._el.storyslider 	= VCO.Dom.create('div', 'vco-storyslider', this._el.container);
		
		// Initial Default Layout
		this.options.width 				= this._el.container.offsetWidth;
		this.options.height 			= this._el.container.offsetHeight;
		this._el.map.style.height 		= "1px";
		this._el.storyslider.style.top 	= "1px";
		
		// Create Map using preferred Map API
		this._map = new VCO.Map.Leaflet(this._el.map, this.data, this.options);
		this._map.on('loaded', this._onMapLoaded, this);
		
		// Map Background Color
		this._el.map.style.backgroundColor = this.options.map_background_color;
		
		// Create SizeBar
		this._sizebar = new VCO.SizeBar(this._el.sizebar, this._el.container, this.options);
		
		// Create StorySlider
		this._storyslider = new VCO.StorySlider(this._el.storyslider, this.data, this.options);
		this._storyslider.on('loaded', this._onStorySliderLoaded, this);
		this._storyslider.init();
		
		// LAYOUT
		if (this.options.layout == "portrait") {
			// Set Default Component Sizes
			this.options.map_height 		= (this.options.height / this.options.map_size_sticky);
			this.options.storyslider_height = (this.options.height - this._el.sizebar.offsetHeight - this.options.map_height - 1);
			this._sizebar.setSticky(0);
		} else {
			this.options.sizebar_height = this._el.sizebar.offsetHeight;
			// Set Default Component Sizes
			this.options.map_height 		= this.options.height;
			this.options.storyslider_height = (this.options.height - this._el.sizebar.offsetHeight - 1);
			this._sizebar.setSticky(this.options.sizebar_height);
		}
		
		
		// Update Display
		this._updateDisplay(this.options.map_height, true, 2000);
		
		// Animate Sizebar to Default Location
		this._sizebar.show(2000);
		
	},
	
	_initEvents: function () {
		
		// Sidebar Events
		this._sizebar.on('clicked', this._onSizeBar, this);
		this._sizebar.on('move', this._onSizeBarMove, this);
		this._sizebar.on('swipe', this._onSizeBarSwipe, this);
		this._sizebar.on('momentum', this._onSizeBarSwipe, this);
		this._sizebar.on('back_to_start', this._onBackToStart, this);
		this._sizebar.on('overview', this._onOverview, this);
		
		// StorySlider Events
		this._storyslider.on('change', this._onSlideChange, this);
		this._storyslider.on('colorchange', this._onColorChange, this);
		
		// Map Events
		this._map.on('change', this._onMapChange, this);
	},
	
	// Update View
	_updateDisplay: function(map_height, animate, d) {
		var duration 		= this.options.duration,
			display_class 	= this.options.base_class,
			self			= this;
		
		if (d) {
			duration = d;
		}
		
		// Update width and height
		this.options.width = this._el.container.offsetWidth;
		this.options.height = this._el.container.offsetHeight;
		
		
		// Map Height
		if (map_height) {
			this.options.map_height = map_height;
		}
		
		// LAYOUT
		if (this.options.layout == "portrait") {
			
			// Portrait
			display_class += " vco-layout-portrait";
			trace("PORTRAIT LAYOUT");
			
			// Set Sticky state of SizeBar
			this._sizebar.setSticky(Math.floor(this._el.container.offsetHeight/this.options.map_size_sticky));
			
			// StorySlider Height
			this.options.storyslider_height = (this.options.height - this.options.sizebar_height - this.options.map_height- 1);
			
			if (animate) {
			
				// Animate Map
				if (this.animator_map) {
					this.animator_map.stop();
				}
			
				this.animator_map = VCO.Animate(this._el.map, {
					height: 	(map_height) + "px",
					duration: 	duration,
					easing: 	VCO.Ease.easeOutStrong,
					complete: function () {
						self._map.updateDisplay(self.options.width, self.options.map_height, animate, d, self.options.sizebar_height);
					}
				});
			
				// Animate StorySlider
				if (this.animator_storyslider) {
					this.animator_storyslider.stop();
				}
				this.animator_storyslider = VCO.Animate(this._el.storyslider, {
					height: 	this.options.storyslider_height + "px",
					top: 		this.options.sizebar_height + "px",
					duration: 	duration,
					easing: 	VCO.Ease.easeOutStrong
				});
			
			} else {
				// Map
				this._el.map.style.height = Math.ceil(map_height) + "px";
			
				// StorySlider
				this._el.storyslider.style.height = this.options.storyslider_height + "px";
				this._el.storyslider.style.top = this.options.sizebar_height + "px";
			}
			
			// Update Component Displays
			this._sizebar.updateDisplay(this.options.width, this.options.height, animate, this.options.map_height);
			this._storyslider.updateDisplay(this.options.width, this.options.storyslider_height, animate);
			
		} else {
			
			// Landscape
			display_class += " vco-layout-landscape";
			trace("LANDSCAPE LAYOUT");
			
			// StorySlider Height
			this.options.storyslider_height = (this.options.height - this._el.sizebar.offsetHeight - 1);
			
			// Set Sticky state of SizeBar
			this._sizebar.setSticky(this.options.sizebar_height);
			
			this._el.map.style.height = this.options.height + "px";
			this._el.sizebar.style.top =  this.options.sizebar_height + "px";
			
			// Update Component Displays
			this._map.options.map_center_offset.left = -(this.options.width/4);
			this._map.options.map_center_offset.top = this.options.sizebar_height;
			this._map.updateDisplay(this.options.width, this.options.height, animate, d);
			this._storyslider.updateDisplay(this.options.width/2, this.options.storyslider_height, animate);
		}
		
		// CSS Classes
		// Check if skinny
		if (this.options.width <= 500) {
			display_class += " vco-skinny";
		}
		
		//Check if mobile
		if (VCO.Browser.mobile) {
			display_class += " vco-mobile";
			
		}
		
		// Apply class
		this._el.container.className = display_class;
		
		
	},
	
	/*	Events
	================================================== */
	
	_onDataLoaded: function(e) {
		trace("dataloaded");
		this.fire("dataloaded");
		this._initLayout();
		this._initEvents();
		this.ready = true;
		
	},
	
	_onColorChange: function(e) {
		if (e.color || e.image) {
			this._sizebar.setColor(true);
		} else {
			this._sizebar.setColor(false);
		}
	},
	
	_onSlideChange: function(e) {
		if (this.current_slide != e.current_slide) {
			this.current_slide = e.current_slide;
			this._map.goTo(this.current_slide);
			this.fire("change", {current_slide: this.current_slide}, this);
		}
	},
	
	_onMapChange: function(e) {
		if (this.current_slide != e.current_marker) {
			this.current_slide = e.current_marker;
			this._storyslider.goTo(this.current_slide);
			this.fire("change", {current_slide: this.current_slide}, this);
		}
	},
	
	_onSizeBar: function(e) {
		//trace("ON SIZEBAR");
	},
	
	_onOverview: function(e) {
		this._map.markerOverview();
	},
	
	_onBackToStart: function(e) {
		this.current_slide = 0;
		this._map.goTo(this.current_slide);
		this._storyslider.goTo(this.current_slide);
		this.fire("change", {current_slide: this.current_slide}, this);
	},
	
	_onSizeBarMove: function(e) {
		this._updateDisplay(e.y); 
	},
	
	_onSizeBarSwipe: function(e) {
		this._updateDisplay(e.y, true);
	},
	
	_onMouseClick: function(e) {
		
	},
	
	_fireMouseEvent: function (e) {
		if (!this._loaded) {
			return;
		}

		var type = e.type;
		type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

		if (!this.hasEventListeners(type)) {
			return;
		}

		if (type === 'contextmenu') {
			VCO.DomEvent.preventDefault(e);
		}
		
		this.fire(type, {
			latlng: "something", //this.mouseEventToLatLng(e),
			layerPoint: "something else" //this.mouseEventToLayerPoint(e)
		});
	},
	
	_onMapLoaded: function() {
		this._loaded.map = true;
		this._onLoaded();
	},
	
	_onStorySliderLoaded: function() {
		this._loaded.storyslider = true;
		this._onLoaded();
	},
		
	_onLoaded: function() {
		if (this._loaded.storyslider && this._loaded.map) {
			this.fire("loaded", this.data);
		}
	}
	
	
});


