function huiWaterfall(idSelector){
	this.Waterfall = hui(idSelector);
	if(this.Waterfall.length != 1){alert('请使用id选择器'); return false;}
	this.WaterfallLeft = hui('#HUI_WaterFallLeft');
	if(this.WaterfallLeft.length < 1){
		var div = document.createElement('div');
		div.setAttribute('id', 'HUI_WaterFallLeft');
		this.Waterfall.dom[0].appendChild(div);
		this.WaterfallLeft = hui('#HUI_WaterFallLeft');
	}
	this.WaterfallRight = hui('#HUI_WaterFallRight');
	if(this.WaterfallRight.length < 1){
		var div = document.createElement('div');
		div.setAttribute('id', 'HUI_WaterFallRight');
		this.Waterfall.dom[0].appendChild(div);
		this.WaterfallRight = hui('#HUI_WaterFallRight');
	}
	this.WaterTmp = hui('#HUI_WaterTmp');
	if(this.WaterTmp.length < 1){
		var div = document.createElement('div');
		div.setAttribute('id', 'HUI_WaterTmp');
		this.Waterfall.dom[0].appendChild(div);
		this.WaterTmp = hui('#HUI_WaterTmp');
	}
	
	this.addItems = function(doms){
		this.WaterTmp.html(doms);
		var items = this.WaterTmp.find('.HUI_WaterFallItems');
		for(var i = 0; i < items.length; i++){
			if(i % 2 != 0){
				hui(items.dom[0]).appendTo(this.WaterfallRight);
			}else{
				hui(items.dom[0]).appendTo(this.WaterfallLeft);
			}
		}
	}
}