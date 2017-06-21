window.onload = function () {

	var oUlFriendList = document.getElementById('ulFriendList');
	var oUlCompanyList = document.getElementById('ulCompanyList');
	var oUlHateList =document.getElementById('ulHateList');

	var Li_aFL = oUlFriendList.getElementsByTagName('li');
	var Li_aCL = oUlCompanyList.getElementsByTagName('li');
	var Li_aHL = oUlHateList.getElementsByTagName('li');

	var aH2 = document.getElementsByTagName('h2');
	var aUl = document.getElementsByTagName('ul');
	var aLi = document.getElementsByTagName('li');

	/*计算各个元素的数量*/
	length_H2 = aH2.length;
	length_Ul = aUl.length;
	length_Li = aLi.length;

	length_Li_aFL = Li_aFL.length;
	length_Li_aFL = Li_aCL.length;
	length_Li_aHL = Li_aHL.length;
	
	var aSelect[length_Li_aFL,length_Li_aFL+length_Li_aFL,length_Li_aFL+length_Li_aFL+length_Li_aHL ];

	var onOff = false;
	var index = null;

	
	for(var i = 0; i < length_H2;i++){

		aH2[i].onclick = function () {
			index = i;
			select();
		}
	}

	function select() {
		if(index == 0){
			for(var i = 0;i<aSelect[0];i++){
				aLi[i].style.display = "block";
			}
		}
	}
}