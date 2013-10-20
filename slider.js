/**
 * 简单的轮播库
 * @author alandlguo
 * @2013/10/14
 */

var Slider = (function(){
	//direction:0-从右往做, 1-从左往右, 2-从下往上，3-从上往下，4-fadeout/fadein,5-3d向上翻转，6-3d向下翻转
	//5,6暂时只支持webkit内核浏览器
	var _modeFunc = {
		0 : function(slideIn,slideOut){
			this._aniIn.keyframe({point:0,left:slideIn.clientWidth+"px"}).keyframe({
				point:this._config.duration,left:this._config.origin.x+"px"
			});
		
			this._aniOut.keyframe({point:0,left:this._config.origin.x+"px"}).keyframe({
				point:this._config.duration,left:-slideOut.clientWidth+"px"
			});
		},

		1:function(slideIn,slideOut){
			this._aniIn.keyframe({point:0,left:-slideIn.clientWidth+"px"}).keyframe({
				point:this._config.duration,left:this._config.origin.x+"px"
			});
		
			this._aniOut.keyframe({point:0,left:this._config.origin.x+"px"}).keyframe({
				point:this._config.duration,left:slideOut.clientWidth+"px"
			});
		},

		2:function(slideIn,slideOut){
			this._aniIn.keyframe({point:0,top:slideIn.clientHeight+"px"}).keyframe({
				point:this._config.duration,top:this._config.origin.y+"px"
			});
		
			this._aniOut.keyframe({point:0,top:this._config.origin.y+"px"}).keyframe({
				point:this._config.duration,top:-slideOut.clientHeight+"px"
			});
		},

		3:function(slideIn,slideOut){
			this._aniIn.keyframe({point:0,top:-slideIn.clientHeight+"px"}).keyframe({
				point:this._config.duration,top:this._config.origin.y+"px"
			});
		
			this._aniOut.keyframe({point:0,top:this._config.origin.y+"px"}).keyframe({
				point:this._config.duration,top:slideOut.clientHeight+"px"
			});
		},

		4:function(slideIn,slideOut){
			this._aniIn.keyframe({point:0,opacity:0}).keyframe({
				point:this._config.duration,opacity:1
			});
		
			this._aniOut.keyframe({point:0,opacity:1}).keyframe({
				point:this._config.duration,opacity:0
			});
		},

		5:function(slideIn,slideOut){
			var tranlate = slideOut.clientHeight/2;
			//3d变化的时候设置父元素属性
			if(this._config.mode ==5 || this._config.mode == 6){
				//3d变化
				this._ol.style.webkitPerspective="1560px"
				this._ol.style.webkitTransformStyle="preserve-3d";
				this._ol.style.webkitTransform="scale(0.88)";
				this._ol.style.overflow = "";
			}

			this._aniIn.keyframe({point:0,"-webkit-transform":"rotateX(90deg) translateZ("+tranlate+"px)"}).keyframe({
				point:this._config.duration,"-webkit-transform":"rotateX(0deg) translateZ("+tranlate+"px)"
			});
		
			this._aniOut.keyframe({point:0,"-webkit-transform":"rotateX(0deg) translateZ("+tranlate+"px)"}).keyframe({
				point:this._config.duration,"-webkit-transform":"rotateX(-90deg) translateZ("+tranlate+"px)"
			});
		},

		6:function(slideIn,slideOut){
			var tranlate = slideOut.clientHeight/2;
			//3d变化的时候设置父元素属性
			if(this._config.mode ==5 || this._config.mode == 6){
				//3d变化
				this._ol.style.webkitPerspective="1560px"
				this._ol.style.webkitTransformStyle="preserve-3d";
				this._ol.style.webkitTransform="scale(0.88)";
				this._ol.style.overflow = "";
			}

			this._aniIn.keyframe({point:0,"-webkit-transform":"rotateX(-90deg) translateZ("+tranlate+"px)"}).keyframe({
				point:this._config.duration,"-webkit-transform":"rotateX(0deg) translateZ("+tranlate+"px)"
			});
		
			this._aniOut.keyframe({point:0,"-webkit-transform":"rotateX(0deg) translateZ("+tranlate+"px)"}).keyframe({
				point:this._config.duration,"-webkit-transform":"rotateX(90deg) translateZ("+tranlate+"px)"
			});
		}
	}
	
	//prev的动画效果
	var _oppositeMode = {
		0:1,
		1:0,
		2:3,
		3:2,
		4:4,
		5:6,
		6:5
	}

	var slide = function(){
		var func = _modeFunc[this._config.mode];
		var slideIn = this._lis[this._lis.length-2];
		var slideOut = this._lis[this._lis.length-1];

		//首先把需要切入的图片放到右侧
		this._aniIn.setElement(slideIn);
		this._aniOut.setElement(slideOut);

		if(!this._aniIn.keyframes.length){
			func.call(this,slideIn,slideOut);
		}

		this._aniIn.start({timing:this._config.timing});
		this._aniOut.start({timing:this._config.timing});

		//插入到第一个
		
		var _self = this;
		var time  = setTimeout(function(){
			slideOut.removeAttribute("style");
			_self._ol.insertBefore(slideOut,_self._lis[0]);
			clearTimeout(time);
		},this._config.duration);
		
	}

	function slider(ol, options){
		options = options || {mode:0,duration:400};
		//传入列表外面的ol元素
		this._ol = ol;
		this._lis = ol.children;
		var config = {};
		config.mode = options.mode || 0;
		config.duration = options.duration || 400;
		config.interval = options.interval || 3000;
		config.autoPlay = options.autoPlay || true;
		config.timing = options.timing || "linear";
		var origin = options.origin || {};
		var x = origin.x || 0,y = origin.y || 0;
		config.origin = {x:x,y:y};
		this._config = config;
		this._aniOut = new window.Animate();
		this._aniIn = new window.Animate();

		if(config.autoPlay!==false){
			this.play();
		}
	}

	var sliderProto = slider.prototype;
	
	sliderProto.prev = function(){
		var mode = _oppositeMode[this._config.mode];
		var func = _modeFunc[mode];
		//从末尾取图片
		var slideIn = this._lis[0];
		var slideOut = this._lis[this._lis.length-1];
		//加在最顶层
		this._ol.appendChild(slideIn);

		this._aniIn.setElement(slideIn);
		this._aniOut.setElement(slideOut);

		this._aniIn.reset();
		this._aniOut.reset();
		func.call(this,slideIn,slideOut);

		this._aniIn.start({timing:this._config.timing});
		this._aniOut.start({timing:this._config.timing});

		var _self = this;
		var time  = setTimeout(function(){
			slideOut.removeAttribute("style");
			clearTimeout(time);

			//复位动画
			_self._aniIn.reset();
			_self._aniOut.reset();
			var func = _modeFunc[_self._config.mode];
			func.call(_self,slideIn,slideOut);

		},this._config.duration);
	};

	sliderProto.next = function(){
		slide.call(this);
	};

	sliderProto.pause = function(){
		window.clearInterval(this._intervalKey);
	};

	sliderProto.play = function(){
		var _self = this;
		if(_self._config.autoPlay){
			_self._intervalKey = setInterval(function(){
				slide.call(_self);
			},_self._config.interval);
		}
	};

	return slider;
})();