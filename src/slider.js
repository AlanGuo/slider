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