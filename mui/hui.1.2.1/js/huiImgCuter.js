/*
hui 图片剪裁组件
作者 : 深海  5213606@qq.com
官网 : http://www.hcoder.net/hui
*/
function huiImgCuterPlay(widthV, heightV){
	//获取裁切数据
	var cuter       = hui('#huiImgCuter');
	var cuterMain   = hui('#huiImgCutShow');
	if(cuter.length < 1){hui.toast('请先选择照片'); return false;}
	var sets        = {};
	var width       = cuter.width();
	var height      = cuter.height();
	var canvas      = document.getElementById('huiCanvas');
	if(!widthV){canvas.width = width;}else{canvas.width = widthV;}
	if(!widthV){canvas.height = height;}else{canvas.height = heightV;}
	var ctx         = canvas.getContext('2d');
	var img         = cuterMain.find('img').dom[0];
	var imgWidth    = img.naturalWidth;
	var imgWidth2   = cuterMain.find('img').width();
	var scale       = imgWidth / imgWidth2;
	var imgLeft     = img.style.marginLeft;
	if(!imgLeft){imgLeft = 0;}else{imgLeft = Number(imgLeft.replace('px',''));}
	imgLeft         = (imgLeft * scale * -1);
	sets.left       = imgLeft + (Number(cuter.dom[0].style.left.replace('px','')) * scale);
	var imgTop      = img.style.marginTop;
	if(!imgTop){imgTop = 0;}else{imgTop = Number(imgTop.replace('px',''));}
	imgTop          = (imgTop * - 1 * scale);
	var huiImgCutImgInMt = hui('#huiImgCutImgIn').dom[0].style.marginTop;
	huiImgCutImgInMt = Number(huiImgCutImgInMt.replace('px',''));
	sets.top         = ((Number(cuter.dom[0].style.top.replace('px','')) - huiImgCutImgInMt) * scale) + imgTop;
	if(sets.left < 0){sets.left = 0;}
	if(sets.top < 0){sets.top = 0;}
	ctx.drawImage(img, sets.left, sets.top, width * scale, height * scale, 0, 0, canvas.width , canvas.height);
	hui('#huiCuterCanvas').show();
	return true;
}
/**
 * @param  selector 图片外层div id
 * @param  width 剪裁窗口宽度 为了兼容请设置百分比
 * @param  height 高度设置是相对宽度的百分比
 */
function huiImgCuter(selector, width, height){
	this.cuterMain   = hui(selector);
	if(!width){width = '80%';} if(!height){height = '100%';}
	if(this.cuterMain.length != 1){return false;}
	//剪裁区域
	this.cuter       = hui('#huiImgCuter');
	var winInfo = hui.winInfo();
	this.cuterMain.css({height:(winInfo.height - 102) + 'px'});
	//设置外层div高度
	if(this.cuter.length != 1){
		var cuter    = document.createElement('div');
		cuter.setAttribute('id', 'huiImgCuter');
		hui(cuter).appendTo(this.cuterMain);
		var huiCuterMask1 = document.createElement('div');
		huiCuterMask1.setAttribute('class', 'huiCuterMask');
		hui(huiCuterMask1).appendTo(this.cuterMain);
		var huiCuterMask2 = document.createElement('div');
		huiCuterMask2.setAttribute('class', 'huiCuterMask');
		hui(huiCuterMask2).appendTo(this.cuterMain);
		var huiCuterMask3 = document.createElement('div');
		huiCuterMask3.setAttribute('class', 'huiCuterMask');
		hui(huiCuterMask3).appendTo(this.cuterMain);
		var huiCuterMask4 = document.createElement('div');
		huiCuterMask4.setAttribute('class', 'huiCuterMask');
		hui(huiCuterMask4).appendTo(this.cuterMain);
		this.cuter   = hui('#huiImgCuter');
	}
	//设置剪裁区域
	this.cuter.css({width:width});
	var rWidth  = this.cuter.width();
	var height  = rWidth * Number(height.replace("%", '')) / 100;
	var pWidth  = this.cuterMain.width();
	this.cuterMain.find('img').eq(0).css({width:pWidth+'px'});
	var pHeight = this.cuterMain.height();
	var left    = (pWidth - rWidth) / 2;
	var top     = (pHeight - height) / 2;
	this.cuter.css({height:height+'px', left:left+'px', top:top+'px'});	
	//处理遮罩
	var masks = this.cuterMain.find('.huiCuterMask');
	masks.eq(0).css({left:'0px', top:'0px', width:'100%', height:top+'px'});
	masks.eq(1).css({left:(pWidth - left + 1)+'px', top: top+'px', width: (left-1)+'px', height:(height+2)+'px'});
	masks.eq(2).css({left:'0px', top: (top + height + 2)+ 'px', width:'100%', height:(top - 2)+'px'});
	masks.eq(3).css({left:'0px', top: top+'px', width:left+'px', height: (height+2)+'px'});
	//处理 huiImgCutImgIn 位置
	var huiImgCutImgIn    = hui('#huiImgCutImgIn');
	var huiImgCutImgInH   = huiImgCutImgIn.height();
	var huiImgCutImgInTop = pHeight - huiImgCutImgInH;
	if(huiImgCutImgInTop  >= 2){
		huiImgCutImgInTop = huiImgCutImgInTop / 2;
	}else{
		huiImgCutImgInTop = 0;
	}
	if(huiImgCutImgInTop > top){huiImgCutImgInTop = top+1;}
	if(huiImgCutImgInH < height){huiImgCutImgInH = height;}
	huiImgCutImgIn.css({marginTop:huiImgCutImgInTop + 'px', height:huiImgCutImgInH+'px'});
	//缩放
	var img        = this.cuterMain.find('img').eq(0).dom[0];
	hammertime     = new Hammer(this.cuter.dom[0]);
	hammertime.get('pinch').set({enable:true});
	hammertime.on("pinchout", function (e){
		var width = img.style.width;
		width = Number(width.substr(0, width.length - 2)) + 3;
		img.style.width = width + 'px';
	});
	hammertime.on("pinchin", function (e){
		var width = img.style.width;
		width = Number(width.substr(0, width.length - 2)) - 3;
		img.style.width = width+'px';
	});
	hammertime.on('panmove', function(e){
		var oldMarginLeft    = img.style.marginLeft;
		if(!oldMarginLeft){oldMarginLeft = 0;}else{oldMarginLeft = Number(oldMarginLeft.replace('px',''));}
	    img.style.marginLeft = oldMarginLeft + (e.deltaX * 0.03) +'px';
	    var oldMarginTop     = img.style.marginTop;
		if(!oldMarginTop){oldMarginTop = 0;}else{oldMarginTop = Number(oldMarginTop.replace('px',''));}
	    img.style.marginTop = oldMarginTop + (e.deltaY * 0.03) +'px';
	});
	hammertime.on('panend', function(e){
		huiImgCuterPlay();
	});
	setTimeout(function(){huiImgCuterPlay();}, 300);
}