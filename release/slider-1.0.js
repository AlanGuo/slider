(function(exports){var unid=0;var vendors="t,webkitT,MozT,msT,OT".split(",");var vendorsCSS="t,-webkit-t,-moz-t,-ms-t,-o-t".split(",");var performance=window.performance||{};if(!Function.bind)Function.prototype.bind=function(){var __method=this;var args=Array.prototype.slice.call(arguments);var object=args.shift();return function(){return __method.apply(object,args.concat(Array.prototype.slice.call(arguments)))}};var judge=function(vendors){var dummyStyle=document.createElement("div").style;var v=
"t,webkitT,MozT,msT,OT".split(","),t,i=0,l=vendors.length;for(;i<l;i++){t=v[i]+"ransform";if(t in dummyStyle)return vendors[i].substr(0,vendors[i].length-1)}return false};var prefixStyle=function(style){var vendor=judge(vendors);if(vendor==="")return style;style=style.charAt(0).toUpperCase()+style.substr(1);return vendor+style};var prefixCSS=function(style){var vendor=judge(vendorsCSS);if(vendor==="")return style;style=style.charAt(0)+style.substr(1);return vendor+style};var bindEvt=function(elem,
event,handler){if(elem.addEventListener)elem.addEventListener(event,handler,false);else elem.attachEvent("on"+event,function(){handler.call(elem,window.event)})};var extend=function(obj,ext){for(var p in ext)obj[p]=ext[p];return obj};var indexOf=function(array,item){if(array.indexOf)return array.indexOf(item);else{for(var i=0,p;p=array[i];i++)if(p===item)return i;return-1}};var requestAnimationFrame=window[prefixStyle("requestAnimationFrame")]||function(callback){setTimeout(callback,17)};var cssAnimation=
document.createElement("style");cssAnimation.setAttribute("id","ex_animate_style");cssAnimation.type="text/css";document.getElementsByTagName("head")[0].appendChild(cssAnimation);var Animate=function(){this._init.apply(this,arguments)};Animate.prototype={css:document.getElementById("ex_animate_style"),_keywords:["point","timing"],_events:[],_method:null,_currentFrame:0,_needStop:false,_init:function(elem,opts){opts=opts||{};this.elem=elem;this.options=extend({},opts);this.events={};this.keyframes=
[];this.keyframesString=[];this.uniqId=++unid;var dummyStyle=document.createElement("div").style;var transform=prefixStyle("transform");var transition=prefixStyle("transition");var animation=prefixStyle("animation");if(transition in dummyStyle)this.options.transition=true;if(animation in dummyStyle)this.options.animation=true;if(this.options.animation){var rules=document.createTextNode("");this.css.appendChild(rules);this.keyframeElement=rules}},setElement:function(elem){this.elem=elem;return this},
_getProperty:function(frame){var obj={};for(var p in frame)if(indexOf(this._keywords,p)==-1)obj[p]=frame[p];return obj},keyframe:function(frames){this.keyframes=this.keyframes.concat(frames);return this},reset:function(){this.keyframes=[];this.elem.style[prefixStyle("animation")]="";this.elem.style[prefixStyle("transitionProperty")]="";this.elem.style[prefixStyle("transitionTimingFunction")]="";this.elem.style[prefixStyle("transitionDuration")]="";return this},start:function(opt){var self=this;opt=
this._startOpt||extend({timing:"linear"},opt);this._startOpt=opt;var object2String=function(obj){var str="{",j=0;for(var i in obj){if(j++>0)str+=";";str=str+i+":"+obj[i]}return str+"}"};this._currentFrame=0;var aniFunction=function(){var duration=this.keyframes[this.keyframes.length-1].point;var keyFrameName="key"+this.uniqId;var aniString="{";for(var i=0,f;f=this.keyframes[i];i++)aniString+=Math.round(f.point/duration*100)+"% "+object2String(this._getProperty(f));aniString+="}";var data="@"+prefixCSS("keyframes")+
" "+keyFrameName+aniString;if(data!=this.keyframeElement.data)this.keyframeElement.data=data;this.elem.style[prefixStyle("animation")]=keyFrameName+" "+duration+"ms "+opt.timing;var lastFrame=this._getProperty(this.keyframes[this.keyframes.length-1]);for(var p in lastFrame)this.elem.style[p]=lastFrame[p];bindEvt(this.elem,prefixStyle("animationEnd"),function(evt){self.events.animationEnd&&self.events.animationEnd.bind(self)(evt)})};var transFunction=function(){var iteration=this._currentFrame;var trans=
function(frame1,frame2){var frames=[frame1,frame2];var property=[];for(var j=0;j<=1;j++){var frame=this._getProperty(frames[j]);for(var p in frame)if(indexOf(property,p)==-1)property.push(p)}this.elem.style[prefixStyle("transitionDuration")]=0;var firstFrame=this._getProperty(frame1);for(var p in firstFrame)this.elem.style[p]=firstFrame[p];this.elem.style[prefixStyle("transitionProperty")]=property.join(",");this.elem.style[prefixStyle("transitionTimingFunction")]=opt.timing;if(opt.accelerate)this.elem.style[prefixStyle("transform")]=
"translateZ(0)";var _this=this;var time=setTimeout(function(){_this.elem.style[prefixStyle("transitionDuration")]=(frame2.point-frame1.point)/1E3+"s";var secondFrame=_this._getProperty(frame2);for(var p in secondFrame)_this.elem.style[p]=secondFrame[p];clearTimeout(time)},100)};if(this.keyframes.length==1){var frame1=this.keyframes[0];if(frame1.point>0)this.keyframes.unshift({point:0})}if(this.keyframes.length>1){var frame1=this.keyframes[0];var frame2=this.keyframes[1];trans.bind(this)(frame1,frame2);
iteration++;bindEvt(this.elem,"transitionend",function(evt){if(self.keyframes[iteration+1]){var frame1=self.keyframes[iteration];var frame2=self.keyframes[iteration+1];trans.bind(self)(frame1,frame2);iteration++}else self.events.animationEnd&&self.events.animationEnd.bind(self)(evt)})}};var timeFunction=function(){var iteration=0;var trans=function(frame1,frame2){var property=[];var interval=[];var unit=[];var ratio=0;var prop1=this._getProperty(frame1);var prop2=this._getProperty(frame2);for(var p in prop1)if(prop2[p]!=
null){var start=parseFloat(prop1[p].toString().replace(/[^\d+-]/g,""));var end=parseFloat(prop2[p].toString().replace(/[^\d+-]/g,""));property.push({prop:p,start:start,end:end,unit:(prop2[p]=="0"?prop1[p]:prop2[p]).toString().replace(/[\D]*\d+(?=[a-z]*)/gi,"")})}var setValue=function(ratio){for(var i=0,p;p=property[i];i++)if(ratio==-1){if(/opacity/i.test(p.prop))this.elem.style["filter"]="alpha(opacity="+p.end*100+")";this.elem.style[p.prop]=p.end+p.unit}else{var value=(p.start+(p.end-p.start)*ratio).toFixed(1);
if(/opacity/i.test(p.prop))this.elem.style["filter"]="alpha(opacity="+value*100+")";this.elem.style[p.prop]=value+p.unit}};var animationEnd=function(){if(this.keyframes[iteration+1]){trans.bind(this)(this.keyframes[iteration],this.keyframes[iteration+1]);iteration++}else self.events.animationEnd&&self.events.animationEnd.bind(self)()};setValue.bind(this)(0);if(this.keyframes.length==1){var frame1=this.keyframes[0];if(frame1.point>0)this.keyframes.unshift({point:0})}var maxDuration=frame2.point-frame1.point;
var pauseTime=0;var nextFrame=function(){var drawStart=performance.now?performance.now():+new Date;var pass=drawStart-startTime-pauseTime;setValue.bind(self)(pass/maxDuration);if(pass<maxDuration)if(!self._needStop)requestAnimationFrame(nextFrame);else{var pauseTimePoint=performance.now?performance.now():+new Date;pauseTime=0;self._continueFunc=function(){pauseTime=(performance.now?performance.now():+new Date)-pauseTimePoint;requestAnimationFrame(nextFrame)}}else{setValue.bind(self)(-1);animationEnd.bind(self)()}};
var startTime=performance.now?performance.now():+new Date;requestAnimationFrame(nextFrame)};this._currentFrame=iteration;trans.bind(this)(this.keyframes[iteration],this.keyframes[iteration+1]);iteration++};if(opt.method)switch(opt.method){case "animation":if(this.options.animation)aniFunction.bind(this)();else console.log("your browser does not support animation method.");break;case "transition":if(this.options.transition)transFunction.bind(this)();else console.log("your browser does not support transition method.");
break;case "time":timeFunction.bind(this)();break}else if(this.options.transition)transFunction.bind(this)();else if(this.options.animation)aniFunction.bind(this)();else timeFunction.bind(this)();return this},clear:function(){for(var i=0,length=this.keyframes.length;i<length;i++){var frame=this._getProperty(this.keyframes[i]);for(var p in frame)this.elem.style[p]=""}return this},on:function(event,cb){if(event=="animationend")this.events.animationEnd=cb;else bindEvt(this.elem,event,cb);return this},
stop:function(){this._needStop=true;this._currentFrame=0;return this},pause:function(){this._needStop=true;return this},continuePlay:function(){if(this._needStop==true)if(this._startOpt&&this._startOpt.method=="time"){this._needStop=false;this._continueFunc&&this._continueFunc();this._continueFunc=null}else{this._needStop=false;this.clear();this.start()}return this}};exports.Animate=Animate})(window);

/**
 * 一个前卫，时尚的图片轮播库，提供数种炫酷的轮播效果，适用于时尚的大图轮播网站，使用html5使性能体验达到最佳，支持移动端，而且本库不依赖任何第三方库，轻便易用。
 * @project
 * @name Slider
 * @subtitle v1.0
 * @download http://115.29.195.88:82/release/slider-1.0.min.js
 * @uncompressdownload http://115.29.195.88:82/release/slider-1.0.js
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
        
 * ###触屏设备###
 *       //支持触摸设备
 *       sl1.touchToSlide();
 * @author alandlguo
 * @2013/10/14
 */

/* exported Slider */
"use strict";
var Slider = (function() {
    //direction:0-从右往左, 1-从左往右, 2-从下往上，3-从上往下，4-fadeout/fadein,5-3d向上翻转，6-3d向下翻转
    //5,6暂时只支持webkit内核浏览器
    var vendorsCSS = "t,-webkit-t,-moz-t,-ms-t,-o-t".split(",");
    var judge = function(vendors) {
        var dummyStyle = document.createElement("div").style;
        var v = "t,webkitT,MozT,msT,OT".split(","),
            t,
            i = 0,
            l = vendors.length;

        for (; i < l; i++) {
            t = v[i] + "ransform";
            if (t in dummyStyle) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    };

    var prefixCSS = function(style) {
        var vendor = judge(vendorsCSS);
        if (vendor === "") return style;
        style = style.charAt(0) + style.substr(1);
        return vendor + style;
    };

    var _modeFunc = {
        0: function(slideIn, slideOut) {
            var frameIn1 = {
                point: 0
            };
            frameIn1[prefixCSS("transform")] = "translateX(" + slideIn.clientWidth + "px)";
            var frameIn2 = {
                point: this._config.duration
            };
            frameIn2[prefixCSS("transform")] = "translateX(" + this._config.origin.x + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);


            var frameOut1 = {
                point: 0
            };
            frameOut1[prefixCSS("transform")] = "translateX(" + this._config.origin.x + "px)";
            var frameOut2 = {
                point: this._config.duration
            };
            frameOut2[prefixCSS("transform")] = "translateX(" + (-slideOut.clientWidth) + "px)";
            this._aniOut.keyframe([frameOut1, frameOut2]);
        },

        1: function(slideIn, slideOut) {
            var frameIn1 = {
                point: 0
            };
            frameIn1[prefixCSS("transform")] = "translateX(" + (-slideIn.clientWidth) + "px)";
            var frameIn2 = {
                point: this._config.duration
            };
            frameIn2[prefixCSS("transform")] = "translateX(" + this._config.origin.x + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);


            var frameOut1 = {
                point: 0
            };
            frameOut1[prefixCSS("transform")] = "translateX(" + this._config.origin.x + "px)";
            var frameOut2 = {
                point: this._config.duration
            };
            frameOut2[prefixCSS("transform")] = "translateX(" + slideOut.clientWidth + "px)";
            this._aniOut.keyframe([frameOut1, frameOut2]);
        },

        2: function(slideIn, slideOut) {
            var frameIn1 = {
                point: 0
            };
            frameIn1[prefixCSS("transform")] = "translateY(" + slideIn.clientHeight + "px)";
            var frameIn2 = {
                point: this._config.duration
            };
            frameIn2[prefixCSS("transform")] = "translateY(" + this._config.origin.y + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);


            var frameOut1 = {
                point: 0
            };
            frameOut1[prefixCSS("transform")] = "translateY(" + this._config.origin.y + "px)";
            var frameOut2 = {
                point: this._config.duration
            };
            frameOut2[prefixCSS("transform")] = "translateY(" + (-slideOut.clientHeight) + "px)";
            this._aniOut.keyframe([frameOut1, frameOut2]);
        },

        3: function(slideIn, slideOut) {
            var frameIn1 = {
                point: 0
            };
            frameIn1[prefixCSS("transform")] = "translateY(" + (-slideIn.clientHeight) + "px)";
            var frameIn2 = {
                point: this._config.duration
            };
            frameIn2[prefixCSS("transform")] = "translateY(" + this._config.origin.y + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);


            var frameOut1 = {
                point: 0
            };
            frameOut1[prefixCSS("transform")] = "translateY(" + this._config.origin.y + "px)";
            var frameOut2 = {
                point: this._config.duration
            };
            frameOut2[prefixCSS("transform")] = "translateY(" + slideOut.clientHeight + "px)";
            this._aniOut.keyframe([frameOut1, frameOut2]);
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
            var tranlate = slideOut.clientHeight / 2;
            //3d变化的时候设置父元素属性
            if (this._config.mode == 5 || this._config.mode == 6) {
                //3d变化
                this._ol.style.webkitPerspective = "1560px";
                this._ol.style.webkitTransformStyle = "preserve-3d";
                this._ol.style.webkitTransform = "scale(" + this._config.scale + ")";
                this._ol.style.overflow = "visible";
            }

            var frameIn1 = {
                point: 0
            };
            frameIn1[prefixCSS("transform")] = "rotateX(90deg) translateZ(" + tranlate + "px)";
            var frameIn2 = {
                point: this._config.duration
            };
            frameIn2[prefixCSS("transform")] = "rotateX(0deg) translateZ(" + tranlate + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);


            var frameOut1 = {
                point: 0
            };
            frameOut1[prefixCSS("transform")] = "rotateX(0deg) translateZ(" + tranlate + "px)";
            var frameOut2 = {
                point: this._config.duration
            };
            frameOut2[prefixCSS("transform")] = "rotateX(-90deg) translateZ(" + tranlate + "px)";
            this._aniOut.keyframe([frameOut1, frameOut2]);
        },

        6: function(slideIn, slideOut) {
            var tranlate = slideOut.clientHeight / 2;
            //3d变化的时候设置父元素属性
            if (this._config.mode == 5 || this._config.mode == 6) {
                //3d变化
                this._ol.style.webkitPerspective = "1560px";
                this._ol.style.webkitTransformStyle = "preserve-3d";
                this._ol.style.webkitTransform = "scale(" + this._config.scale + ")";
                this._ol.style.overflow = "visible";
            }

            var frameIn1 = {
                point: 0
            };
            frameIn1[prefixCSS("transform")] = "rotateX(-90deg) translateZ(" + tranlate + "px)";
            var frameIn2 = {
                point: this._config.duration
            };
            frameIn2[prefixCSS("transform")] = "rotateX(0deg) translateZ(" + tranlate + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);


            var frameOut1 = {
                point: 0
            };
            frameOut1[prefixCSS("transform")] = "rotateX(0deg) translateZ(" + tranlate + "px)";
            var frameOut2 = {
                point: this._config.duration
            };
            frameOut2[prefixCSS("transform")] = "rotateX(90deg) translateZ(" + tranlate + "px)";
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
        if (this._isSliding) return this;
        dis = dis || 1;
        var func = _modeFunc[this._config.mode];
        var slideIn = this._lis[this._lis.length - dis - 1];
        var slideOutArray = new Array(dis);
        for (var i = 0; i < dis; i++) {
            slideOutArray[i] = this._lis[this._lis.length - i - 1];
        }
        var slideOut = this._lis[this._lis.length - 1];
        var _self = this;

        if (slideIn && slideOut) {
            //需要两个元素切换
            //首先把需要切入的图片放到右侧
            this._aniIn.setElement(slideIn);
            this._aniOut.setElement(slideOut);

            //设置关键帧动画
            _self._aniIn.reset();
            _self._aniOut.reset();
            if (!this._aniIn.keyframes.length) {
                func.call(this, slideIn, slideOut);
            }

            //隐藏不可见的li
            for (i = 1; i < slideOutArray.length; i++) {
                slideOutArray[i].style.display = "none";
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
                //插入到第一个
                //略微延时(80)去处理li
                for (var i = 0; i < slideOutArray.length; i++) {
                    //显示刚才隐藏的li
                    slideOutArray[i].style.display = "";
                    _self._ol.insertBefore(slideOutArray[i], _self._lis[0]);
                }

                _self._aniIn.reset();
                _self._aniOut.reset();

                clearTimeout(time);
                _self._index += dis;
                if (_self._index > _self._lis.length)
                    _self._index = 1;

                if (_self._events.slideend) {
                    _self._events.slideend.forEach(function(func) {
                        if (func) func(_self._index, "next");
                    });
                }
            }, this._config.duration + 80);


            if (_self._events.slidestart) {
                _self._events.slidestart.forEach(function(func) {
                    if (func) func(_self._index, "next");
                });
            }
        }
    };

    var setOptions = function(options) {
        var config = {};
        config.mode = options.mode || 0;
        config.duration = options.duration || 500;
        config.interval = options.interval || 4000;
        config.autoPlay = options.autoPlay !== null ? options.autoPlay : true;
        config.timing = options.timing || "linear";
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

    /**
     * Slider
     * @class Slider
     * @constructor
     */
    function slider(ol, options) {
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

        if (this._config.autoPlay !== false) {
            this.play();
        }
    }

    var sliderProto = slider.prototype;

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
        if (this._isSliding) return this;

        dis = dis || 1;
        var _self = this;
        var mode = _oppositeMode[this._config.mode];
        var func = _modeFunc[mode];
        //从末尾取图片
        //多个图片需要前插
        var slideInArray = new Array(dis);
        for (var i = 0; i < dis; i++) {
            slideInArray[i] = this._lis[i];
        }
        var slideIn = this._lis[dis - 1];

        var slideOut = this._lis[this._lis.length - 1];

        if (slideIn && slideOut) {
            //加在最顶层
            for (i = 0; i < slideInArray.length; i++) {
                this._ol.appendChild(slideInArray[i]);
                //不影响动画的暂时隐藏
                if (i < slideInArray.length - 1) {
                    slideInArray[i].style.display = "none";
                }
            }

            this._aniIn.setElement(slideIn);
            this._aniOut.setElement(slideOut);

            this._aniIn.reset();
            this._aniOut.reset();
            func.call(this, slideIn, slideOut);

            this._aniIn.start({
                timing: this._config.timing
            });
            this._aniOut.start({
                timing: this._config.timing
            });

            this._isSliding = true;
            var time = setTimeout(function() {
                _self._isSliding = false;
                for (var i = 0; i < slideInArray.length; i++) {
                    //恢复显示
                    slideInArray[i].style.display = "";
                }
                clearTimeout(time);

                _self._aniIn.reset();
                _self._aniOut.reset();

                _self._index -= dis;
                if (_self._index < 1)
                    _self._index = _self._lis.length;

                if (_self._events.slideend) {
                    _self._events.slideend.forEach(function(func) {
                        if (func) func(_self._index, "prev");
                    });
                }
            }, this._config.duration + 80);

            if (_self._events.slidestart) {
                _self._events.slidestart.forEach(function(func) {
                    if (func) func(_self._index, "prev");
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
                slide.call(_self);
            }, _self._config.interval + _self._config.duration);
        }
        this.isPaused = false;
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
            var dis = index - this._index;
            this.pause();
            if (dis > 0) {
                this.next(dis);

            } else if (dis < 0) {
                this.prev(-dis);
            } else {
                //点击自己，无动作
                this.isPaused = false;
                return this;
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
                if (!this._events[event]) this._events[event] = [];
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
        this.play();
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
        if (this._aniIn.elem)
            this._aniIn.clear().reset();
        if (this._aniOut.elem)
            this._aniOut.clear().reset();
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
     * @method _prefixCSS
     * @private
     * @return {Object} Slider
     * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
     * @for Slider
     */
    sliderProto._prefixCSS = function(style) {
        return prefixCSS(style);
    };

    return slider;
})();
/**
 * 图片轮播库触屏版
 * @author alandlguo
 * @2014/04/23
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
Slider.prototype.touchToSlide = function() {
    var touchStart = false;
    var startPos = null;
    var self = this;

    var slideIn = null;
    var slideOut = null;
    var isTouchMove = false;
    var touchevt = null;

    var moveImage = function() {
        //滑动过程
        if (touchevt.changedTouches.length && startPos) {
            var disX = touchevt.changedTouches[0].clientX - startPos.x;
            var disY = touchevt.changedTouches[0].clientY - startPos.y;
            //左右移动
            if (self._config.mode == 0 || self._config.mode == 1) {
                //判断slideIn
                if (!slideIn) {
                    //从左往右
                    if (self._config.mode == 0) {
                        if (disX > 0) {
                            slideIn = self._lis[0];
                            //slideIn.removeAttribute("style");
                            self._ol.appendChild(slideIn);
                        } else if (disX < 0) {
                            //从右往左
                            slideIn = self._lis[self._lis.length - 2];
                            //slideIn.removeAttribute("style");
                        }
                    } else if (self._config.mode == 1) {
                        if (disX < 0) {
                            slideIn = self._lis[0];
                            //slideIn.removeAttribute("style");
                            self._ol.appendChild(slideIn);
                        } else if (disX > 0) {
                            //从右往左
                            slideIn = self._lis[self._lis.length - 2];
                            //slideIn.removeAttribute("style");
                        }
                    }
                }
                //这里不关心动画方式，使用transform移动
                if (slideIn && slideOut) {
                    if (disX > 0) {
                        slideIn.style[self._prefixCSS("transform")] = "translateX(" + (-slideIn.clientWidth + disX) + "px) translateZ(0)";
                        slideOut.style[self._prefixCSS("transform")] = "translateX(" + (self._config.origin.x + disX) + "px) translateZ(0)";
                    } else if (disX < 0) {
                        slideIn.style[self._prefixCSS("transform")] = "translateX(" + (slideIn.clientWidth + disX) + "px) translateZ(0)";
                        slideOut.style[self._prefixCSS("transform")] = "translateX(" + (self._config.origin.x + disX) + "px) translateZ(0)";
                    }
                }
            } else if (self._config.mode == 2 || self._config.mode == 3) {
                //上下移动
                //判断slideIn
                if (!slideIn) {
                    //从上往下
                    if (self._config.mode == 2) {
                        if (disY > 0) {
                            slideIn = self._lis[0];
                            self._ol.appendChild(slideIn);
                        } else if (disY < 0) {
                            //从下往上
                            slideIn = self._lis[self._lis.length - 2];
                        }
                    } else if (self._config.mode == 3) {
                        if (disY > 0) {
                            slideIn = self._lis[self._lis.length - 2];
                        } else if (disY < 0) {
                            slideIn = self._lis[0];
                            self._ol.appendChild(slideIn);
                        }
                    }
                }
                if (slideIn && slideOut) {
                    if (disY > 0) {
                        slideIn.style[self._prefixCSS("transform")] = "translateY(" + (-slideIn.clientHeight + disY) + "px) translateZ(0)";
                        slideOut.style[self._prefixCSS("transform")] = "translateY(" + (self._config.origin.y + disY) + "px) translateZ(0)";
                    } else if (disY < 0) {
                        slideIn.style[self._prefixCSS("transform")] = "translateY(" + (slideIn.clientHeight + disY) + "px) translateZ(0)";
                        slideOut.style[self._prefixCSS("transform")] = "translateY(" + (self._config.origin.y + disY) + "px) translateZ(0)";
                    }
                }
            } else if (self._config.mode == 5 || self._config.mode == 6) {
                //上下翻转
            } else if (self._config.mode == 7 || self._config.mode == 8) {
                //左右翻转
            }
        }
    }

    this._ol.addEventListener("touchstart", function(evt) {
        //滑动开始
        if (self._config.mode == 0 || self._config.mode == 1 ||
            self._config.mode == 2 || self._config.mode == 3 ||
            self._config.mode == 5 || self._config.mode == 6 ||
            self._config.mode == 7 || self._config.mode == 8) {

            if (!self._isSliding) {
                self.pause();
                touchStart = true;
                startPos = {
                    x: evt.changedTouches[0].clientX,
                    y: evt.changedTouches[0].clientY
                };

                slideOut = self._lis[self._lis.length - 1];
                //slideOut.removeAttribute("style");
            }
            evt.preventDefault();
        }
    });

    this._ol.addEventListener("touchmove", function(evt) {
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
                }
                aniFunc();
            }
            evt.preventDefault();
        }
    });

    this._ol.addEventListener("touchend", function(evt) {
        //滑动结束
        if (startPos && touchStart) {
            var disX = evt.changedTouches[0].clientX - startPos.x;
            var disY = evt.changedTouches[0].clientY - startPos.y;
            var percent = 1;

            var clearAnimation = function() {
                clearTimeout(time);
                self._aniIn.reset();
                self._aniOut.reset();
                slideIn = null
                slideOut = null;

                self._isSliding = false;
                self.play();
            }
            var startAnimation = function() {
                //开始动画
                self._aniIn.start({
                    timing: self._config.timing
                });
                self._aniOut.start({
                    timing: self._config.timing
                });

                self._isSliding = true;
            }
            var setKeyframes = function(percent, frameIn2Trans, frameOut2Trans) {
                var frameIn1 = {
                    point: 0
                };
                frameIn1[self._prefixCSS("transform")] = slideIn.style[self._prefixCSS("transform")];
                var frameIn2 = {
                    point: self._config.duration * percent
                }
                frameIn2[self._prefixCSS("transform")] = frameIn2Trans;

                var frameOut1 = {
                    point: 0
                };
                frameOut1[self._prefixCSS("transform")] = slideOut.style[self._prefixCSS("transform")];
                var frameOut2 = {
                    point: self._config.duration * percent
                }
                frameOut2[self._prefixCSS("transform")] = frameOut2Trans;

                return {
                    frameIn: [frameIn1, frameIn2],
                    frameOut: [frameOut1, frameOut2]
                }
            }

            self._aniIn.setElement(slideIn);
            self._aniOut.setElement(slideOut);

            self._aniIn.clear();
            self._aniOut.clear();

            if (self._config.mode == 0 || self._config.mode == 1) {
                //继续判断是否需要切换下一张图片
                if (disX < 0) {
                    //下一张图片
                    if (Math.abs(disX) > slideOut.clientWidth / 2) {
                        percent = (slideOut.clientWidth - Math.abs(disX)) / slideOut.clientWidth;
                        //向左滑动
                        //设置关键帧动画

                        var frames = setKeyframes(percent, "translateX(" + self._config.origin.x + "px) translateZ(0)", "translateX(" + (-slideOut.clientWidth) + "px) translateZ(0)");
                        self._aniIn.keyframe(frames.frameIn);
                        self._aniOut.keyframe(frames.frameOut);

                        startAnimation();

                        var time = setTimeout(function() {
                            //动画结束
                            if (self._config.mode == 0) {
                                self._ol.insertBefore(slideOut, self._lis[0]);
                                self._index += 1;
                                if (self._index > self._lis.length)
                                    self._index = 1;
                            } else if (self._config.mode == 1) {
                                self._index -= 1;
                                if (self._index < 1)
                                    self._index = self._lis.length;
                            }
                            //清理动画
                            clearAnimation();

                            if (self._events["slideend"]) {
                                self._events["slideend"].forEach(function(func) {
                                    func && func(self._index, "prev");
                                });
                            }
                        }, self._config.duration * percent + 80);
                    } else {
                        percent = Math.abs(disX) / slideOut.clientWidth;
                        //还原
                        //设置关键帧动画
                        var frames = setKeyframes(percent, "translateX(" + slideIn.clientWidth + "px) translateZ(0)", "translateX(" + self._config.origin.x + "px) translateZ(0)");
                        self._aniIn.keyframe(frames.frameIn);
                        self._aniOut.keyframe(frames.frameOut);

                        startAnimation();

                        var time = setTimeout(function() {
                            if (self._config.mode == 1)
                                self._ol.insertBefore(slideIn, self._ol.children[0]);
                            //清理动画
                            clearAnimation();
                        }, self._config.duration * percent + 80);
                    }
                } else if (disX > 0) {
                    //向右滑动
                    //下一张图片
                    if (Math.abs(disX) > slideOut.clientWidth / 2) {
                        percent = (slideOut.clientWidth - Math.abs(disX)) / slideOut.clientWidth;

                        //设置关键帧动画
                        var frames = setKeyframes(percent, "translateX(" + self._config.origin.x + "px) translateZ(0)", "translateX(" + slideOut.clientWidth + "px) translateZ(0)");
                        self._aniIn.keyframe(frames.frameIn);
                        self._aniOut.keyframe(frames.frameOut);

                        //开始动画
                        startAnimation();

                        var time = setTimeout(function() {

                            if (self._config.mode == 0) {
                                self._index -= 1;
                                if (self._index < 1)
                                    self._index = self._lis.length;
                            } else if (self._config.mode == 1) {
                                self._ol.insertBefore(slideOut, self._lis[0]);
                                self._index += 1;
                                if (self._index > self._lis.length)
                                    self._index = 1;
                            }

                            //清理动画
                            clearAnimation();
                            if (self._events["slideend"]) {
                                self._events["slideend"].forEach(function(func) {
                                    func && func(self._index, "prev");
                                });
                            }
                        }, self._config.duration * percent + 80);
                    } else {
                        percent = Math.abs(disX) / slideOut.clientWidth;
                        //还原

                        //设置关键帧动画
                        var frames = setKeyframes(percent, "translateX(" + (-slideIn.clientWidth) + "px) translateZ(0)", "translateX(" + self._config.origin.x + "px) translateZ(0)");
                        self._aniIn.keyframe(frames.frameIn);
                        self._aniOut.keyframe(frames.frameOut);

                        //开始动画
                        startAnimation();

                        var time = setTimeout(function() {
                            //清理动画
                            if (self._config.mode == 0)
                                self._ol.insertBefore(slideIn, self._ol.children[0]);
                            clearAnimation();
                        }, self._config.duration * percent + 80);
                    }
                }
            } else if (self._config.mode == 2 || self._config.mode == 3) {
                //上下滑动
                if (disY < 0) {
                    //下一张图片
                    if (Math.abs(disY) > slideOut.clientHeight / 2) {
                        percent = (slideOut.clientHeight - Math.abs(disY)) / slideOut.clientHeight;
                        //向上滑动
                        //设置关键帧动画
                        var frames = setKeyframes(percent, "translateY(" + self._config.origin.y + "px) translateZ(0)", "translateY(" + (-slideOut.clientHeight) + "px) translateZ(0)");
                        self._aniIn.keyframe(frames.frameIn);
                        self._aniOut.keyframe(frames.frameOut);

                        startAnimation();

                        var time = setTimeout(function() {
                            //动画结束
                            if (self._config.mode == 2) {
                                self._ol.insertBefore(slideOut, self._lis[0]);
                                self._index += 1;
                                if (self._index > self._lis.length)
                                    self._index = 1;
                            } else if (self._config.mode == 3) {
                                self._index -= 1;
                                if (self._index < 1)
                                    self._index = self._lis.length;
                            }
                            clearAnimation();
                            if (self._events["slideend"]) {
                                self._events["slideend"].forEach(function(func) {
                                    func && func(self._index, "prev");
                                });
                            }
                        }, self._config.duration * percent + 80);
                    } else {
                        percent = Math.abs(disY) / slideOut.clientHeight;

                        //设置关键帧动画
                        var frames = setKeyframes(percent, "translateY(" + slideIn.clientHeight + "px) translateZ(0)", "translateY(" + self._config.origin.y + "px) translateZ(0)");
                        self._aniIn.keyframe(frames.frameIn);
                        self._aniOut.keyframe(frames.frameOut);

                        startAnimation();

                        var time = setTimeout(function() {
                            if (self._config.mode == 1)
                                self._ol.insertBefore(slideIn, self._ol.children[0]);
                            //清理动画
                            clearAnimation();
                        }, self._config.duration * percent + 80);
                    }
                } else if (disY > 0) {
                    //向下滑动
                    //下一张图片
                    if (Math.abs(disY) > slideOut.clientHeight / 2) {
                        percent = (slideOut.clientHeight - Math.abs(disY)) / slideOut.clientHeight;

                        //设置关键帧动画
                        var frames = setKeyframes(percent, "translateY(" + self._config.origin.y + "px) translateZ(0)", "translateY(" + slideOut.clientHeight + "px) translateZ(0)");
                        self._aniIn.keyframe(frames.frameIn);
                        self._aniOut.keyframe(frames.frameOut);

                        //开始动画
                        startAnimation();

                        var time = setTimeout(function() {
                            if (self._config.mode == 2) {
                                self._index -= 1;
                                if (self._index < 1)
                                    self._index = self._lis.length;
                            } else if (self._config.mode == 3) {
                                self._ol.insertBefore(slideOut, self._lis[0]);
                                self._index += 1;
                                if (self._index > self._lis.length)
                                    self._index = 1;
                            }

                            //清理动画
                            clearAnimation();

                            if (self._events["slideend"]) {
                                self._events["slideend"].forEach(function(func) {
                                    func && func(self._index, "prev");
                                });
                            }
                        }, self._config.duration * percent + 80);
                    } else {
                        percent = Math.abs(disY) / slideOut.clientHeight;
                        //还原

                        //设置关键帧动画
                        var frames = setKeyframes(percent, "translateY(" + (-slideIn.clientHeight) + "px) translateZ(0)", "translateY(" + self._config.origin.y + "px) translateZ(0)");
                        self._aniIn.keyframe(frames.frameIn);
                        self._aniOut.keyframe(frames.frameOut);

                        //开始动画
                        startAnimation();

                        var time = setTimeout(function() {
                            //清理动画
                            if (self._config.mode == 2)
                                self._ol.insertBefore(slideIn, self._ol.children[0]);
                            clearAnimation();
                        }, self._config.duration * percent + 80);
                    }
                }
            }
            touchStart = false;
            startPos = null;
        }
        evt.preventDefault();
    });

    return this;
}