//All cat <img> tags from the html file
var allCats = document.getElementsByClassName("Cat")
//The ghost animation when score goes up
var ghostStreak = document.getElementById("ghostStreak")
//Takes all the answer html elements
var answerElements = document.getElementsByClassName("Answer")
//The correct amount of cats
var result
//score
var score = 0;
var scoreElement = document.getElementById("scoreValue")
//ghost timer
var intervalLength = 100
var animationInfo = [1,35,720,330]
var interval



//Returns an array of 1-11 indexes ranging from 0-10. These indexes will
//be used to show their corresponding cat image in the allCats array.
function chooseCats () {
	//chooses amount of cats to show
	var amount = Math.floor(Math.random() * 11) + 1
	//starts with -10, a value that isn't 0-10
	var currentChoice = -10
	//List of the indexes
	var indexes = []
	for (i=0; i < amount; i++) {
		//select a random value from 0-10 and store it in choice. if that 
		//value is already in the indexes array, choose another one. This
		//prevents duplicates
		do {
			currentChoice = Math.floor(Math.random() * 11)
		}
		while (indexes.indexOf(currentChoice) > -1)
		
		//push the choice to the array
		indexes.push(currentChoice)
	}
	return indexes
}

//hides all the cats
function hideCats () {
	//hides all cats
	for (i = 0; i < allCats.length; i++) {
		allCats[i].style.visibility = 'hidden'
	}
}

function showCats (indexArray) {
	//hides cats
	hideCats()
	
	//Loops through the given index Array and sets the cats at that index to visible
	for (i = 0; i < indexArray.length; i++) {
		allCats[indexArray[i]].style.visibility = 'visible'
	}
}


function setAnswerValues (catAmount) {
	//Index of the element which will show the correct value
	var correctIndex = Math.floor(Math.random() * answerElements.length)
	//Values that were chosen as answers to check for repetition
	var chosenValues = []
	//The current chosen value for the wrongg answers
	var currChoice
	//The correct value is put into the chosenValues list from the start
	chosenValues.push(catAmount)
	
	for (i = 0; i < answerElements.length; i++) {
		//If the index that is being looped is the correct index, set that element to show the correct value
		if (i == correctIndex) {
			answerElements[i].innerHTML = catAmount
		}
		//otherwise...
		else if(i != correctIndex) {
			//Choose a random value 1-11
			do {
				currChoice = Math.floor(Math.random() * 11) + 1
			}
			//keep choosing a new value if the chosen value is already found in the chosenValues array
			while (chosenValues.indexOf(currChoice) > -1)
			
			//once a value was found, set the current index of the elements to show that value and ass it to chosenValues
			answerElements[i].innerHTML = currChoice
			chosenValues.push(currChoice)
		}
	}
	for (i = 0; i < answerElements.length; i++) {
		answerElements[i].style.color = 'white'
	}
}


function clickedAnswer () {
	if (document.getElementById('TheWholeGame').style.visibility == 'visible') {
		if (this.innerHTML == result.length) {
			//resets the ghost element and calls the func
			ghostStreak.style.opacity = 1
			ghostStreak.style.fontSize = "30pt"
			ghostStreak.style.left = (0.140625 * window.innerWidth).toString() + "px" //"270px" 
			ghostStreak.style.top = (0.1296296 * (0.140625 * window.innerWidth)).toString() + "px" //"35px"
			ghostStreak.innerHTML = '+1'
			intervalLength = 100
			animationInfo = [1,(0.1296296 * (0.140625 * window.innerWidth)),(0.140625 * window.innerWidth),15]
			clearInterval(interval)
			interval = setInterval(ghostHandler, 1)
			
			
			//adds score
			score += 1
			scoreElement.innerHTML = score
			
			//thumbs up
			document.getElementById("thumbsUp").style.visibility = 'visible'
			document.getElementById("thumbsDown").style.visibility = 'hidden'	

			//text
			document.getElementById("incorrect").style.visibility = 'hidden'
			document.getElementById("correct").style.visibility = 'visible'
			
			//makes new question if score if below 10. Otherwise ends the game
			if (score < 10) {
				//Play sounds
				if (Math.floor(Math.random() * 2) == 0) {
					document.getElementById("great1").play()
				}
				else {
					document.getElementById("great2").play()
				}
				//new question
				newQuestion()
			}
			else {
				endScreen()
				//playsound
				document.getElementById("keepItUp").play()
			}
		}
		else {
			//thumbs down
			document.getElementById("thumbsUp").style.visibility = 'hidden'
			document.getElementById("thumbsDown").style.visibility = 'visible'
			
			//text
			document.getElementById("incorrect").style.visibility = 'visible'
			document.getElementById("correct").style.visibility = 'hidden'
			
			//sets color of answer to red so the player knows it was wrong
			this.style.color = 'red'
			//play sounds
			if (Math.floor(Math.random() * 2) == 0) {
				document.getElementById("tryAgain1").play()
			}
			else {
				document.getElementById("tryAgain2").play()
			}
		}
	}
}


function clickedReplay () {
	//shows the game again
	document.getElementById("TheWholeGame").style.visibility = 'visible'
	document.getElementById("TheEndScreen").style.visibility = 'hidden'
	//makes a new question
	newQuestion()
	//resets score
	score = 0
	scoreElement.innerHTML = score
}

function setAnswerEvents () {
	for (i=0; i < answerElements.length; i++) {
		answerElements[i].addEventListener("mouseover", function() {
			this.style.opacity = 1
		})
		answerElements[i].addEventListener("mouseout", function() {
			this.style.opacity = 0.65
		})
		answerElements[i].addEventListener("click", clickedAnswer)
	}
	//Adds the event listerner to the replay button
}


function ghostHandler () {
	//Animates the ghost element
	animationInfo[0] -= 0.01
	animationInfo[1] += 0.45
	animationInfo[2] -= 0.16
	animationInfo[3] -= 0.37
	
	console.log(animationInfo[1].toString() + "pt")
	
	ghostStreak.style.opacity = animationInfo[0]
	ghostStreak.style.fontSize = animationInfo[1].toString() + "pt"
	ghostStreak.style.left = animationInfo[2].toString() + "px"
	ghostStreak.style.top = animationInfo[3].toString() + "px"
	
	//decrements length
	intervalLength -= 1
	
	if (intervalLength <= 0) {
		clearInterval(interval)
	}
}

//Sets up the end screen for when you get 10 score
function endScreen () {
	//button event 
	document.getElementById("replay").addEventListener("click",clickedReplay)
	//Hides all cats and good job messages
	hideCats()
	document.getElementById("thumbsUp").style.visibility = 'hidden'
	document.getElementById("thumbsDown").style.visibility = 'hidden'
	document.getElementById("incorrect").style.visibility = 'hidden'
	document.getElementById("correct").style.visibility = 'hidden'
	
	//hides the game, and shows the end screen
	document.getElementById("TheWholeGame").style.visibility = 'hidden'
	document.getElementById("TheEndScreen").style.visibility = 'visible'
}


function newQuestion () {
	result = chooseCats()
	setAnswerValues(result.length)
	setAnswerEvents()
	showCats(result)
}

//A function set to run continiously. Used for debug statements
function debugPrint () {
}
debugInterval = setInterval(debugPrint,100)

//adjusts parameters constantly
function adjustParam () {
	//cats
	document.getElementById("Cat1").style.left = (0.015625 * window.innerWidth).toString() + 'px'
	document.getElementById("Cat1").style.top = (18.666 * (0.015625 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat2").style.left = (.19270833 * window.innerWidth).toString() + 'px'
	document.getElementById("Cat2").style.top = (1.324324 * (.19270833 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat3").style.left = (0.296875 * window.innerWidth).toString() + 'px' 
	document.getElementById("Cat3").style.top = (0.912280 * (0.296875 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat4").style.left = (.223958 * window.innerWidth).toString() + 'px'   
	document.getElementById("Cat4").style.top = (1.186046 * (.223958 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat5").style.left = (.260416 * window.innerWidth).toString() + 'px'    
	document.getElementById("Cat5").style.top = (1.12 * (.260416 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat6").style.left = (.322916 * window.innerWidth).toString() + 'px'    
	document.getElementById("Cat6").style.top = (.903225 * (.322916 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat7").style.left = (.083333 * window.innerWidth).toString() + 'px'      
	document.getElementById("Cat7").style.top = (1.0625 * (.083333 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat8").style.left = (0.140625 * window.innerWidth).toString() + 'px'       
	document.getElementById("Cat8").style.top = (1.925925 * (0.140625 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat9").style.left = (.1927083 * window.innerWidth).toString() + 'px'     
	document.getElementById("Cat9").style.top = (1.4324 * (.1927083 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat10").style.left = (.369791 * window.innerWidth).toString() + 'px'    
	document.getElementById("Cat10").style.top = (0.69014 * (.369791 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("Cat11").style.left = (0.109375 * window.innerWidth).toString() + 'px'   
	document.getElementById("Cat11").style.top = (2.857142 * (0.109375 * window.innerWidth)).toString() + 'px'
	//house
	document.getElementById("catPartyHouse").style.left = (-1*(.0026 * window.innerWidth)).toString() + 'px'
	document.getElementById("catPartyHouse").style.top = (20 * (.0026 * window.innerWidth)).toString() + 'px'
	//The question box
	document.getElementById("questBox").style.right = (.0052 * window.innerWidth).toString() + 'px'
	document.getElementById("questBox").style.top = (15 * (.0052 * window.innerWidth)).toString() + 'px'
	//check box
	document.getElementById("checkBox").style.height = (.02604 * window.innerWidth).toString() + 'px' 
	document.getElementById("checkBox").style.left = (.364583 * window.innerWidth).toString() + 'px'
	document.getElementById("checkBox").style.top = (.2857 * (.364583 * window.innerWidth)).toString() + 'px'
	//thumbs up and down
	document.getElementById("thumbsUp").style.left = (.364583 * window.innerWidth).toString() + 'px'
	document.getElementById("thumbsUp").style.top = (.242857 * (.364583 * window.innerWidth)).toString() + 'px'
	
	document.getElementById("thumbsDown").style.left = (.364583 * window.innerWidth).toString() + 'px'
	document.getElementById("thumbsDown").style.top = (.285714 * (.364583 * window.innerWidth)).toString() + 'px'
	//incorrect/correct text
	document.getElementById("correct").style.left = (.234375 * window.innerWidth).toString() + 'px'
	document.getElementById("correct").style.top = (.222222222 * (.234375 * window.innerWidth)).toString() + 'px'
	document.getElementById("correct").style.fontSize = ((window.innerWidth * 35) / 1920).toString() + "pt"
	
	document.getElementById("incorrect").style.left = (.234375 * window.innerWidth).toString() + 'px'
	document.getElementById("incorrect").style.top = (.13333333 * (.234375 * window.innerWidth)).toString() + 'px'
	document.getElementById("incorrect").style.fontSize = ((window.innerWidth * 35) / 1920).toString() + "pt"
	//question text
	document.getElementById("question").style.right = (.083333 * window.innerWidth).toString() + 'px'
	document.getElementById("question").style.top = (0.3125 * (.083333 * window.innerWidth)).toString() + 'px'
	document.getElementById("question").style.fontSize = ((window.innerWidth * 35) / 1920).toString() + "pt"
	//score
	document.getElementById("score").style.fontSize = ((window.innerWidth * 30) / 1920).toString() + "pt"
	//answers
	document.getElementById("ans1").style.right = (.13020833 * window.innerWidth).toString() + 'px'
	document.getElementById("ans1").style.top = (1.6 * (.13020833 * window.innerWidth)).toString() + 'px'
	document.getElementById("ans1").style.fontSize = ((window.innerWidth * 60) / 1920).toString() + "pt"
	
	document.getElementById("ans2").style.right = (0.328125 * window.innerWidth).toString() + 'px'
	document.getElementById("ans2").style.top = (0.634920 * (0.328125 * window.innerWidth)).toString() + 'px'
	document.getElementById("ans2").style.fontSize = ((window.innerWidth * 60) / 1920).toString() + "pt"
	
	document.getElementById("ans3").style.right = (0.234375 * window.innerWidth).toString() + 'px'
	document.getElementById("ans3").style.top = (1.111111111 * (0.234375 * window.innerWidth)).toString() + 'px'
	document.getElementById("ans3").style.fontSize = ((window.innerWidth * 60) / 1920).toString() + "pt"
}
adjustParamInterval = setInterval(adjustParam,1)
newQuestion()

//height  943
//width   1920