require.config({
	baseUrl: '../../js',
	shim: {
		'mui': {
			exports: 'mui'
		}
	}
});
require(['lib/xrjAPI', 'mui', 'lib/aes'], function(xrjApi, mui, aes) {

	mui.init();
	var In_PhoneNumber = document.getElementById("In_PhoneNumber");
	var In_VerificationCode = document.getElementById("In_VerificationCode");
	var SendVerificationCode = document.getElementById("SendVerificationCode");
	var confirmBtn = document.getElementById("confirmBtn");
	var In_NewPassword = document.getElementById("In_NewPassword");

	SendVerificationCode.disabled = true;
	sendVerificationCodeCheck();
	verificationCodeCheck();

	mui.plusReady(function() {
		SendVerificationCode.addEventListener('tap', function() {

			In_VerificationCode.disabled = false;
			var params = {
				telephone: In_PhoneNumber.value,
				smsType: 'SMS_FIND_PWD' //-找回密码
			}
			xrjApi.validate(params).then(function(data) {
				settime(SendVerificationCode); //倒计时60秒
				console.log(JSON.stringify(data));
				mui.toast('发送成功')
			}).catch(function(err) {
				console.log(err);
				mui.toast(err);
			});
		});
		confirmBtn.addEventListener('tap', function() {
			var APPKEY = xrjApi.getAPPkey();
			var newPassword = In_NewPassword.value;
			var aesPwd = CryptoJS.AES.encrypt(APPKEY, newPassword).toString();
			var params = {
				'username': In_PhoneNumber.value,
				'password': aesPwd,
				'validateCode': In_VerificationCode.value
			}
			xrjApi.forget(params).then(function(data) {
				console.log(data.toString());
				mui.toast("修改成功");
			}).catch(function(err) {
				console.log(err);
				mui.toast(err);
			})
		})

	});
});

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
		//如果验证码是非数字且不是6位,确认按钮禁用
		confirmBtn.disabled = true;
	} else {
		//如果有新密码和验证码正确,下一步按钮启用
		if(In_NewPassword.value.length >= 6) {
			confirmBtn.disabled = false;
		}

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