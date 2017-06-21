require.config({
	baseUrl: '../../js',
	shim: {
		'mui': {
			exports: 'mui'
		}
	}
});

require(['lib/xrjAPI', 'mui'], function(xrjApi, mui){
	mui.init();
	mui.plusReady(function(){
		var self = plus.webview.currentWebview();
		var nickname = document.getElementById("nickname");
		
		nickname.innerHTML = self.nickname;
		telNumber.innerHTML = self.username;
		
		var confirmBtn = document.getElementById("confirmBtn");
		confirmBtn.addEventListener('tap',function(){
			mui.openWindow({
				url : 'register-step2.html',
				id : 'register-step2.html',
				extras: {
					recommendUsername : self.username
				}
			})
		})
				
	})
});
