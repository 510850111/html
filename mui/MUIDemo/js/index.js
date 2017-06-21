require.config({
	baseUrl:'js',
	shim:{
		'mui':{
			exports:'mui'
		}
	}
});

require(['lib/xrjAPI','mui','lib/aes'], function(xrjApi, mui,aes){
	mui.init();

	var aesCode = "";
	var aesWord = "";
	var aesPwd = "";
	
//	xrjApi.demo('hello').then(function(data){
//		console.log(data);
//	}).catch(function(err){
//		console.log(err);
//	});
//	
//	var params = {
//		'deviceSerial' : 'de9d440c80f74b1a923204d080e92bd5',
//		'deviceType' : 'ANDROID',
//		'deviceName':'Test',
//		'deviceModel' : 'meizu',
//		'systemVersion' : '9.999',
//		'resolution' : '1920*1080'
//	};
//	
//	xrjApi.addDevice(params).then(function(data){
//		console.log(data);
//		var str = JSON.stringify(data);
//		console.log(str);
//	}).catch(function(err){
//		console.log(err);
//	});

//	var params = {
//		content : '这是一个测试消息'
//	}
//
//	xrjApi.feedBack(params).then(function(data){
//		console.log(JSON.stringify(data));
//	}).catch(function(err){
//		console.log(err);
//	});

//	var params = ['http://localhost:8080/file/wjlife/resources/201603/29/c9e867ae62a54dea94aa63e3aeb38e1b.png','http://localhost:8080/file/wjlife/resources/201603/29/978f24cade25488a8f1a3a049151dea5.png'];//可以是多个文件
//	xrjApi.addResource(params).then(function(data){
//		console.log(JSON.stringify(data));
//	}).catch(function(err){
//		console.log(err);
//	});

//	var params = {
//		telephone : '17780614446',
//		smsType : 'SMS_REGISTER'//用户注册
//	}
//	xrjApi.validate(params).then(function(data){
//		console.log(JSON.stringify(data));
//	}).catch(function(err){
//		console.log(err);
//	});

//	var params = {
//		username : '17780614446',
//		password : '',//使用AES加密，密钥为分配的KEY
//		validateCode : '',//验证码
//		nickname : '测试',
//		recommendUsername : '18010558729'
//	}
//	
//	xrjApi.register(params).then(function(data){
//		console.log(JSON.stringify(data));
//	}).catch(function(err){
//		console.log(err);
//	})

//	var params ={
//		username : '17780614446',
//		password : '',//密码(需要使用AES加密，密钥为分配的KEY)
//		deviceId : 123456789
//	}
//	xrjApi.login(params).then(function(data){
//		console.log(JSON.stringify(data));
//	}).catch(function(err){
//		console.log(err);
//		document.getElementById("div").innerHTML = err;
//	});
//	

//	var params = {
//		username : '18010558729',
//		password : '',//新密码(需要使用AES加密，密钥为分配的KEY)
//		validateCode : '123456'
//	}
//	xrjApi.forget(params).then(function(data){
//		console.log(JSON.stringify(data));
//	}).catch(function(err){
//		console.log(err);
//	})

//	var params = 18010558729;
//	xrjApi.getUserDetail(params).then(function(data){
//		console.log(JSON.stringify(data));
//	}).catch(function(err){
//		console.log(err);
//	});

//	var params = 18010558729;
//	xrjApi.getUserDetail(params).then(function(data){
//		console.log(JSON.stringify(data));
//	}).catch(function(err){
//		console.log(err);
//	});

//	var params = '18010558729';
//	xrjApi.getRecommendUser(params).then(function(data){
//		console.log(JSON.stringify(data));
//	}).catch(function(err){
//		console.log(err);
//	});
});
