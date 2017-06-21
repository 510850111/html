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

		//分页获取商家列表
		var storeListUL = document.getElementById("storeListUL"); //拿到ul对象

		var orderByFieldName = 'create_time'; //排序字段【create_time-智能排序、average_score-好评优先、cashback_ratio-返利优先、distance-距离最近】
		var orderBy = 'DESC'; //排序方式【DESC-降序、ASC-升序】
		var longitude = '104.085086'; //   =  getLongitude();//拿到经度
		var latitude = '30.62216'; // = getLatitude(); //拿到纬度
		var pageIndex = 1; //起始页
		var pageSize = 15; //每页数量

		//构造需要的参数
		var params = {
			'orderByFieldName': orderByFieldName,
			'orderBy': orderBy,
			'latitude': latitude,
			'longitude': longitude,
			'pageIndex': pageIndex,
			'pageSize': pageSize
		}

		//开始分页获取商家列表
		xrjApi.getMerchantList(params).then(function(data) {
			console.log(data.toString());
//			data =JSON.stringify(data);
			
			console.log(JSON.stringify(data));
			
			for(var i = 0; i < data.domains.lenth; i++) {
				var str = '商户ID:' + data[i].id +
					'  分类ID:' + data[i].categoryId +
					'  商户简介:' + data[i].summary +
					'  商户名称:' + data[i].merchantName +
					'  商户缩略图:' + data[i].previewImage +
					'  联系电话:' + data[i].telephone +
					'  详细地址:' + data[i].location +
					'  经度:' + data[i].longitude +
					'  维度:' + data[i].latitude +
					'  营业时间:' + data[i].businessHour +
					'  商家二维码:' + data[i].qrCode +
					'  返现比例:' + data[i].cashbackRatio * 100 + '%' +
					'  平均分:' + data[i].averageScore +
					'  是否收藏:' + data[i].hasFavorited;
				console.log('即将显示数据');	
//				console.log(str);
				var id = data.id;
				var categoryId = data.categoryId;
				
			}
		}).catch(function(err) {
			console.log(err);
		})
		
		console.log('数据接收完成');
		
		mui(".mui-table-view").on('tap', '#store01', function() {
			mui.openWindow({
				url: '../store/store-paymentPage.html',
				id: 'store-paymentPage'
			})
		});

		/*列表点击事件*/
		mui(".mui-table-view").on('tap', ".mui-table-view-cell", function() {
			var label = this.getElementsByTagName("label")[0];
			var name = label.innerText;
			var parent = label.parentNode;
			console.log(this);
			alert(mui("#allCategory").innerHTML);
			//							console.log(name);
			//							this.className+=' choose';
			//					for(var i=0;i<)
		});

	});
})