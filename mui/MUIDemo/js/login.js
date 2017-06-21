function Check(account,password){
	var Checkarr = [false,""];
	if(account.length < 1){
		Checkarr[1] =  "账号不能为空!"
		return Checkarr;
	}
	if(password.length < 1){
		Checkarr[1] =  "密码不能为空!"
		return Checkarr;
	}
	return  Checkarr = [true,""];
}
