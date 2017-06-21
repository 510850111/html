/*
hui popoverMsg插件
作者 : 深海  5213606@qq.com
官网 : http://www.hcoder.net/hui
*/
hui.extend('popoverMsg' ,function(direction, arrowDirection, msg, width, height, addSets){
	if(!direction){direction = 'down'} if(!addSets){addSets = {left:0, top:0};}
	if(!width){width = 150;} if(!height){height = 'auto';}else{height += 'px';} if(!arrowDirection){arrowDirection = 'left'}
	if(this.length < 1){return;} var thisObj = this;
	this.dom[0].onclick = function(){
		hui.maskShow();
		var HUI_PopoverMsg = document.getElementById('HUI_PopoverMsg');
		if(!HUI_PopoverMsg){
			HUI_PopoverMsg = document.createElement('div');
			HUI_PopoverMsg.setAttribute('id', 'HUI_PopoverMsg');
			document.body.appendChild(HUI_PopoverMsg);
		}
		HUI_PopoverMsg.style.width = width+'px';
		var arrowClass = '', heightStyle = '';
		if(arrowDirection != 'left'){arrowClass = ' style="float:right; margin-right:8px"';}
		if(height != 'auto'){heightStyle = ' style="height:'+height+'; overflow-Y:auto;"'}
		if(direction == 'down'){
			HUI_PopoverMsg.innerHTML = '<div class="HUI_ArrowUp"'+arrowClass+'></div><div id="HUI_PopoverMsgText"'+heightStyle+'>'+msg+'</div>'; var sets = thisObj.offset(); 
			HUI_PopoverMsg.style.top  = sets.top + thisObj.height()+ addSets.top + 'px';
			HUI_PopoverMsg.style.left = sets.left + addSets.left + 'px';
		}else{
			HUI_PopoverMsg.innerHTML = '<div id="HUI_PopoverMsgText"'+heightStyle+'>'+msg+'</div><div class="HUI_ArrowDown"'+arrowClass+'></div>'; var sets = thisObj.offset(); 
			HUI_PopoverMsg.style.top  = sets.top - hui('#HUI_PopoverMsgText').height() + addSets.top + 'px';
			HUI_PopoverMsg.style.left = sets.left + addSets.left + 'px';
		}
		document.body.appendChild(HUI_PopoverMsg);
		hui('#HUI_Mask').click(function(){hui.maskHide(); hui(HUI_PopoverMsg).remove();});
	};
});