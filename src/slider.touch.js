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
 * @support ie:>=6,chrome:all,firefox:all
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

    this._ol.addEventListener("touchstart", function(evt) {
        //滑动开始
        if (!self._isSliding) {
            self.pause();
            touchStart = true;
            startPos = {
                x: evt.changedTouches[0].clientX,
                y: evt.changedTouches[0].clientY
            };

            slideOut = self._lis[self._lis.length - 1];
        }
        evt.preventDefault();
    });

    this._ol.addEventListener("touchmove", function(evt) {
        //滑动过程
        if (startPos && touchStart) {
            var disX = evt.changedTouches[0].clientX - startPos.x;
            var disY = evt.changedTouches[0].clientY - startPos.y;
            //左右移动
            if (self._config.mode == 0 || self._config.mode == 1) {
                //判断slideIn
                if (!slideIn) {
                    //从左往右
                    if (self._config.mode == 0) {
                        if (disX > 0) {
                            slideIn = self._lis[0];
                            self._ol.appendChild(slideIn);
                        } else if (disX < 0) {
                            //从右往左
                            slideIn = self._lis[self._lis.length - 2];
                        }
                    } else if (self._config.mode == 1) {
                        if (disX < 0) {
                            slideIn = self._lis[0];
                            self._ol.appendChild(slideIn);
                        } else if (disX > 0) {
                            //从右往左
                            slideIn = self._lis[self._lis.length - 2];
                        }
                    }
                }
                //这里不关心动画方式，使用left移动
                if (slideIn && slideOut) {
                    if (disX > 0) {
                        slideIn.style.left = -slideIn.clientWidth + disX + "px";
                        slideOut.style.left = self._config.origin.x + disX + "px";
                    } else if (disX < 0) {
                        slideIn.style.left = slideIn.clientWidth + disX + "px";
                        slideOut.style.left = self._config.origin.x + disX + "px";
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
                        slideIn.style.top = -slideIn.clientHeight + disY + "px";
                        slideOut.style.top = self._config.origin.y + disY + "px";
                    } else if (disY < 0) {
                        slideIn.style.top = slideIn.clientHeight + disY + "px";
                        slideOut.style.top = self._config.origin.y + disY + "px";
                    }
                }
            } else if (self._config.mode == 5 || self._config.mode == 6) {
                //上下翻转
            } else if (self._config.mode == 7 || self._config.mode == 8) {
                //左右翻转
            }
        }
        evt.preventDefault();
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
                        self._aniIn.keyframe({
                            point: 0,
                            left: slideIn.style.left
                        }).keyframe({
                            point: self._config.duration * percent,
                            left: self._config.origin.x + "px"
                        });

                        //设置关键帧
                        self._aniOut.keyframe({
                            point: 0,
                            left: slideOut.style.left
                        }).keyframe({
                            point: self._config.duration * percent,
                            left: -slideOut.clientWidth + "px"
                        });

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
                                if (self._index <= 1)
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
                        self._aniIn.keyframe({
                            point: 0,
                            left: slideIn.style.left
                        }).keyframe({
                            point: self._config.duration * percent,
                            left: slideIn.clientWidth + "px"
                        });

                        //设置关键帧
                        self._aniOut.keyframe({
                            point: 0,
                            left: slideOut.style.left
                        }).keyframe({
                            point: self._config.duration * percent,
                            left: self._config.origin.x + "px"
                        });

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
                        self._aniIn.keyframe({
                            point: 0,
                            left: slideIn.style.left
                        }).keyframe({
                            point: self._config.duration * percent,
                            left: self._config.origin.x + "px"
                        });

                        //设置关键帧
                        self._aniOut.keyframe({
                            point: 0,
                            left: slideOut.style.left
                        }).keyframe({
                            point: self._config.duration * percent,
                            left: slideOut.clientWidth + "px"
                        });

                        //开始动画
                        startAnimation();

                        var time = setTimeout(function() {

                            if (self._config.mode == 0) {
                                self._index -= 1;
                                if (self._index <= 1)
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
                        self._aniIn.keyframe({
                            point: 0,
                            left: slideIn.style.left
                        }).keyframe({
                            point: self._config.duration * percent,
                            left: -slideIn.clientWidth + "px"
                        });

                        //设置关键帧
                        self._aniOut.keyframe({
                            point: 0,
                            left: slideOut.style.left
                        }).keyframe({
                            point: self._config.duration * percent,
                            left: self._config.origin.x + "px"
                        });

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
                        self._aniIn.keyframe({
                            point: 0,
                            top: slideIn.style.top
                        }).keyframe({
                            point: self._config.duration * percent,
                            top: self._config.origin.y + "px"
                        });

                        //设置关键帧
                        self._aniOut.keyframe({
                            point: 0,
                            top: slideOut.style.top
                        }).keyframe({
                            point: self._config.duration * percent,
                            top: -slideOut.clientHeight + "px"
                        });

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
                                if (self._index <= 1)
                                    self._index = self._lis.length;
                            }

                            if (self._events["slideend"]) {
                                self._events["slideend"].forEach(function(func) {
                                    func && func(self._index, "prev");
                                });
                            }
                        }, self._config.duration * percent + 80);
                    } else {
                        percent = Math.abs(disY) / slideOut.clientHeight;

                        //设置关键帧动画
                        self._aniIn.keyframe({
                            point: 0,
                            top: slideIn.style.top
                        }).keyframe({
                            point: self._config.duration * percent,
                            top: slideIn.clientHeight + "px"
                        });

                        //设置关键帧
                        self._aniOut.keyframe({
                            point: 0,
                            top: slideOut.style.top
                        }).keyframe({
                            point: self._config.duration * percent,
                            top: self._config.origin.y + "px"
                        });

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
                        self._aniIn.keyframe({
                            point: 0,
                            top: slideIn.style.top
                        }).keyframe({
                            point: self._config.duration * percent,
                            top: self._config.origin.y + "px"
                        });

                        //设置关键帧
                        self._aniOut.keyframe({
                            point: 0,
                            top: slideOut.style.top
                        }).keyframe({
                            point: self._config.duration * percent,
                            top: slideOut.clientHeight + "px"
                        });

                        //开始动画
                        startAnimation();

                        var time = setTimeout(function() {
                            if (self._config.mode == 2) {
                                self._index -= 1;
                                if (self._index <= 1)
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
                        self._aniIn.keyframe({
                            point: 0,
                            top: slideIn.style.top
                        }).keyframe({
                            point: self._config.duration * percent,
                            top: -slideIn.clientHeight + "px"
                        });

                        //设置关键帧
                        self._aniOut.keyframe({
                            point: 0,
                            top: slideOut.style.top
                        }).keyframe({
                            point: self._config.duration * percent,
                            top: self._config.origin.y + "px"
                        });

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