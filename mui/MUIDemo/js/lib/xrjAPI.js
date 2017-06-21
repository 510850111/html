define(['lib/authApi', 'lib/MD5Encrypt'], function(AuthApi, encryptor) {
	var APPID = 'b3ef92e1b5a24a5da2625e62ccb85929';
	var APPKEY = '91c490ee1429cead';
	var APIURL = 'https://www.91xrj.com/xrj-api/v1';
	var authApi = new AuthApi(APPID, APPKEY, encryptor);
	var token = '';

	var xrjApi = {};
	
	/**
	 * @description 得到APPKEY
	 * @param {none} 无参数
	 */
	xrjApi.getAPPkey = function() {
		return APPKEY;
	}

	/**
	 * @description 设置token值
	 * @param {Object} token
	 */
	xrjApi.setTokenValue = function(token) {
		token = this.token;
	}

	/**
	 * @description 测试接口
	 * @param {Object} hello
	 * Authorization： N
	 */
	xrjApi.demo = function(hello) {
		var url = APIURL + '/demo';
		return authApi.getAsync(url, { args: hello });
	};

	/**
	 * @description 上报设备
	 * @param {Object} params
	 * Authorization： N
	 */
	xrjApi.addDevice = function(params) {
		var url = APIURL + '/device';
		return authApi.postAsync(url, params); 
	};

	/**
	 * @description 意见反馈信息添加
	 * @param {Object}  params
	 * Authorization：Y
	 * 
	 */
	xrjApi.feedBack = function(params) {
		var url = APIURL + '/feedback';
		//添加token
		params['token'] = token;
		return authApi.postAsync(url, params);
	};

	/**
	 * @description 向服务器提交资源
	 * @param {Array} params
	 * Authorization： N
	 * 
	 * 功能说明
	 * 1.向服务器提交资源	
	 * 2.资源主要包括File文件类型的资源，比如图片等	
	 * 3.资源File必须要放在HTTP请求体里
	 */
	xrjApi.addResource = function(params) {
		var url = APIURL + '/resources';
		return authApi.postAsync(url, params);
	}

	/**
	 * @description 发送验证码
	 * @param {Object} params
	 * Authorization： N
	 * 
	 * 功能说明:
	 * 用户使用某些功能时，需要验证手机的有效性,如果用户在未收到验证码，可以在一分钟之后选择再次发送,每个验证码只能使用一次,验证码根据不同的类型，有效期也不同
	 * 
	 * params参数:
	 * telephone : String
	 * smsType	 : SMS_REGISTER-用户注册、SMS_FIND_PWD-找回密码
	 * 
	 * 响应:(Boolean) true表示发送成功，false表示发送失败
	 */
	xrjApi.validate = function(params) {
		var url = APIURL + '/validate';
		return authApi.postAsync(url, params);
	}

	/**
	 * @description 获取系统配置信息
	 * @param {none} 无参数
	 * Authorization： N
	 * 
	 * 响应:
	 * key (String) 键【HOTLINE-客服中心、HELP-帮助、MERCHANT_JOIN-商户入驻、INCOME_CALCULATE-收益演算、INCOME_TUTORIAL-收益教程】
	 * value (String) 值
	 * title (String) 名称
	 */
	xrjApi.getConfigList = function(){
		var url = APIURL + '/config';
		var params = {};
		return authApi.getAsync(url,params);
	}
	
	/**
	 * @description 检查版本更新
	 * @param {Object} params
	 * Authorization： N
	 * 
	 * 功能说明:
	 * 版本更新检查,buildNumber是指构建版本号，一般用于版本号的数字体现形式如：0.0.1的构建版本号为1，构建版本号为自增的数字，从1开始
	 * 客户端根据updateType的值进行不同的下一步操作
	 * 
	 * params参数:
	 * buildNumber  (Integer) 构建版本号
	 * deviceType (String) 设备类型【ANDROID、IOS】
	 * 
	 * 响应:
	 * updateType (String) 更新类型【NONE_UPDATE-无更新、OPTIONAL_UPDATE-可选更新、ENFORCE_UPDATE-强制更新】
	 * buildNumber (Integer) 构建版本号
	 * latestVersion (String) 版本号(如：0.0.1等)
	 * releaseLog (String) 发布日志
	 * downloadUrl (URL) 下载地址
	 */
	xrjApi.versionCheck = function(params){
		var url = APIURL + '/version';
		return authApi.getAsync(url,params);
	}
	

	/**
	 * @description 用户注册
	 * @param {Object} params
	 * Authorization： N
	 * 
	 * 功能说明:
	 * 用户注册账号,注册时需要用户获取的验证码作为params参数传递到服务器端,调用短信验证码,用户头像的传递，需要先调用1.3 新增资源上传图片，然后在本接口中上传该接口返回的相对路径
	 * 
	 * params参数(均为String):
	 * username 用户名(手机号码)
	 * password (需要使用AES加密，密钥为分配的KEY)
	 * validateCode 验证码
	 * 
	 * 以下为可选:
	 * nickname  昵称
	 * avatar 头像地址(接口addResource返回的相对地址)
	 * recommendUsername 推荐人用户名(联系电话). 测试时可填写18010558729
	 * 
	 * 响应:
	 * id (long) 用户ID
	 * username (String) 用户名
	 * nickname (String) 空 昵称
	 * avatar (String) 空 头像
	 */
	xrjApi.register = function(params) {
		var url = APIURL + '/auth/register';
		return authApi.postAsync(url, params);
	}

	/**
	 * @description 用户登陆
	 * @param {Object} params
	 * Authorization： N
	 * 
	 *  功能说明:
	 *  App在出现这几个状态码时需要跳转到登陆页面【SIGN.0001、SIGN.0002、SIGN.0003、SIGN.0004】
	 *  使用HTTPS方式请求
	 * 
	 * params参数:
	 * username (String) 用户名
	 * password (String) 密码(需要使用AES加密，密钥为分配的KEY)
	 * deviceId   (Long)  设备Id
	 * 
	 * 响应:
	 * token (String) token值
	 * user 	(User) 用户对象
	 * 		user.id 	(Long)
	 * 		user.username	(String)
	 * 		user.nickname (String)
	 * 		user.avatar		(url)
	 */
	xrjApi.login = function(params) {
		var url = APIURL + '/auth/login';
		return authApi.postAsync(url, params);
	}

	/**
	 * @description 找回密码
	 * @param {Object} params
	 * Authorization： N
	 * 
	 * 功能说明:
	 * 通过手机号找回密码,需要验证码，获取验证码请调用接口xrjApi.validate()
	 * 
	 * params参数(均为String):
	 * username 用户名(手机号码)
	 * password 新密码(需要使用AES加密，密钥为分配的KEY)
	 * validateCode 验证码
	 * 
	 * 响应:
	 * (boolean) data : true表示操作成功，false表示操作失败
	 */
	xrjApi.forget = function(params) {
		var url = APIURL + '/auth/forget';
		return authApi.postAsync(url, params);
	}

	/**
	 * @description 修改密码(已经登陆状态)
	 * @param {Object} params
	 * Authorization： Y
	 * 
	 * 功能说明:
	 * 用户在登录的情况下修改密码
	 * 
	 * params参数: 
	 * userId (Long) 用户ID
	 * originalPassword (String) 原始密码(需要使用AES加密，密钥为分配的KEY)
	 * newPassword  (String) 新密码(需要使用AES加密，密钥为分配的KEY)
	 * 
	 * 响应:
	 * (boolean) data : true表示操作成功，false表示操作失败
	 */
	xrjApi.changePassword = function(params) {
		var url = APIURL + '/auth/password';
		params['token'] = token;
		return authApi.postAsync(url, params);
	}

	/**
	 * @description 获取用户信息
	 * @param {Object} params
	 * Authorization： Y
	 * 
	 * params参数: 
	 * 获取用户信息，主要包括头像、性别、昵称等
	 * 
	 * params参数:
	 * userId (Long) 用户ID
	 * 
	 * 响应:
	 * id (Long) 用户ID
	 * username (String) 用户名
	 * nickname (String) 昵称
	 * avatar (空) 头像URL
	 */
	xrjApi.getUserDetail = function(params,userId) {
		var url = APIURL + '/user/' + userId;
		params['token'] = token;
		return authApi.getAsync(url, params);
	}

	/**
	 * @description 更新用户信息
	 * @param {Object} params
	 * Authorization： Y
	 * 
	 * 功能说明:
	 * 更新用户信息，主要包括头像、性别、昵称等,
	 * 如需更新头像，请先使用xrjApi.addResource()将用户头像上传到服务器,
	 * 此接口无法更新用户的密码等敏感信息
	 * 
	 * params参数:
	 * userId (Long) 用户ID
	 * 
	 * 以下为可选参数:
	 * nickname (String) 昵称
	 * avatar (String) 头像文件流
	 * 
	 * 响应:
	 * id (Long) 用户ID
	 * username (String) 用户名
	 * nickname (String) 昵称
	 * avatar (URL) 头像URL
	 */
	xrjApi.updateUser = function(params,userId) {
		var url = APIURL + '/user/'+userId;
		params['token'] = token;
		return authApi.postAsync(url, params);
	}

	/**
	 * @description 获取推荐人信息
	 * @param {Object} params
	 * Authorization： N
	 * 
	 * 功能说明:
	 * 获取推荐人信息,本接口只返回推荐人的手机号和昵称,
	 * 若推荐人不存在，则抛出SYS.0008(用户不存在)异常信息
	 * 
	 * params参数:
	 * username (String) 用户名(手机号码)
	 * 
	 * 响应(均为String):
	 * username 用户名
	 * nickname昵称
	 */
	xrjApi.getRecommendUser = function(params,userId) {
		var url = APIURL + '/user/recommend/' + userId;
		console.log(url);
		return authApi.getAsync(url, params);
	}

	/**
	 * @description 获取分类列表
	 * @param {none} 无参数
	 * Authorization： N
	 * 
	 * 功能说明:
	 * 获取分类列表,返回的分类列表为系统已经经过排序后的全部分类信息,返回数据为树形结构
	 * 
	 * 响应参数:
	 * id (Long) 分类ID
	 * categoryName (String) 分类名称名
	 * previewImage (URL) 缩略图
	 * childCategories (List<CategoryVO>) 二级分类
	 * 
	 */
	xrjApi.getCategoryList = function() {
		var url = APIURL + '/category';
		var params = {};
		return authApi.getAsync(url, params);
	}
	
	/**
	 * @description 商家关键字搜索 
	 * @param {Object} params
	 * Authorization： N
	 * 
	 * 功能说明;
	 * 根据输入商家名称关键字进行搜索
	 * 
	 * params参数:
	 * keyword  (String) 商家名称关键字
	 * 
	 * 响应:
	 * data (List<String>) 商户称名
	 * 
	 * 示例:  "data" : [ "12313sdfsdfsdfsdfsdf", "111" ]
	 */
	xrjApi.serachMerchant = function(params){
		var url = APIURL + '/merchant/key';
		return authApi.getAsync(url,params);
	}


	/**
	 * @description 分页获取商家列表
	 * @param {Object} params
	 * Authorization： N
	 * 
	 *功能说明:
	 * 分页获取商家列表,组合不同的查询条件，已到达筛选效果
	 * 本接口由于参数较多，并且参数值也有严格的要求，请注意查看
	 * orderByFieldName、orderBy、longitude、latitude、pageIndex、pageSize这几个参数为必填
	 * 
	 * params参数:
	 * key  (String) 搜索关键字 非必填
	 * parentCategoryId (Long) 一级分类ID 非必填
	 * categoryId (Long) 二级分类ID 非必填
	 * distance (Long) 距离(单位：米) 非必填
	 * 
	 * orderByFieldName (String) 排序字段【create_time-智能排序、average_score-好评优先、cashback_ratio-返利优先、distance-距离最近】
	 * orderBy (String) 排序方式【DESC-降序、ASC-升序】  必填
	 * longitude (String) 当前位置经度 必填
	 * latitude (String) 当前位置纬度 必填
	 * pageIndex (Integer)  起始页(第一页从1开始) 必填
	 * pageSize (Integer) 每页数量(每页数量值不能超过100) 必填
	 * 
	 * 响应:
	 * id	(Long) 商户ID
	 * categoryId (Long) 分类ID
	 * merchantName (String) 商户名称
	 * previewImage (URL) 商户缩略图
	 * longitude (String) 经度
	 * latitude (String) 维度
	 * cashbackRatio (Double) 返现比例(展示时请转换成百分号)
	 * averageScore (Double) 平均分
	 * distance (Double) 距离(展示时请省略小数点后的数据)
	 */
	/*
	 * 响应示例:
		{
			"code" : "ACK.0001",
			"data" : {
			    "pageIndex" : 1,
			    "pageSize" : 10,
			    "pageCount" : 1,
			    "totalCount" : 2,
			    "domains" : [ {
			      "id" : 1,
			      "categoryId" : 2,
			      "merchantName" : "佳明健身",
			      "previewImage" : "https://www.91xrj.com/file/resources/201703/24/49f52c5f04de4ec6b37c68a39c0326ce.jpeg",
			      "longitude" : "104.1581",
			      "latitude" : "30.614701",
			      "cashbackRatio" : 1.0,
			      "averageScore" : 5.0,
			      "distance" : 13033.376889844578
		    	}, {
			      "id" : 2,
			      "categoryId" : 1,
			      "merchantName" : "小龙坎火锅",
			      "previewImage" : "https://www.91xrj.com/file/resources/201703/24/c8f280ac37284145b1b2e1b43885768a.jpeg",
			      "longitude" : "104.085086",
			      "latitude" : "30.62216",
			      "cashbackRatio" : 0.95,
			      "averageScore" : 5.0,
			      "distance" : 10561.256338736339
			    }]
		  	}
		}
	*/
	xrjApi.getMerchantList = function(params) {
		var url = APIURL + '/merchant/search';
		return authApi.getAsync(url, params);
	}

	/**
	 * @description 获取商家详情
	 * @param {Object} params
	 * Authorization： N
	 * 
	 * 功能说明:
	 * 获取商家详情,若客户端处于登录状态，请传userId参数，方便判断是否已经收藏
	 * 
	 * params参数:
	 * merchantId (Long) 商户ID
	 * 
	 * 以下为选填参数:
	 * userId (Long) 用户ID (如果处于登录状态就传本参数)
	 * 
	 * 响应:
	 * id (Long) 商户ID
	 * summary (String) 商户简介
	 * merchantName (String) 商户名称
	 * previewImage (URL) 商户缩略图
	 * telephone (String) 联系电话
	 * location (String) 详细地址
	 * longitude (String) 经度
	 * latitude (String) 维度
	 * businessHour (String) 营业时间
	 * qrCode (URL) 商家二维码
	 * cashbackRatio (Double) 返现比例(展示时请转换成百分号)
	 * averageScore (Double) 平均分
	 * hasFavorited (Boolean) 是否收藏【ture-是、false-否】
	 * resources (List<ResourcesVO>)图集
	 */
	/* 响应示例
	{
		"code": "ACK.0001",
		"data": {
			"id": 2,
			"categoryId": 1,
			"merchantName": "小龙坎火锅",
			"summary": "小龙坎火锅小龙坎火锅",
			"previewImage": "https://www.91xrj.com/file/resources/201703/24/c8f280ac37284145b1b2e1b43885768a.jpeg",
			"telephone": "18010558729",
			"location": "成都市火车南站西路",
			"longitude": "104.085086",
			"latitude": "30.62216",
			"businessHour": "09:00--20:00",
			"qrCode": "https://www.91xrj.com/file/resources/201703/24/a5d6428ff457435aaff054d5016d6b03.png",
			"cashbackRatio": 0.95,
			"averageScore": 5.0,
			"hasFavorited": false,
			"resources": [{
				"url": "https://www.91xrj.com/file/resources/201703/24/d18550997a674f38b1bfb8745984face.jpeg"
			}, {
				"url": "https://www.91xrj.com/file/resources/201703/24/f33cc2cc63104e6a93c6611d85393953.jpeg"
			}, {
				"url": "https://www.91xrj.com/file/resources/201703/24/1b000565f00245f99e031b862175db43.jpeg"
			}, {
				"url": "https://www.91xrj.com/file/resources/201703/24/5b925505c0754b71afd496b21da6889b.jpeg"
			}]
		}
	}*/
	xrjApi.getMerchantDetailByID = function(params,merchantId){
		var url = APIURL + '/merchant/' + merchantId;
		return authApi.getAsync(url, params);
	}
	
	/**
	 * @description 商家详情，根据UUID字段获取
	 * @param {Object} params
	 * @param {Object} merchanUUID
	 * 
	 * Authorization： N
	 * 
	 * params参数:
	 * uuid (String) 商户UUID
	 * 
	 * 响应:
	 * 比xrjApi.getMerchantDetailByID 多了一个值,其余详见getMerchantDetailByID
	 * categoryId (Long) 分类ID
	 */
	xrjApi.getMerchantDetailByUUID = function(params,merchanUUID){
		var url = APIURL + '/merchant/uuid/' + merchanUUID;
		return authApi.getAsync(url, params);
	}

	/**
	 * @description 用户下单
	 * @param { Object} params
	 * .Authorization： Y
	 * 
	 * 功能说明:
	 * 用户在线买单,用户必须处于登录状态
	 * 
	 * params参数:
	 * userId (Long) 用户ID
	 * merchantId (Long) 商家ID
	 * amount (Double) 消费金额
	 * 
	 * 以下为可选参数:
	 * remark (String) 备注
	 * 
	 * 响应:
	 * id (Long)  订单ID
	 * userId (Long) 用户ID
	 * merchantId (Long) 商家ID
	 * orderIdentifier (String) 订单编号
	 * amount (Double) 消费金额
	 * orderStatus (String) 订单状态【 CONFIRMED-已确认、CANCEL-已取消、RETURNED_ING-退款中、RETURNED_SUCCESS-退款成功、RETURNED_FAIL-退款失败】
	 * payStatus (String) 支付状态【NONE_PAY-未支付、HAS_PAY-已支付、HAS_REFUND-已退款】
	 * remark (String) 备注
	 * orderTime  (Date)下单
	 * 
	 */
	xrjApi.addOrder = function(params){
		var url = APIURL + '/order';
		params['token'] = token;
		return authApi.postAsync(url, params);
	}

	/**
	 *  @description 获取订单列表
	 * 	@param {Object} params
	 * 	Authorization： Y
	 * 
	 * 功能说明:
	 * 	获取订单列表,组合不同的查询条件，已到达筛选效果
	 * 
	 * params参数:
	 * pageIndex (Integer) 起始页(第一页从1开始)
	 * pageSize  (Integer)  每页数量(每页数量值不能超过100)
	 * 
	 * 以下为可选参数:
	 * orderStatus (String) 订单状态
	 * payStatus  (String) 支付状态
	 * hasComment  (Integer) 是否评论
	 * 
	 * 响应:
	 * id	(Long) 订单ID
	 * userId	(Long) 用户ID
	 * merchant (Merchant) 商户信息
	 * orderIdentifier	(String) 订单编号
	 * amount (Double) 订单金额
	 * orderStatus	(String)  订单状态【 CONFIRMED-已确认、CANCEL-已取消、RETURNED_ING-退款中、RETURNED_SUCCESS-退款成功、RETURNED_FAIL-退款失败】
	 * payStatus	(String) 支付状态【NONE_PAY-未支付、HAS_PAY-已支付、HAS_REFUND-已退款】
	 * paymentType	(String) 支付类型【WECHAT-微信】
	 * orderTime (Date) 下单时间
	 * payStatus (Date) 支付时间
	 * hasComment (Integer) 是否评论【0-未评论、1-已评论】
	 *  
	 * ********Merchant对象:
	 * merchantName (String)  商户名称
	 * previewImage (URL)  商户缩略图
	 */
	xrjApi.getOrderList = function(params){
		var url = APIURL + '/order/list';
		return authApi.getAsync(url,params);
	}
	
	/**
	 * @description 获取系统已支付的订单数量
	 * 无参数
	 * Authorization： N
	 * 
	 * 功能说明:
	 * 获取系统已支付的订单数量
	 * 
	 * 响应:
	 * data (Integer) 系统已支付的订单数量
	 */
	xrjApi.getOrderCount = function(){
		var url = APIURL + '/order/count';
		var params = {};
		return authApi.getAsync(url,params);
	}
	
	/**
	 * @description 评论订单
	 * @param {Object} params
	 * Authorization： Y
	 * 
	 * 功能说明:
	 * 用户只能评论自己的订单，并且该订单处于已支付状态
	 * 
	 * params参数说明:
	 * userId (Long) 用户ID
	 * merchantId (Long) 商家ID
	 * orderId (Long) 订单ID
	 * score (Double) 评分(评分取值为0-5，5表示最高)
	 * content (String) 评论内容(100字以内)
	 * 
	 * 响应:
	 * id (Long) 评论ID
	 * score (Double) 评分
	 * merchantId (Long) 商家ID
	 * content (String) 评论内容(100字以内)
	 * commentTime (Date) 评论时间
	 */
	xrjApi.addComment = function(params){
		var url = APIURL + '/comment';
		params['token'] = token;
		return authApi.postAsync(url,params);
	}
	
	/**
	 * @description  评论列表
	 * @param {Object} params,
	 * @param {Object} merchantId
	 * 
	 * Authorization： N
	 * 
	 * 功能说明;
	 * 获取商家评论列表,评论列表是根据商家来获取的
	 * 
	 * params参数:
	 * merchantId (Long)  商家ID
	 * pageIndex (Integer) 起始页
	 * pageSize (Integer) 每页数
	 * 
	 * 响应:
	 * id (Long) 评论ID
	 * user (User) 评论人信息
	 * score (Double) 评分
	 * merchantId (Long) 商家ID
	 * content (String) 评论内容
	 * commentTime (Date) 评论时间
	 * reply (String)  评论回复内容
	 * replyTime (Date) 评论回复时间
	 * 
	 * 		User对象
	 * 			nickname (String) 用户昵称
	 * 			avatar	(URL) 用户头像
	 */
	xrjApi.getCommentList = function(params,merchantId) {
		var url = APIURL + '/comment/merchant/' + merchantId; 
		return authApi.getAsync(url,params);
	}
	
	/**
	 * @description  收藏商家(登录状态)
	 * @param {Object} params
	 * 
	 * Authorization： Y
	 * 
	 * 功能说明:
	 * 用户收藏商家,只有在登录状态下才能收藏
	 * 
	 * params参数:
	 * userId (Long)  用户ID
	 * merchantId (Long) 商家ID
	 * 
	 * 响应:
	 * data (boolean) 是否收藏成功【true-成功、false-失败】
	 *  
	 */
	xrjApi.addFavorite = function(params){
		var url = APIURL + '/favorite';
		params['token'] = token;
		return authApi.postAsync(url,params);
	}
	
	/**
	 * @description 取消收藏(登录状态)
	 * @param {Object} params
	 * 
	 * Authorization： Y
	 * 
	 * 功能说明:
	 * 用户取消收藏,只有在登录状态下才能取消收藏
	 * 
	 * params参数;
	 * favoriteId (Long) 收藏ID
	 * 
	 * 响应:
	 * data (Boolean) 是否操作成功【true-成功、false-失败】
	 * 
	 */
	xrjApi.delFavorite = function(params){
		var favoriteId = params.favoriteId;
		var url = APIURL + '/favorite/' + favoriteId + '/cancel';
		params['token'] = token;
		return authApi.postAsync(url,params);
	}
	
	/**
	 * @description 收藏列表
	 * @param {Object} params
	 * 
	 * Authorization： Y
	 * 
	 * 功能说明:
	 * 得到用户收藏列表
	 * 
	 * params参数:
	 * userId (Long)  用户ID
	 * pageIndex (Long) 起始页
	 * pageSize (Long) 每页数
	 * 
	 * 响应:
	 * id (Long) 收藏ID
	 * userId (Long) 用户ID
	 * merchant (Merchant) 商家信息
	 * favoriteTime (Date) 收藏时间
	 * 		Merchant对象:
	 * 
	 * 			id	(Long) 商户ID
	 * 			summary () 商户简介
	 * 			merchantName (String) 商户名称
	 * 			previewImage (URL) 商户缩略图
	 * 			telephone (String) 联系电话
	 * 			location (String) 详细地址
	 *			longitude (String) 经度
	 *			latitude (String) 维度
	 * 			businessHour (String)	营业时间
	 * 			qrCode (URL) 商家二维码
	 * 			cashbackRatio (Double) 返现比例(展示时请转换成百分号)
	 * 			averageScore (Double) 平均分
	 * 
	 */
	xrjApi.getFavoriteList = function(params){
		var url = APIURL + '/favorite/user/' + params.userId;
		params['token'] = token;
		return authApi.getAsync(url,params);
	}
	
	/**
	 * @description 返回当前用户的薪友统计信息
	 * @param {Object} params
	 * 
	 * Authorization： Y
	 * 
	 * params参数:
	 * userId	(Long) 	用户ID
	 * 
	 * 响应:
	 * first (Integer)  薪友人数
	 * second (Integer) 薪迷人数
	 * third (Integer) 薪粉人数
	 */
	xrjApi.getRelationList = function(params){
		var url = APIURL +  '/relation/user/' + params.userId;
		params['token'] = token;
		return authApi.getAsync(url,params);
	}
	
	
	return xrjApi;
});