;(function($,window) {
	

	var lastMouseX,
		lastMouseY,
		lastTargetX,
		lastTargetY,
		isMouseDown = false,
		bubble = false,
		currentBoundary = null,
		currentElement = null,
		beforeDragCallback = {},
		onDragCallback = {},
		afterDragCallback = {}; 

	function getMousePosition(e){
		var x = 0,y = 0;

		if(e.pageX || e.pageY){
			x = e.pageX;
			y = e.pageY;
		}else if(e.clientX || e.clientY){
			x = e.clientX + document.body.scrollLeft;
			y = e.clientY + document.body.scrollTop;
		}

		return {'x':x,'y':y};
	};

	function setPosition(e){
		var pos = getMousePosition(e),
		    disX = pos.x - lastMouseX,
			disY = pos.y - lastMouseY,
			targetX = lastTargetX + disX,
			targetY = lastTargetY + disY,
			targetW  = parseInt($(currentElement).width()),
			targetH  = parseInt($(currentElement).height()),
			boundW   = parseInt($(currentBoundary).width()),
			boundH   = parseInt($(currentBoundary).height()),
			magX = parseInt($(currentElement).css('margin-left')),
			magY = parseInt($(currentElement).css('margin-top'));

		if(targetX < 0){
			targetX = 0;
		}
		if(targetY < 0){
			targetY = 0;
		}
		if(targetX > (boundW - targetW)){
			targetX = boundW - targetW;
		}
		if(targetY > (boundH - targetH)){
			targetY = boundH - targetH;
		}

		targetX -= magX;
		targetY -= magY;

		$(currentElement).css('left',targetX);
		$(currentElement).css('top',targetY);
	};


	function Drag(options){

		var defaults = {
			'target':'',
			'boundary':'',
			'beforeDrag':function(){},
			'onDrag':function(){},
			'afterDrag':function(){}
		};

		this.options = $.extend({},defaults,options);
		this.init();
	};

	Drag.prototype = {

		'init':function(){
			var options = this.options;

			for(var i = 0;i < $(options.target).length;i++){

				var target = $(options.target)[i];
				if(!target.id){
					target.id = 'dragId' + (new Date().getTime() + parseFloat(Math.random().toFixed(2))*100);
				};

				beforeDragCallback[target.id] = options.beforeDrag;
				onDragCallback[target.id] = options.onDrag;
				afterDragCallback[target.id] = options.afterDrag;

				this.bind(target);
			}
			
		},

		'bind':function(target){
			var options = this.options;
			var pos;

			$('#'+target.id).mousedown(function(e){

				if (e.button == 2) return bubble ? true : false;

				currentElement  = target;
				currentBoundary = options.boundary;

				beforeDragCallback[currentElement.id](e);

				pos = getMousePosition(e);
				lastMouseX = pos.x;
				lastMouseY = pos.y;

				lastTargetX = parseInt(this.offsetLeft);
				lastTargetY = parseInt(this.offsetTop);
				
				isMouseDown = true;

				return bubble ? true : false;
			});
			$(document).mouseup(function(e){
				if(isMouseDown){
					if(afterDragCallback[currentElement.id] != undefined){
						afterDragCallback[currentElement.id](e);
					}
					isMouseDown = false;
				}
				return false;
			});
			$(document).mousemove(function(e){
				if(isMouseDown){
					if(onDragCallback[currentElement.id] != undefined){
						onDragCallback[currentElement.id](e);
					}
					setPosition(e);
				}
				return false;
			})
		}

	};

	window.Ac = window.Ac || {};
	Ac.drag = Drag;

})($,window);