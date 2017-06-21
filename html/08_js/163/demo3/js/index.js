window.onload = function () {
	var setBtn = document.getElementById('setBtn');
	var testField = document.getElementById('testField');
	var top = document.getElementById('top');
	var width_100 = document.getElementById('width_100');
	var width_150 = document.getElementById('width_150');
	var width_200 = document.getElementById('width_200');
	var height_100 = document.getElementById('height_100');
	var height_150 = document.getElementById('height_150');
	var height_200 = document.getElementById('height_200');
	var reset  = document.getElementById('reset');
	var affirm = document.getElementById('affirm');

	setBtn.onclick = function () {
		if (top.style.display == "none") {
			top.style.display = "block";
			setBtn.innerHTML = "点我关闭设置框";
		} else {

			top.style.display = "none";
			setBtn.innerHTML = "点我设置样式";
		}
		
	}

	width_100.onclick = function () {
		testField.style.width = "100px";
		// testField.style.margin = " -40px 0 0 -50px;"
		testField.style.left  = "45%";
	}
	width_150.onclick = function () {
		testField.style.width = "150px";
		testField.style.left  = "40%";
	}
	width_200.onclick = function () {
		testField.style.width = "200px";
		testField.style.left  = "35%";
	}

	height_100.onclick = function () {
		testField.style.height = "100px";
		testField.style.top  = "45%";
	}
	height_150.onclick = function () {
		testField.style.height = "150px";
		testField.style.top  = "40%";
	}
	height_200.onclick = function () {
		testField.style.height = "200px";
		testField.style.top  = "35%";
	}

	reset.onclick = function () {
		testField.style.width = "50px";
		testField.style.height = "50px";
		testField.style.left = "50%";
		testField.style.top = "50%";
	}

	affirm.onclick = function () {
		top.style.display = "none";
		if (setBtn.innerHTML == "点我关闭设置框") {
			setBtn.innerHTML = "点我设置样式";
		}
	}
}