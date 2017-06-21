require.config({
	baseUrl: '../../js',
	shim: {
		'mui': {
			exports: 'mui'
		}
	}
});

require(['lib/xrjAPI', 'mui', ], function(xrjApi, mui) {

	mui.init();
	mui.plusReady(function() {
		//点击更换头像
		var headImgLi = document.getElementById("headImgLi");
		headImgLi.addEventListener('tap', function() {
			//传入toggle参数，无需关心当前是显示还是隐藏状态，会自动识别处理；
			mui('#changeHeadImage').popover('toggle');
		});

		//点击从相册更换新头像
		var changeHeadImageFromGallery = document.getElementById("changeHeadImageFromGallery");
		changeHeadImageFromGallery.addEventListener('tap',function() {
			var lfs = null; //保留上次选择图片的列表
			console.log("选择图片！");
			plus.gallery.pick(function(path) {
				console.log(path.files);
				lfs = path.files;
				var headImg = document.getElementById("headImg");//拿到图像标签
				headImg.src = path.files;
			}, function(e) {
				console.log("取消图片！");
			}, {
				filter: "none",
				multiple: true,
				maximum: 1,
				system: false,
				onmaxed: function() {
					plus.nativeUI.alert('最多只能选择1个！')
				},
				popover: true,
				selected: lfs
			});
			mui('#changeHeadImage').popover('hide');//关闭popover
		});

		//点击拍照更换头像
		var changeHeadImageFromCamera = document.getElementById("changeHeadImageFromCamera");
		changeHeadImageFromCamera.addEventListener('tap', function() {
			//调用系统摄像头进行拍照
			var r = null;
			var cmr = plus.camera.getCamera(0);
			var res = cmr.supportedImageResolutions[0];
			var fmt = cmr.supportedImageFormats[0];
			cmr.captureImage(function(path) {
				console.log(path);
			},
			function(err) {
				console.log(err);
			}, { resolution: res, format: fmt });
			mui('#changeHeadImage').popover('hide');//关闭popover
		});

		//点击修改密码
		var changePasswordLi = document.getElementById("changePasswordLi");
		changePasswordLi.addEventListener('tap', function() {
			mui.openWindow({
				url: 'mine-str-ChangePassword.html',
				id: 'mine-str-ChangePassword.html'
			})
		})
	});

});