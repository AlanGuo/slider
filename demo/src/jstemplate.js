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