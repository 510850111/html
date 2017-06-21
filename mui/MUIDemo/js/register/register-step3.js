require.config({
	baseUrl: '../../js',
	shim: {
		'mui': {
			exports: 'mui'
		}
	}
});

require(['lib/xrjAPI', 'mui','lib/aes'], function(xrjApi, mui,aes){
		var nickname = document.getElementById("nickname");
		var pwd = document.getElementById("pwd");
		var repwd = document.getElementById("repwd");
		var submitBtn = document.getElementById('submitBtn');
		submitBtn.disabled = true;
		
		var besureInput = document.getElementById("besureInput");
	
		mui.init();
		mui.plusReady(function(){
			var self = plus.webview.currentWebview();
			var username = self.username;
			var validateCode = self.validateCode;
			var recommendUsername = self.recommendUsername;
			console.log(username);
			console.log(validateCode);
			console.log(recommendUsername);

			var url = '';
			var relativeURL = '';
			//上传用户默认头像
			var params  = ['../../img/headImg.jpg'];
			xrjApi.addResource(params).then(function(data){
				url = data.url;
				relativeURL = data.relativeURL;
				alert(data);
			}).catch(function(err){
				console.log(err);
			});
			
			//同意协议
			besureInput.addEventListener('tap',function(){
				if(checkNickname() && checkPwd() && !(this.checked == true)){
					submitBtn.disabled = false;
				}else{
					submitBtn.disabled = true;
					this.checked = true;
				}
			})
			
			//提交事件
			submitBtn.addEventListener('tap',function(){
				var APPKEY = xrjApi.getAPPkey();
				var aesPwd = CryptoJS.AES.encrypt(APPKEY,pwd.value).toString();
//				var abc = Base64.encode(aesPwd);
				console.log(aesPwd);
				var RegParams = {
					'username' : username,
					'password' : aesPwd,
					'validateCode' : validateCode,
					'nickname' : nickname.value,
					'avatar' : relativeURL,
					'recommendUsername' : recommendUsername
				}
				xrjApi.register(RegParams).then(function(data){
					mui.toast("注册成功");
					mui.openWindow({
						url : '../login/login.html',
						id : '../login/login.html'
					})
				}).catch(function(err){
						mui.toast('注册失败');
						console.log(err);
					})
			})
		});
});
		
