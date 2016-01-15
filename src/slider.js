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