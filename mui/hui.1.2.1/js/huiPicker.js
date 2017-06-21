var HUI_PickerTimer = null, HUI_PickerId = 1;
function huiPickerHide(id){hui('.HUI_Picker').hide();}
function huiPicker(selector, callBack){
	this.pickerBtn    = hui(selector);
	this.pickerId     = 'HUI_PickerMain' + HUI_PickerId;
	var huiPickerMain = document.createElement('div');
	huiPickerMain.setAttribute('class', 'HUI_Picker');
	huiPickerMain.setAttribute('id', this.pickerId);
	huiPickerMain.innerHTML = '<div class="HUI_PickerMenu">'+
	'<div class="HUI_FL HUI_ButtonSmall HUI_BG_Gray" style="color:#999999;" onclick="huiPickerHide();">取消</div>'+
	'<div class="HUI_FR HUI_ButtonSmall" id="HUI_PickerConfirm'+HUI_PickerId+'">确定</div>'+
'</div>'+
'<div class="HUI_PickerListIn"></div>'+
'<div class="hui_PickerLine"></div>';
	document.body.appendChild(huiPickerMain);
	this.pickerMain   = hui('#'+this.pickerId);
	this.listAll      = null; this.level = 1; var thisObj = this;
	hui('#HUI_PickerConfirm'+HUI_PickerId).click(function(){
		huiPickerHide(thisObj.pickerId);
		if(callBack){callBack();}
	});
	HUI_PickerId++;
	this.pickerBtn.click(function(){hui('.HUI_Picker').hide(); thisObj.pickerMain.show();});
	this.bindData = function(data){
		this.dataSave = data;
		//加载选项列表
		var lists = this.pickerMain.find('.HUI_PickerList');
		if(lists.length < 1){
			var listsHtml = '';
			var cWidth = parseInt(100 / this.level) + '%';
			for(var i = 0; i < this.level; i++){
				listsHtml += '<div class="HUI_PickerList" huiseindex="0" huisevalue="0" huisetext="" levelNumber="'+i+'" style="width:'+cWidth+';"></div>';
			}
			this.pickerMain.find('.HUI_PickerListIn').eq(0).html(listsHtml);
		}
		this.listAll = this.pickerMain.find('.HUI_PickerList');
		//循环设置选项
		var newData = data;
		for(var i = 0; i < this.level; i++){
			if(i >= 1){
				if(newData[0].children){newData = newData[0].children;}else{newData = new Array();}
			}
			this.listAll.eq(i).html('');
			var html = '';
			for(var ii = 0; ii < newData.length; ii++){html += '<div pickVal="'+newData[ii].value+'">'+newData[ii].text+'</div>';}
			this.listAll.eq(i).html('<div style="height:96px;"><input type="hidden" value="0" /></div>' + html + '<div style="height:66px;"></div>');
			this.listAll.eq(i).dom[0].addEventListener('scroll', this.scrollFun);
			//默认第一个被选中
			this.listAll.eq(i).find('div').eq(1).css({color:'#000000', 'fontSize':'14px'});
			if(typeof(newData[0]) != 'undefined'){
				this.listAll.eq(i).attr('huisevalue', newData[0].value);
				this.listAll.eq(i).attr('huisetext', newData[0].text);
			}
		}
	}
	this.scrollFun = function(){
		if(HUI_PickerTimer != null){clearTimeout(HUI_PickerTimer);}
		var scTop = this.scrollTop, scObj = this;
		HUI_PickerTimer = setTimeout(function(){thisObj.scrollDo(scTop, scObj);}, 200);
	}
	this.scrollDo = function(scTop, scObj){
		scObj.removeEventListener('scroll', this.scrollFun);
		var cList = hui(scObj), index = Math.round(scTop / 30), oldIndex = scObj.getAttribute('huiseindex');
		scObj.setAttribute('huiseindex', index);
		var selectDom   = cList.find('div').eq(index + 1);
		scObj.setAttribute('huisevalue', selectDom.attr('pickVal'));
		scObj.setAttribute('huisetext', selectDom.html());
		scObj.scrollTop = index * 30;
		cList.find('div').css({color:'#9E9E9E', 'fontSize':'14px'});
		cList.find('div').eq(index + 1).css({color:'#000000', 'fontSize':'14px'});
		var levelNumber = Number(scObj.getAttribute('levelNumber'));
		if(levelNumber < this.level - 1){
			if(oldIndex != index){this.nextReBind(index, levelNumber + 1);}
		}
		setTimeout(function(){scObj.addEventListener('scroll', thisObj.scrollFun);}, 300);
	}
	
	this.nextReBind = function(index, level){
		var allList  = this.pickerMain.find('.HUI_PickerList');
		var bindList = allList.eq(level);
		bindList.html('');
		var html = '', newData = this.dataSave;
		//向上逐层寻找
		for(var k = 0; k < level; k++){
			var pIndex = allList.eq(k).attr('huiseindex');
			if(newData[pIndex].children){
				newData = newData[pIndex].children;
			}else{
				newData = new Array();
			}
		}
		if(newData.length > 0){
			for(var ii = 0; ii < newData.length; ii++){html += '<div pickVal="'+newData[ii].value+'">'+newData[ii].text+'</div>';}
			bindList.html('<div style="height:96px;"></div>' + html + '<div style="height:66px;"></div>');
			bindList.dom[0].scrollTop = 0;
			bindList.dom[0].setAttribute('huiseindex', 0);
			bindList.dom[0].setAttribute('huisevalue', newData[0].value);
			bindList.dom[0].setAttribute('huisetext', newData[0].text);
		}else{
			bindList.dom[0].setAttribute('huiseindex', 0);
			bindList.dom[0].setAttribute('huisevalue', 0);
			bindList.dom[0].setAttribute('huisetext', '');
		}
		allList.eq(level).find('div').eq(1).css({color:'#000000', 'fontSize':'14px'});
		if(level < this.level - 1){this.nextReBind(0, level + 1);}
	}
	
	this.getVal  = function(index){
		if(!index){index = 0;}
		return this.pickerMain.find('.HUI_PickerList').eq(index).attr('huisevalue');
	}
	this.getText = function(index){
		return this.pickerMain.find('.HUI_PickerList').eq(index).attr('huisetext');
	}
}