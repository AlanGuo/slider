'use strict';
/**
 * 一个前卫，时尚的图片轮播库，提供数种炫酷的轮播效果，适用于时尚的大图轮播网站，使用html5使性能体验达到最佳，支持移动端，而且本库不依赖任何第三方库，轻便易用。
 * @project
 * @name Slider
 * @subtitle v1.0
 * @download http://115.29.195.88:82/dist/min/slider-animate-1.0.1.min.js
 * @uncompressdownload http://115.29.195.88:82/dist/slider-animate-1.0.1.js
 * @support ie,chrome,firefox,safari,opera
 *
 * @howto
 *
 * 提供一个在线的例子
 *
 * **livedemo**:[http://115.29.195.88:82/demo/index.html](http://115.29.195.88:82/demo/index.html)
 *
 * **github**：[https://github.com/AlanGuo/slider](https://github.com/AlanGuo/slider)
 *
 *
 * ###html结构组组织###
 *
 *      ul {
 *          ......
 *          overflow: hidden;
 *          width:950px;
 *          height:264px;
 *          position: relative;
 *      }
 *      ul li{
 *          ......
 *          position:absolute;
 *          list-style: none;
 *      }
 *      <ul id="ul-1">
 *          <li><img src="imgs/browser-slide001.jpg"></li>
 *          <li><img src="imgs/home-slide001.jpg"></li>
 *          <li><img src="imgs/home-slide002-wachky.jpg"></li>
 *          <li><img src="imgs/home-slide-sheep.jpg"></li>
 *      </ul>
 *       
 * ###js 初始化###
 *
 *       var ul1 = document.getElementById("ul-1");
 *       var sl1 = new Slider(ul1,{mode:0});
 *       //Slider(elem,options); 
 *       //mode duration interval autoPlay timing scale
 *       
 *       mode: 动画方式  //0-从右往做, 1-从左往右, 2-从下往上，3-从上往下，4-fadeout/fadein,5-3d向上翻转，6-3d向下翻转(5,6暂时只支持webkit内核     浏览器)
 *       duration: 动画轮播时间    //默认400ms
 *       interval: 动画轮播间隔 //默认3000ms;
 *       autoPlay: 是否自动播放 //默认true，初始化之后可以使用slider.play()来播放;
 *       timing : 动画缓动，如果浏览器不支持css动画，那么此设置项无效 //默认是"linear";
 *       scale : 缩放比例，如果使用3d透视，图形会有一些超出原来的尺寸，所以需要使用scale来微调，scale一般设置为0.89左右// 默认是1; 
 *       loop: 是否循环轮播图片
 *       nextSlideOffset : 触摸屏的时候，下一副图再移动多少的时候播放        
        
 * ###触屏设备###
 *       //支持触摸设备
 *       sl1.touchToSlide();
 *
 * @author alandlguo
 * @2013/10/14
 */
var Slider = (function() {

 	//direction:0-从右往左, 1-从左往右, 2-从下往上，3-从上往下，4-fadeout/fadein,5-3d向上翻转，6-3d向下翻转
 	//5,6暂时只支持webkit内核浏览器
 	var createJudgeFunc = function(vendor) {
 	    return function(){
 	        var dummyStyle = document.createElement('div').style;
 	        var v = vendor.prefix.split(','),
 	            t,
 	            i = 0,
 	            l = v.length;
 	
 	        for (; i < l; i++) {
 	            t = v[i] + vendor.words;
 	            if (t in dummyStyle) {
 	                return v[i].substr(0, v[i].length - 1);
 	            }
 	        }
 	        return false;
 	    };
 	};
 	
 	var prefixCSS = function(style,judgeFunc) {
 	    var vendor = judgeFunc();
 	    if (vendor === '') {return style;}
 	    style = style.charAt(0) + style.substr(1);
 	    return vendor + style;
 	};
 	
 	var transformJudgeFunc =  createJudgeFunc({
 	    prefix:'t,-webkit-t,-moz-t,-ms-t,-o-t',
 	    words:'ransform'
 	});
 	
 	var supportTransform = transformJudgeFunc()===false?false:true;
 	var transformCSS = prefixCSS("transform",transformJudgeFunc);
 	
 	var setOptions = function(options) {
 	    var config = {};
 	    config.mode = options.mode || 0;
 	    config.duration = options.duration || 500;
 	    config.interval = options.interval || 4000;
 	    config.autoPlay = options.autoPlay !== null ? options.autoPlay : true;
 	    config.timingFunction = options.timingFunction || "linear";
 	    //是否循环播放
 	    config.loop = options.loop != null ? options.loop : true;
 	    //切换下一图时的触摸的偏移offset
 	    config.nextSlideOffset = options.nextSlideOffset || 0.2;
 	    //透视之后缩放的比例，默认是一，
 	    //一般情况下透视之后图形会比原来要大，这里需要调整一下缩放，一般情况下此值为小于1的数如0.88
 	    config.scale = options.scale || 1;
 	    var origin = options.origin || {};
 	    var x = origin.x || 0,
 	        y = origin.y || 0;
 	    config.origin = {
 	        x: x,
 	        y: y
 	    };
 	    return config;
 	};
 	
 	var preProcess = function(config,ol){
 	    var lis = ol.children;
 	    var clientWidth = ol.clientWidth;
 	    var clientHeight = ol.clientHeight;
 	    var i = 0;
 	
 	    if(config.mode < 4){
 	        if(config.mode === 0 || config.mode === 1){
 	            //左右排列
 	            for(i=0;i<lis.length;i++){
 	                lis[i].style[transformCSS] = "translateX("+(i*clientWidth)+"px) translateZ(0)";
 	                lis[i].style.width = clientWidth + "px";
 	                lis[i].style.height = ol.style.height = "100%";
 	            }
 	            ol.style.width = clientWidth*lis.length+"px";
 	
 	        }else{
 	            //上下排列
 	            for(i=0;i<lis.length;i++){
 	                lis[i].style[transformCSS] = "translateY("+(i*clientHeight)+"px) translateZ(0)";
 	                lis[i].style.height = clientHeight + "px";
 	                lis[i].style.width = ol.style.width = "100%";
 	            }
 	            ol.style.height = clientHeight*lis.length+"px";
 	        }
 	        ol.style[transformCSS] = "translateZ(0)";
 	    }
 	    else{
 	        for(i=0;i<lis.length;i++){
 	            lis[i].removeAttribute("style");
 	        }
 	        ol.removeAttribute("style");
 	    }
 	};
 	
 	/**
 	 * Slider
 	 * @class Slider
 	 * @constructor
 	 */
 	function Slider(ol, options) {
 	    options = options || {
 	        mode: 0,
 	        duration: 400
 	    };
 	    /*jshint validthis:true */
 	    //传入列表外面的ol元素
 	    this._ol = ol;
 	    this._lis = ol.children;
 	    this._events = {};
 	    this._isSliding = false;
 	    //图片索引
 	    this._index = 1;
 	
 	    this._config = setOptions(options);
 	    this._aniOut = new window.Animate();
 	    this._aniIn = new window.Animate();
 	    this.isPaused = false;
 	
 	    //预处理
 	    preProcess(this._config,this._ol);
 	    if(this._config.autoPlay !== false) {
 	        this.play();
 	    }
 	}
 	
 	var sliderProto = Slider.prototype;
 	
 	/**
 	 * 绑定事件
 	 * @method on
 	 * @param {String} event 事件名，e.g. [slideend,slidestart]
 	 * @param {Function} callback 回调函数
 	 * @return {Object} Slider
 	 * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
 	 * @for Slider
 	 * @example
 	 * var sl = new Slider(elem);
 	 * sl.on("slideend",function(index){console.log("current:"+index)});
 	 * //目前支持的事件有
 	 * //slidestart
 	 * //slideend
 	 */
 	sliderProto.on = function(event, callback) {
 	    if (/string/i.test(typeof event)) {
 	        if (/function/i.test(typeof callback)) {
 	            if (!this._events[event]) {this._events[event] = [];}
 	            this._events[event].push(callback);
 	        } else {
 	            throw new TypeError("callback must be a function");
 	        }
 	    } else {
 	        throw new TypeError("event must be string");
 	    }
 	
 	    return this;
 	};
 	
 	
 	/**
 	 * 解除绑定事件
 	 * @method off
 	 * @param {String} event 事件名，e.g. [slideend,slidestart]
 	 * @param {Function} callback 回调函数,如果不写则会解除所有对该事件的绑定
 	 * @return {Object} Slider
 	 * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
 	 * @for Slider
 	 * @example
 	 * var sl = new Slider(elem);
 	 * sl.on("slideend",function(index){console.log("current:"+index)});
 	 * sl.off("slideend");
 	 */
 	sliderProto.off = function(event, callback) {
 	    if (/string/i.test(typeof event)) {
 	        if (/function/i.test(typeof callback)) {
 	            if (this._events[event]) {
 	                var index = this._events[event].indexOf(callback);
 	                if (index > -1) {
 	                    this._events[event].splice(index, 1);
 	                }
 	            }
 	        } else {
 	            this._events[event] = null;
 	        }
 	    } else {
 	        throw new TypeError("event must be string");
 	    }
 	
 	    return this;
 	};
 	
 	/**
 	 * 更改配置
 	 * @method changeConfig
 	 * @param {Object} options 调整选项
 	 * @return {Object} Slider
 	 * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
 	 * @for Slider
 	 * @example
 	 * var sl = new Slider(elem);
 	 * sl.changeConfig({mode:2});
 	 */
 	sliderProto.changeConfig = function(options) {
 	    this.pause();
 	    this._config = setOptions(options);
 	    this._destroyStyle();
 	    preProcess(this._config,this._ol);
 	    this._index = 1;
 	    return this;
 	};
 	
 	/**
 	 * 清除样式
 	 * @method _destroyStyle
 	 * @private
 	 * @return {Object} Slider
 	 * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
 	 * @for Slider
 	 */
 	sliderProto._destroyStyle = function() {
 	    this.pause();
 	    if (this._aniIn.elem){
 	        this._aniIn.clear().reset();
 	    }
 	    if (this._aniOut.elem){
 	        this._aniOut.clear().reset();
 	    }
 	    
 	    //清除动画样式
 	    for (var i = 0; i < this._lis.length; i++) {
 	        this._lis[i].removeAttribute("style");
 	    }
 	    this._ol.removeAttribute("style");
 	    return this;
 	};
 	
 	/**
 	 * 摧毁slider
 	 * @method destroy
 	 * @return {Object} Slider
 	 * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
 	 * @example
 	 * var sl = new Slider(elem);
 	 * sl.destroy();
 	 * @for Slider
 	 */
 	sliderProto.destroy = function() {
 	    this._destroyStyle();
 	    this.isPaused = false;
 	    this.isDestroyed = true;
 	    for (var evt in this._events) {
 	        this.off(evt);
 	    }
 	    //卸载touch事件
 	    this._ol.removeEventListener("touchstart");
 	    this._ol.removeEventListener("touchmove");
 	    this._ol.removeEventListener("touchend");
 	    return this;
 	};
 	
 	/**
 	 * css前缀
 	 * @method prefixCSS
 	 * @private
 	 * @return {Object} Slider
 	 * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
 	 * @for Slider
 	 */
 	sliderProto.prefixCSS = function(style,judgeFunc) {
 	    var vendor = judgeFunc();
 	    if (vendor === '') {return style;}
 	    style = style.charAt(0) + style.substr(1);
 	    return vendor + style;
 	};
 	
 	/**
 	 * 暂停轮播
 	 * @method pause
 	 * @return {Object} Slider
 	 * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
 	 * @for Slider
 	 * @example
 	 * var sl = new Slider(elem);
 	 * sl.pause();
 	 */
 	sliderProto.pause = function() {
 	    window.clearInterval(this._intervalKey);
 	    this._intervalKey = null;
 	    this.isPaused = true;
 	    return this;
 	};
 	
 	
 	/**
 	 * 开始轮播，用于暂停之后
 	 * @method play
 	 * @return {Object} Slider
 	 * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
 	 * @for Slider
 	 * @example
 	 * var sl = new Slider(elem);
 	 * sl.pause();
 	 * sl.play();
 	 */
 	sliderProto.play = function() {
 	    var _self = this;
 	    if (_self._config.autoPlay) {
 	        window.clearInterval(_self._intervalKey);
 	        _self._intervalKey = setInterval(function() {
 	            _self.next();
 	        }, _self._config.interval + _self._config.duration);
 	    }
 	    this.isPaused = false;
 	    return this;
 	};
 	
 	/**
 	 * 是否支持transform
 	 * @property supportTransform
 	 * @for Slider
 	 */
 	sliderProto.supportTransform = supportTransform;
 	
 	/**
 	 * transform的样式
 	 * @property transformCSS
 	 * @for Slider
 	 */
 	sliderProto.transformCSS = transformCSS;
     /**
      * slider.js
      * slider pc模块，提供鼠标交互，自动轮播等方法
      */
    
    
    var frameIn1,frameIn2,frameOut1,frameOut2;
    var _modeFunc = {
        0: function(ol,index,dis) {
            var length = ol.children.length;
            var width = ol.children[0].clientWidth;
            var i = 0;
            if(index === length){
                //移动图片
                for(i=0;i<length;i++){
                    ol.children[i].style[transformCSS] = "translateX("+width*i+"px) translateZ(0)";
                }
                ol.children[0].style[transformCSS] = "translateX("+width*length+"px) translateZ(0)";
            }
            else if(index === 1){
                for(i=0;i<length;i++){
                    ol.children[i].style[transformCSS] = "translateX("+width*i+"px) translateZ(0)";
                }
            }
            if (supportTransform) {
                //transform
                frameIn1 = {
                    point: 0
                };
                frameIn1[transformCSS] = "translateX(" + width*(1-index) + "px) translateZ(0)";
                frameIn2 = {
                    point: this._config.duration
                };
                frameIn2[transformCSS] = "translateX(" + width*(-index-dis+1) + "px) translateZ(0)";
            } else {
                //left
                frameIn1 = {
                    point: 0,
                    left: width*(1-index) + "px"
                };
                frameIn2 = {
                    point: this._config.duration,
                    left: width*(-index-dis+1) + "px"
                };
            }
            this._aniIn.keyframe([frameIn1, frameIn2]);
        },
    
        1: function(ol, index, dis) {
            var length = ol.children.length;
            var width = ol.children[0].clientWidth;
            var i = 0;
            if(index === 1){
                //移动图片
                for(i=0;i<length;i++){
                    ol.children[i].style[transformCSS] = "translateX("+width*i+"px) translateZ(0)";
                }
                ol.children[length-1].style[transformCSS] = "translateX("+(-width)+"px) translateZ(0)";
            }
            else if(index === length){
                for(i=0;i<length;i++){
                    ol.children[i].style[transformCSS] = "translateX("+width*i+"px) translateZ(0)";
                }
            }
            if (supportTransform) {
                //transform
                frameIn1 = {
                    point: 0
                };
                frameIn1[transformCSS] = "translateX(" + width*(1-index) + "px) translateZ(0)";
                frameIn2 = {
                    point: this._config.duration
                };
                frameIn2[transformCSS] = "translateX(" + width*(dis+1-index) + "px) translateZ(0)";
            } else {
                //left
                frameIn1 = {
                    point: 0,
                    left: width*(1-index) + "px"
                };
                frameIn2 = {
                    point: this._config.duration,
                    left: width*(dis+1-index) + "px"
                };
            }
            this._aniIn.keyframe([frameIn1, frameIn2]);
        },
    
        2: function(ol, index, dis) {
            var length = ol.children.length;
            var height = ol.children[0].clientHeight;
            var i=0;
    
            if(index === length){
                for(i=0;i<length;i++){
                    ol.children[i].style[transformCSS] = "translateY("+height*i+"px) translateZ(0)";
                }
                //移动图片
                ol.children[0].style[transformCSS] = "translateY("+height*length+"px) translateZ(0)";
            }
            else if(index === 1){
                for(i=0;i<length;i++){
                    ol.children[i].style[transformCSS] = "translateY("+height*i+"px) translateZ(0)";
                }
            }
            if (supportTransform) {
                //transform
                frameIn1 = {
                    point: 0
                };
                frameIn1[transformCSS] = "translateY(" + height*(1-index) + "px) translateZ(0)";
                frameIn2 = {
                    point: this._config.duration
                };
                frameIn2[transformCSS] = "translateY(" + height*(-index-dis+1) + "px) translateZ(0)";
            } else {
                //left
                frameIn1 = {
                    point: 0,
                    left: height*(1-index) + "px"
                };
                frameIn2 = {
                    point: this._config.duration,
                    left: height*(-index) + "px"
                };
            }
            this._aniIn.keyframe([frameIn1, frameIn2]);
        },
    
        3: function(ol, index,dis) {
            var length = ol.children.length;
            var height = ol.children[0].clientHeight;
            var i=0;
    
            if(index === 1){
                //移动图片
                for(i=0;i<length;i++){
                    ol.children[i].style[transformCSS] = "translateY("+height*i+"px) translateZ(0)";
                }
                ol.children[length-1].style[transformCSS] = "translateY("+(-height)+"px) translateZ(0)";
            }
            else if(index === length){
                for(i=0;i<length;i++){
                    ol.children[i].style[transformCSS] = "translateY("+height*i+"px) translateZ(0)";
                }
            }
            if (supportTransform) {
                //transform
                frameIn1 = {
                    point: 0
                };
                frameIn1[transformCSS] = "translateY(" + height*(1-index) + "px) translateZ(0)";
                frameIn2 = {
                    point: this._config.duration
                };
                frameIn2[transformCSS] = "translateY(" + height*(dis+1-index) + "px) translateZ(0)";
            } else {
                //left
                frameIn1 = {
                    point: 0,
                    left: height*(1-index) + "px"
                };
                frameIn2 = {
                    point: this._config.duration,
                    left: height*(2-index) + "px"
                };
            }
            this._aniIn.keyframe([frameIn1, frameIn2]);
        },
    
        4: function() {
            this._aniIn.keyframe({
                point: 0,
                opacity: 0
            }).keyframe({
                point: this._config.duration,
                opacity: 1
            });
    
            this._aniOut.keyframe({
                point: 0,
                opacity: 1
            }).keyframe({
                point: this._config.duration,
                opacity: 0
            });
        },
    
        5: function(slideIn, slideOut) {
            var translate = slideOut.clientHeight / 2;
            //3d变化的时候设置父元素属性
            if (this._config.mode === 5 || this._config.mode === 6) {
                //3d变化
                this._ol.style.webkitPerspective = "1560px";
                this._ol.style.webkitTransformStyle = "preserve-3d";
                this._ol.style.webkitTransform = "scale(" + this._config.scale + ")";
                this._ol.style.overflow = "visible";
            }
    
            frameIn1 = {
                point: 0
            };
            frameIn1[transformCSS] = "rotateX(90deg) translateZ(" + translate + "px)";
            frameIn2 = {
                point: this._config.duration
            };
            frameIn2[transformCSS] = "rotateX(0deg) translateZ(" + translate + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);
    
    
            frameOut1 = {
                point: 0
            };
            frameOut1[transformCSS] = "rotateX(0deg) translateZ(" + translate + "px)";
            frameOut2 = {
                point: this._config.duration
            };
            frameOut2[transformCSS] = "rotateX(-90deg) translateZ(" + translate + "px)";
            this._aniOut.keyframe([frameOut1, frameOut2]);
        },
    
        6: function(slideIn, slideOut) {
            var translate = slideOut.clientHeight / 2;
            //3d变化的时候设置父元素属性
            if (this._config.mode === 5 || this._config.mode === 6) {
                //3d变化
                this._ol.style.webkitPerspective = "1560px";
                this._ol.style.webkitTransformStyle = "preserve-3d";
                this._ol.style.webkitTransform = "scale(" + this._config.scale + ")";
                this._ol.style.overflow = "visible";
            }
    
            frameIn1 = {
                point: 0
            };
            frameIn1[transformCSS] = "rotateX(-90deg) translateZ(" + translate + "px)";
            frameIn2 = {
                point: this._config.duration
            };
            frameIn2[transformCSS] = "rotateX(0deg) translateZ(" + translate + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);
    
    
            frameOut1 = {
                point: 0
            };
            frameOut1[transformCSS] = "rotateX(0deg) translateZ(" + translate + "px)";
            frameOut2 = {
                point: this._config.duration
            };
            frameOut2[transformCSS] = "rotateX(90deg) translateZ(" + translate + "px)";
            this._aniOut.keyframe([frameOut1, frameOut2]);
        }
    };
    
    //prev的动画效果
    var _oppositeMode = {
        0: 1,
        1: 0,
        2: 3,
        3: 2,
        4: 4,
        5: 6,
        6: 5
    };
    
    var slide = function(dis) {
        if (this._isSliding) {return this;}
        dis = dis || 1;
        var func = _modeFunc[this._config.mode];
        var slideIn = null, slideOut = null;
    
        if(this._config.mode < 4){
            //移动ul
            slideIn = this._ol;
            if(!this._config.loop  && this._index === this._lis.length){
                slideIn = null;
            }
        }
        else{
            //移动li
            slideIn = this._lis[this._lis.length - dis - this._index];
            //从头开始
            if(this._config.loop && this._index === this._lis.length){
                slideIn = this._lis[this._lis.length - 1];
            }
    
            slideOut = this._lis[this._lis.length - this._index];
        }
        
        var _self = this;
    
        if (slideIn) {
            this._aniIn.setElement(slideIn);
            //清空关键帧
            this._aniIn.resetKeyFrames();
            //需要两个元素切换
            if(slideOut){
                this._aniOut.setElement(slideOut);
                this._aniOut.resetKeyFrames();
    
                func.call(this, slideIn, slideOut);
            
                //动画在最前
                slideIn.style.visibility = slideOut.style.visibility = "visible";
                //其他的在后面
                for(var i=0;i<this._lis.length;i++){
                    if(this._lis[i] !== slideIn && this._lis[i] !== slideOut){
                        this._lis[i].style.visibility = "hidden";
                    }
                }
            }else{
                func.call(this, slideIn, this._index, dis);
            }
            
            //可见的li开始动画
            this._aniIn.start({
                timing: this._config.timing
            });
            this._aniOut.start({
                timing: this._config.timing
            });
    
            this._isSliding = true;
            var time = setTimeout(function() {
                _self._isSliding = false;
    
                clearTimeout(time);
    
                _self._aniIn.reset();
    
                if(slideOut){
                    _self._aniOut.reset();
                }
    
                _self._index += dis;
                if (_self._index > _self._lis.length){
                    _self._index = 1;
                }
    
                if (_self._events.slideend) {
                    _self._events.slideend.forEach(function(func) {
                        if (func) {func(_self._index, "next");}
                    });
                }
            }, this._config.duration + 80);
    
    
            if (_self._events.slidestart) {
                _self._events.slidestart.forEach(function(func) {
                    if (func) {func(_self._index, "next");}
                });
            }
        }
    };
    
    /**
     * 上（1/n）个画面
     * @method prev
     * @param {number} dis 如果dis大于等于1则表示上dis个画面
     * @return {Object} Slider
     * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
     * @for Slider
     * @example
     * var sl = new Slider(elem);
     * sl.prev();
     */
    sliderProto.prev = function(dis) {
    
        if (this._isSliding) {return this;}
    
        dis = dis || 1;
        var _self = this;
        var mode = _oppositeMode[this._config.mode];
        var func = _modeFunc[mode];
        var slideIn = null, slideOut = null;
    
        if(this._config.mode < 4){
            slideIn = this._ol;
            if(!this._config.loop  && this._index === 1){
                slideIn = null;
            }
        }
        else{
            //从末尾取图片
            slideIn = this._lis[this._lis.length - this._index + dis];
            //从头开始
            if(this._config.loop && this._index === 1){
                slideIn = this._lis[0];
            }
    
            slideOut = this._lis[this._lis.length - this._index];
    
            //动画在最前
            slideIn.style.visibility = slideOut.style.visibility = "visible";
            //其他的在后面
            for(var i=0;i<this._lis.length;i++){
                if(this._lis[i] !== slideIn && this._lis[i] !== slideOut){
                    this._lis[i].style.visibility = "hidden";
                }
            }
        }
        
        if (slideIn) {
            this._aniIn.setElement(slideIn);
            //清空关键帧
            this._aniIn.resetKeyFrames();
            
            if(slideOut){
                this._aniOut.setElement(slideOut);
                this._aniOut.resetKeyFrames();
                func.call(this, slideIn, slideOut);
                
            }
            else{
                func.call(this, slideIn, this._index, dis);
            }
            this._aniIn.start({
                timing: this._config.timing
            });
            this._aniOut.start({
                timing: this._config.timing
            });
            
            this._isSliding = true;
            var time = setTimeout(function() {
                _self._isSliding = false;
    
                clearTimeout(time);
    
                _self._aniIn.reset();
                if(slideOut){
                    _self._aniOut.reset();
                }
    
                _self._index -= dis;
                if (_self._index < 1){
                    _self._index = _self._lis.length;
                }
    
                if (_self._events.slideend) {
                    _self._events.slideend.forEach(function(func) {
                        if (func) {func(_self._index, "prev");}
                    });
                }
            }, this._config.duration + 80);
    
            if (_self._events.slidestart) {
                _self._events.slidestart.forEach(function(func) {
                    if (func) {func(_self._index, "prev");}
                });
            }
        }
        return this;
    };
    
    /**
     * 下（一/n）个画面
     * @method next
     * @param {number} dis 如果dis大于等于1则表示下dis个画面
     * @return {Object} Slider
     * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
     * @for Slider
     * @example
     * var sl = new Slider(elem);
     * sl.next();
     */
    sliderProto.next = function(dis) {
        slide.call(this, dis);
        return this;
    };
    
    
    /**
     * 轮播至指定的画面
     * @method slideTo
     * @param {Number} index 从1开始
     * @return {Object} Slider
     * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
     * @for Slider
     * @example
     * var sl = new Slider(elem);
     * sl.slideTo(2);
     */
    sliderProto.slideTo = function(index) {
        if (!this.isPaused) {
            index = index * 1;
    
            if (index > 0 && index <= this._lis.length) {
                var dis = index - this._index;
                this.pause();
    
                if(dis > 0){
                    this.next(dis);
                } else if (dis < 0) {
                    this.prev(-dis);
                } else {
                    //点击自己，无动作
                    this.isPaused = false;
                    return this;
                }
            }
    
            var _self = this;
            var func = function() {
                _self.play().off("slideend", func);
            };
            this.on("slideend", func);
        }
        return this;
    };
     /**
      * slider.js
      * slider触屏模块，提供触屏的滑动功能
      */
    
    /**
     * 绑定touch事件来处理触屏设备
     * @method touchToSlide
     * @param {Dom} elem
     * @return {Object} Slider
     * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
     * @for Slider
     * @example
     * var ani = new Animate();
     * ani.touchToSlide();
     */
    
    
    sliderProto.touchToSlide = function() {
        var touchStart = false;
        var startPos = null;
        var self = this;
    
        var slideIn = null;
        var isTouchMove = false;
        var touchevt = null;
        var i = 0;
        var arrangedOne = false,arrangedLast = false;
    
        var moveImage = function() {
            var length,index,clientWidth,clientHeight;
            //滑动过程
            if (touchevt.changedTouches.length && startPos) {
                var disX = touchevt.changedTouches[0].clientX - startPos.x;
                var disY = touchevt.changedTouches[0].clientY - startPos.y;
                //左右移动
                if (self._config.mode === 0 || self._config.mode === 1) {
                    //判断slideIn
                    if (!slideIn) {
                        slideIn = self._ol;
                    }
                    //这里不关心动画方式，使用transform移动
                    if (slideIn) {
                        clientWidth = slideIn.children[0].clientWidth;
                        length = slideIn.children.length;
                        index = self._index;
    
                        if (disX > 0) {
                            //重新排列图片，仅一次
                            if(index === 1 && !self._config.loop){
                                touchStart = false;
                                return;
                            }
                            if(index === 1){
                                //移动图片
                                if(!arrangedOne){
                                    for(i=0;i<length;i++){
                                        self._ol.children[i].style[self.transformCSS] = "translateX("+clientWidth*i+"px) translateZ(0)";
                                    }
                                    self._ol.children[length-1].style[self.transformCSS] = "translateX("+(-clientWidth)+"px) translateZ(0)";
                                    arrangedOne = true;
                                }
                            }
                            else if(index === length){
                                if(!arrangedLast){
                                    for(i=0;i<length;i++){
                                        self._ol.children[i].style[self.transformCSS] = "translateX("+clientWidth*i+"px) translateZ(0)";
                                    }
                                    arrangedLast = true;
                                }
                            }
    
                            //transform
                            slideIn.style[self.transformCSS] = "translateX(" + parseInt(clientWidth*(1-self._index) + disX) + "px) translateZ(0)";
    
                        } else if (disX < 0) {
                            if(index === length && !self._config.loop){
                                touchStart = false;
                                return;
                            }
                            //重新排列图片，仅一次
                            if(index === length){
                                if(!arrangedLast){
                                    //移动图片
                                    for(i=0;i<length;i++){
                                        self._ol.children[i].style[self.transformCSS] = "translateX("+clientWidth*i+"px) translateZ(0)";
                                    }
                                    self._ol.children[0].style[self.transformCSS] = "translateX("+clientWidth*length+"px) translateZ(0)";
                                }
                            }
                            else if(index === 1){
                                if(!arrangedOne){
                                    for(i=0;i<length;i++){
                                        self._ol.children[i].style[self.transformCSS] = "translateX("+clientWidth*i+"px) translateZ(0)";
                                    }
                                    arrangedOne = true;
                                }
                            }
    
                            //transform
                            slideIn.style[self.transformCSS] = "translateX(" + parseInt(clientWidth*(1-self._index) + disX) + "px) translateZ(0)";
                        }
                    }
                } else if (self._config.mode === 2 || self._config.mode === 3) {
                    //上下移动
                    //判断slideIn
                    if (!slideIn) {
                        slideIn = self._ol;
                    }
                    
                    if (slideIn) {
                        clientHeight = slideIn.children[0].clientHeight;
                        length = slideIn.children.length;
                        index = self._index;
    
                        if (disY > 0) {
                            if(index === 1 && !self._config.loop){
                                touchStart = false;
                                return;
                            }
                            //重新排列图片，仅一次
                            if(index === 1){
                                //移动图片
                                if(!arrangedOne){
                                    for(i=0;i<length;i++){
                                        self._ol.children[i].style[self.transformCSS] = "translateY("+clientHeight*i+"px) translateZ(0)";
                                    }
                                    self._ol.children[length-1].style[self.transformCSS] = "translateY("+(-clientHeight)+"px) translateZ(0)";
                                    arrangedOne = true;
                                }
                            }
                            else if(index === length){
                                if(!arrangedLast){
                                    for(i=0;i<length;i++){
                                        self._ol.children[i].style[self.transformCSS] = "translateY("+clientHeight*i+"px) translateZ(0)";
                                    }
                                    arrangedLast = true;
                                }
                            }
    
                            slideIn.style[self.transformCSS] = "translateY(" + parseInt(clientHeight*(1-self._index) + disY) + "px) translateZ(0)";
                        } else if (disY < 0) {
                            if(index === length && !self._config.loop){
                                touchStart = false;
                                return;
                            }
                            //重新排列图片，仅一次
                            if(index === length){
                                if(!arrangedLast){
                                    //移动图片
                                    for(i=0;i<length;i++){
                                        self._ol.children[i].style[self.transformCSS] = "translateY("+clientHeight*i+"px) translateZ(0)";
                                    }
                                    self._ol.children[0].style[self.transformCSS] = "translateY("+clientHeight*length+"px) translateZ(0)";
                                }
                            }
                            else if(index === 1){
                                if(!arrangedOne){
                                    for(i=0;i<length;i++){
                                        self._ol.children[i].style[self.transformCSS] = "translateY("+clientHeight*i+"px) translateZ(0)";
                                    }
                                    arrangedOne = true;
                                }
                            }
    
    
                            slideIn.style[self.transformCSS] = "translateY(" + parseInt(clientHeight*(1-self._index) + disY) + "px) translateZ(0)";
                        }
                    }
                }
            }
        };
    
    
        var touchstart = function(evt) {
            //滑动开始
            if (self._config.mode === 0 || self._config.mode === 1 ||
                self._config.mode === 2 || self._config.mode === 3 ||
                self._config.mode === 5 || self._config.mode === 6 ||
                self._config.mode === 7 || self._config.mode === 8) {
    
                if (!self._isSliding) {
                    self.pause();
                    touchStart = true;
                    startPos = {
                        x: evt.changedTouches[0].clientX,
                        y: evt.changedTouches[0].clientY
                    };
                }
    
                arrangedLast = arrangedOne = false;
                evt.preventDefault();
            }
        };
    
        var touchmove = function(evt) {
            if (startPos && touchStart) {
                touchevt = evt;
                if (!isTouchMove) {
                    var aniFunc = function() {
                        moveImage();
                        if (!isTouchMove) {
                            isTouchMove = true;
                        }
                        //touchend的时候就不再请求下一帧动画
                        if (startPos && touchStart) {
                            window.requestAnimationFrame(aniFunc);
                        } else {
                            isTouchMove = false;
                        }
                    };
                    aniFunc();
                }
                evt.preventDefault();
            }
        };
    
        var touchend = function(evt) {
            //滑动结束
            if (startPos && touchStart) {
                if(slideIn){
                    var disX = evt.changedTouches[0].clientX - startPos.x;
                    var disY = evt.changedTouches[0].clientY - startPos.y;
                    var percent = 1;
                    var offset = 0.5;
                    var clientWidth = 0,clientHeight=0;
                    var canNext = true, canPrev = true, can = true;
    
                    var clearAnimation = function() {
                        clearTimeout(time);
                        self._aniIn.reset();
                        slideIn = null;
    
                        self._isSliding = false;
                        self.play();
                    };
                    var startAnimation = function() {
                        //开始动画
                        self._aniIn.start({
                            timing: self._config.timing
                        });
    
                        self._isSliding = true;
                    };
                    var setKeyframes = function(percent, frameIn2Trans) {
                        var frameIn1=null,frameIn2=null;
    
                        frameIn1 = {
                            point: 0
                        };
                        frameIn1[self.transformCSS] = slideIn.style[self.transformCSS];
                        frameIn2 = {
                            point: self._config.duration * percent
                        };
                        frameIn2[self.transformCSS] = frameIn2Trans;
    
                        return {
                            frameIn: [frameIn1, frameIn2]
                        };
                    };
    
                    self._aniIn.setElement(slideIn);
                    self._aniIn.clear();
    
                    var frames,time;
    
                    if(!self._config.loop){
                        if(self._index >= self._lis.length){
                            canNext = false;
                        }
                        if(self._index <= 1){
                            canPrev = false;
                        }
                    }
                    if (self._config.mode === 0 || self._config.mode === 1) {
                        clientWidth = slideIn.children[0].clientWidth;
                        offset = self._config.nextSlideOffset < 1 ? clientWidth*self._config.nextSlideOffset:self._config.nextSlideOffset;
                        //继续判断是否需要切换下一张图片
                        if (disX < 0) {
                            can = self._config.mode === 0 ? canNext : canPrev;
                            //下一张图片
                            if (Math.abs(disX) > offset) {
                                percent = (clientWidth - Math.abs(disX)) / clientWidth;
                                //向左滑动
                                //设置关键帧动画
                                //这里只支持transform
                                frames = setKeyframes(percent, "translateX(" + clientWidth*(-self._index) + "px) translateZ(0)", "translateX(" + clientWidth*(1-self._index) + "px) translateZ(0)");
                                self._aniIn.keyframe(frames.frameIn);
    
                                startAnimation();
    
                                time = setTimeout(function() {
                                    //动画结束
                                    self._index += 1;
                                    if (self._index > self._lis.length){
                                        if(self._config.loop){
                                            self._index = 1;
                                        }
                                        else{
                                            self._index = self._lis.length;
                                        }
                                    }
                                
                                    //清理动画
                                    clearAnimation();
    
                                    if (self._events["slideend"]) {
                                        self._events["slideend"].forEach(function(func) {
                                            if(func) {func(self._index, "prev");}
                                        });
                                    }
                                }, self._config.duration * percent + 80);
                            } else {
                                percent = Math.abs(disX) /clientWidth;
                                //还原
                                //设置关键帧动画
                                frames = setKeyframes(percent, "translateX(" +  clientWidth*(1-self._index) + "px) translateZ(0)", "translateX(" + clientWidth*(-self._index) + "px) translateZ(0)");
                                self._aniIn.keyframe(frames.frameIn);
                                startAnimation();
    
                                time = setTimeout(function() {
                                    
                                    //清理动画
                                    clearAnimation();
                                }, self._config.duration * percent + 80);
                            }
                        } else if (disX > 0) {
                            //向右滑动
                            //下一张图片
                            can = self._config.mode === 1 ? canNext : canPrev;
                            if (can && Math.abs(disX) > offset) {
                                percent = (clientWidth - Math.abs(disX)) / clientWidth;
    
                                //设置关键帧动画
                                frames = setKeyframes(percent, "translateX(" + clientWidth*(2-self._index) + "px) translateZ(0)", "translateX(" + clientWidth*(1-self._index) + "px) translateZ(0)");
                                self._aniIn.keyframe(frames.frameIn);
    
                                //开始动画
                                startAnimation();
    
                                time = setTimeout(function() {
    
                                    self._index -= 1;
                                    if (self._index < 1){
                                        if(self._config.loop){
                                            self._index = self._lis.length;
                                        }else{
                                            self._index = 1;
                                        }
                                        
                                    }
                                    
                                    //清理动画
                                    clearAnimation();
                                    if (self._events["slideend"]) {
                                        self._events["slideend"].forEach(function(func) {
                                            if(func) {func(self._index, "prev");}
                                        });
                                    }
                                }, self._config.duration * percent + 80);
                            } else {
                                percent = Math.abs(disX) / clientWidth;
                                //还原
    
                                //设置关键帧动画
                                frames = setKeyframes(percent, "translateX(" + clientWidth*(1-self._index) + "px) translateZ(0)", "translateX(" + clientWidth*(2-self._index) + "px) translateZ(0)");
                                self._aniIn.keyframe(frames.frameIn);
    
                                //开始动画
                                startAnimation();
    
                                time = setTimeout(function() {
                                    //清理动画
                                    
                                    clearAnimation();
                                }, self._config.duration * percent + 80);
                            }
                        }
                    } else if (self._config.mode === 2 || self._config.mode === 3) {
                        clientHeight = slideIn.children[0].clientHeight;
                        offset = self._config.nextSlideOffset < 1 ?  clientHeight*self._config.nextSlideOffset:self._config.nextSlideOffset;
                        //上下滑动
                        if (disY < 0) {
                            can = self._config.mode === 2 ? canNext : canPrev;
                            //下一张图片
                            if (can && Math.abs(disY) > offset) {
                                percent = (clientHeight - Math.abs(disY)) / clientHeight;
                                //向上滑动
                                //设置关键帧动画
                                frames = setKeyframes(percent, "translateY(" + clientHeight*(-self._index) + "px) translateZ(0)", "translateY(" + clientHeight*(1-self._index) + "px) translateZ(0)");
                                self._aniIn.keyframe(frames.frameIn);
    
                                startAnimation();
    
                                time = setTimeout(function() {
                                    //动画结束
                                    self._index += 1;
                                    if (self._index > self._lis.length){
                                        if(self._config.loop){
                                            self._index = 1;
                                        }
                                        else{
                                            self._index = self._lis.length;
                                        }
                                    }
                                    
                                    clearAnimation();
                                    if (self._events["slideend"]) {
                                        self._events["slideend"].forEach(function(func) {
                                            if(func) {func(self._index, "prev");}
                                        });
                                    }
                                }, self._config.duration * percent + 80);
                            } else {
                                percent = Math.abs(disY) / clientHeight;
    
                                //设置关键帧动画
                                frames = setKeyframes(percent, "translateY(" +  clientHeight*(1-self._index) + "px) translateZ(0)", "translateY(" + clientHeight*(-self._index) + "px) translateZ(0)");
                                self._aniIn.keyframe(frames.frameIn);
    
                                startAnimation();
    
                                time = setTimeout(function() {
                                    
                                    //清理动画
                                    clearAnimation();
                                }, self._config.duration * percent + 80);
                            }
                        } else if (disY > 0) {
                            //向下滑动
                            can = self._config.mode === 3 ? canNext : canPrev;
                            //下一张图片
                            if (can && Math.abs(disY) > offset) {
                                percent = (clientHeight - Math.abs(disY)) / clientHeight;
    
                                //设置关键帧动画
                                frames = setKeyframes(percent, "translateY(" + clientHeight*(2-self._index) + "px) translateZ(0)", "translateY(" + clientHeight*(1-self._index) + "px) translateZ(0)");
                                self._aniIn.keyframe(frames.frameIn);
    
                                //开始动画
                                startAnimation();
    
                                time = setTimeout(function() {
                                    self._index -= 1;
                                    if (self._index < 1){
                                        if(self._config.loop){
                                            self._index = self._lis.length;
                                        }else{
                                            self._index = 1;
                                        }
                                    }
                                    
                                    //清理动画
                                    clearAnimation();
    
                                    if (self._events["slideend"]) {
                                        self._events["slideend"].forEach(function(func) {
                                            if(func) {func(self._index, "prev");}
                                        });
                                    }
                                }, self._config.duration * percent + 80);
                            } else {
                                percent = Math.abs(disY) / clientHeight;
                                //还原
    
                                //设置关键帧动画
                                frames = setKeyframes(percent, "translateY(" + clientHeight*(1-self._index) + "px) translateZ(0)", "translateY(" + clientHeight*(2-self._index) + "px) translateZ(0)");
                                self._aniIn.keyframe(frames.frameIn);
                                //开始动画
                                startAnimation();
    
                                time = setTimeout(function() {
                                    
                                    clearAnimation();
                                }, self._config.duration * percent + 80);
                            }
                        }
                    }
                }
                touchStart = false;
                startPos = null;
            }
            evt.preventDefault();
        };
    
        if (window.navigator.msPointerEnabled) {
            this._ol.addEventListener("MSPointerDown", touchstart, false);
            this._ol.addEventListener("MSPointerMove", touchstart, false);
            this._ol.addEventListener("MSPointerUp", touchend, false);
        }
        this._ol.addEventListener("touchstart", touchstart);
        this._ol.addEventListener("touchmove", touchmove);
        this._ol.addEventListener("touchend", touchend);
    
        return this;
    };

    return Slider;
})();