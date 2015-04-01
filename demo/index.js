var jstemplate = function() {
    var cache = {};

    function _getTmplStr(rawStr, mixinTmpl) {
        if (mixinTmpl) {
            for (var p in mixinTmpl) {
                var r = new RegExp('<%#' + p + '%>', 'g');
                rawStr = rawStr.replace(r, mixinTmpl[p]);
            }
        }
        return rawStr;
    }
    return function tmpl(str, data, opt) {
        opt = opt || {};
        var key = opt.key,
            mixinTmpl = opt.mixinTmpl,
            strIsKey = opt.strIsKey != null ? opt.strIsKey : !/\W/.test(str);
        key = key || (strIsKey ? str : null);
        var fn = key ? cache[key] = cache[key] || tmpl(_getTmplStr(strIsKey ? document.getElementById(str).innerHTML : str, mixinTmpl)) :
            new Function("obj", "var _p_=[],print=function(){_p_.push.apply(_p_,arguments);};with(obj){_p_.push('" + str
                .replace(/[\r\t\n]/g, " ")
                .split("\\'").join("\\\\'")
                .split("'").join("\\'")
                .split("<%").join("\t")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("_p_.push('") + "');}return _p_.join('');");
        return data ? fn(data) : fn;
    };
}();
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
var liTemplate = /*<slider.demo.li>*/'<%for(var i=0;i<imgs.length;i++){%><li><img src="http://58.96.185.53:82/cgi-bin/picture?w=<%=size.w%>&h=<%=size.h%>&filename=<%=imgs[i]%>.jpg&max-age=2592000"></li><%}%>'/*</slider.demo.li>*/;

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
    timing: "ease",
    loop: false
});

if(sl1.touchToSlide){
    sl1.touchToSlide();
}

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
    var mode = target.getAttribute("mode")*1;
    
    sl1.changeConfig({
        mode: mode,
        autoPlay: true,
        timing: "ease"
    });

    var children = sl_slider_dot_ul_wrapper.children;
    for (var i = 0; i < children.length; i++) {
        children[i].className = "";
    }
    children[0].className = "current";
}

sl_slider_left.onclick = function() {
    sl1.prev();
}
sl_slider_right.onclick = function() {
    sl1.next();
}