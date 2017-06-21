var page = 1,
	cate = 0;
hui.Back = function() {
	//对返回键会关闭本页面的bug的处理
	var parentWebView = plus.webview.currentWebview().parent();
	parentWebView.evalJS('hui.Back()'); //关闭父窗口
};

hui.plusReady(function() {
	getNewsList();
	hui.refresh(getNewsList); //下拉刷新执行getNewsList()函数
	hui.loadMore(loadMore);//上拉加载更多
})

function changeCate(cateID){
	cate = cateID;
	page = 1;
	hui.scrollTop(0);
	hui.isLoadMoreIng = false;
	getNewsList();
}

function loadMore(){
	var html = '';
	hui.get(
		'http://hoa.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=mediaList&page=' + page + '&cate=' + cate,
		function(data) {
			if(data == 'null' ){
				hui.endLoadMore(true);
				return;
			};
			var arrItem = data.split('--hcSplitor--');
			for(var i = 0; i < arrItem.length; i++) {
				var item = arrItem[i].split('--hcListSplitor--');
				html = '<ul class="mui-table-view">';
				html +=
						'<li class="mui-table-view-cell mui-media">' +
							' <a href="javascript:;">' +
								'<img class="mui-media-object mui-pull-left" src="' + item[1] + '">' +
								'<div class="mui-media-body">' +
									item[2] +
									'<p>' + item[2] + '</p>' +
								'</div>' +
							'</a>' +
						'</li>' +
						'</ul>';
				html += '</ul>';
			};
			page ++;
			
			document.getElementById('newsList').innerHTML += html; //把整理好的数据存加载至页面
			data = ''; //所有数据已经利用完毕,丢弃已经无用的数据
			hui.endLoadMore();
			
		},
		function(err){
			hui.endLoadMore(true);
			hui.toast('数据加载失败');
		});
}

function getNewsList() {
	page = 1;
	hui.centerLoading(); //开启loading动画
	var html = '';
	hui.get(
		'http://hoa.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=mediaList&page=' + page + '&cate=' + cate,
		function(data) {
			var arrItem = data.split('--hcSplitor--');
			for(var i = 0; i < arrItem.length; i++) {
				var item = arrItem[i].split('--hcListSplitor--');
				html +=
					'<li class="mui-table-view-cell mui-media">' +
						' <a href="javascript:;">' +
							'<img class="mui-media-object mui-pull-left" src="' + item[1] + '">' +
							'<div class="mui-media-body">' +
								item[2] +
								'<p>' + item[2] + '</p>' +
							'</div>' +
						'</a>' +
					'</li>' ;
			}
			page++;
			hui('#newsList').html('<ul class="mui-table-view">' + html + '</ul>'); //把整理好的数据存加载至页面
			data = ''; //所有数据已经利用完毕,丢弃已经无用的数据

			hui.centerLoading(true); //关闭loading动画
			hui.endRefresh(); //结束刷新
		},
		function(err) {
			//失败后的操作
			hui.toast('链接失败');
			hui.centerLoading(true); //关闭loading动画
			hui.endRefresh(); //结束下拉刷新动画
		}
	);

}