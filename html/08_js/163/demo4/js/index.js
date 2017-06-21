window.onload = function () {
	var oSpan = document.getElementById('span1');
	var oP = document.getElementById('p1');
	var oText = document.getElementById('input1');
	var oBtn = document.getElementById('btn1');

	oBtn.onclick = function () {
		oSpan.innerHTML +=  oP.innerHTML + oText.value + '<br />';
		oText.value = '';
	}
}