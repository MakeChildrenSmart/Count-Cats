//All cat <img> tags from the html file
var allCats = document.getElementsByClassName("Cat")
//answer streaks
var answerStreak = 0
var streakElement = document.getElementById("streak")
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


function showCats (indexArray) {
	//hides all cats
	for (i = 0; i < allCats.length; i++) {
		allCats[i].style.visibility = 'hidden'
	}
	
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
}


function clickedAnswer () {
	if (this.innerHTML == result.length) {
		//adds streak
		answerStreak += 1
		streakElement.innerHTML = answerStreak
		//resets the ghost element and calls the func
		ghostStreak.style.opacity = 1
		ghostStreak.style.fontSize = "35pt"
		ghostStreak.style.left = "720px"
		ghostStreak.style.top = "330px"
		ghostStreak.innerHTML = answerStreak
		intervalLength = 100
		animationInfo = [1,35,720,330]
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
	}
	else {
		//removes streak
		answerStreak = 0
		streakElement.innerHTML = answerStreak
		
		//subtracts score
		score -= 1
		scoreElement.innerHTML = score
		
		//thumbs down
		document.getElementById("thumbsUp").style.visibility = 'hidden'
		document.getElementById("thumbsDown").style.visibility = 'visible'
		
		//text
		document.getElementById("incorrect").style.visibility = 'visible'
		document.getElementById("correct").style.visibility = 'hidden'
	}
	//makes new question
	newQuestion()
	
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



function newQuestion () {
	result = chooseCats()
	setAnswerValues(result.length)
	setAnswerEvents()
	showCats(result)
}

newQuestion()