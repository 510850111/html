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
	return (plus.screen.resolutionWidth * plus.screen.scale + 'x' + plus.screen.resolutionHeight* plus.screen.scale )
}