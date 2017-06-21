window.onload = function () {
	alert(1);
	var str = "";
	for (var i = 0; i < 5000; i++) {
		str += ('<input type = "button" value = '+ i + '>');
		// alert(str);
	}
	document.body.innerHTML = str;
	alert(str);

}
