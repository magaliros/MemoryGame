/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond",
			   "fa fa-paper-plane-o", "fa fa-paper-plane-o",
			   "fa fa-anchor",  "fa fa-anchor",
			   "fa fa-bolt", "fa fa-bolt",
			   "fa fa-cube",  "fa fa-cube",
			   "fa fa-bomb", "fa fa-bomb",
			   "fa fa-leaf",  "fa fa-leaf",
			   "fa fa-bicycle", "fa fa-bicycle"];

const deck = document.querySelector(".deck");
const container = document.querySelector("div.container");

let openedCards = [];
let matchedCards = [];
let initialClick = false;

/*
* Suffle cards
*/
shuffle(icons);

/*
* Initialize the game
*
* Some of the functions are obtained from the help from the Study Jam
* https://www.youtube.com/watch?v=G8J13lmApkQ
*/
function init() {
	for(let i = 0; i < icons.length; i++) {
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class="${icons[i]}"></i>`;
		deck.appendChild(card);

		//Add click event to each card
		click(card)
	}

}

/*
* Click in a card
*/
function click(card) {
	//Card Click Event
	card.addEventListener("click", function() {
		const currentCard = this;
		const previousCard = openedCards[0];
		
		// There is already an opened card
		if(openedCards.length === 1) {

			card.classList.add("open", "show", "disable")
			openedCards.push(this);

			//Compare the 2 opened cards
			compare(currentCard, previousCard)

		} else {
			card.classList.add("open", "show", "disable")
			openedCards.push(this);
		}
	})
}


/*
* Compare the 2 cards
*/
function compare(currentCard, previousCard) {
	if(currentCard.innerHTML === previousCard.innerHTML) {
		currentCard.classList.add("match")
		previousCard.classList.add("match")

		matchedCards.push(currentCard, previousCard);

		//Check if the game is over
		isOver();
		//Reset the openedCards array
		openedCards = [];

	} else {
		//Reset the openedCards array
		openedCards = [];

		// After wait 500ms then remove the classes open and show
		setTimeout(function() {
			currentCard.classList.remove("open", "show", "disable")
			previousCard.classList.remove("open", "show", "disable")
		}, 500)

	}	
	//Add New Move
	addMove();
}


/*
* Check if the game is over
*/
let totalTime = 0;

function isOver() {
	if(matchedCards.length === icons.length) {
		totalTime = timerContainer.innerHTML;
		displayModal();
		stopTimer();
	}
}

/*
* Display the modal
*/
// Get the modal
const modal = document.getElementById('myModal');
const modalContent = document.querySelector(".modal-content");
function displayModal() {
		modalContent.innerHTML += `<p> Congratulations!!! </p>`;
		modalContent.innerHTML += `<p> You Won!!! </p>`;	
		modalContent.innerHTML += `<p> With ${moves+1}  moves </p>`;
		modalContent.innerHTML += `<p> ${numStar} Stars </p>`; 
		modalContent.innerHTML += `<p> and total time ${totalTime} </p>`; 
		modal.appendChild(modalContent);
		modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


/*
* Start timer
*/
const timerContainer = document.querySelector(".values");
let minute = 0;
let second = 0;
function startTimer() {
    interval = setInterval(function(){
        timerContainer.innerHTML = `${minute}:${second}`;
        second++;
        if(second < 10) {
        	timerContainer.innerHTML = `${minute}:0${second}`;
        }
        if(second == 60){
            minute++;
            second = 0;
        }
    },1000);
}


/*
* Stop timer
*/
function stopTimer() {
	minute = 0;
	second = 0;
	clearInterval(interval);
}

/*
* Add move
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
function addMove() {
	++moves;
	movesContainer.innerHTML = moves;

	//Set the rating
	rating();

	//Set the timer
	 if(moves == 1){
        //second = 0;
        //minute = 0; 
        startTimer();
    }
}

/*
* Rating
*/
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
let numStar = 3;
starsContainer.innerHTML =  star + star + star;

function rating() {
	if(moves < 8) {
		starsContainer.innerHTML =  star + star + star;
		numStar = 3;
	}
	if(moves > 8) {
		starsContainer.innerHTML =  star + star;
		numStar = 2;

	} if(moves > 16) {
		starsContainer.innerHTML =  star;
		numStar = 1;

	} if (moves > 24){
		starsContainer.innerHTML = "";
		numStar = 0;
	}
}

/*
* Restart button
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
	//Delete all cards
	deck.innerHTML = "";
	//Suffle cards
	shuffle(icons);
	// call init to create new cards
	init();
	// Reset the variables
	matchedCards = [];
	moves = 0;
	movesContainer.innerHTML = moves;
	starsContainer.innerHTML =  star + star + star;
	stopTimer();
	timerContainer.innerHTML = `00:00`;
})

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
* Start the game
*/
init();
