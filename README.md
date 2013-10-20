slider
======

图片轮播lib

##how to use:
-html结构组织：

	    ul {
	      	......
			overflow: hidden;
			width:950px;
			height:264px;
			position: relative;
		}
		ul li{
			......
			position:absolute;
			list-style: none;
		}
	    <ul id="ul-1">
			<li><img src="imgs/browser-slide001.jpg"></li>
			<li><img src="imgs/home-slide001.jpg"></li>
			<li><img src="imgs/home-slide002-wachky.jpg"></li>
			<li><img src="imgs/home-slide-sheep.jpg"></li>
		</ul>
-js 初始化:
		var ul1 = document.getElementById("ul-1");
		var sl1 = new Slider(ul1,{mode:0});

##config:
	mode: 动画方式	//0-从右往做, 1-从左往右, 2-从下往上，3-从上往下，4-fadeout/
		fadein,5-3d向上翻转，6-3d向下翻转(5,6暂时只支持webkit内核浏览器)

	duration: 动画轮播时间	//默认400ms
	interval: 动画轮播间隔 //默认3000ms;
	autoPlay: 是否自动播放 //默认true，初始化之后可以使用slider.play()来播放;
	timing : 动画缓动，如果浏览器不支持css动画，那么此设置项无效 //默认是"linear";
	scale : 缩放比例，如果使用3d透视，图形会有一些超出原来的尺寸，所以需要使用scale来微调，scale一般设置为0.89左右// 默认是1;

##接口能力：
	prev()	上一幅图
	next()	下一幅图
	pause()	 暂停（使用css动画的方式，次方法无效）
	play()	播放
