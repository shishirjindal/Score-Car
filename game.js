var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1212;
canvas.height = 480;
document.body.appendChild(canvas);

//Background Image
var bgimage = false;
var roadimage = new Image();
roadimage.onload = function(){
	bgimage = true;
};
roadimage.src = "images/road2.jpg";

//Hidden Bgimage
var bgimage2 = false;
var road2image = new Image();
road2image.onload = function(){
	bgimage2 = true;
};
road2image.src = "images/road2.jpg";

//Car Image
var carReady = false;
var carimage = new Image();
carimage.onload = function(){
	carReady = true;
};
carimage.src = "images/car.png";

//defend1 Image
var defend1Ready = false;
var defend1image = new Image();
defend1image.onload = function(){
	defend1Ready = true;
};
defend1image.src = "images/defend1.jpg";

//defend2 Image
var defend2Ready = false;
var defend2image = new Image();
defend2image.onload = function(){
	defend2Ready = true;
};
defend2image.src = "images/defend1.jpg";

//down keys
var keydown = {};


//add key
addEventListener("keydown", function (e) {
	keydown[e.keyCode] = true;
}, false);		

//remove key
addEventListener("keyup", function (e) {
	delete keydown[e.keyCode];
	defend1.speed = 256;
	defend2.speed = 256;
}, false);

//road object
var road = {
	speed : 256
}

//road2 object
var road2 = {
	speed : 256
}

//car object
var car = {
	speed : 500
};

//defend1 object
var defend1 = {
	speed : 256
}

//defend2 object
var defend2 = {
	speed : 256
}

//score 
var score = 0;

//reset function
var reset = function(){
	car.x = 80;
	car.y = 280;
	defend1.x = 1000;
	defend1.y = 280;
	defend2.x = 1500;
	defend2.y = 150;
	road.x = 0;
	road.y = 0;
	road2.x = canvas.width;
	road2.y = 0;
	score = 0;
	real_score = 0;
	defend1.speed = 256;
	defend2.speed = 256;
};

//render function
var render = function(){
	if(bgimage){
		ctx.drawImage(roadimage,road.x,road.y,canvas.width,canvas.height);
	}
	if(bgimage2){
		ctx.drawImage(road2image,road2.x,road2.y,canvas.width,canvas.height);
	}
	if(carReady){
		ctx.drawImage(carimage,car.x,car.y,100,50);
	}
	if(defend1Ready){
		ctx.drawImage(defend1image,defend1.x,defend1.y,100,50);
	}
	if(defend2Ready){
		ctx.drawImage(defend2image,defend2.x,defend2.y,100,50);
	}

	//display score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score : " + real_score, 32, 32);
};

//update function
var update = function(mod){
	score = score + 1;
	real_score = Math.round(score/200);	
	if(37 in keydown && 39 in keydown){
		road.x = road.x;
		defend1.speed = 256;
		defend2.speed = 256;
	}
	else{
		if(37 in keydown){
			defend1.speed = 256;
			defend2.speed = 256;
			if(car.x <= 80){
				car.x = 80
			}
			else{
				car.x -= car.speed*mod;
			}
		}
		if(39 in keydown){
			if(car.x >= 1050){
				car.x = 1050;
			}
			else{
				car.x += car.speed*mod;
			}
			if(road2.x <= -canvas.width){
				road2.x = canvas.width;
			}
			if(road.x <= -canvas.width){
				road.x = canvas.width;
			}
			road.x -= road.speed*mod;
			road2.x -= road2.speed*mod;	
			defend1.speed = 512;
			defend2.speed = 512;
		}
	}
	if(38 in keydown){
		car.y = 150;
	}
	if(40 in keydown){
		car.y = 280;
	}
	if(defend1.x <= 0){
		defend1.x = canvas.width;
	}
	if(defend2.x <= 0){
		defend2.x = canvas.width;
	}
	if(real_score >= 2){
		defend1.speed = 500;
		defend2.speed = 500;
	}
	if(real_score >= 4){
		defend1.speed = 800;
		defend2.speed = 800;
	}
	defend1.x -= defend1.speed*mod;
	defend2.x -= defend2.speed*mod;
	if(defend1.x <= car.x + 100 && car.x - defend1.x <=100 && car.y == defend1.y){
		reset();
	}
	if(defend2.x <= car.x + 100 && car.x - defend2.x <=100 && car.y == defend2.y){
		reset();
	}
};

var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();