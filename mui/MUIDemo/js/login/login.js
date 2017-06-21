require.config({
	baseUrl: '../../js',
	shim: {
		'mui': {
			exports: 'mui'
		}
	}
});

require(['lib/xrjAPI', 'mui', 'lib/aes'], function(xrjApi, mui, aes) {
	var login = document.getElementById("login");
	var account = document.getElementById("account");
	var password = document.getElementById("password");

	mui.init();
	mui.plusReady(function() {
		var str1 = " 设备序号:" + getDeviceSerial() +
			"\n 设备类型:" + getDeviceType() +
			"\n 设备名称:" + getDeviceName() +
			"\n 设备型号:" + getDeviceModel() +
			"\n 系统版本:" + getSystemVersion() +
			"\n 分辨率:" + getSesolution();
		//				alert(str1);
		login.addEventListener('tap', function() {
			//检查账号密码信息
			var statusArr;
			statusArr = Check(account.value, password.value);
			if(statusArr[0] == false) {
				mui.toast(statusArr[1]);
				return;
			}

			var APPKEY = xrjApi.getAPPkey();
			var aesPwd = CryptoJS.AES.encrypt(APPKEY, password.value).toString();
			var deviceId = getDeviceSerial();

			var params = {
				'username': account.value,
				'password': aesPwd,
				'deviceId': deviceId
			};
			xrjApi.login(params).then(function(data) {
				console.log(data.toString());
				xrjApi.setTokenValue(data.token);
				
			}).catch(function(err) {
				console.log(err);
			})
			
			mui.openWindow({
				url : '../index.html',
				id :  '../index.html'
			})

		})

		//注册账号
		var reg = document.getElementById("reg");
		reg.addEventListener('tap', function() {
			mui.openWindow({
				url: '../register/register-step1.html',
				id: 'register-step1'
			});
		})

		//忘记密码
		var forgetPassword = document.getElementById("forgetPassword");
		forgetPassword.addEventListener('tap', function() {
			mui.openWindow({
				url: '../forgotPassword/forget_password.html',
				id: 'forget_password.html'
			})
		});

		function Check(account, password) {
			var Checkarr = [false, ""];
			if(account.length < 1) {
				Checkarr[1] = "账号不能为空!"
				return Checkarr;
			}
			if(password.length < 1) {
				Checkarr[1] = "密码不能为空!"
				return Checkarr;
			}
			return Checkarr = [true, ""];
		}

		function getDeviceSerial() {
			//设备序号
			return plus.device.uuid;

		}

		function getDeviceType() {
			//设备类型【ANDROID、IOS】
			var DeviceType = "Unknown";
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
			if(isAndroid) {
				DeviceType = "ANDROID";
			}
			if(isiOS) {
				DeviceType = "IOS";
			}
			return DeviceType;
		}

		function getDeviceName() {
			//设备名称 (如：xx的IPHONE,ANDROID为空)
			return plus.os.name;
		}

		function getDeviceModel() {
			//设备型号(如：samsung note 4等)
			return plus.device.model;
		}

		function getSystemVersion() {
			//系统版本
			return plus.os.version;
		}

		function getSesolution() {
			//分辨率(格式为：488x520)
			return(plus.screen.resolutionWidth * plus.screen.scale + 'x' + plus.screen.resolutionHeight * plus.screen.scale)
		}
	})

});