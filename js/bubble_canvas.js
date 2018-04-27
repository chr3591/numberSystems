var canvas = document.querySelector('canvas');
var wS =0;
if(window.innerWidth<window.innerHeight){
	canvas.width=window.innerWidth-10;
	canvas.height=window.innerWidth-10;
	wS = window.innerWidth-10;
}else{
	canvas.width=window.innerHeight-10;
	canvas.height=window.innerHeight-10;
	wS = window.innerHeight-10;
}
var c = canvas.getContext('2d');
c.textAlign = "center";


var score =0;
var number=0;
var bubbles = [];

function main(){
	drawEnvironment1();
	menu();
	
}


function drawEnvironment1(){
	
	c.fillStyle= "#DBE8EF";
	c.fillRect(0,0,wS,wS); 
	
	
	c.strokeStyle = "#26536D";
    c.lineWidth   = 15;
    c.strokeRect(0,0, wS,wS);
	
}

function drawEnvironment2(){
	
	
	c.fillStyle= "#26536D";
	c.fillRect((wS/2)-(wS/8), 0, wS/8*2, 60);
	c.fillRect((wS/2)-(wS/8), wS-60, wS/8*2, wS);
	c.fillRect(20, wS-60, 80, 40);
	if(zustand==1){
	c.fillRect(wS-100, wS-60, 80, 40); // timerr
	}
	
	c.font="30px Arial";
	c.fillStyle= "#DBE8EF";
	c.fillText(number, wS/2, 40);
	c.fillText("Score: "+score, wS/2, wS-25);
	c.fillText("Menü", 60, wS-30);
	if(zustand==1){	
	
	c.fillText(time, wS-60, wS-30);
	
	}
	
}

var x=0;
var y=0;
var size=0;
var wb =0;
function createBubbles(){
		bubbles=[];
		c.fillStyle= "#26536D";
		wantedBubble = getRandomInt(4);
		console.log(wantedBubble);
		
		wS=wS-120;
	
		//Bubble 1
		value =  Math.round(Math.random() * (255 - 1)) + 1;	
		
		radius = ((((wS/2)/255)*value)/2);
		if(radius<30){radius=30;}
		
		x = Math.round(Math.random() * ((wS/2-radius) - radius)) + radius;	
			
		y = Math.round(Math.random() * ((wS/2-radius) - radius)) + radius;	
		if(y-radius<=60){y=60+radius};
		
		var bubble1 = {value: value, radius: radius, x: x , y: y};
		bubbles.push(bubble1);
		
		
		//Bubble 2
		value =  Math.round(Math.random() * (255 - 1)) + 1;		
	
		radius = ((((wS/2)/255)*value)/2);	
		if(radius<30){radius=30;}		
		x = Math.round(Math.random() * ((wS-radius) - (wS/2+radius))) + wS/2+radius;
			
		y = Math.round(Math.random() * ((wS/2-radius) - radius)) + radius;	
		if(y-radius<=60){y=60+radius};	
		var bubble1 = {value: value, radius: radius, x: x , y: y};
		bubbles.push(bubble1);
		
		
		//Bubble 3
		value =  Math.round(Math.random() * (255 - 1)) + 1;		
		
		radius = ((((wS/2)/255)*value)/2);	
		if(radius<30){radius=30;}
		x = Math.round(Math.random() * ((wS/2-radius) - radius)) + radius;				
		y = Math.round(Math.random() * ((wS-radius) - (wS/2+radius))) + wS/2+radius;
		
		
		if(bubbles[0].y+bubbles[0].radius>(y-radius)){ y = bubbles[0].y+bubbles[0].radius+radius+1;}
		console.log((bubble1.y+bubble1.radius)+"  "+(y-radius));
		var bubble1 = {value: value, radius: radius, x: x , y: y};
		bubbles.push(bubble1);
		
		
		//Bubble 4
		value =  Math.round(Math.random() * (255 - 1)) + 1;		
		
		radius = ((((wS/2)/255)*value)/2);
		if(radius<30){radius=30;}
		x = Math.round(Math.random() * ((wS-radius) - (wS/2+radius))) + wS/2+radius;
		
		y = Math.round(Math.random() * ((wS-radius) - (wS/2+radius))) + wS/2+radius;
		if(bubbles[1].y+bubbles[1].radius>(y-radius)){ y = bubbles[1].y+bubbles[1].radius+radius+1;}		
		var bubble1 = {value: value, radius: radius, x: x , y: y};
		bubbles.push(bubble1);	
		
		wS=wS+120;	
		
		wb = getRandomInt(3);
		number=bubbles[wb].value;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var bin;
function drawBubbles(){
	
	c.font="15px Arial";
	c.lineWidth   = 5;
	for(var i = 0; i < 4; i++) {
		c.textAlign = "center";
		c.beginPath();
		c.arc(bubbles[i].x, bubbles[i].y, bubbles[i].radius, 0, Math.PI * 2, false);
		//c.strokeStyle="#6174A8";
		c.stroke();	
		c.fillStyle= "#26536D";
		bin = (+bubbles[i].value.toString()).toString(2);
		c.fillText(bin, bubbles[i].x, bubbles[i].y);
	}
	c.lineWidth   = 15;
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function menu(){
	c.clearRect(0, 0, wS, wS);
	zustand =0;
	score=0;
	t=null;
	drawEnvironment1();
	c.fillStyle= "#26536D";
	c.fillRect((wS/2)-80, 180, 160, 60);
	c.fillRect((wS/2)-80, 280, 160, 60);
	c.fillRect((wS/2)-80, 380, 160, 60);
	
	c.font="30px Arial";
	c.fillStyle= "#DBE8EF";
	c.fillText("TIME", wS/2, 220);
	c.fillText("ENDLESS", wS/2, 320);
	c.fillText("HELP", wS/2, 420);
	c.fillStyle= "#26536D";
}
var t;
function timer() {
    t = setInterval(increaseTimer, 1000);
	
}

var time =20;

function increaseTimer(){
	if(zustand==1){
	time-=1;
	c.clearRect(wS-100, wS-60, 80, 40);
	c.fillStyle= "#26536D";
	c.fillRect(wS-100, wS-60, 80, 40);
	c.font="30px Arial";
	
	if(time<0){
		time=0;
	}
	c.fillStyle= "#DBE8EF";
	c.fillText(time, wS-60, wS-30);
	c.fillStyle="#26536D";
	if(time<=0){
		
		zustand==4;
		endGame();
		t=null;
	}
	}
}

function endGame(){
	zustand=4;
	time=0;
	t=null;
	c.font="30px Arial";
	c.fillStyle= "#26536D";
	c.fillText("Game over", wS/2, 100);
	c.lineWidth   = 6;
	
	c.beginPath();
	c.strokeStyle='green';
	c.arc(bubbles[wb].x, bubbles[wb].y, bubbles[wb].radius+1, 0, Math.PI * 2, false);
	c.stroke();
	c.strokeStyle="#26536D";
	
}

function sleep(milliseconds) {		
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {	
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}




function s1_round(){
	createBubbles();
	drawBubbles();
	drawEnvironment2();
	
}

function s2_round(){

	createBubbles();
	


	
	
	drawBubbles();


	
	drawEnvironment2();

}

function dummy(){}

function spiel1(){
	c.clearRect(0, 0, wS, wS);
	drawEnvironment1();
	drawEnvironment2();
	s1_round();
	
	
}


function spiel2(){
	
	c.clearRect(0, 0, wS, wS);
	drawEnvironment1();
	drawEnvironment2();
	s2_round();
	
	
}


function help(){
	c.clearRect(0, 0, wS, wS);
	drawEnvironment1();
	c.fillStyle= "#26536D";
	c.fillText("Tutorial", wS/2, 80);
	c.font="20px Arial";
	c.textAlign = "start";
	c.fillText("Wähle den passenden Wert zur", wS/2-250, 120);
	
	c.fillText("gegebenen Zahl im Dualsystem aus.", wS/2-250, 160);
	c.textAlign = "center";
	c.fillText("(klick)", wS/2, 220);
	c.fillRect(20, wS-60, 80, 40);
	c.font="30px Arial";
	c.fillStyle= "#DBE8EF";
	c.fillText("Menü", 60, wS-30);
	
	
}

timer();
var zustand =0;
var klick=false;
var spielAktiv=false;
canvas.addEventListener("mousedown", function (e) {
        mouseX = e.x;
		mouseY = e.y;
		klick = true;
		console.log(zustand);
		if(zustand==0){ //menu
			zustand =0;
			if(mouseX>=(wS/2)-80&&mouseX<=(wS/2)+80&&mouseY>=180&&mouseY<=240){
				time=20;
				
				zustand=1;
				spiel1();
				
				
				spielAktiv=true;
			}
			if(mouseX>=(wS/2)-80&&mouseX<=(wS/2)+80&&mouseY>=280&&mouseY<=340){
				
				zustand=2;
				spiel2();
			}
			if(mouseX>=(wS/2)-80&&mouseX<=(wS/2)+80&&mouseY>=380&&mouseY<=440){
				
				zustand=3;
				help();
			}
			
		}
		
		else if(zustand==1){ //spiel1
			if(mouseX>=20&&mouseX<=100&&mouseY>=wS-60&&mouseY<=wS-20){
			
				menu();	
				score=0;
				t=null;
			}
			if(Math.sqrt((mouseX-bubbles[wb].x) ** 2 + (mouseY - bubbles[wb].y) ** 2)<bubbles[wb].radius){
				score++;
				time+=5;
				feedBack();
				sleep(500);
				spiel1();
				klick=false;
			}else  {
				time-=5;
				if(time<=0){time=0;}
			}
			
		}
		
		else if(zustand==2){ //spiel2
			if(mouseX>=20&&mouseX<=100&&mouseY>=wS-60&&mouseY<=wS-20){
				c.clearRect(0, 0, wS, wS);
				zustand=0;
				menu();	
				score=0;
			}	
			else if(Math.sqrt((mouseX-bubbles[wb].x) ** 2 + (mouseY - bubbles[wb].y) ** 2)<bubbles[wb].radius){
				c.beginPath();
				c.strokeStyle='green';
				c.arc(bubbles[wb].x, bubbles[wb].y, bubbles[wb].radius+1, 0, Math.PI * 2, false);
				c.stroke();
				score++;	
				
				
				sleep(1000);
				spiel2();
			}else if((Math.sqrt((mouseX-bubbles[wb].x) ** 2 + (mouseY - bubbles[wb].y) ** 2)>bubbles[wb].radius)){
				endGame();
			}			
			
		}
		
		else if(zustand==3){ //HELP
			
				if(tutCounter<4){
				tutorial();
				}else{
					menu();
					tutCounter=0;
					zustand==0;
				}
			
			
			
			
			
		}
		
		else if(zustand==4){
			if(mouseX>=20&&mouseX<=100&&mouseY>=wS-60&&mouseY<=wS-20){
				menu();	
				
			}
		}else{
			zustand=0;
		}
		
		
  
}, false);


var tutCounter =0;
function tutorial(){
	
	drawEnvironment1();
	if(tutCounter<4){
		var img = new Image();
		
		img.onload = function () {
		c.drawImage(img, wS/2-165, 150);
		}
	}else{
		
		c.clearRect(0, 0, wS, wS);
	}
	
	if(tutCounter==0){//zeigt erstes Bild
		img.src = "images/bubble_tut_1.png";	
	}
	if(tutCounter == 1){//zeigt zweites Bild
		img.src = "images/bubble_tut_2.png";	
	}
	if(tutCounter == 2){//zeigt drittes Bild
		
		img.src = "images/bubble_tut_3.png";	
	}
	if(tutCounter == 3){//zeigt viertes Bild
		img.src = "images/bubble_tut_4.png";	
		
	}
	
	

	tutCounter++;
	


	
	
}




function feedBack(){
	
	c.fillStyle= "#26536D";
	c.fillRect((wS/2)-80, 180, 160, 60);
	console.log("cool");
	
	c.font="40px Arial";
	c.fillStyle= "#DBE8EF";
	c.fillText("korrekt", wS/2, wS/2);
	c.font="35px Arial";
	c.fillStyle= "black";
	c.fillText("korrekt", wS/2, wS/2);
	
}



function getMousePos(canvas, evt){
	var rect = canvas.getBoundingClientRect();
	return{
		x: evt.clientX - rect.left,
	y: evt.clientY - rect.top};
	};
 
var mouseOver = false;
var bubblewithmouse=-1;
var quater =-1;
canvas.addEventListener('mousemove', 
function(evt){
	c.strokeStyle="#26536D";
	var mousePos = getMousePos(canvas, evt);
	if(zustand==1||zustand==2){
	console.log(mouseOver);
	
	if(mouseOver==false ){
		for(var i =0;i<4 ;i++){
	
			if((Math.sqrt((mousePos.x-bubbles[i].x) ** 2 + (mousePos.y - bubbles[i].y) ** 2)<bubbles[i].radius)&&mouseOver==false){
				c.fillStyle="#26536D";
				mouseOver = true;
				bubblewithmouse = i;
				c.lineWidth   = 2;
				c.beginPath();
				
				c.arc(bubbles[bubblewithmouse].x, bubbles[bubblewithmouse].y, bubbles[bubblewithmouse].radius+1, 0, Math.PI * 2, false);
				c.fill();
				
				c.stroke();
				c.font="15px Arial";
				c.fillStyle= "#DBE8EF";
				bin = (+bubbles[bubblewithmouse].value.toString()).toString(2);
				c.fillText(bin, bubbles[bubblewithmouse].x, bubbles[bubblewithmouse].y);
				
			}
		}
	}else {
		if(Math.sqrt((mousePos.x-bubbles[bubblewithmouse].x) ** 2 + (mousePos.y - bubbles[bubblewithmouse].y) ** 2)>bubbles[bubblewithmouse].radius){
		mouseOver = false;
		c.clearRect(0, 0, wS, wS);
	
		drawEnvironment1();
		drawEnvironment2();
		drawBubbles();
		}
	
	}
	
}});






main();