$(document).ready(function(){
	
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	//一些变量  cw代表蛇和食物的宽长  d指的蛇移动方向  食物得分
	var cw = 10;
	var d;
	var food;
	var score;
	
	//思路：创建蛇数组，代表的是每个画出图形相应的坐标，通过canvas画出图形
	var snake_array; 
	
	
	//初始函数  也为在撞墙之后调用
	function init(){		
		d = "right"; //默认右方
		create_snake();
		create_food(); 
		
		score = 0;
		
		
		if(typeof game_loop != "undefined") clearInterval(game_loop);  //清除计时器
		game_loop = setInterval(paint, 60);    //显示贪吃蛇
	}
	init();
	
	//创建蛇数组
	function create_snake(){
		var length = 5; //变为数组、清空
		snake_array = []; 
		for(var i = length-1; i>=0; i--)
		{
			//这一步是将蛇水平显示，蛇数组其实是一个坐标数组
			snake_array.push({x: i, y:0});
		}
	}
	
	//创建食物  cw==10
	function create_food(){
		food = {
			x: Math.round(Math.random()*(w-cw)/cw),   
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
	}
	
	//将创建的东西显示出来
	function paint(){
		//外框图像， 在每次调用paint函数时重绘，是为了清除尾部函数的痕迹（）
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		//使蛇移动，逻辑：将尾部移除并插入到头部  我们之前得到的蛇数组是{4，0}  {3， 0}....
		//获得蛇头部坐标， 下方nx++    所有之后的nx其实代表的是增加蛇头的坐标
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		
		
		//实现移动准备，增加移动方向
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;
		
		//碰撞判断，不可撞墙，和自己的身体
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array)){
			
			init();
			return;
		}
		
		//如果新增头部坐标等于食物，就在食物位置创建一个新增元素（实现吃食物）
		//否则就是移动的方法   
		//将尾部移出，并获取   注意：在这里移除的实际上是数组里的元素，因此尾部图像并不会消失，因此需要在每次调用paint时都需要重新绘画背景图像，消除尾部痕迹
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			create_food();
		}
		else
		{
			var tail = snake_array.pop(); 
			//将尾部坐标改为之前头部+1坐标
			tail.x = nx; tail.y = ny;
		}

		//将（创建的元素）尾部添加到头部
		snake_array.unshift(tail); //puts back the tail as the first cell
		
		
		//蛇图像
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			
			paint_cell(c.x, c.y);
		}
		
		//食物
		paint_cell(food.x, food.y);
		//得分
		var score_text = "Score: " + score;
		ctx.fillText(score_text, 5, h-5);
	}
	
	//因为蛇图像和食物一样  所以根据位置创建
	function paint_cell(x, y)
	{
		ctx.fillStyle = "blue";
		ctx.fillRect(x*cw, y*cw, cw, cw);  //根据图形大小以及蛇图像创建的顺序，相应增加x轴的位置
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	
	//身体碰撞
	function check_collision(x, y, array)
	{
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	//键盘控制
	$(document).keydown(function(e){
		var key = e.which;
		//控制方向不等于运动反方向
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
	})
	
	
	
	
	
	
	
})