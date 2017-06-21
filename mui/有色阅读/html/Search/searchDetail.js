mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var keyWord = self.keyWord;
	var url = self.url;

	var keyword = document.getElementById("keyword");
	keyword.innerHTML = keyWord;
})