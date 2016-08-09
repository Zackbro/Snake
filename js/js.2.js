$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	var d = "right"; //默认方向
	
	//思路：通过canvas画出图形，创建蛇数组，代表的是每个画出图形相应的坐标
	var snake_array; 
	
	//创建蛇数组
	function create_snake()
	{
		var length = 5; 
		snake_array = []; //变为数组、清空
		for(var i = length-1; i>=0; i--)
		{
			//这一步是将蛇水平显示，蛇数组其实是一个坐标数组
			snake_array.push({x: i, y:0});
		}
	}

	//创建食物  cw = 10
    function create_food(){
         food = {
             x: Math.round(Math.random()*(w-cw)/cw),   
             y: Math.round(Math.random()*(h-cw)/cw),
         };
     }
	
	
	
	//外框、蛇的显示图像
	function paint()
	{
		
		//外框图像， 在每次调用paint函数时重绘，是为了清除尾部函数的痕迹（移动？？）
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		//使蛇移动，逻辑：将尾部移除并插入到头部  我们之前得到的蛇数组是{4，0}  {3， 0}....
		
		//获得蛇头部坐标， 下方nx++可以所有之后的nx其实代表的是增加蛇头的坐标
		var nx = snake_array[0].x;  
		var ny = snake_array[0].y;
		
		//实现移动准备，增加移动方向
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;
		
		
		
		var tail = snake_array.pop();   //将尾部移出，并获取   注意：在这里移除的实际上是数组里的元素，因此尾部图像并不会消失，因此需要在每次调用paint时都需要重										                                          新绘画背景图像，消除尾部痕迹
		
		tail.x = nx; //将尾部坐标改为之前头部+1坐标
		tail.y = ny;
		snake_array.unshift(tail);  //将尾部添加到头部
		
			if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
			//restart game
			init();
			//Lets organize the code a bit now.
			return;
		}
		
		
		//蛇图像
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			
			ctx.fillStyle = "blue";
			ctx.fillRect(c.x*10, c.y*10, 10, 10);     //根据图形大小以及蛇图像创建的顺序，相应增加x轴的位置
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*10, c.y*10, 10, 10);
		}
		
		
		
		
		
	}
	function init()
	{
		d = "right"; //default direction
		create_snake();
		create_food(); //Now we can see the food particle
		//finally lets display the score
		score = 0;
		
		//Lets move the snake now using a timer which will trigger the paint function
		//every 60ms
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	init();

		

	
	
	
		//键盘控制
		$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
		
	})
	
	
	
	
	
})