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

var Slider = Slider || {};
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
        };
    };
    var transformJudgeFunc =  createJudgeFunc({
        prefix:'t,-webkit-t,-moz-t,-ms-t,-o-t',
        words:'ransform'
    });

    var transformCSS = self._prefixCSS("transform",transformJudgeFunc);
    var supportTransform = self._supportTransform()===false?false:true;

    //开启加速
    for(var i=0;i<this._lis.length;i++){
        this._lis[i].style[transformCSS] = "translateZ(0)";
    }
    
    var moveImage = function() {
        //滑动过程
        if (touchevt.changedTouches.length && startPos) {
            var disX = touchevt.changedTouches[0].clientX - startPos.x;
            var disY = touchevt.changedTouches[0].clientY - startPos.y;
            //左右移动
            if (self._config.mode === 0 || self._config.mode === 1) {
                //判断slideIn
                if (!slideIn) {
                    //从左往右
                    if (disX > 0) {
                        slideIn = self._lis[self._lis.length - self._index + 1];
                    } else if (disX < 0) {
                        //从右往左
                        slideIn = self._lis[self._lis.length - self._index - 1];
                    }
                }
                //这里不关心动画方式，使用transform移动
                if (slideIn && slideOut) {
                    var clientWidth = slideIn.clientWidth;
                    slideIn.style.visibility = slideOut.style.visibility = "visible";
                    //其他的在后面
                    for(i=0;i<self._lis.length;i++){
                        if(self._lis[i] !== slideIn && self._lis[i] !== slideOut){
                            self._lis[i].style.visibility = "hidden";
                        }
                    }


                    if (disX > 0) {
                        if (supportTransform) {
                            //transform
                            slideIn.style[transformCSS] = "translateX(" + parseInt(-clientWidth + disX) + "px) translateZ(0)";
                            slideOut.style[transformCSS] = "translateX(" + parseInt(self._config.origin.x + disX) + "px) translateZ(0)";
                        } else {
                            //left
                            slideIn.style["left"] = parseInt(-clientWidth + disX) + "px";
                            slideOut.style["left"] = parseInt(self._config.origin.x + disX) + "px";
                        }
                    } else if (disX < 0) {
                        if (supportTransform) {
                            //transform
                            slideIn.style[transformCSS] = "translateX(" + parseInt(clientWidth + disX) + "px) translateZ(0)";
                            slideOut.style[transformCSS] = "translateX(" + parseInt(self._config.origin.x + disX) + "px) translateZ(0)";
                        } else {
                            //left
                            slideIn.style["left"] = (clientWidth + disX) + "px";
                            slideOut.style["left"] = (self._config.origin.x + disX) + "px";
                        }
                    }
                }
            } else if (self._config.mode === 2 || self._config.mode === 3) {
                //上下移动
                //判断slideIn
                if (!slideIn) {
                    //从上往下
                    if (disY > 0) {
                        slideIn = self._lis[self._lis.length - self._index + 1];
                    } else if (disY < 0) {
                        //从下往上
                        slideIn = self._lis[self._lis.length - self._index - 1];
                    }
                }
                
                if (slideIn && slideOut) {
                    var clientHeight = slideIn.clientHeight;
                    slideIn.style.visibility = slideOut.style.visibility = "visible";
                    //其他的在后面
                    for(i=0;i<self._lis.length;i++){
                        if(self._lis[i] !== slideIn && self._lis[i] !== slideOut){
                            self._lis[i].style.visibility = "hidden";
                        }
                    }

                    
                    if (disY > 0) {
                        if (supportTransform) {
                            slideIn.style[transformCSS] = "translateY(" + parseInt(-clientHeight + disY) + "px) translateZ(0)";
                            slideOut.style[transformCSS] = "translateY(" + parseInt(self._config.origin.y + disY) + "px) translateZ(0)";
                        } else {
                            slideIn.style["left"] = parseInt(-slideIn.clientHeight + disY) + "px";
                            slideOut.style["left"] = parseInt(self._config.origin.y + disY) + "px";
                        }
                    } else if (disY < 0) {
                        if (supportTransform) {
                            slideIn.style[transformCSS] = "translateY(" + parseInt(clientHeight + disY) + "px) translateZ(0)";
                            slideOut.style[transformCSS] = "translateY(" + parseInt(self._config.origin.y + disY) + "px) translateZ(0)";
                        } else {
                            slideIn.style["left"] = parseInt(clientHeight + disY) + "px";
                            slideOut.style["left"] = parseInt(self._config.origin.y + disY) + "px";
                        }
                    }
                }
            }/* else if (self._config.mode === 5 || self._config.mode === 6) {
                //上下翻转
            } else if (self._config.mode === 7 || self._config.mode === 8) {
                //左右翻转
            }*/
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

                slideOut = self._lis[self._lis.length - self._index];
            }
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
            if(slideIn && slideOut){
                var disX = evt.changedTouches[0].clientX - startPos.x;
                var disY = evt.changedTouches[0].clientY - startPos.y;
                var percent = 1;
                var offset = 0.5;
                var canNext = true, canPrev = true, can = true;

                var clearAnimation = function() {
                    clearTimeout(time);
                    self._aniIn.reset();
                    self._aniOut.reset();
                    slideIn = null;
                    slideOut = null;

                    self._isSliding = false;
                    self.play();
                };
                var startAnimation = function() {
                    //开始动画
                    self._aniIn.start({
                        timing: self._config.timing
                    });
                    self._aniOut.start({
                        timing: self._config.timing
                    });

                    self._isSliding = true;
                };
                var setKeyframes = function(percent, frameIn2Trans, frameOut2Trans) {
                    var frameIn1 = {
                        point: 0
                    };
                    frameIn1[transformCSS] = slideIn.style[transformCSS];
                    var frameIn2 = {
                        point: self._config.duration * percent
                    };
                    frameIn2[transformCSS] = frameIn2Trans;

                    var frameOut1 = {
                        point: 0
                    };
                    frameOut1[transformCSS] = slideOut.style[transformCSS];
                    var frameOut2 = {
                        point: self._config.duration * percent
                    };
                    frameOut2[transformCSS] = frameOut2Trans;

                    return {
                        frameIn: [frameIn1, frameIn2],
                        frameOut: [frameOut1, frameOut2]
                    };
                };

                self._aniIn.setElement(slideIn);
                self._aniOut.setElement(slideOut);

                self._aniIn.clear();
                self._aniOut.clear();

                var frames,time;

                if(!self._config.repeat){
                    if(self._index >= self._lis.length){
                        canNext = false;
                    }
                    if(self._index <= 1){
                        canPrev = false;
                    }
                }
                if (self._config.mode === 0 || self._config.mode === 1) {
                    offset = self._config.nextSlideOffset < 1 ?  slideOut.clientWidth*self._config.nextSlideOffset:self._config.nextSlideOffset;
                    //继续判断是否需要切换下一张图片
                    if (disX < 0) {
                        can = self._config.mode === 0 ? canNext : canPrev;
                        //下一张图片
                        if (Math.abs(disX) > offset) {
                            percent = (slideOut.clientWidth - Math.abs(disX)) / slideOut.clientWidth;
                            //向左滑动
                            //设置关键帧动画
                            //这里只支持transform
                            frames = setKeyframes(percent, "translateX(" + self._config.origin.x + "px) translateZ(0)", "translateX(" + (-slideOut.clientWidth) + "px) translateZ(0)");
                            self._aniIn.keyframe(frames.frameIn);
                            self._aniOut.keyframe(frames.frameOut);

                            startAnimation();

                            time = setTimeout(function() {
                                //动画结束
                                self._index += 1;
                                if (self._index > self._lis.length){
                                    self._index = self._lis.length;
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
                            percent = Math.abs(disX) / slideOut.clientWidth;
                            //还原
                            //设置关键帧动画
                            frames = setKeyframes(percent, "translateX(" +  slideIn.clientWidth + "px) translateZ(0)", "translateX(" + self._config.origin.x + "px) translateZ(0)");
                            self._aniIn.keyframe(frames.frameIn);
                            self._aniOut.keyframe(frames.frameOut);

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
                            percent = (slideOut.clientWidth - Math.abs(disX)) / slideOut.clientWidth;

                            //设置关键帧动画
                            frames = setKeyframes(percent, "translateX(" + self._config.origin.x + "px) translateZ(0)", "translateX(" + slideOut.clientWidth + "px) translateZ(0)");
                            self._aniIn.keyframe(frames.frameIn);
                            self._aniOut.keyframe(frames.frameOut);

                            //开始动画
                            startAnimation();

                            time = setTimeout(function() {

                                self._index -= 1;
                                if (self._index < 1){
                                    self._index = 1;
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
                            percent = Math.abs(disX) / slideOut.clientWidth;
                            //还原

                            //设置关键帧动画
                            frames = setKeyframes(percent, "translateX(" + (-slideIn.clientWidth) + "px) translateZ(0)", "translateX(" + self._config.origin.x + "px) translateZ(0)");
                            self._aniIn.keyframe(frames.frameIn);
                            self._aniOut.keyframe(frames.frameOut);

                            //开始动画
                            startAnimation();

                            time = setTimeout(function() {
                                //清理动画
                                
                                clearAnimation();
                            }, self._config.duration * percent + 80);
                        }
                    }
                } else if (self._config.mode === 2 || self._config.mode === 3) {
                    offset = self._config.nextSlideOffset < 1 ?  slideOut.clientHeight*self._config.nextSlideOffset:self._config.nextSlideOffset;
                    //上下滑动
                    if (disY < 0) {
                        can = self._config.mode === 2 ? canNext : canPrev;
                        //下一张图片
                        if (can && Math.abs(disY) > offset) {
                            percent = (slideOut.clientHeight - Math.abs(disY)) / slideOut.clientHeight;
                            //向上滑动
                            //设置关键帧动画
                            frames = setKeyframes(percent, "translateY(" + self._config.origin.y + "px) translateZ(0)", "translateY(" + (-slideOut.clientHeight) + "px) translateZ(0)");
                            self._aniIn.keyframe(frames.frameIn);
                            self._aniOut.keyframe(frames.frameOut);

                            startAnimation();

                            time = setTimeout(function() {
                                //动画结束
                                self._index += 1;
                                if (self._index > self._lis.length){
                                    self._index = self._lis.length;
                                }
                                
                                clearAnimation();
                                if (self._events["slideend"]) {
                                    self._events["slideend"].forEach(function(func) {
                                        if(func) {func(self._index, "prev");}
                                    });
                                }
                            }, self._config.duration * percent + 80);
                        } else {
                            percent = Math.abs(disY) / slideOut.clientHeight;

                            //设置关键帧动画
                            frames = setKeyframes(percent, "translateY(" + slideIn.clientHeight + "px) translateZ(0)", "translateY(" + self._config.origin.y + "px) translateZ(0)");
                            self._aniIn.keyframe(frames.frameIn);
                            self._aniOut.keyframe(frames.frameOut);

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
                            percent = (slideOut.clientHeight - Math.abs(disY)) / slideOut.clientHeight;

                            //设置关键帧动画
                            frames = setKeyframes(percent, "translateY(" + self._config.origin.y + "px) translateZ(0)", "translateY(" + slideOut.clientHeight + "px) translateZ(0)");
                            self._aniIn.keyframe(frames.frameIn);
                            self._aniOut.keyframe(frames.frameOut);

                            //开始动画
                            startAnimation();

                            time = setTimeout(function() {
                                self._index -= 1;
                                if (self._index < 1){
                                    self._index = 1;
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
                            percent = Math.abs(disY) / slideOut.clientHeight;
                            //还原

                            //设置关键帧动画
                            frames = setKeyframes(percent, "translateY(" + (-slideIn.clientHeight) + "px) translateZ(0)", "translateY(" + self._config.origin.y + "px) translateZ(0)");
                            self._aniIn.keyframe(frames.frameIn);
                            self._aniOut.keyframe(frames.frameOut);

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