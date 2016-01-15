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