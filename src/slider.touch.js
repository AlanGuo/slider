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