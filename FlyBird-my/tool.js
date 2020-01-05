/*
	获取元素属性
	element: 目标元素
	attr: 属性
*/
function getStyle(element, attr) {
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr]
}
/*
	js动画
	element: 目标元素
	properties: 一个对象，内部装有目标元素改变之后的属性 
		例如：{opacity: 20, left: 200}
*/
function animate(element, properties) {
	clearInterval(element.timerId)
	var i = 0
	element.timerId = setInterval(function() {
		i++;
		if(i % 10 == 0) {
			element.style.backgroundImage = 'url(imges/down_bird0.png)'
		}
		if(i % 10 == 5) {
			element.style.backgroundImage = 'url(imges/down_bird1.png)'
		}
		for (var property in properties) {
			var current,speed
			var target = properties[property]
			
			if (property === 'opacity') {
				current = Math.round(parseFloat(getStyle(element, property)) * 100)
			} else {
				current = parseInt(getStyle(element, property))
			}
			speed = 800 / (target - current)
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
			if (property === 'opacity') {
				element.style.opacity = (current + speed) / 100
			} else {
				element.style[property] = current + speed + 'px'
			}
		}
	}, 20)
	
}
function animate2(element, properties) {
	clearInterval(element.timerId)
	var i = 0
	element.timerId2 = setInterval(function() {
		i++;
		if(i % 10 == 0) {
			element.style.backgroundImage = 'url(imges/up_bird0.png)'
		}
		if(i % 10 == 5) {
			element.style.backgroundImage = 'url(imges/up_bird1.png)'
		}
		for (var property in properties) {
			var current,speed
			var target = properties[property]
			
			if (property === 'opacity') {
				current = Math.round(parseFloat(getStyle(element, property)) * 100)
			} else {
				current = parseInt(getStyle(element, property))
			}
			speed = (target - current) / 7
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
			if (property === 'opacity') {
				element.style.opacity = (current + speed) / 100
			} else {
				element.style[property] = current + speed + 'px'
			}
			if(speed == 0){
				clearInterval(element.timerId2)
				animate(element, {top: 480})
			}
		}
	}, 20)
	
}