define(['lib/bluebird.core', 'mui'],	function(Promise, mui) {

		function filterParameter(params) {
			var result = {};
			if(params == null || params.length <= 0)
				return result;
			for(attr in params) {
				var value = params[attr];
				if(value instanceof Array) {
					value = value[0];
				}
				var upperCaseAttr = attr.toUpperCase();
				if(value == null || value.length == 0 || upperCaseAttr == 'SIGN' || upperCaseAttr == 'TOKEN') {
					delete params[attr.toString()];
					continue;
				}
				result[attr] = value;
			}
			return result;
		}

		function joinLinkString(params) {
			var keys = [];
			filterParameter(params);

			for(var attr in params)
				keys.push(attr);
			var sortedKeys = keys.sort();
			var result = '';
			for(var i = 0; i < sortedKeys.length; i++) {
				var k = sortedKeys[i];
				var v = params[k];
				if(i == sortedKeys.length - 1) {
					result = result + k + '=' + v;
				} else {
					result = result + k + '=' + v + '&';
				}
			}
			return result;
		}
		
		function AuthApi(appid, appkey, encryptor){
			this.appid = appid;
			this.appkey = appkey;
			this.encryptor = encryptor;
		}

		var ajaxAsync = function(url, params, type) {
			return new Promise(
				function(resolve, reject) {
					mui.ajax(
							url, 
							{
								data: params,
								dataType: 'json',
								type: type,
								timeout: 10000,
								success: function(resp) {
									if(resp.code == 'ACK.0001') {
										resolve(resp.data);
									} else {
										reject(new Error(resp.data));
									}
								},
								error: function() {
									reject(new Error('网络无法访问'));
								}
							}
					);
				}
			);
		}
		
		
		function secureParams(auth, params) {
			var token = params['token'];
			if(token)
				delete params['token'];
			params['stamp'] = auth.encryptor.genGuid();
			params['appid'] = auth.appid;
			var str = joinLinkString(params) + '&' + auth.appkey;
			params['sign'] = auth.encryptor.encrypt(str);
			if(token)
				params.token = token;
		}
		
		/**
		 * 
		 * @param {String} url
		 * @param {Object} params
		 */
		AuthApi.prototype.getAsync = function(url, params){
			secureParams(this,params);
			return ajaxAsync(url, params, 'GET');				
		}
		
		/**
		 * 
		 * @param {String} url
		 * @param {Object} params
		 */
		AuthApi.prototype.postAsync = function(url, params){
			secureParams(this, params);
			return ajaxAsync(url, params, 'POST');
		}
		
	
		
		return AuthApi;
	}
)