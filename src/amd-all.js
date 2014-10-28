//= comment.js
(function (root, factory) {
    if (typeof exports === 'object') {
    	//node
        module.exports = factory();
        
    } else if (typeof define === 'function' && define.amd) {
    	//amd
        define([], factory);

    } 
}(this, function() {

 	//= core.js
    //= slider.js
    //= slider.touch.js

    return Slider;
}));