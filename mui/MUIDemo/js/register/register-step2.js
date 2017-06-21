require.config({
	baseUrl: '../../js',
	shim: {
		'mui': {
			exports: 'mui'
		}
	}
});
require(['lib/xrjAPI', 'mui'], function(xrjApi, mui) {

	mui.init();

	var In_PhoneNumber = document.getElementById("In_PhoneNumber");
	var In_VerificationCode = document.getElementById("In_VerificationCode");
	var SendVerificationCode = document.getElementById("SendVerificationCode");
	var NextBtn = document.getElementById("NextBtn");

	SendVerificationCode.disabled = true;
	NextBtn.disabled = true;
	sendVerificationCodeCheck();
	verificationCodeCheck();

	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var recommendUserTel = self.recommendUsername;

		SendVerificationCode.addEventListener('tap', function() {

			In_VerificationCode.disabled = false;
			var params = {
				telephone: In_PhoneNumber.value,
				smsType: 'SMS_REGISTER' //用户注册信息
			}
			xrjApi.validate(params).then(function(data) {
				settime(SendVerificationCode); //倒计时60秒
				console.log(JSON.stringify(data));
				mui.toast('发送成功')
			}).catch(function(err) {
				console.log(err);
				mui.toast('发送失败');
			});

		});

		NextBtn.addEventListener('tap', function() {
			mui.openWindow({
				url: 'register-step3.html',
				id: 'register-step3.html',
				//给打开的页面传输数据
				extras: {
					username: In_PhoneNumber.value,
					validateCode: In_VerificationCode.value,
					recommendUsername: recommendUserTel
				}
			})
		});

	});
})

function sendVerificationCodeCheck() {
	//使用正则表达式检验输入的手机号是否是数字且达到11位
	if(!(/^1\d{10}$/.test(In_PhoneNumber.value))) {
		//如果不符合规则,禁用验证码按钮
		SendVerificationCode.disabled = true;
	} else {
		SendVerificationCode.disabled = false;
	}
}

function verificationCodeCheck() {
	if(!(/^\d{6}$/.test(In_VerificationCode.value))) {
		//如果验证码是非数字且不是6位,下一步按钮禁用
		NextBtn.disabled = true;
	} else {
		//如果正确,下一步按钮启用
		NextBtn.disabled = false;
	}
}

var countdown = 60;

function settime(val) {
	if(countdown == 0) {
		val.disabled = false;
		val.innerHTML = "免费获取验证码";
		countdown = 60;
		return;
	} else {
		val.disabled = true;
		val.innerHTML = "重新发送(" + countdown + ")";
		countdown--;
	}
	setTimeout(function() {
		settime(val)
	}, 1000)
}