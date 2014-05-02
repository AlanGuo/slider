var gm = require('gm'),
    path = require('path'),
    fs = require('fs');


var services = {
    picture: function(request, response, querystring, postData, config) {
        var imageMagick = gm.subClass({
            imageMagick: true
        });
        var w = querystring.w;
        var h = querystring.h;
        var fileName = querystring.filename;
        var maxAge = querystring["max-age"] || 0;
        if (w && h && fileName) {
            var srcPath = path.resolve(config.path + path.sep + "demo" + path.sep + "imgs" + path.sep + fileName);
            var destPath = path.resolve(config.path + path.sep + "backend" + path.sep + "imgs" + path.sep + w + "x" + h);

            var returnImage = function(path) {
                var expires = new Date();
                expires.setTime(expires.getTime() + maxAge * 1000);
                response.writeHead(200, {
                    'content-type': 'image/jpeg',
                    "Cache-Control": "max-age=" + maxAge,
                    "Expires": expires.toUTCString()
                });
                var rs = fs.createReadStream(path);
                var bufs = [];
                rs.on('data', function(chunk) {
                    bufs.push(chunk);
                });
                rs.on('end', function() {
                    var buf = Buffer.concat(bufs);
                    response.end(buf);
                });
            }
            var resizeImage = function(path) {
                var magicObj = imageMagick(path);
                magicObj.size(function(err, size) {
                    if (err) {
                        console.log(err);
                        response.writeHead(500);
                        response.end();
                    } else {
                        var pictureRatio = size.width / size.height;
                        var browserRatio = w / h;
                        if (browserRatio > pictureRatio) {
                            magicObj.resize(w).crop(w, h, 0, (w / pictureRatio - h) / 2).autoOrient().interlace("line").write(resolvedPath, function(err) {
                                if (err) {
                                    console.log(err);
                                    response.writeHead(500);
                                    response.end();
                                } else {
                                    returnImage(resolvedPath);
                                }
                            });
                        } else {
                            magicObj.resize(null, h).crop(w, h, (h * pictureRatio - w) / 2, 0).autoOrient().interlace("line").write(resolvedPath, function(err) {
                                if (err) {
                                    console.log(err);
                                    response.writeHead(500);
                                    response.end();
                                } else {
                                    returnImage(resolvedPath);
                                }
                            });
                        }
                    }
                });
            }
            //目标分辨率文件夹存在
            var resolvedPath = destPath + path.sep + fileName;
            //
            if (fs.existsSync(destPath)) {
                if (fs.existsSync(resolvedPath)) {
                    //目标文件存在，直接返回
                    returnImage(resolvedPath);
                } else {
                    //目标文件不在，生成目标文件
                    resizeImage(srcPath);
                }
            } else {
                //目标分辨率文件夹不存在，先创建文件夹
                fs.mkdir(destPath, function(err) {
                    if (err) {
                        console.log(err);
                        response.writeHead(500);
                        response.end();
                    } else {
                        resizeImage(srcPath);
                    }
                });
            }
        } else {
            console.log("参数错误");
            response.writeHead(200);
            response.write('{"code":-1002,"msg":"参数错误"}', "utf-8");
            response.end();
        }
    }
}

exports.services = services;