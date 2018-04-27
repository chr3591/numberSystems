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
var score=0;
var shapes = [];
var old_shapes = []; // speichert alte shapes für undo
var old_old_shapes = []; // speichert arrays der alten shapes
var amound; //Anzahl shapes
var old_amound;
var number =0; // zufällige Zahl zwischen 1 - 255
var binary; //Zahl im Dualsystem
var spielaktiv=false;
var anzahl_consult=0;
var arrayMitArrays = [];

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function reverse(s){
    return s.split("").reverse().join("");
}

function getNumber(){
	number =  Math.round(Math.random() * (255 - 2)) + 2;
	binary = (+number.toString()).toString(2);
	
}

function main(){
	c.clearRect(0, 0, wS, wS);
	
	score=0;
		c.fillStyle= "#DBE8EF";
	c.fillRect(0,0,wS,wS); 
	
	
	c.strokeStyle = "#26536D";
    c.lineWidth   = 15;
    c.strokeRect(0,0, wS,wS);
	
	c.fillStyle= "#26536D";
	c.fillRect((wS/2)-80, 180, 160, 60);
	c.fillRect((wS/2)-80, 280, 160, 60);

	
	c.font="30px Arial";
	c.fillStyle= "#DBE8EF";
	c.fillText("START", wS/2, 220);
	c.fillText("HELP", wS/2, 320);
	
	c.fillStyle= "#26536D";
	
	
	
}

function menue(){
	
	
	
	
	
}


function initializeGame(){
	c.clearRect(0, 0, wS, wS);
	newRound();
	
}

function newRound(){
	spielaktiv=true;
	shapes=[];
	old_shapes=[];
	arrayMitArrays = [];
	old_old_shapes =[];
	c.clearRect(0, 0, wS, wS);
	getNumber();
	createRect();
	drawShapes();
	drawEnvironment();
	
}

function endGame(){
	spielaktiv = false;
	undoAble = false;
	score=0;
	//var img = new Image();
		
	//	img.onload = function () {
	//	c.drawImage(img, 150, 80);
	//	img.src = "images/puzzle_game_over.png";	
	c.fillStyle= "#26536D";
	c.font="30px Arial";
	c.fillText("Game over", wS/2, 100);
	c.fillText("Solution: " +binary, wS/2, 150);
	c.fillText("New Game? (click)", wS/2, 200);
}

function undo(){
	
	shapes = arrayMitArrays[arrayMitArrays.length-1].slice(0);
	arrayMitArrays.pop();
	amound = old_amound;
	
	drawEnvironment();
	//drawShapes();
	
}

function createRect(){
	var shape;
	var temp=-1;
	var value="";
	var posi=0;
	var lenghtCounter =0;
	while(posi<binary.length){
		
		temp = Math.round(Math.random() * (100 - 0)) + 0;
		if(temp>=40&&lenghtCounter<3){
			value+=binary.charAt(posi);
			posi++;
			lenghtCounter++;
		}else if(temp <40&&value!=""){
			
			shapes.push(shape={value: value, x:Math.round(Math.random() * (wS-80 - 10)) + 10, y: Math.round(Math.random() * ((wS-120) - 120)) + 120, size:80, color: getRandomColor()});
			
			value="";
			lenghtCounter=0;
		}		
	}
	if(value!=""){
		shapes.push(shape={value: value, x:50*posi, y: 50*posi, size:80, color: getRandomColor()});
			
			value="";
	}
	
	
}
	
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
		
function drawShapes(){
	c.font="30px Arial";
	
	for(var i = 0; i<shapes.length;i++){
		
		if(shapes[i].x<=10){ // links
			shapes[i].x=11;
		}
		if(shapes[i].x+shapes[i].size>=wS-10){ //rechts
			shapes[i].x=wS-shapes[i].size-10;
		}
		if(shapes[i].Y<=60){ // oben
			shapes[i].Y=61;
		}
		if(shapes[i].y+shapes[i].size>=wS-60){ //unten
			shapes[i].y=wS-shapes[i].size-60;
		}
		
		
		c.fillStyle= shapes[i].color;
		c.fillRect(shapes[i].x,shapes[i].y,shapes[i].size,shapes[i].size);
		c.fillStyle = "white";
		c.fillText(shapes[i].value, shapes[i].x+(shapes[i].size/2), shapes[i].y+(shapes[i].size/2));
		
		
	}
}

function drawEnvironment(){
	
	c.fillStyle= "#DBE8EF";
	c.fillRect(0,0,wS,wS); 
	
	
	c.strokeStyle = "#26536D";
    c.lineWidth   = 15;
    c.strokeRect(0,0, wS,wS);
	
	
	if(tut==true){
		c.fillStyle= "#26536D";
	c.fillRect((wS/2)-(wS/8), 0, wS/8*2, 60);
	c.fillRect((wS/2)-(wS/8), wS-60, wS/8*2, wS);
	c.fillRect(20, wS-60, 80, 40);
	
	
	c.font="30px Arial";
	c.fillStyle= "#DBE8EF";
	c.fillText(number, wS/2, 40);
	c.fillText("Score: "+score, wS/2, wS-25);
	c.fillText('\u21A9', 60, wS-30);
	
		
	drawShapes();
	}
}

function checkIfRect(){
	
	for(var i = 0; i<shapes.length;i++){
		if(mouseX>shapes[i].x && mouseX < shapes[i].x+shapes[i].size && mouseY> shapes[i].y && mouseY < shapes[i].y+shapes[i].size){
			shapeKlicked= true;
			klickedShape = i;
			
		}
	}
	
}

var tutCounter =0;
function tutorial(){
	drawEnvironment();
	
	if(tutCounter<4){
		var img = new Image();
		
		img.onload = function () {
		c.drawImage(img, wS/2-165, 150);
		}
	}else{
		
		c.clearRect(0, 0, wS, wS);
	}
	
	if(tutCounter==0){//zeigt erstes Bild
		img.src = "images/puzzle_tut_1.png";	
	}
	if(tutCounter == 1){//zeigt zweites Bild
		img.src = "images/puzzle_tut_2.png";	
	}
	if(tutCounter == 2){//zeigt drittes Bild
		
		img.src = "images/puzzle_tut_3.png";	
	}
	if(tutCounter == 3){//zeigt viertes Bild
		img.src = "images/puzzle_tut_4.png";	
		tut = true;
	}
	
	

	tutCounter++;
	


	
	
}

// Mouse movement
var mouseX;
var oldMouseX;
var mouseY;
var oldMouseY;
var shapeKlicked=false;
var klickedShape = -1;
var tut = false;
var undoAble = false;

//Mouse down
canvas.addEventListener("mousedown", function (e) {
        mouseX = e.x;
		mouseY = e.y;
		
		if(tut == false && mouseX>=(wS/2)-80&&mouseX<=(wS/2)+80&&mouseY>=180&&mouseY<=240){
			tut = true;
		}
		
		
		if(tut == true){ // tut == true entspricht tutorial ist einmal gelaufen
		
			if(spielaktiv==false){
				initializeGame();
				spielaktiv=true;		
			
			}
			if(mouseX>=20 && mouseY >=(wS-60) && mouseX<=100 && mouseY <= (wS-20) && undoAble == true){
				undo();
				checkIfRect();
				
			}else{
		
				checkIfRect();
			}
			
		}else{
			
			tutorial();
		}
		
		
  
}, false);

//Mouse up
canvas.addEventListener("mouseup", function (e) {
	if(tut  == true){
			
			if (shapeKlicked==true && klickedShape >-1 && contact != 0 && enteredShape != -1){
				consultShapes();
				//c.clearRect(0, 0, wS, wS);
				//drawShapes();
				drawEnvironment();
				if(shapes.length==1 && check()==true){
					score++;
					newRound();
					
					
					
				}else if(shapes.length==1 && check()==false){
					endGame();
					
				}
				
			}
			contact = 0;
				enteredShape = -1;contact = 0;
				enteredShape = -1;
			
			shapeKlicked= false;
			klickedShape = -1;
	}
  
}, false)

//Mouse move
var contact = 0; // welcher fall ist eingetreten ? shapt kommt von rechts = 1 / shape kommt von links = 2
var enteredShape = -1; // welches shape wurde angedockt
canvas.addEventListener("mousemove", function (e) {
	
	if(tut == true){
	if (shapeKlicked==true && klickedShape >-1){
		oldMouseX = mouseX;
		oldMouseY = mouseY;
		
		mouseX = e.x;
		mouseY = e.y;
		
		if(shapes[klickedShape].x <= 10){ //Begrenzung nach Links
			
			shapes[klickedShape].x++;
			shapes[klickedShape].y = shapes[klickedShape].y + mouseY-oldMouseY;
		}else if(shapes[klickedShape].x+shapes[klickedShape].size >=wS-10 ){ //begrenzung nach Rechts
			shapes[klickedShape].x--;
			shapes[klickedShape].y = shapes[klickedShape].y + mouseY-oldMouseY;
		}else if(shapes[klickedShape].y<=55){  //Begenrung nach Oben
			shapes[klickedShape].y++;
			shapes[klickedShape].x = shapes[klickedShape].x + mouseX-oldMouseX;
		}else if(shapes[klickedShape].y+shapes[klickedShape].size>=wS-60){ //Begrenzung nach unten
			shapes[klickedShape].y--;
			shapes[klickedShape].x = shapes[klickedShape].x + mouseX-oldMouseX;
		}else{
		
			shapes[klickedShape].x = shapes[klickedShape].x + mouseX-oldMouseX;
			shapes[klickedShape].y = shapes[klickedShape].y + mouseY-oldMouseY;
		}
		
		c.clearRect(0, 0, wS, wS);
		drawShapes();
		drawEnvironment();
		
		for(var i = 0; i<shapes.length;i++){
		
		if(i != klickedShape){
			
			if((shapes[i].x+shapes[i].size>= shapes[klickedShape].x &&
				shapes[i].y <= shapes[klickedShape].y+shapes[klickedShape].size &&
				shapes[i].y+shapes[i].size >= shapes[klickedShape].y) &&
				shapes[klickedShape].x > shapes[i].x+(shapes[i].size)/2){
					
					enteredShape=i;
					c.beginPath();
					c.strokeStyle="red";
					c.lineWidth="2";
					c.rect(shapes[i].x+(shapes[i].size/2),shapes[i].y,(shapes[i].size/2),shapes[i].size+1);
					c.stroke();
					contact = 1;
					i = shapes.length;
				}else if(shapes[i].x <= shapes[klickedShape].x+shapes[klickedShape].size &&
							shapes[i].y <= shapes[klickedShape].y+shapes[klickedShape].size &&
							shapes[i].y+shapes[i].size >= shapes[klickedShape].y &&
							shapes[klickedShape].x+shapes[klickedShape].size <= shapes[i].x+(shapes[i].size)/2){
								
								enteredShape=i;
								c.beginPath();
								c.strokeStyle="red";
								c.lineWidth="2";
								c.rect(shapes[i].x,shapes[i].y,(shapes[i].size/2),shapes[i].size);
								c.stroke();
								contact = 2;
								i = shapes.length;
							}else{
								contact = 0;
								enteredShape=-1;
							}
			
			}
	
	}
		
		
	}
	}
  
}, false);

function consultShapes(){
	undoAble = true;
	old_shapes = [];
	for (var i = 0; i < shapes.length; i++) {
		old_shapes.push(shape={value: shapes[i].value, x: shapes[i].x , y: shapes[i].y , size: shapes[i].size, color: shapes[i].color});
	}
	arrayMitArrays.push(old_shapes.slice(0));
	
	
	
	if(contact==1){ // contact von rechts
			
			shapes[enteredShape].value =shapes[enteredShape].value.concat(shapes[klickedShape].value);
		
			
			shapes[enteredShape].size = shapes[enteredShape].size + shapes[klickedShape].size;
			
			shapes.remove(klickedShape);
			
			
	} else { // contact von links
		
		
		shapes[enteredShape].value = shapes[klickedShape].value.concat(shapes[enteredShape].value);
		
		shapes[enteredShape].size = shapes[enteredShape].size + shapes[klickedShape].size;
		shapes.remove(klickedShape);
	}
	
	anzahl_consult++;
}

function check(){
	
	if(shapes[0].value==binary){
		return true;
		
	}else{
		return false;
	}
}

main();



