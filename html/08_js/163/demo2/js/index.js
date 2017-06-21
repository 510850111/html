window.onload = function () {
	var oBtn1 = document.getElementById('btn1');
	var oBtn2 = document.getElementById('btn2');
	var div1 = document.getElementById('div1')

	oBtn1.onclick = function () {
		div1.style.display = "block";
	}
	oBtn2.onclick = function () {
		div1.style.display = "none";
	}
}