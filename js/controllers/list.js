angular.module("numberSystem",  ["ngSanitize"]).controller("countCtrl", function numberSystemController($scope) {
	
			console.log("Controller loaded");
			
			
			//Button-Steuerung, Checkboxkontrolle
			$scope.IsClicked=false;
			
			//Checkboxes
			$scope.checkboxes =[
				{id:2, text: '2er-System', selected:true},
				{id:3, text: '3er-System'},
				{id:4, text: '4er-System', selected:true},
				{id:5, text: '5er-System'},
				{id:6, text: '6er-System'},
				{id:7, text: '7er-System'},
				{id:8, text: '8er-System', selected:true},
				{id:9, text: '9er-System'},
				{id:10, text: '10er-System'},
				{id:11, text: '11er-System'},
				{id:12, text: '12er-System', selected:true},
				{id:13, text: '13er-System'},
				{id:14, text: '14er-System'},
				{id:15, text: '15er-System'},
				{id:16, text: '16er-System', selected:true},
			];
			$scope.selection = [];
			
			$scope.selectedNumbers = function selectedNumbers() {
				return filterFilter($scope.checkboxes, { selected: true });
			  };
			
			$scope.$watch('checkboxes|filter:{selected:true}', function (nv) {
				$scope.selection = nv.map(function (checkboxes) {
				  return checkboxes.id;
				});
			  }, true);
			
			//Auswertung der Checkboxen und Generierung der Aufgabe
			$scope.myChoice = function(){
				$scope.text = "";
				$scope.Enough = false;
				$scope.ShowSolution = false;
				$scope.WrongAnswer = false;
				$scope.RightAnswer = false;
				$scope.myArray = [];
				
			// Verhinderung einer Endlosschleife. Wurde nur ein Zahlensystem gewählt, passiert nichts	
			if ($scope.selection.length > 1) {
				var targetbase = $scope.selection[Math.floor(Math.random() * $scope.selection.length)];
				$scope.zielbasis = targetbase;
				var base = $scope.selection[Math.floor(Math.random() * $scope.selection.length)];
				
				//Sicherstellen das Basis und Zielbasis nicht identisch sind
				while (base==targetbase){
				base = $scope.selection[Math.floor(Math.random() * $scope.selection.length)];
				}
				$scope.basis = base;
				//Generierund des Zielwerts
				var goal = Math.floor((Math.random() * 5000) + 1);
				function countDigits(x)  {
						return (x + "").length;
				}
				var duration = countDigits(goal);
				var x = duration;
				var y = goal;
				var count = 0;
				var quotient = 0;
				var teiler = 0;
				var summe = 0;
				var z = 0;
				var decimalarray = [];
				var myHTML = [];
			
				$scope.IsClicked = true;
				
				//y wird von hinten nach vorne berechnet
				for (var i=0;i<duration;i++){
				x--;
				decimalarray[x] = Math.floor(y % Math.pow(10,i+1)/Math.pow(10,i+1)*10);
				y = y - (y % Math.pow(10,i));			
				}
			//Cases zur Ausgabe von Buchstaben falls nötig	
			var startarray = [];
			y = goal;
			for (var i=0;y>0;i++){
				startarray[i] = Math.floor(y % base,i+1);
				y = Math.floor(y/base);
				switch(startarray[i]) {
						case 10:
							startarray[i]="A";
							break;
						case 11:
							startarray[i]="B";
							break;
						case 12:
							startarray[i]="C";
							break;
						case 13:
							startarray[i]="D";
							break;
						case 14:
							startarray[i]="E";
							break;
						case 15:
							startarray[i]="F";
							break;
					}			
			}
			startarray.reverse(); //Kehrt die Sortierung der einzelnen Stellen um, um den korrekten Wert darzustellen
			
			//Gleicher Ablauf für das Zielarray, einziger Unterschied ist der Einbezug der Targetbase
			var zielarray = [];
			y = goal;
			for (var i=0;y>0;i++){
				zielarray[i] = Math.floor(y % targetbase,i+1);
				y = Math.floor(y/targetbase);
				switch(zielarray[i]) {
						case 10:
							zielarray[i]="A";
							break;
						case 11:
							zielarray[i]="B";
							break;
						case 12:
							zielarray[i]="C";
							break;
						case 13:
							zielarray[i]="D";
							break;
						case 14:
							zielarray[i]="E";
							break;
						case 15:
							zielarray[i]="F";
							break;
					}			
			}
			zielarray.reverse();
			//Erstellung des Aufgabentextes auf dynamischer Basis
			$scope.exercise = "Überführen Sie die Zahl " + startarray.join('') + " zur Basis " + base + " in das " + targetbase + "er-System.";
			//Rückwandlung der Buchstaben in Zahlen um sicherzustellen, dass der berechnete Wert pro Stelle des Arrays stimmt
			for (var i=1;i<=startarray.length;i++){
				var x = startarray.length-i;
				var iNeu = i-1;
				switch(startarray[x]) {
						case "A":
							startarray[x]=10;
							break;
						case "B":
							startarray[x]=11;
							break;
						case "C":
							startarray[x]=12;
							break;
						case "D":
							startarray[x]=13;
							break;
						case "E":
							startarray[x]=14;
							break;
						case "F":
							startarray[x]=15;
							break;
					}
				summe = summe + startarray[x]*Math.pow(base,iNeu);
				$scope.Test = startarray[x];
				$scope.Exponent = iNeu;
				$scope.Result = startarray[x]*Math.pow(base,iNeu);
				// komplettes Binding pro Rechenschritt
				myHTML[z] = '<p><span class="math">'+$scope.Test+'</span> <span class="math">  x  </span> <span class="math">'+base+'<sup>'+$scope.Exponent+'</sup></span>'+'&emsp; = &emsp; <span class="result">'+$scope.Result+'</span></p>';				
				$scope.help = myHTML.join('');
				z++;
			}
			$scope.Summe = summe;
			var j = goal;
			var mySolution = [];
				//Der ganze Ablauf nochmal für die Rechenschritte vom Dezimalsystem hin zum Zielsystem
				for (var i=0;j>0;i++){
				$scope.divisor1 = j;
				$scope.rest = Math.floor(j % targetbase,i+1);
				$scope.quotient = Math.floor(j/targetbase);
				console.log("Wir teilen " + j + " durch " + targetbase + " = " + Math.floor(j % targetbase,i+1))
				j = Math.floor(j/targetbase);
				switch(zielarray[i]) {
						case 10:
							zielarray[i]="A";
							break;
						case 11:
							zielarray[i]="B";
							break;
						case 12:
							zielarray[i]="C";
							break;
						case 13:
							zielarray[i]="D";
							break;
						case 14:
							zielarray[i]="E";
							break;
						case 15:
							zielarray[i]="F";
							break;
					}
				//Ablage der Rechenschritte in einem Array und Ausgabe in einzelnen Zeilen
				mySolution[z] = '<p><span class="math">'+$scope.divisor1+'</span> &emsp; : &emsp; <span class="math">'+targetbase+'</span> &emsp; = &emsp;'+$scope.quotient+' <span class="result">&emsp; Rest: '+$scope.rest+'</span></p>';				
				$scope.solution = mySolution.join('');
				z++;						
			}			
			 $scope.loesung = zielarray.join('');
			}
			
			//Solution-Check
				$scope.mySolution = function(event){
				if (event.key == "Enter" || event.currentTarget.value=="solve") {
					if (zielarray.join('') == $scope.text.solution){
					$scope.RightAnswer = true;
					$scope.WrongAnswer = false;
					$scope.Enough = false;
					}
					else{
						$scope.WrongAnswer = true;
						$scope.RightAnswer = false;
						$scope.Enough = true;
					}
				}
			}
			
			}
		});

	
