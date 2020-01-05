var arr = [];
/*
	创建div
	Left: 左边距
	Top: 上边距
	speedX: 水平移动速度 1~10
	speedY: 垂直移动速度
	backgroundColor: div背景颜色
*/
function createDivCon(Left, Top, speedX, speedY, backgroundColor) {
	//创建div并设置样式
	this.name = document.createElement("div")
	this.name.style.backgroundColor = backgroundColor
	this.name.style.left = Left + "px"
	this.name.style.top = Top + "px"
	//将div添加到body标签之下
	var body = document.getElementsByTagName("body")[0]
	body.appendChild(this.name)
	//对象拥有的属性
	this.speedX = speedX
	this.speedY = speedY
}
function createDiv(Left, Top, speedX, speedY, backgroundColor){
	var obj = new createDivCon(Left, Top, speedX, speedY, backgroundColor)
	move(obj)
	arr.push(obj)
}
/*
	获取元素属性
	element: 目标元素
	attr: 属性
*/
function getStyle(element, attr) {
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr]
}
/*
	移动div
	div: 目标div
*/
function move(div) {
	setInterval(function(){
		//获取当前位置
		var clientX = parseInt(getStyle(div.name, "left"))
		var clientY = parseInt(getStyle(div.name, "top"))
		//计算移动之后位置
		var left = clientX + div.speedX
		var top = clientY + div.speedY
		//将坐标设置为移动之后位置
		div.name.style.left = left + "px"
		div.name.style.top = top + "px"	
		//边缘碰撞检测
		check_border_conllision(div)
		//块与块碰撞检测
		check_block_conllision(div)
	}, 20)
}
/*
	div边缘碰撞检测
*/
function check_border_conllision(div) {
	//获取当前位置
	var clientX = parseInt(getStyle(div.name, "left"))
	var clientY = parseInt(getStyle(div.name, "top"))
	//获取div宽度高度
	var divWidth = parseInt(getStyle(div.name, "width"))
	var divHeight = parseInt(getStyle(div.name, "height"))
	//计算当前div是否触碰边缘，如果是，对应水平/垂直方向速度取反
	if(clientX < 0){
		div.speedX *= -1;
		div.name.style.left = 0 + "px"
	} else if(clientX > window.innerWidth - divWidth) {
		div.speedX *= -1;
		div.name.style.left = window.innerWidth - divWidth + "px"
	}
	if(clientY < 0){
		div.speedY *= -1;
		div.name.style.top = 0 + "px"
	} else if(clientY > window.innerHeight - divHeight) {
		div.speedY *= -1;
		div.name.style.top = window.innerHeight - divHeight + "px"
	}
}
/*
	div与div碰撞检测
*/
function check_block_conllision(div){
	//获取被检测块当前位置
	var clientX_1 = parseInt(getStyle(div.name, "left"))
	var clientY_1 = parseInt(getStyle(div.name, "top"))
	//获取被检测块宽度高度
	var divWidth_1 = parseInt(getStyle(div.name, "width"))
	var divHeight_1 = parseInt(getStyle(div.name, "height"))
	//计算块中心点
	var center1 = {
		x : clientX_1 + divWidth_1 / 2,
		y : clientY_1 + divHeight_1 / 2,
	}
	
	for(var i = 0; i < arr.length; i++)
	{
		//除当前块外所有块挨个检测
		if(div !== arr[i]){
			//获取碰撞块当前位置
			var clientX_2 = parseInt(getStyle(arr[i].name, "left"))
			var clientY_2 = parseInt(getStyle(arr[i].name, "top"))
			//获取碰撞块宽度高度
			var divWidth_2 = parseInt(getStyle(arr[i].name, "width"))
			var divHeight_2 = parseInt(getStyle(arr[i].name, "height"))
			//计算块中心点
			var center2 = {
				x : clientX_2 + divWidth_2 / 2,
				y : clientY_2 + divHeight_2 / 2,
			}
			//计算两盒宽高一半
			var Width_2 = divWidth_1 / 2 + divWidth_2 / 2
			var Height_2 = divHeight_1 / 2 + divHeight_2 / 2
			//圆心距离
			//x2 + y2 开方
			var center = Math.sqrt(
			Math.abs(center1.x - center2.x) * Math.abs(center1.x - center2.x) 
			+ Math.abs(center1.y - center2.y) * Math.abs(center1.y - center2.y))
			//碰撞检测
			if(center < Height_2){
				//交换速度
				var tmpX = div.speedX
				var tmpY = div.speedY
				div.speedX = arr[i].speedX
				div.speedY = arr[i].speedY
				arr[i].speedX = tmpX
				arr[i].speedY = tmpY
				// [div.speedX, arr[i].speedX] = [arr[i].speedX, div.speedX]
				// [div.speedY, arr[i].speedY] = [arr[i].speedY, div.speedY]
			}
			
			// else if(Math.abs((clientY_1 + divHeight_1 / 2) - (clientY_2 - divHeight_2 / 2)) > (divHeight_1 / 2 + divHeight_2 / 2)){
			// 	//交换速度
			// 	var tmpX = div.speedX
			// 	var tmpY = div.speedY
			// 	div.speedX = arr[i].speedX
			// 	div.speedY = arr[i].speedY
			// 	arr[i].speedX = tmpX
			// 	arr[i].speedY = tmpY
			// 	// [div.speedX, arr[i].speedX] = [arr[i].speedX, div.speedX]
			// 	// [div.speedY, arr[i].speedY] = [arr[i].speedY, div.speedY]
			// }
		}
	}
	
}
function stop(div) {
	clearInterval(div.interval)
}