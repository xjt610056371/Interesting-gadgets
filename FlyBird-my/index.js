function random() {
	return Math.floor(Math.random()*160 + 60)
}
function check_block_conllision(obj1, obj2) {
	//obj1中心点
	var obj1x = obj1.offsetLeft + obj1.offsetWidth / 2
	var obj1y = obj1.offsetTop + obj1.offsetHeight / 2
	//obj2中心点
	var obj2x = obj2.offsetLeft + obj2.offsetWidth / 2
	var obj2y = obj2.offsetTop + obj2.offsetHeight / 2
	//obj1与obj2中心点横纵坐标距
	var gapx = Math.abs(obj1x - obj2x)
	var gapy = Math.abs(obj1y - obj2y)
	//obj1与obj2宽高和
	var valuex = obj1.offsetWidth / 2 + obj2.offsetWidth / 2
	var valuey = obj1.offsetHeight / 2 + obj2.offsetHeight / 2
	
	if(gapx < valuex && gapy < valuey){
		return true
	}
	
	return false
}