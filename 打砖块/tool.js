function $(str) {
	return document.querySelector(str)
}
function $s(str) {
	return document.querySelectorAll(str)
}
function getStyle(element, attr) {
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr]
}
function random(x, y) {
	return Math.floor(Math.random() * (y - x) + x)
}
//新游戏
function NewGame(num) {
	this.parent = document.querySelector('.content')
	this.ball = document.querySelector('.content .ball')
	this.speedx = 1
	this.speedy = -1
	this.whipptree = document.querySelector('.content .whipptree')
	this.block = []
	for(var i = 0; i < num; i++){
		//创建方块
		this.block[i] = document.createElement('div')
		this.block[i].className = 'children'
		this.block[i].style.left = 60 * (i % 10) + 'px'
		this.block[i].style.top = 15 * Math.floor(i / 10) + 'px'
		this.block[i].style.backgroundColor = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')'
		this.parent.appendChild(this.block[i])
		//方块生命值
		this.block[i].health = random(1, 3)
	}
	this.score = 0
}
//碰撞检测
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
	//上下边碰撞
	if(gapx < valuex && gapy === valuey){
		return 1
	}
	//左右边碰撞
	if(gapx === valuex && gapy < valuey){
		return 2
	}
	if(gapx < valuex && gapy < valuey){
		return 3
	}
	return -1
}
//连续按键判断，解决卡顿
function key(element) {
	clearInterval(element.timer)
	var obj = {
		left: false,
		right: false
	}
	element.timer = setInterval(function() {
		if(obj.left){
			element.style.left = parseInt(getStyle(element, 'left')) - 10 + 'px'
			if(parseInt(getStyle(game.whipptree, 'left')) <= 0){
				element.style.left = '0px'
			}
		}
		if(obj.right){
			element.style.left = parseInt(getStyle(element, 'left')) + 10 + 'px'
			if(parseInt(getStyle(game.whipptree, 'left')) >= 480){
				element.style.left = '480px'
			}
		}
	}, 20)
	document.addEventListener('keydown', function(e) {
		if(e.keyCode === 37){
			obj.left = true
		}
		if(e.keyCode === 39){
			obj.right = true
		}
	})
	document.addEventListener('keyup', function(e) {
		if(e.keyCode === 37){
			obj.left = false
		}
		if(e.keyCode === 39){
			obj.right = false
		}
	})
} 