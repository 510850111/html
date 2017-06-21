hui('#topCat').scrollX(7, 'a');

hui.plusReady(function() {
	var subView1 = hui.create('html/sub1/sub1.html', {
		top: '87px',
		bottom: '0px'
	});
	var self = plus.webview.currentWebview(); //获取当前窗口
	self.append(subView1);
});

function changeCat(cateID) {
	hui('#topCat').find('a').removeClass('topCatSed').eq(cateID).addClass('topCatSed');
	var subView = plus.webview.getWebviewById('html/sub1/sub1.html'); //获取子页面
	subView.evalJS('changeCate(' + cateID + ');')
}

