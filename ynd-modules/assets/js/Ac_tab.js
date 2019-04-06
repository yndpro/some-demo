;(function($,window) {
	
	function Tab(options){

		var defaults = {
			'tabItem':'#j-tab .tab-hd li',
			'tabCont':'#j-tab .tab-cont',
			'triggerType':'click',
			'tabItemCur':'cur',
			'defaultIndex':'0',
			'beforeSwitch':function(){},
			'afterSwitch':function(){}
		};
		this.options = $.extend({},defaults,options);
		this.init();
	};

	Tab.prototype = {

		init:function(){
			var _this = this,
				options = _this.options;

			this.change(options.defaultIndex);
			this.bind()
		},

		bind:function(){
			var _this = this,
				options = _this.options;

			$('body').on(options.triggerType,options.tabItem,function(){
				var _index = $(this).index();
				_this.change(_index);
			});
			
		},
		change:function(index){
			var _this = this,
				options = _this.options;

			options.beforeSwitch.call(this,index);

			$(options.tabItem).eq(index).addClass(options.tabItemCur).siblings().removeClass(options.tabItemCur);
			$(options.tabCont).eq(index).show().siblings(options.tabCont).hide();

			options.afterSwitch.call(this,index);
		}

	}
		
	window.Ac = window.Ac || {};
    Ac.tab = Tab;


})($,window);