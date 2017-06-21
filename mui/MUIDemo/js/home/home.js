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
		plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' }); //去除滚动条

		//获取十个列表文字及图案
		var functionTenUL = document.getElementById("functionTenUL");//拿到ul对象
		xrjApi.getCategoryList().then(function(data){
			console.log(data.length);
			console.log(data.toString());
			var categoryListLenth = data.length;
			for (var i = 0;i<categoryListLenth;i++){
				var str = 'id:'+data[i].id + '   categoryName' + data[i].categoryName + '   previewImage:' + data[i].previewImage;
				console.log(str);
				//初始化列表
				var categoryItem = '<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-2">' +
												'<a id = "category' + i + '"  categoryID = "' + data[i].id + '" >' + //categoryID是从服务器获得的ID
													'<span>' + 
														'<img src= "' + data[i].previewImage + '" />' + 
													'</span>' + 
													'<div class="mui-media-body">' + data[i].categoryName + '</div>'+
												'</a>'+
											'</li>';
				functionTenUL.innerHTML += categoryItem; //把原来的东西和新东西一起添加进页面
				
				//为这个元素添加响应事件
				var categoryId = 'category' + i;
				var categoryItemEvent = document.getElementById(categoryId);
				categoryItemEvent.addEventListener('tap',function(){
					//打开新页面
					mui.openWindow({
						url : '',
						id : categoryId
					});
				});
			}
		}).catch(function(err){
			console.log(err);
		})
		
		//获取系统已支付的订单数量
		var orderCount = document.getElementById("orderCount");
		xrjApi.getOrderCount().then(function(data){
			orderCount.innerHTML = data;
		}).catch(function(err){
			console.log(err);
		});
		
		//点击列表第一条
		var storeDetail01 = document.getElementById('storeDetail01');
		storeDetail01.addEventListener('tap', function() {
			mui.openWindow({
				url: '../store/store-detail.html',
				id: 'storeDetail01'
			})
		});

		//点击提醒图标
		var nav_icon_message = document.getElementById('nav-icon-message');
		nav_icon_message.addEventListener('tap', function() {
			mui.openWindow({
				url: '../mine/mine-MyMessages.html',
				id: 'mine-MyMessages.html'
			});
			console.log('打开了我的消息页面');
		});

		//点击扫码支付
		var ScanQrCodeToPay = document.getElementById("ScanQrCodeToPay");
		ScanQrCodeToPay.addEventListener('tap', function() {
			console.log('点击扫码支付');
			mui.toast('点击扫码支付');
			mui.openWindow({
				url:'../store/store-paymentPage.html',
				id:'store-paymentPage'
			})
			
		});

		//点击我的收益
		var myProfit = document.getElementById("myProfit");
		myProfit.addEventListener('tap', function() {
			console.log('点击我的收益');
			mui.toast('点击我的收益');
			mui.openWindow({
				url: '../mine/mine-MyProfit.html',
				id: 'mine-MyProfit.html'
			});
		});

		//点击分享推荐
		var share = document.getElementById("share");
		share.addEventListener('tap', function() {
			console.log('点击分享推荐');
			mui.toast('点击分享推荐');
			mui.openWindow({
				url: '../mine/mine-MyShareCode.html',
				id: 'mine-MyShareCode.html'
			});
		})
	});

});