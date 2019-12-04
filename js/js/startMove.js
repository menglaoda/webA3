function getStyleAttr(obj,attr) {
	if(window.getComputedStyle) { //支持IE9+, 谷歌, 火狐..	
		return getComputedStyle(obj,null)[attr];
		//var style = window.getComputedStyle("元素", "伪类");
	}else{
		return obj.currentStyle[attr]; //支持IE8-
	}
}
//obj 元素节点
//attr 属性
//target 目标值
//s 定时器周期
//fn  回调函数
function startMove(obj,attr,target,s,fn){
	//给个目标
	if(attr=="opacity"){
		target = target*100;
	}else{
		target = target;
	}
	//关掉定时器
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//获取attr当前值
		if(attr=="opacity"){
			var start = parseFloat(getStyleAttr(obj,attr))*100;
		}else{
			var start = parseFloat(getStyleAttr(obj,attr));
		}
		//给一个速度
		var speed = (target-start)/5;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		//开始运动
		if(start == target){
			clearInterval(obj.timer);
			//回调函数
			if(fn){
				fn();
			}
		}else{
			if(attr=="opacity"){
				obj.style.opacity = (start+speed)/100;
  				obj.style.filter="alpha(opacity="+start+speed+")";				
			}else{
				obj.style[attr] = start+speed+"px";
			}	
		}
	},s)
}
