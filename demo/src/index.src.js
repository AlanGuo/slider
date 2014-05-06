//elems
var sl_slider_ul = document.getElementById("sl_slider_ul");
var sl_slider_left = document.getElementById("sl_slider_left");
var sl_slider_right = document.getElementById("sl_slider_right");
var sl_mode_selectul = document.getElementById("sl_mode_selectul");
var sl_slider_dot_ul_wrapper = document.getElementById("sl_slider_dot_ul_wrapper");
var sl_description = document.getElementById("sl_description");
var sl_fork = document.getElementById("sl_fork");

//获取客户区域大小
var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;

//templates
var liTemplate = slider.demo.li;

//随机四幅图
var randomNum = [];
while (randomNum.length < 4) {
    var num = parseInt(Math.random() * 20);
    if (randomNum.indexOf(num) == -1)
        randomNum.push(num);
}

sl_slider_ul.innerHTML = jstemplate(liTemplate, {
    imgs: randomNum,
    size: {
        w: w,
        h: h
    }
});

var sl1 = new Slider(sl_slider_ul, {
    mode: 0,
    autoPlay: true,
    timing: "ease"
}).touchToSlide();
sl1.on("slideend", function(index) {
    var children = sl_slider_dot_ul_wrapper.children;
    for (var i = 0; i < children.length; i++) {
        children[i].className = "";
    }
    children[index - 1].className = "current";
});

sl_mode_selectul.onclick = function(evt) {
    evt = evt || window.event;
    var target = evt.target || evt.srcElement;

    for (var i = 0; i < sl_mode_selectul.children.length; i++) {
        sl_mode_selectul.children[i].className = "";
    }
    target.className = "current";
    var mode = target.getAttribute("mode");
    
    sl1.changeConfig({
        mode: mode,
        autoPlay: true,
        timing: "ease"
    });
}

sl_slider_left.onclick = function() {
    sl1.prev();
}
sl_slider_right.onclick = function() {
    sl1.next();
}