/*
hui 选项卡组件
作者 : 深海 5213606@qq.com
官网 : http://www.hcoder.net/hui
*/
function huiTabList(selector){
	this.tabList = hui(selector);
	if(this.tabList.length != 1){return;}
	this.ul        = this.tabList.find('.HUI_TabListMain').eq(0);
	this.total     = this.ul.find('.HUI_TabListItems').size();
	this.barLine   = this.tabList.find('.HUI_TabListLine').first();
	this.barLineIn = this.barLine.find('div').first();
	this.slideBase = function(){
		this.sParent      = this.tabList.dom[0].parentNode;
		this.sParentWidth = this.sParent.clientWidth;
		this.lists = this.tabList.find('.HUI_TabListItems');
		this.lists.css({width:this.sParentWidth+'px'});
		var ulWidth = (this.sParentWidth * (this.total + 2) + 500) + 'px';
		this.ul.css({width:ulWidth, display:'block'});
		this.barLineIn.css({width:(this.sParentWidth / this.total - 1)+'px'});
		this.tabList.find('.HUI_TabListTitle').eq(0).find('div').css({'width':(this.sParentWidth / this.total - 1)+'px'});
		this.tabList.find('.HUI_TabListTitle').eq(0).find('div').each(function(dom){});
		this.tabList.find('.HUI_TabListTitle').eq(0).find('div').click(function(){
			thisObj.sliding(this.index);
		});
	}
	this.slideBase();
	this.cIndex   = 0;
	var thisObj   = this;
	this.ul.swipeLeft(function(e){thisObj.sliding(thisObj.cIndex + 1);});
	this.ul.swipeRight(function(e){thisObj.sliding(thisObj.cIndex - 1);});
	this.sliding   = function(index, speed){
		if(index < 0){return;}else if(index > this.total - 1){return;}
		if(!speed){speed = 500;} var moveVal = (index) * this.sParentWidth * -1, thisObj = this, currentVal = 0;
		this.ul.animate({marginLeft:moveVal+'px'}, speed, function(){
			thisObj.cIndex = index;
			thisObj.tabList.find('.HUI_TabListTitle').eq(0).find('div').removeClass('HUI_TabListTitleActive').eq(index).addClass('HUI_TabListTitleActive');
			thisObj.barLineIn.css({'marginLeft':(thisObj.sParentWidth/thisObj.total*index)+'px'});
		});
	}
}