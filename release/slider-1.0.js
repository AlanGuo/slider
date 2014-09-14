(function(y){var z=0,f=window.performance||{};Function.bind||(Function.prototype.bind=function(){var a=this,c=Array.prototype.slice.call(arguments),b=c.shift();return function(){return a.apply(b,c.concat(Array.prototype.slice.call(arguments)))}});var d=function(a){return function(){for(var c=document.createElement("div").style,b=a.prefix.split(","),e,d=0,f=b.length;d<f;d++){e=b[d]+a.words;if(e in c)return b[d].substr(0,b[d].length-1)}return false}},e=function(a,c){var b=c();if(b==="")return a;a=a.charAt(0).toUpperCase()+
a.substr(1);return b+a},B=function(a,c){var b=c();if(b==="")return a;a=a.charAt(0)+a.substr(1);return b+a},C=d({prefix:"r,webkitR,MozR,msR,OR",words:"equestAnimationFrame"}),v=d({prefix:"t,webkitT,MozT,msT,OT",words:"ransform"}),h=d({prefix:"t,webkitT,MozT,msT,OT",words:"ransition"}),g=d({prefix:"a,webkitA,MozA,msA,OA",words:"nimation"}),D=d({prefix:"a,-webkit-a,-moz-a,-ms-a,-o-a",words:"nimation"}),o=function(a,c,b){a.addEventListener?a.addEventListener(c,b,false):a.attachEvent("on"+c,function(){b.call(a,
window.event)})},w=function(a,c){for(var b in c)a[b]=c[b];return a},x=function(a,c){if(a.indexOf)return a.indexOf(c);for(var b=0,e;e=a[b];b++)if(e===c)return b;return-1},p=window[e("requestAnimationFrame",C)]||function(a){setTimeout(a,17)},d=document.createElement("style");d.setAttribute("id","ex_animate_style");d.type="text/css";document.getElementsByTagName("head")[0].appendChild(d);d=function(){this._init.apply(this,arguments)};d.prototype={css:document.getElementById("ex_animate_style"),_keywords:["point",
"timing"],_events:[],_method:null,_currentFrame:0,_needStop:!1,_init:function(a,c){c=c||{};this.elem=a;this.options=w({},c);this.events={};this.keyframes=[];this.keyframesString=[];this.uniqId=++z;var b=document.createElement("div").style;e("transform",v);var d=e("transition",h),f=e("animation",g);if(d in b)this.options.transition=true;if(f in b)this.options.animation=true;if(this.options.animation){b=document.createTextNode("");this.css.appendChild(b);this.keyframeElement=b}},setElement:function(a){this.elem=
a;return this},_getProperty:function(a){var c={},b;for(b in a)x(this._keywords,b)==-1&&(c[b]=a[b]);return c},keyframe:function(a){this.keyframes=this.keyframes.concat(a);return this},reset:function(){this.keyframes=[];this.elem.style[e("animation",g)]="";this.elem.style[e("transitionProperty",h)]="";this.elem.style[e("transitionTimingFunction",h)]="";this.elem.style[e("transitionDuration",h)]="";return this},start:function(a){var c=this;this._startOpt=a=this._startOpt||w({timing:"linear"},a);this._startOpt.repeat=
this._startOpt.repeat*1;var b=function(c){var a="{",b=0,e;for(e in c){b++>0&&(a=a+";");a=a+e+":"+c[e]}return a+"}"};this._currentFrame=0;var d=function(){for(var d=this.keyframes[this.keyframes.length-1].point,f="key"+this.uniqId,l="{",h=0,i;i=this.keyframes[h];h++)l=l+(Math.round(i.point/d*100)+"% "+b(this._getProperty(i)));l="@"+B("keyframes",D)+" "+f+(l+"}");if(l!=this.keyframeElement.data)this.keyframeElement.data=l;this.elem.style[e("animation",g)]=f+" "+d+"ms "+a.timing;var d=this._getProperty(this.keyframes[this.keyframes.length-
1]),t;for(t in d)this.elem.style[t]=d[t];if(this._startOpt.repeat)this.elem.style[e("animationIterationCount",g)]=this._startOpt.repeat;if(this._startOpt.delay)this.elem.style[e("animationDelay",g)]=this._startOpt.delay;if(this._startOpt.direction)this.elem.style[e("animationDirection",g)]=this._startOpt.direction;o(this.elem,e("animationEnd",g),function(a){c.events.animationEnd&&c.events.animationEnd.bind(c)(a)})},m=function(){var b=this._currentFrame,d=function(c,b){for(var d=[c,b],f=[],i=0;i<=
1;i++){var g=this._getProperty(d[i]),j;for(j in g)x(f,j)==-1&&f.push(j)}this.elem.style[e("transitionDuration",h)]=0;d=this._getProperty(c);for(j in d)this.elem.style[j]=d[j];this.elem.style[e("transitionProperty",h)]=f.join(",");this.elem.style[e("transitionTimingFunction",h)]=a.timing;a.accelerate&&(this.elem.style[e("transform",v)]="translateZ(0)");this.elem.offsetWidth;this.elem.style[e("transitionDuration",h)]=(b.point-c.point)/1E3+"s";f=this._getProperty(b);for(j in f)this.elem.style[j]=f[j]};
if(this.keyframes.length==1){var f=this.keyframes[0];f.point>0&&this.keyframes.unshift({point:0})}if(this.keyframes.length>1){var f=this.keyframes[0],g=this.keyframes[1],i=e("transitionDelay",h);d.bind(this)(f,g);if(c._startOpt.delay)c.elem.style[i]=c._startOpt.delay;b++;o(this.elem,"transitionend",function(a){if(!c.keyframes[b+1]&&c._startOpt.repeat>1){b=0;/number/i.test(typeof c._startOpt.repeat)&&c._startOpt.repeat--}if(c.keyframes[b+1]){var a=c.keyframes[b],e=c.keyframes[b+1];c.elem.style[i]!==
0&&(c.elem.style[i]=0);d.bind(c)(a,e);b++}else c.events.animationEnd&&c.events.animationEnd.bind(c)(a)})}},n=function(){var a=0,b=this._startOpt.delay.replace(/[^\.\d]/g,"")*1,d=function(e,i){var h=[],g=this._getProperty(e),q=this._getProperty(i),k;for(k in g)if(q[k]!=null){var o=parseFloat(g[k].toString().replace(/[^\d+-]/g,"")),A=parseFloat(q[k].toString().replace(/[^\d+-]/g,""));h.push({prop:k,start:o,end:A,unit:(q[k]=="0"?g[k]:q[k]).toString().replace(/[\D]*\d+(?=[a-z]*)/gi,"")})}var j=function(a){for(var c=
0,b;b=h[c];c++)if(a==-1){/opacity/i.test(b.prop)&&(this.elem.style.filter="alpha(opacity="+b.end*100+")");this.elem.style[b.prop]=b.end+b.unit}else{var d=(b.start+(b.end-b.start)*a).toFixed(1);/opacity/i.test(b.prop)&&(this.elem.style.filter="alpha(opacity="+d*100+")");this.elem.style[b.prop]=d+b.unit}},m=function(){if(this.keyframes[a+1]){d.bind(this)(this.keyframes[a],this.keyframes[a+1]);a++}else if(this._startOpt.repeat>1){if(/number/i.test(typeof this._startOpt.repeat)){this._startOpt.repeat--;
a=0;m.call(this)}}else c.events.animationEnd&&c.events.animationEnd.bind(c)()};j.bind(this)(0);if(this.keyframes.length==1){e=this.keyframes[0];e.point>0&&this.keyframes.unshift({point:0})}var n=i.point-e.point,u=0,s=function(){var a=(f.now?f.now():+new Date)-r-u;j.bind(c)(a/n);if(a<n)if(c._needStop){var b=f.now?f.now():+new Date;u=0;c._continueFunc=function(){u=(f.now?f.now():+new Date)-b;p(s)}}else p(s);else{j.bind(c)(-1);m.bind(c)()}},r=0;if(this._startOpt.delay&&!this._isDelayed){if(f.now)r=f.now()+
b*1E3;else{g=new Date;r=+g.setMilliseconds(g.getMilliseconds()+b*1E3)}setTimeout(function(){c._isDelayed=true;p(s)},b*1E3)}else{r=f.now?f.now():+new Date;p(s)}};this._currentFrame=a;d.bind(this)(this.keyframes[a],this.keyframes[a+1]);a++};if(a.method)switch(a.method){case "animation":this.options.animation?d.bind(this)():console.log("your browser does not support animation method.");break;case "transition":this.options.transition?m.bind(this)():console.log("your browser does not support transition method.");
break;case "time":n.bind(this)()}else this.options.transition?m.bind(this)():this.options.animation?d.bind(this)():n.bind(this)();return this},clear:function(){for(var a=0,c=this.keyframes.length;a<c;a++){var b=this._getProperty(this.keyframes[a]),d;for(d in b)this.elem.style[d]=""}return this},on:function(a,c){a=="animationend"?this.events.animationEnd=c:o(this.elem,a,c);return this},stop:function(){this._needStop=true;this._currentFrame=0;return this},pause:function(){this._needStop=true;return this},
continuePlay:function(){if(this._needStop==true)if(this._startOpt&&this._startOpt.method=="time"){this._needStop=false;this._continueFunc&&this._continueFunc();this._continueFunc=null}else{this._needStop=false;this.clear();this.start()}return this}};y.Animate=d})(window);

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
        }
    };

    var prefixCSS = function(style,judgeFunc) {
        var vendor = judgeFunc();
        if (vendor === '') return style;
        style = style.charAt(0) + style.substr(1);
        return vendor + style;
    }

    var transformJudgeFunc =  createJudgeFunc({
        prefix:'t,webkitT,MozT,msT,OT',
        words:'ransform'
    });

    var transformCSS = prefixCSS("transform",transformJudgeFunc);

    var supportTransform = createJudgeFunc()===false?false:true;

    var _modeFunc = {
        0: function(slideIn, slideOut) {
            if (supportTransform) {
                //transform
                var frameIn1 = {
                    point: 0
                };
                frameIn1[transformCSS] = "translateX(" + slideIn.clientWidth + "px)";
                var frameIn2 = {
                    point: this._config.duration
                };
                frameIn2[transformCSS] = "translateX(" + this._config.origin.x + "px)";

                var frameOut1 = {
                    point: 0
                };
                frameOut1[transformCSS] = "translateX(" + this._config.origin.x + "px)";
                var frameOut2 = {
                    point: this._config.duration
                };
                frameOut2[transformCSS] = "translateX(" + (-slideOut.clientWidth) + "px)";
            } else {
                //left
                var frameIn1 = {
                    point: 0,
                    left: slideIn.clientWidth + "px"
                };
                var frameIn2 = {
                    point: this._config.duration,
                    left: this._config.origin.x + "px"
                };

                var frameOut1 = {
                    point: 0,
                    left: this._config.origin.x + "px"
                };
                var frameOut2 = {
                    point: this._config.duration,
                    left: -slideOut.clientWidth + "px"
                };
            }
            this._aniIn.keyframe([frameIn1, frameIn2]);
            this._aniOut.keyframe([frameOut1, frameOut2]);
        },

        1: function(slideIn, slideOut) {
            if (supportTransform) {
                var frameIn1 = {
                    point: 0
                };
                frameIn1[transformCSS] = "translateX(" + (-slideIn.clientWidth) + "px)";
                var frameIn2 = {
                    point: this._config.duration
                };
                frameIn2[transformCSS] = "translateX(" + this._config.origin.x + "px)";


                var frameOut1 = {
                    point: 0
                };
                frameOut1[transformCSS] = "translateX(" + this._config.origin.x + "px)";
                var frameOut2 = {
                    point: this._config.duration
                };
                frameOut2[transformCSS] = "translateX(" + slideOut.clientWidth + "px)";

            } else {
                var frameIn1 = {
                    point: 0,
                    left: -slideIn.clientWidth + "px"
                };
                var frameIn2 = {
                    point: this._config.duration,
                    left: this._config.origin.x + "px"
                };

                var frameOut1 = {
                    point: 0,
                    left: this._config.origin.x + "px"
                };
                var frameOut2 = {
                    point: this._config.duration,
                    left: slideOut.clientWidth + "px"
                };
            }
            this._aniIn.keyframe([frameIn1, frameIn2]);
            this._aniOut.keyframe([frameOut1, frameOut2]);
        },

        2: function(slideIn, slideOut) {
            if (supportTransform) {
                var frameIn1 = {
                    point: 0
                };
                frameIn1[transformCSS] = "translateY(" + slideIn.clientHeight + "px)";
                var frameIn2 = {
                    point: this._config.duration
                };
                frameIn2[transformCSS] = "translateY(" + this._config.origin.y + "px)";

                var frameOut1 = {
                    point: 0
                };
                frameOut1[transformCSS] = "translateY(" + this._config.origin.y + "px)";
                var frameOut2 = {
                    point: this._config.duration
                };
                frameOut2[transformCSS] = "translateY(" + (-slideOut.clientHeight) + "px)";

            } else {
                //top
                var frameIn1 = {
                    point: 0,
                    top: slideIn.clientHeight + "px"
                };
                var frameIn2 = {
                    point: this._config.duration,
                    top: this._config.origin.y + "px"
                };

                var frameOut1 = {
                    point: 0,
                    top: this._config.origin.y + "px"
                };
                var frameOut2 = {
                    point: this._config.duration,
                    top: -slideOut.clientHeight + "px"
                };
            }

            this._aniIn.keyframe([frameIn1, frameIn2]);
            this._aniOut.keyframe([frameOut1, frameOut2]);
        },

        3: function(slideIn, slideOut) {
            if (supportTransform) {
                var frameIn1 = {
                    point: 0
                };
                frameIn1[transformCSS] = "translateY(" + (-slideIn.clientHeight) + "px)";
                var frameIn2 = {
                    point: this._config.duration
                };
                frameIn2[transformCSS] = "translateY(" + this._config.origin.y + "px)";

                var frameOut1 = {
                    point: 0
                };
                frameOut1[transformCSS] = "translateY(" + this._config.origin.y + "px)";
                var frameOut2 = {
                    point: this._config.duration
                };
                frameOut2[transformCSS] = "translateY(" + slideOut.clientHeight + "px)";
            } else {
                //top
                var frameIn1 = {
                    point: 0,
                    top: -slideIn.clientHeight + "px"
                };
                var frameIn2 = {
                    point: this._config.duration,
                    top: this._config.origin.y + "px"
                };

                var frameOut1 = {
                    point: 0,
                    top: this._config.origin.y + "px"
                };
                var frameOut2 = {
                    point: this._config.duration,
                    top: slideOut.clientHeight + "px"
                };
            }

            this._aniIn.keyframe([frameIn1, frameIn2]);
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
            frameIn1[transformCSS] = "rotateX(90deg) translateZ(" + tranlate + "px)";
            var frameIn2 = {
                point: this._config.duration
            };
            frameIn2[transformCSS] = "rotateX(0deg) translateZ(" + tranlate + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);


            var frameOut1 = {
                point: 0
            };
            frameOut1[transformCSS] = "rotateX(0deg) translateZ(" + tranlate + "px)";
            var frameOut2 = {
                point: this._config.duration
            };
            frameOut2[transformCSS] = "rotateX(-90deg) translateZ(" + tranlate + "px)";
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
            frameIn1[transformCSS] = "rotateX(-90deg) translateZ(" + tranlate + "px)";
            var frameIn2 = {
                point: this._config.duration
            };
            frameIn2[transformCSS] = "rotateX(0deg) translateZ(" + tranlate + "px)";
            this._aniIn.keyframe([frameIn1, frameIn2]);


            var frameOut1 = {
                point: 0
            };
            frameOut1[transformCSS] = "rotateX(0deg) translateZ(" + tranlate + "px)";
            var frameOut2 = {
                point: this._config.duration
            };
            frameOut2[transformCSS] = "rotateX(90deg) translateZ(" + tranlate + "px)";
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
    sliderProto._prefixCSS = function(style,judgeFunc) {
        return prefixCSS(style,judgeFunc);
    };

    /**
     * 判断是否支持样式
     * @method _supportTransform
     * @private
     * @return {Object} Slider
     * @support ie:>=6,chrome:all,firefox:all,safari:all,opera:all
     * @for Slider
     */
    sliderProto._supportTransform = function() {
        return transformJudgeFunc();
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
        }
    };
    var transformJudgeFunc =  createJudgeFunc({
        prefix:'t,webkitT,MozT,msT,OT',
        words:'ransform'
    });

    var transformCSS = self._prefixCSS("transform",transformJudgeFunc);
    var supportTransform = self._supportTransform()===false?false:true;

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
                        if (supportTransform) {
                            //transform
                            slideIn.style[transformCSS] = "translateX(" + (-slideIn.clientWidth + disX) + "px) translateZ(0)";
                            slideOut.style[transformCSS] = "translateX(" + (self._config.origin.x + disX) + "px) translateZ(0)";
                        } else {
                            //left
                            slideIn.style["left"] = (-slideIn.clientWidth + disX) + "px";
                            slideOut.style["left"] = (self._config.origin.x + disX) + "px";
                        }
                    } else if (disX < 0) {
                        if (supportTransform) {
                            slideIn.style[transformCSS] = "translateX(" + (slideIn.clientWidth + disX) + "px) translateZ(0)";
                            slideOut.style[transformCSS] = "translateX(" + (self._config.origin.x + disX) + "px) translateZ(0)";
                        } else {
                            //left
                            slideIn.style["left"] = (slideIn.clientWidth + disX) + "px";
                            slideOut.style["left"] = (self._config.origin.x + disX) + "px";
                        }
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
                        if (supportTransform) {
                            slideIn.style[transformCSS] = "translateY(" + (-slideIn.clientHeight + disY) + "px) translateZ(0)";
                            slideOut.style[transformCSS] = "translateY(" + (self._config.origin.y + disY) + "px) translateZ(0)";
                        } else {
                            slideIn.style["left"] = (-slideIn.clientHeight + disY) + "px";
                            slideOut.style["left"] = (self._config.origin.y + disY) + "px";
                        }
                    } else if (disY < 0) {
                        if (supportTransform) {
                            slideIn.style[transformCSS] = "translateY(" + (slideIn.clientHeight + disY) + "px) translateZ(0)";
                            slideOut.style[transformCSS] = "translateY(" + (self._config.origin.y + disY) + "px) translateZ(0)";
                        } else {
                            slideIn.style["left"] = (slideIn.clientHeight + disY) + "px";
                            slideOut.style["left"] = (self._config.origin.y + disY) + "px";
                        }
                    }
                }
            } else if (self._config.mode == 5 || self._config.mode == 6) {
                //上下翻转
            } else if (self._config.mode == 7 || self._config.mode == 8) {
                //左右翻转
            }
        }
    }


    var touchstart = function(evt) {
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
    }

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
                }
                aniFunc();
            }
            evt.preventDefault();
        }
    }

    var touchend = function(evt) {
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
                frameIn1[transformCSS] = slideIn.style[transformCSS];
                var frameIn2 = {
                    point: self._config.duration * percent
                }
                frameIn2[transformCSS] = frameIn2Trans;

                var frameOut1 = {
                    point: 0
                };
                frameOut1[transformCSS] = slideOut.style[transformCSS];
                var frameOut2 = {
                    point: self._config.duration * percent
                }
                frameOut2[transformCSS] = frameOut2Trans;

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
    }

    if (window.navigator.msPointerEnabled) {
        this._ol.addEventListener("MSPointerDown", eventHandlerName, false);
        this._ol.addEventListener("MSPointerMove", eventHandlerName, false);
        this._ol.addEventListener("MSPointerUp", eventHandlerName, false);
    }
    this._ol.addEventListener("touchstart", touchstart);
    this._ol.addEventListener("touchmove", touchmove);
    this._ol.addEventListener("touchend", touchend);

    return this;
}