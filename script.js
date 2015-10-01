var width = 420;
var height = 630;
var gapWidth = width/6;
var gapHeight = height/9;
var turnCount = 0;
var gameSpeed = 300;
var gameTimer;
var countMatrix = new Array(9);
var colorMatrix = new Array(9);
var isGameOver = false;

var canvas = document.getElementById("arena");
var gameArena = canvas.getContext("2d");
canvas.addEventListener("click", gameLoop);

initialiseMatrix();
initialise();

function initialise()
{
	isGameOver = false;
	matrixDefault();
	drawArena();
	turnCount = 0;
	gameTimer = setInterval(updateMatrix, gameSpeed);
}

function initialiseMatrix()
{
	for(var counter = 0; counter < 9; counter++)
	{
		countMatrix[counter] = new Array(6);
	}

	for(var counter = 0; counter < 9; counter++)
	{
		colorMatrix[counter] = new Array(6);
	}
}

function matrixDefault()
{
	for(var i = 0; i < 9; i++)
	{
		for(var j = 0; j < 6; j++)
		{
			colorMatrix[i][j] = "";		//No color
			countMatrix[i][j] = 0;		//No value
		}
	}
}

function drawArena()
{
	gameArena.clearRect(0, 0, width, height);
	gameArena.font = "35px Times New Roman";

	for(var counter = 1; counter < 6; counter++)
	{
		gameArena.beginPath();
		gameArena.moveTo(counter*gapWidth, 0);
		gameArena.lineTo(counter*gapWidth, height);
		gameArena.closePath();
		gameArena.stroke();
	}

	for(var counter = 1; counter < 9; counter++)
	{
		gameArena.beginPath();
		gameArena.moveTo(0 , counter*gapHeight);
		gameArena.lineTo(width , counter*gapHeight);
		gameArena.closePath();
		gameArena.stroke();
	}

	for(var i = 0; i < 9; i++)
	{
		for(var j = 0; j < 6; j++)
		{
			if(countMatrix[i][j] == 0)
				continue;
			if(countMatrix[i][j] == 1)
				oneCircle(i, j, colorMatrix[i][j]);
			else if(countMatrix[i][j] == 2)
				twoCircle(i, j, colorMatrix[i][j]);
			else
				threeCircle(i, j, colorMatrix[i][j]);
		}
	}
}

function gameLoop(event)
{
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	
	var row = Math.floor(x/gapWidth);
	var column = Math.floor(y/gapHeight);
	
	if(!isGameOver)
	{
		if(turnCount%2 == 0 && (colorMatrix[column][row] == "" || colorMatrix[column][row] == "red"))
		{
			countMatrix[column][row]++;		//Weird graphic coordinate-system
			colorMatrix[column][row] = "red";
			turnCount++;
		}
		if(turnCount%2 == 1 && (colorMatrix[column][row] == "" || colorMatrix[column][row] == "green"))
		{
			countMatrix[column][row]++;		//Weird graphic coordinate-system
			colorMatrix[column][row] = "green";
			turnCount++;
		}
	}
}

function checkGameOver()
{
	if(gameOver() == 1 || gameOver() == 2)
	{
		isGameOver = true;
		gameOverScreen(gameOver());
		clearInterval(gameTimer);
		setTimeout(initialise, 4000);
	}
}

function updateMatrix()
{
	drawArena();
	while(notStable())
	{
		if(countMatrix[0][0] == 2)
		{
			countMatrix[0][0] = 0;
			countMatrix[1][0]++;
			countMatrix[0][1]++;
			colorMatrix[1][0] = colorMatrix[0][0];
			colorMatrix[0][1] = colorMatrix[0][0];
			colorMatrix[0][0] = "";
			break;
		}
		if(countMatrix[8][0] == 2)
		{
			countMatrix[8][0] = 0;
			countMatrix[7][0]++;
			countMatrix[8][1]++;
			colorMatrix[7][0] = colorMatrix[8][0];
			colorMatrix[8][1] = colorMatrix[8][0];
			colorMatrix[8][0] = "";
			break;
		}
		if(countMatrix[8][5] == 2)
		{
			countMatrix[8][5] = 0;
			countMatrix[7][5]++;
			countMatrix[8][4]++;
			colorMatrix[7][5] = colorMatrix[8][5];
			colorMatrix[8][4] = colorMatrix[8][5];
			colorMatrix[8][5] = "";
			break;
		}
		if(countMatrix[0][5] == 2)
		{
			countMatrix[0][5] = 0;
			countMatrix[1][5]++;
			countMatrix[0][4]++;
			colorMatrix[1][5] = colorMatrix[0][5];
			colorMatrix[0][4] = colorMatrix[0][5];
			colorMatrix[0][5] = "";
			break;
		}
		for(var i = 1; i < 8; i++)
		{
			if(countMatrix[i][0] == 3)
			{
				countMatrix[i][0] = 0;
				countMatrix[i-1][0]++;
				countMatrix[i+1][0]++;
				countMatrix[i][1]++;
				colorMatrix[i][1] = colorMatrix[i][0];
				colorMatrix[i-1][0] = colorMatrix[i][0];
				colorMatrix[i+1][0] = colorMatrix[i][0];
				colorMatrix[i][0] = "";
				break;
			}
		}
		for(var i = 1; i < 8; i++)
		{
			if(countMatrix[i][5] == 3)
			{
				countMatrix[i][5] = 0;
				countMatrix[i-1][5]++;
				countMatrix[i+1][5]++;
				countMatrix[i][4]++;
				colorMatrix[i][4] = colorMatrix[i][5];
				colorMatrix[i-1][5] = colorMatrix[i][5];
				colorMatrix[i+1][5] = colorMatrix[i][5];
				colorMatrix[i][5] = "";
				break;
			}
		}
		for(var i = 1; i < 5; i++)
		{
			if(countMatrix[0][i] == 3)
			{
				countMatrix[0][i] = 0;
				countMatrix[1][i]++;
				countMatrix[0][i-1]++;
				countMatrix[0][i+1]++;
				colorMatrix[1][i] = colorMatrix[0][i];
				colorMatrix[0][i-1] = colorMatrix[0][i];
				colorMatrix[0][i+1] = colorMatrix[0][i];
				colorMatrix[0][i] = "";
				break;
			}
		}
		for(var i = 1; i < 5; i++)
		{
			if(countMatrix[8][i] == 3)
			{
				countMatrix[8][i] = 0;
				countMatrix[7][i]++;
				countMatrix[8][i-1]++;
				countMatrix[8][i+1]++;
				colorMatrix[7][i] = colorMatrix[8][i];
				colorMatrix[8][i-1] = colorMatrix[8][i];
				colorMatrix[8][i+1] = colorMatrix[8][i];
				colorMatrix[8][i] = "";
				break;
			}
		}
		for(var i = 1; i < 8; i++)
		{
			for(var j = 1; j < 5; j++)
			{
				if(countMatrix[i][j] == 4)
				{
					countMatrix[i][j] = 0;
					countMatrix[i-1][j]++;
					countMatrix[i+1][j]++;
					countMatrix[i][j-1]++;
					countMatrix[i][j+1]++;
					colorMatrix[i-1][j] = colorMatrix[i][j];
					colorMatrix[i+1][j] = colorMatrix[i][j];
					colorMatrix[i][j-1] = colorMatrix[i][j];
					colorMatrix[i][j+1] = colorMatrix[i][j];
					colorMatrix[i][j] = "";
					break;
				}
			}
		}
		break;
	}
	checkGameOver();
}

function notStable()
{
	var ans = false;
	if(countMatrix[0][0] == 2 || countMatrix[8][0] == 2 || countMatrix[8][5] == 2 || countMatrix[0][5] == 2)
		ans = true;

	for(var i = 1; i < 8; i++)
		if(countMatrix[i][0] == 3 || countMatrix[i][5] == 3)
			ans = true;

	for(var i = 1; i < 5; i++)
		if(countMatrix[0][i] == 3 || countMatrix[8][i] == 3)
			ans = true;

	for(var i = 1; i < 8; i++)
		for(var j = 1; j < 8; j++)
			if(countMatrix[i][j] == 4)
				ans = true;

	return ans;
}

function gameOver()
{
	var countRed = 0;
	var countGreen = 0;
	for(var i = 0; i < 9; i++)
	{
		for(var j = 0;j < 6; j++)
		{
			if(colorMatrix[i][j] == "red") countRed++;
			if(colorMatrix[i][j] == "green") countGreen++;
		}
	}
	if(turnCount > 1)
	{
		if(countRed == 0)
		{
			return 2;
		}
		if(countGreen == 0)
		{
			return 1;
		}
	}
}

function gameOverScreen(player)
{
	if(player == 2)
	{
		gameArena.clearRect(0, 0, width, height);
		gameArena.fillStyle = "black";
		gameArena.fillRect(0, 0, width, height);
		gameArena.fillStyle = "white";
		gameArena.font = "40px Times New Roman";
		gameArena.fillText("Player 2 wins!", width/2 - 150, height/2 - 50);
	}
	else
	{
		gameArena.clearRect(0, 0, width, height);
		gameArena.fillStyle = "black";
		gameArena.fillRect(0, 0, width, height);
		gameArena.fillStyle = "white";
		gameArena.font = "40px Times New Roman";
		gameArena.fillText("Player 1 wins!", width/2 - 150, height/2 - 50);
	}
}

function oneCircle(row, column, color)
{
	gameArena.beginPath();
	gameArena.arc(column*gapWidth + 35, row*gapHeight + 35, 15, 0, Math.PI*2);
	gameArena.fillStyle = color;
	gameArena.fill();
	gameArena.stroke();
	gameArena.closePath();
}

function twoCircle(row, column, color)
{
	gameArena.beginPath();
	gameArena.arc(column*gapWidth + 20, row*gapHeight + 35, 15, 0, Math.PI*2);
	gameArena.fillStyle = color;
	gameArena.fill();
	gameArena.stroke();
	gameArena.closePath();

	gameArena.beginPath();
	gameArena.arc(column*gapWidth + 50, row*gapHeight + 35, 15, 0, Math.PI*2);
	gameArena.fillStyle = color;
	gameArena.fill();
	gameArena.stroke();
	gameArena.closePath();
}

function threeCircle(row, column, color)
{
	gameArena.beginPath();
	gameArena.arc(column*gapWidth + 20, row*gapHeight + 17, 15, 0, Math.PI*2);
	gameArena.fillStyle = color;
	gameArena.fill();
	gameArena.stroke();
	gameArena.closePath();

	gameArena.beginPath();
	gameArena.arc(column*gapWidth + 20, row*gapHeight + 53, 15, 0, Math.PI*2);
	gameArena.fillStyle = color;
	gameArena.fill();
	gameArena.stroke();
	gameArena.closePath();

	gameArena.beginPath();
	gameArena.arc(column*gapWidth + 50, row*gapHeight + 35, 15, 0, Math.PI*2);
	gameArena.fillStyle = color;
	gameArena.fill();
	gameArena.stroke();
	gameArena.closePath();
}