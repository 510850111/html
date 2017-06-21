function changeImage() {
	element = document.getElementById('image');
	if (element.src.match("off")) {
		element.src="images/on.gif";	
	} else {
		element.src = "images/off.gif"
	}
}