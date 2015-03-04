function init() {
var level = 1; //prompt("Enter the game level. Easy : 1; Normal : 2",1);
var gameState = []; /*To control free cells*/
var tn = 5; //prompt("Enter the size of the game table",5);
var board = document.getElementById("game_board");
var score = 0;  
var cellType = "free";              //  cellType varible is used to know if we need move knight. Contains class of previous cell; 
var cellPos = "free";               //  Contains id of previous cell;
var step = 0;                       //  step is used to know if we need new knight;

var view = {
	displayBlackKnight: function(location) {               // To display black knight on the cell;
		var cell = document.getElementById(location);
		cell.setAttribute("class","blackKnight");
	},
	displayWhiteKnight: function(location) {               // To display white knight on the cell;
		var cell = document.getElementById(location);
		cell.setAttribute("class","whiteKnight");
	},
	displayKnight: function() {                            // To display knight on the cell which is free;
		var index = randomCell();                          // Select random free cell id;
		var cell = gameState[index];
		var color = Math.floor(Math.random()*2);           // To select color of knight;
		
		if(color == 0)
			this.displayWhiteKnight(cell);
		else 
			this.displayBlackKnight(cell);	

		gameState.splice(index,1); 	
	},
	displayMessage: function(msg) {                        // To display message;
		var message = document.getElementById("messageArea");
		message.innerHTML = msg;
	},
	displayScore: function(scr) {
		var score = document.getElementById("scoreArea");
		score.innerHTML = scr;
	}
};

function createBoard (tn) {
	var no = [];
	var board_html = '<table class="table" border="1">';

	for (var i = 0; i < tn; i++) {
		board_html += '<tr>';
		for (var j = 0; j < tn; j++) {
			board_html += '<td></td>';
			no.push(i + '' + j);
		}
		board_html += '</tr>';
	}
	board_html += '</table>';

	board.innerHTML = board_html;
	
	var tdCells = board.getElementsByTagName("td");
	for(var i=0; i<tdCells.length; i++) {
		tdCells[i].setAttribute("id",no[i]);
		//console.log(no[i]);
	}
	
	for(var i=0; i<tn; i++) {
		for(var j=0; j<tn; j++) {
			gameState.push(i + "" + j);
		}
	}
	gameState.splice(0,1);
	var lastIndex = gameState.indexOf((tn-1) + "" + (tn-1)); 
	gameState.splice(lastIndex,1);
	//console.log(gameState);
	
	var blackCell = document.getElementById("00");
	blackCell.setAttribute("class","black");
	
	var whiteCell = document.getElementById((tn-1) + "" + (tn-1));
	whiteCell.setAttribute("class","white");
}

function randomCell() {                                     // To select random cell id;
	var index;
	var result;
	
	//if((gameState.length == 1) && isGameEnd())
		//view.displayMessage("You lost");
	index = Math.floor((Math.random())*(gameState.length));    
	result = gameState[index];
	
	return index;
}
//board.innerHTML = createBoard(tn);
createBoard(tn);

var tableCell = board.getElementsByTagName("td"); 
//console.log(tableCell.length);
for(var i=0; i<tableCell.length; i++) {
	tableCell[i].onclick = clickKnight;
}

function clickKnight(eventObj) {
	var cell = eventObj.target;
	var cellClass = cell.getAttribute("class");
	
	if(cellPos == "free") {
		if(cellClass != null) {
			cellType = cellClass;
			cellPos = cell.getAttribute("id");
			document.getElementById(cellPos).style.border = "3px solid #FF0000";
		}
	}
	else {
		var id1 = cell.getAttribute("id");
		if(cellClass != "blackKnight" && cellClass != "whiteKnight") {
			var id = cell.getAttribute("id");
			var m = possibleMoves(cellPos);
			
			if(m.indexOf(id) == -1) {
				view.displayMessage("You are not allowed that move!");
				document.getElementById(cellPos).style.border = "solid 1px";
				cellPos = "free";
				cellType = "free";
			}
			else {
				if(id == "00") {                                // To check if we select black cell;
					if(cellType == "blackKnight") {
						document.getElementById(cellPos).style.border = "solid 1px";
						
						clearClass(cellPos);
						gameState.push(cellPos);                       // Add previuos cell id to gameState array; Agajan I have followed this code.
						cellPos = "free";
						cellType = "free";
						score++;
						
						step++;
						if(level == 1) {
							if(step == 2) {
								step = 0;
								view.displayKnight();
							}
						}
						else if(level == 2) {
							if(step == 1) {
								step = 0;
								view.displayKnight();
							}
						}
						if((gameState.length == 0) && isGameEnd())
							view.displayMessage("You lost");
						view.displayScore("SCORE:" + score);
					   
						if(gameState.length == tn*tn-2) {
							view.displayKnight();	
						}											   
					}
					else {
						view.displayMessage("You are not allowed that move!");
						document.getElementById(cellPos).style.border = "solid 1px";
						cellPos = "free";
						cellType = "free";
					}
				}
				else if(id == (tn-1 + "" + tn-1)) {                     // To check if we select white cell;
						if(cellType == "whiteKnight") {
						document.getElementById(cellPos).style.border = "solid 1px";
						
						clearClass(cellPos);
						gameState.push(cellPos);             // Add previuos cell id to gameState array;
						cellPos = "free";
						cellType = "free";
						score++;
						
						step++;
						if(level == 1) {
							if(step == 2) {
								step = 0;
								view.displayKnight();
							}
						}
						else if(level == 2) {
							if(step == 1) {
								step = 0;
								view.displayKnight();
							}
						}
						if((gameState.length == 0) && isGameEnd())
							view.displayMessage("You lost");
							
						view.displayScore("SCORE:" + score);
						if(gameState.length == tn*tn-2) {
							view.displayKnight();	
						}
					}
					else {
						view.displayMessage("You are not allowed that move!");
						document.getElementById(cellPos).style.border = "solid 1px";
						cellPos = "free";
						cellType = "free";
					}
				}
				else {
					var index = gameState.indexOf(id);
					
					cell.setAttribute("class",cellType);
					document.getElementById(cellPos).style.border = "solid 1px";
					
					clearClass(cellPos);
					gameState.push(cellPos);        // Add previuos cell id to gameState array;
					cellPos = "free";
					cellType = "free";
					view.displayMessage("");
					//console.log("id = " + id);
					gameState.splice(index,1);       // Remove just onclicked cell id from gameState array;
					//console.log(gameState);
					step++;
					if(level == 1) {
							if(step == 2) {
								step = 0;
								view.displayKnight();
							}
						}
					else if(level == 2) {
						if(step == 1) {
							step = 0;
							view.displayKnight();
						}
					}
					if((gameState.length == 0) && isGameEnd())
							view.displayMessage("<strong>YOU LOST</strong>");
				}
			}
		}
		else {
			if(cellClass == cellType && id1 == cellPos) {
				document.getElementById(cellPos).style.border = "solid 1px";
				cellPos = "free";
				cellType = "free";
				view.displayMessage("");
			}
			else {
				view.displayMessage("You are not allowed that move!");
				document.getElementById(cellPos).style.border = "solid 1px";
				cellPos = "free";
				cellType = "free";
			}
		}
	}
}
function clearClass(location) {                       // Clear class of cell;
	var cell = document.getElementById(location);
	cell.setAttribute("class","");
}

function possibleMoves(location) {                     // Return array of possible moves of knight;
	var first = parseInt(location.charAt(0));
	var second = parseInt(location.charAt(1));
	var moveArray = [];
	if((first-1)>=0 && (second+2)<tn)
		moveArray.push((first-1) + "" + (second+2));
	if((first+1)<tn && (second+2)<tn)
		moveArray.push((first+1) + "" + (second+2));
	if((first+2)<tn && (second+1)<tn)
		moveArray.push((first+2) + "" + (second+1));
	if((first+2)<tn && (second-1)>=0)
		moveArray.push((first+2) + "" + (second-1));
	if((first+1)<tn && (second-2)>=0)
		moveArray.push((first+1) + "" + (second-2));
	if((first-1)>=0 && (second-2)>=0)
		moveArray.push((first-1) + "" + (second-2));
	if((first-2)>=0 && (second-1)>=0)
		moveArray.push((first-2) + "" + (second-1));
	if((first-2)>=0 && (second+1)<tn)
		moveArray.push((first-2) + "" + (second+1));
	return moveArray;
}

function isGameEnd() {
	var arrayBlack = possibleMoves("00");
	var arrayWhite = possibleMoves(((tn-1) + "" + (tn-1)));
	var black1 = document.getElementById(arrayBlack[0]);
	var black2 = document.getElementById(arrayBlack[1]);
	var white1 = document.getElementById(arrayWhite[0]);
	var white2 = document.getElementById(arrayWhite[1]);
	
	//console.log((black1.getAttribute("class") == "whiteKnight") && (black2.getAttribute("class") == "whiteKnight") && (white1.getAttribute("class") == "blackKnight") && (white2.getAttribute("class") == "blackKnight"));
	if((black1.getAttribute("class") == "whiteKnight") && (black2.getAttribute("class") == "whiteKnight") && (white1.getAttribute("class") == "blackKnight") && (white2.getAttribute("class") == "blackKnight"))
		return true;
	else 
		return false;
}
//console.log(possibleMoves("00"));
//console.log(possibleMoves((tn-1) + "" + (tn-1)));
//isGameEnd();

view.displayKnight();
view.displayScore("SCORE : " + score);
}

function iniliaze() {
	init();
	var mes = document.getElementById("messageArea");
	mes.innerHTML = "Move the <strong>KNIGHTS</strong> to their corresponding cells.";
}

var newGame = document.getElementById("newGameButton");
newGame.onclick = iniliaze;

init();

//var newGame = document.getElementById('newGameButton');
//newGame.addEventListener('click', init);
//newGame.onclick = init;
