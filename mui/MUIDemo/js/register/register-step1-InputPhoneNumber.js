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
	mui.plusReady(function() {
		var IdentityVerificationBtn = document.getElementById("IdentityVerificationBtn");
		var In_PhoneNumber = document.getElementById("In_PhoneNumber");
		IdentityVerificationBtn.addEventListener('tap',function(){
			console.log(In_PhoneNumber.value);
			var errData = {
				username : In_PhoneNumber.value,
				nickname : '未知错误'
			}
			var params = {
				'username' : In_PhoneNumber.value
			}
			xrjApi.getRecommendUser(params).then(function(data){
				console.log(JSON.stringify(data));
				mui.openWindow({
					url : 'register-step1-IdentityVerification.html',
					id: 'register-step1-IdentityVerification.html',
					//给打开的页面传输数据
					extras: {
						username: data.username,
						nickname: data.nickname
					}
				});
			}).catch(function(err){
				mui.toast(err);
				console.log(err);
				mui.openWindow({
					url : 'register-step1-IdentityVerification.html',
					id: 'register-step1-IdentityVerification.html',
					//给打开的页面传输数据
					extras: {
						username: errData.username,
						nickname: errData.nickname
					}
				});
			});
		});
	});		
});