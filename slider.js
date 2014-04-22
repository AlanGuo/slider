/**
 * 简单的轮播库
 * @author alandlguo
 * @2013/10/14
 */

var Slider = (function() {
    //direction:0-从右往做, 1-从左往右, 2-从下往上，3-从上往下，4-fadeout/fadein,5-3d向上翻转，6-3d向下翻转
    //5,6暂时只支持webkit内核浏览器
    var _modeFunc = {
        0: function(slideIn, slideOut) {
            this._aniIn.keyframe({
                point: 0,
                left: slideIn.clientWidth + "px"
            }).keyframe({
                point: this._config.duration,
                left: this._config.origin.x + "px"
            });

            this._aniOut.keyframe({
                point: 0,
                left: this._config.origin.x + "px"
            }).keyframe({
                point: this._config.duration,
                left: -slideOut.clientWidth + "px"
            });
        },

        1: function(slideIn, slideOut) {
            this._aniIn.keyframe({
                point: 0,
                left: -slideIn.clientWidth + "px"
            }).keyframe({
                point: this._config.duration,
                left: this._config.origin.x + "px"
            });

            this._aniOut.keyframe({
                point: 0,
                left: this._config.origin.x + "px"
            }).keyframe({
                point: this._config.duration,
                left: slideOut.clientWidth + "px"
            });
        },

        2: function(slideIn, slideOut) {
            this._aniIn.keyframe({
                point: 0,
                top: slideIn.clientHeight + "px"
            }).keyframe({
                point: this._config.duration,
                top: this._config.origin.y + "px"
            });

            this._aniOut.keyframe({
                point: 0,
                top: this._config.origin.y + "px"
            }).keyframe({
                point: this._config.duration,
                top: -slideOut.clientHeight + "px"
            });
        },

        3: function(slideIn, slideOut) {
            this._aniIn.keyframe({
                point: 0,
                top: -slideIn.clientHeight + "px"
            }).keyframe({
                point: this._config.duration,
                top: this._config.origin.y + "px"
            });

            this._aniOut.keyframe({
                point: 0,
                top: this._config.origin.y + "px"
            }).keyframe({
                point: this._config.duration,
                top: slideOut.clientHeight + "px"
            });
        },

        4: function(slideIn, slideOut) {
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
                this._ol.style.webkitPerspective = "1560px"
                this._ol.style.webkitTransformStyle = "preserve-3d";
                this._ol.style.webkitTransform = "scale(" + this._config.scale + ")";
                this._ol.style.overflow = "visible";
            }

            this._aniIn.keyframe({
                point: 0,
                "-webkit-transform": "rotateX(90deg) translateZ(" + tranlate + "px)"
            }).keyframe({
                point: this._config.duration,
                "-webkit-transform": "rotateX(0deg) translateZ(" + tranlate + "px)"
            });

            this._aniOut.keyframe({
                point: 0,
                "-webkit-transform": "rotateX(0deg) translateZ(" + tranlate + "px)"
            }).keyframe({
                point: this._config.duration,
                "-webkit-transform": "rotateX(-90deg) translateZ(" + tranlate + "px)"
            });
        },

        6: function(slideIn, slideOut) {
            var tranlate = slideOut.clientHeight / 2;
            //3d变化的时候设置父元素属性
            if (this._config.mode == 5 || this._config.mode == 6) {
                //3d变化
                this._ol.style.webkitPerspective = "1560px"
                this._ol.style.webkitTransformStyle = "preserve-3d";
                this._ol.style.webkitTransform = "scale(" + this._config.scale + ")";
                this._ol.style.overflow = "visible";
            }

            this._aniIn.keyframe({
                point: 0,
                "-webkit-transform": "rotateX(-90deg) translateZ(" + tranlate + "px)"
            }).keyframe({
                point: this._config.duration,
                "-webkit-transform": "rotateX(0deg) translateZ(" + tranlate + "px)"
            });

            this._aniOut.keyframe({
                point: 0,
                "-webkit-transform": "rotateX(0deg) translateZ(" + tranlate + "px)"
            }).keyframe({
                point: this._config.duration,
                "-webkit-transform": "rotateX(90deg) translateZ(" + tranlate + "px)"
            });
        }
    }

    //prev的动画效果
    var _oppositeMode = {
        0: 1,
        1: 0,
        2: 3,
        3: 2,
        4: 4,
        5: 6,
        6: 5
    }
    var preventConcurrent = false;

    var slide = function(dis) {
        dis = dis || 1;
        var func = _modeFunc[this._config.mode];
        var slideIn = this._lis[this._lis.length - dis - 1];
        var slideOutArray = new Array(dis);
        for(var i=0;i<dis;i++){
            slideOutArray[i] =  this._lis[this._lis.length-i-1];
        }
        var slideOut = this._lis[this._lis.length-1];
        var _self = this;

        if (slideIn && slideOut) {
            //需要两个元素切换
            //首先把需要切入的图片放到右侧
            this._aniIn.setElement(slideIn);
            this._aniOut.setElement(slideOut);

            if (!this._aniIn.keyframes.length) {
                func.call(this, slideIn, slideOut);
            }

            //隐藏不可见的li
            for(var i=1;i<slideOutArray.length;i++){
               slideOutArray[i].style.display="none";
            }

            //可见的li开始动画
            this._aniIn.start({
                timing: this._config.timing
            });
            this._aniOut.start({
                timing: this._config.timing
            });
            
            var time = setTimeout(function() {
                //插入到第一个
                //略微延时(80)去处理li
                for(var i=0;i<slideOutArray.length;i++){
                    //显示刚才隐藏的li
                    slideOutArray[i].style.display = "";
                    _self._ol.insertBefore(slideOutArray[i], _self._lis[0]);
                }

                slideOut.removeAttribute("style");
                clearTimeout(time);
                _self._index+=dis;
                if (_self._index > _self._lis.length)
                    _self._index = 1;

                if (_self._events["slideend"]) {
                    _self._events["slideend"].forEach(function(func){
                        func && func(_self._index, "next");
                    });
                }
            }, this._config.duration + 80);


            if (_self._events["slidestart"]) {
                _self._events["slidestart"].forEach(function(func){
                    func && func(_self._index, "next");
                });
            }
        }
    }

    function slider(ol, options) {
        options = options || {
            mode: 0,
            duration: 400
        };
        //传入列表外面的ol元素
        this._ol = ol;
        this._lis = ol.children;
        this._events = {};
        //图片索引
        this._index = 1;
        var config = {};
        config.mode = options.mode || 0;
        config.duration = options.duration || 400;
        config.interval = options.interval || 3000;
        config.autoPlay = options.autoPlay || true;
        config.timing = options.timing || "linear";
        //透视之后缩放的比例，默认是一，
        //一般情况下透视之后图形会比原来要大，这里需要调整一下缩放，一般情况下此值为小于1的数入0.88
        config.scale = options.scale || 1;
        var origin = options.origin || {};
        var x = origin.x || 0,
            y = origin.y || 0;
        config.origin = {
            x: x,
            y: y
        };
        this._config = config;
        this._aniOut = new window.Animate();
        this._aniIn = new window.Animate();
        this.isPaused = false;

        if (config.autoPlay !== false) {
            this.play();
        }
    }

    var sliderProto = slider.prototype;

    sliderProto.prev = function(dis) {
        dis = dis || 1;
        var _self = this;
        var mode = _oppositeMode[this._config.mode];
        var func = _modeFunc[mode];
        //从末尾取图片
        //多个图片需要前插
        var slideInArray = new Array(dis);
        for(var i=0;i<dis;i++){
            slideInArray[i] = this._lis[i];
        }
        var slideIn = this._lis[dis-1];

        var slideOut = this._lis[this._lis.length - 1];

        if (slideIn && slideOut) {
            //加在最顶层
            for(var i=0;i<slideInArray.length;i++){
                this._ol.appendChild(slideInArray[i]);
                //不影响动画的暂时隐藏
                if(i<slideInArray.length-1){
                    slideInArray[i].style.display = "none";
                }
            }

            if (preventConcurrent) return this;
            preventConcurrent = true;

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


            var time = setTimeout(function() {
                preventConcurrent = false;
                slideOut.removeAttribute("style");
                for(var i=0;i<slideInArray.length;i++){
                    //恢复显示
                    slideInArray[i].style.display = "";
                }
                clearTimeout(time);

                //复位动画
                _self._aniIn.reset();
                _self._aniOut.reset();
                var func = _modeFunc[_self._config.mode];
                func.call(_self, slideIn, slideOut);
                _self._index-=dis;
                if (_self._index < 1)
                    _self._index = _self._lis.length;

                if (_self._events["slideend"]) {
                    _self._events["slideend"].forEach(function(func){
                        func && func(_self._index, "prev");
                    });
                }
            }, this._config.duration);

            if (_self._events["slidestart"]) {
                _self._events["slidestart"].forEach(function(func){
                    func && func(_self._index, "prev");
                });
            }
        }
        return this;
    };

    sliderProto.next = function(noAnimation) {
        slide.call(this,noAnimation);
        return this;
    };

    sliderProto.pause = function() {
        window.clearInterval(this._intervalKey);
        this._intervalKey = null;
        this.isPaused = true;
        return this;
    };

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

    //转去指定的图片
    sliderProto.slideTo = function(index) {
        if(!this.isPaused){
            index = index * 1;
            var dis = index - this._index;
            this.pause();
            if (dis > 0) {
                this.next(dis);

            } else if (dis < 0) {
                this.prev(-dis);
            }
            else{
                //点击自己，无动作
                this.isPaused = false;
                return this;
            }

            var _self = this;
            var func = function(direction){
                _self.play().off("slideend",func);
            }
            this.on("slideend",func);
        }
        return this;
    };

    sliderProto.on = function(event, callback) {
        if (/string/i.test(typeof event)) {
            if (/function/i.test(typeof callback)) {
                if(!this._events[event]) this._events[event] = [];
                this._events[event].push(callback);
            } else {
                throw new TypeError("callback must be a function");
            }
        } else {
            throw new TypeError("event must be string");
        }

        return this;
    };

    sliderProto.off = function(event, callback) {
        if (/string/i.test(typeof event)) {
            if (/function/i.test(typeof callback)) {
                if(this._events[event]){
                    var index = this._events[event].indexOf(callback);
                    if(index>-1){
                        this._events[event].splice(index,1);
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

    return slider;
})();