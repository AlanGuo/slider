'use strict';
(function(C){var D=0,f=window.performance||{};Function.bind||(Function.prototype.bind=function(){var a=this,c=Array.prototype.slice.call(arguments),b=c.shift();return function(){return a.apply(b,c.concat(Array.prototype.slice.call(arguments)))}});var d=function(a){return function(){for(var c=document.createElement("div").style,b=a.prefix.split(","),e,d=0,f=b.length;d<f;d++)if(e=b[d]+a.words,e in c)return b[d].substr(0,b[d].length-1);return!1}},e=function(a,c){var b=c();if(""===b)return a;a=a.charAt(0).toUpperCase()+
a.substr(1);return b+a},F=function(a,c){var b=c();if(""===b)return a;a=a.charAt(0)+a.substr(1);return b+a},G=d({prefix:"r,webkitR,MozR,msR,OR",words:"equestAnimationFrame"}),z=d({prefix:"t,webkitT,MozT,msT,OT",words:"ransform"}),g=d({prefix:"t,webkitT,MozT,msT,OT",words:"ransition"}),k=d({prefix:"a,webkitA,MozA,msA,OA",words:"nimation"}),H=d({prefix:"a,-webkit-a,-moz-a,-ms-a,-o-a",words:"nimation"}),s=function(a,c,b){a.addEventListener?a.addEventListener(c,b,!1):a.attachEvent("on"+c,function(){b.call(a,
window.event)})},A=function(a,c){for(var b in c)a[b]=c[b];return a},B=function(a,c){if(a.indexOf)return a.indexOf(c);for(var b=0,e;e=a[b];b++)if(e===c)return b;return-1},t=window[e("requestAnimationFrame",G)]||function(a){setTimeout(a,17)},d=document.createElement("style");d.setAttribute("id","ex_animate_style");d.type="text/css";document.getElementsByTagName("head")[0].appendChild(d);d=function(){this._init.apply(this,arguments)};d.prototype={css:document.getElementById("ex_animate_style"),_keywords:["point",
"timing"],_events:[],_method:null,_currentFrame:0,_needStop:!1,_init:function(a,c){c=c||{};this.elem=a;this.options=A({},c);this.events={};this.keyframes=[];this.keyframesString=[];this.uniqId=++D;var b=document.createElement("div").style;e("transform",z);var d=e("transition",g),f=e("animation",k);d in b&&(this.options.transition=!0);f in b&&(this.options.animation=!0);this.options.animation&&(b=document.createTextNode(""),this.css.appendChild(b),this.keyframeElement=b)},setElement:function(a){this.elem=
a;return this},_getProperty:function(a){var c={},b;for(b in a)-1==B(this._keywords,b)&&(c[b]=a[b]);return c},keyframe:function(a){this.keyframes=this.keyframes.concat(a);return this},resetKeyFrames:function(){this.keyframes=[];return this},reset:function(){this.keyframes=[];this.elem.style[e("animation",k)]="";this.elem.style[e("transitionProperty",g)]="";this.elem.style[e("transitionTimingFunction",g)]="";this.elem.style[e("transitionDuration",g)]="";return this},start:function(a){var c=this;this._startOpt=
a=this._startOpt||A({timing:"linear"},a);null==this._startOpt.repeat&&(this._startOpt.repeat=1);this._startOpt.repeat*=1;this._startOpt.delay=this._startOpt.delay||"0s";var b=function(c){var a="{",b=0,e;for(e in c)0<b++&&(a+=";"),a=a+e+":"+c[e];return a+"}"};this._currentFrame=0;var d=function(){for(var d=this.keyframes[this.keyframes.length-1].point,f="key"+this.uniqId,l="{",g=0,n;n=this.keyframes[g];g++)l+=Math.round(n.point/d*100)+"% "+b(this._getProperty(n));l+="}";l="@"+F("keyframes",H)+" "+
f+l;l!=this.keyframeElement.data&&(this.keyframeElement.data=l);this.elem.style[e("animation",k)]=f+" "+d+"ms "+a.timing;var d=this._getProperty(this.keyframes[this.keyframes.length-1]),x;for(x in d)this.elem.style[x]=d[x];this._startOpt.repeat&&(this.elem.style[e("animationIterationCount",k)]=this._startOpt.repeat);this._startOpt.delay&&(this.elem.style[e("animationDelay",k)]=this._startOpt.delay);this._startOpt.direction&&(this.elem.style[e("animationDirection",k)]=this._startOpt.direction);s(this.elem,
e("animationEnd",k),function(a){c.events.animationEnd&&c.events.animationEnd.bind(c)(a)})},q=function(){var b=this._currentFrame,d=function(c,b){for(var d=[c,b],f=[],l=0;1>=l;l++){var n=this._getProperty(d[l]),h;for(h in n)-1==B(f,h)&&f.push(h)}this.elem.style[e("transitionDuration",g)]=0;d=this._getProperty(c);for(h in d)this.elem.style[h]=d[h];this.elem.style[e("transitionProperty",g)]=f.join(",");this.elem.style[e("transitionTimingFunction",g)]=a.timing;a.accelerate&&(this.elem.style[e("transform",
z)]="translateZ(0)");this.elem.offsetWidth;this.elem.style[e("transitionDuration",g)]=(b.point-c.point)/1E3+"s";f=this._getProperty(b);for(h in f)this.elem.style[h]=f[h]};if(1==this.keyframes.length){var f=this.keyframes[0];0<f.point&&this.keyframes.unshift({point:0})}if(1<this.keyframes.length){var f=this.keyframes[0],k=this.keyframes[1],n=e("transitionDelay",g);d.bind(this)(f,k);c._startOpt.delay&&(c.elem.style[n]=c._startOpt.delay);b++;s(this.elem,e("transitionend",g),function(a){!c.keyframes[b+
1]&&1<c._startOpt.repeat&&(b=0,/number/i.test(typeof c._startOpt.repeat)&&c._startOpt.repeat--);if(c.keyframes[b+1]){a=c.keyframes[b];var e=c.keyframes[b+1];0!==c.elem.style[n]&&(c.elem.style[n]=0);d.bind(c)(a,e);b++}else c.events.animationEnd&&c.events.animationEnd.bind(c)(a)})}},r=function(){var a=0,b=this._startOpt.delay.replace?1*this._startOpt.delay.replace(/[^\.\d]/g,""):this._startOpt.delay,d=function(e,g){var k=[],p=this._getProperty(e),u=this._getProperty(g),m;for(m in p)if(null!=u[m]){if(/[\(\)]/.test(p[m])){console.error("time\u6a21\u5f0f\u4e0d\u652f\u6301\u8fd9\u79cd\u6837\u5f0f:"+
p[m]+"\uff0c\u8bf7\u4f7f\u7528animation\u6216\u8005transition\u6a21\u5f0f");return}var s=parseFloat(p[m].toString().replace(/[^\d+]/g,"")),E=parseFloat(u[m].toString().replace(/[^\d+]/g,""));k.push({prop:m,start:s,end:E,unit:("0"==u[m]?p[m]:u[m]).toString().replace(/[\D]*\d+(?=[a-z]*)/gi,"")})}var h=function(a){for(var c=0,b;b=k[c];c++)if(-1==a)/opacity/i.test(b.prop)&&(this.elem.style.filter="alpha(opacity="+100*b.end+")"),this.elem.style[b.prop]=b.end+b.unit;else{var d=(b.start+(b.end-b.start)*
a).toFixed(1);/opacity/i.test(b.prop)&&(this.elem.style.filter="alpha(opacity="+100*d+")");this.elem.style[b.prop]=d+b.unit}},q=function(){this.keyframes[a+1]?(d.bind(this)(this.keyframes[a],this.keyframes[a+1]),a++):1<this._startOpt.repeat?/number/i.test(typeof this._startOpt.repeat)&&(this._startOpt.repeat--,a=0,q.call(this)):c.events.animationEnd&&c.events.animationEnd.bind(c)()};h.bind(this)(0);1==this.keyframes.length&&(e=this.keyframes[0],0<e.point&&this.keyframes.unshift({point:0}));var r=
g.point-e.point,y=0,w=function(){var a=(f.now?f.now():+new Date)-v-y;h.bind(c)(a/r);if(a<r)if(c._needStop){var b=f.now?f.now():+new Date;y=0;c._continueFunc=function(){y=(f.now?f.now():+new Date)-b;t(w)}}else t(w);else h.bind(c)(-1),q.bind(c)()},v=0;this._startOpt.delay&&!this._isDelayed?(f.now?v=f.now()+1E3*b:(p=new Date,v=+p.setMilliseconds(p.getMilliseconds()+1E3*b)),setTimeout(function(){c._isDelayed=!0;t(w)},1E3*b)):(v=f.now?f.now():+new Date,t(w))};this._currentFrame=a;d.bind(this)(this.keyframes[a],
this.keyframes[a+1]);a++};if(a.method)switch(a.method){case "animation":this.options.animation?d.bind(this)():console.error("your browser does not support animation method.");break;case "transition":this.options.transition?q.bind(this)():console.error("your browser does not support transition method.");break;case "time":r.bind(this)()}else this.options.transition?q.bind(this)():this.options.animation?d.bind(this)():r.bind(this)();return this},clear:function(){for(var a=0,c=this.keyframes.length;a<
c;a++){var b=this._getProperty(this.keyframes[a]),d;for(d in b)this.elem.style[d]=""}return this},on:function(a,c){"animationend"==a?this.events.animationEnd=c:s(this.elem,a,c);return this},stop:function(){this._needStop=!0;this._currentFrame=0;return this},pause:function(){this._needStop=!0;return this},continuePlay:function(){!0==this._needStop&&(this._startOpt&&"time"==this._startOpt.method?(this._needStop=!1,this._continueFunc&&this._continueFunc(),this._continueFunc=null):(this._needStop=!1,
this.clear(),this.start()));return this}};C.Animate=d})(window);
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