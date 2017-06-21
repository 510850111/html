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

		//点击个人资料
		var mineStr = document.getElementById("mineStr");
		mineStr.addEventListener('tap', function() {
			mui.openWindow({
				url: 'mine-Str.html',
				id: 'mine-Str.html'
			})
		})

		//点击我的订单
		var mineAllBills = document.getElementById("mineAllBills");
		mineAllBills.addEventListener('tap', function() {
			mui.openWindow({
				url: 'mine-AllBills.html',
				id: 'mine-AllBills.html'
			})
		})

		//点击待付款
		mui(".mui-table-view").on('tap', '#pendingPayment', function() {
			mui.openWindow({
				url: '../mine/mine-MyConsumptionBill.html',
				id: 'mine-MyConsumptionBill'
			})
		});

		//点击已付款
		mui(".mui-table-view").on('tap', '#hasPayment', function() {
			mui.openWindow({
				url: '../mine/mine-MyConsumptionBill.html',
				id: 'mine-MyConsumptionBill'
			})
		});

		//点击待评价
		mui(".mui-table-view").on('tap', '#waittingForEvaluate', function() {
			mui.openWindow({
				url: '../mine/mine-MyConsumptionBill.html',
				id: 'mine-MyConsumptionBill'
			})
		});

		//点击退款/售后
		mui(".mui-table-view").on('tap', '#refoundAndAfterSales', function() {
			mui.openWindow({
				url: '../mine/mine-MyConsumptionBill.html',
				id: 'mine-MyConsumptionBill'
			})
		});

		//点击我的消息
		mui(".mui-table-view").on('tap', '#myMessage', function() {
			mui.openWindow({
				url: '../mine/mine-MyMessages.html',
				id: 'mine-MyMessages'
			})
		});

		//点击我的收藏
		mui(".mui-table-view").on('tap', '#myCollect', function() {
			mui.openWindow({
				url: '../mine/mine-MyCollect.html',
				id: 'mine-MyCollect'
			})
		});

		//点击我的收益
		mui(".mui-table-view").on('tap', '#myProfit', function() {
			mui.openWindow({
				url: '../mine/mine-MyProfit.html',
				id: 'mine-MyProfit'
			})
		});

		//点击我的推荐码
		mui(".mui-table-view").on('tap', '#recommendationCode', function() {
			mui.openWindow({
				url: '../mine/mine-MyShareCode.html',
				id: 'mine-MyShareCode'
			})
		});
	});
});