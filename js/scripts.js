
/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////GLOBAL!//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



$(document).ready(function(){
	////////////////////////////////////////////////////
	//////////////////MAIN VARIABLES////////////////////
	////////////////////////////////////////////////////

	// fresh ordered deck of cards
	const freshDeck = createDeck();
	// we will kep all players/dealers cards in these variables respecively
	var playersHand = [];
	var dealersHand = [];
	var theDeck = freshDeck.slice();

	////////////////////////////////////////////////////
	//////////////////EVENT HANDLERS////////////////////
	////////////////////////////////////////////////////

	$('.deal-button').click(function(){
		// deal stuff happens here
		// this funstion shuffles the deck
		reset();
		shuffleDeck();
		// now we must deal the cards to the player, dealer, player, dealer
		playersHand.push(theDeck.shift()); //Remove top card and put in players hand
		dealersHand.push(theDeck.shift()); //Remove top card and put in dealers hand
		playersHand.push(theDeck.shift()); //Remove top card and put in players hand
		dealersHand.push(theDeck.shift()); //Remove top card and put in dealers hand

		// Place image of correct card in correct spot
		placeCard('player',1,playersHand[0]);
		placeCard('player',2,playersHand[1]);

		placeCard('dealer',1,dealersHand[0]);
		placeCard('dealer',2,dealersHand[1]);

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
	});

	$('.hit-button').click(function(){
		// Hit functionality
		if ((playersHand.length <= 6) && (calculateTotal(playersHand,'player') < 21)){
			playersHand.push(theDeck.shift());
			var lastCardIndex = playersHand.length - 1;
			var slotForNewCard = playersHand.length;
			placeCard('player',slotForNewCard,playersHand[lastCardIndex]);
			calculateTotal(playersHand,'player');
		}

	});

	$('.stand-button').click(function(){
		// Stand on click
		var dealerTotal = calculateTotal(dealersHand,'dealer');
		while((dealerTotal < 17) && (dealersHand.length < 6)){
			dealersHand.push(theDeck.shift());
			var lastCardIndex = dealersHand.length - 1;
			var slotForNewCard = dealersHand.length;
			placeCard('dealer',slotForNewCard,dealersHand[lastCardIndex]);
			dealerTotal = calculateTotal(dealersHand,'dealer');
		}
		checkWin();
	});

	////////////////////////////////////////////////////
	////////////////UTILITY FUNCTIONS///////////////////
	////////////////////////////////////////////////////

	function createDeck(){
		var newDeck = [];
		// two loops for suits, one for card value, one for suits
		var suits = ['h','s','d','c'];
		// outter loop iterates through the suits(letter)
		for (let s = 0; s < suits.length; s++){
			for (let c = 1; c <= 13; c++){
				// push suit + value onto array newDeck
				newDeck.push(c + suits[s])
			}
		}
		return newDeck
	}

	function shuffleDeck(){
		for (let i = 0; i < 50000; i++){
			var randIndex1 = Math.floor(Math.random() * 52);
			var randIndex2 = Math.floor(Math.random() * 52);
			var temp = theDeck[randIndex1];
			theDeck[randIndex1] = theDeck[randIndex2];
			theDeck[randIndex2] = temp;
		}
	}

	function placeCard(who,where,what){
		var slotForCard = `.${who}-cards .card-${where} .front`;
		var imageTag = `<img src="cards/${what}.png">`;
		var slotForBackOfCard = `.${who}-cards .card-${where} .back`;
		var backTag = `<img src="cards/deck.png">`;
		var containerToFlip = `.${who}-cards .card-${where}`;
		$(slotForCard).html(imageTag);
		$(slotForBackOfCard).html(backTag);
		$(containerToFlip).addClass('flip');
	}

	function calculateTotal(hand,who){
		var totalHandValue = 0;
		var thisCardValue = 0;
		var totalAces = 0;
		for (let i = 0; i < hand.length; i++){
			thisCardValue = Number(hand[i].slice(0,-1));
			if (thisCardValue > 10){
				thisCardValue = 10;
			}else if (thisCardValue == 1){
				totalAces++;
				thisCardValue = 11;
			}
			totalHandValue += thisCardValue;
		}
		for (let i = 0; i < totalAces; i++){
			if (totalHandValue > 21){
				totalHandValue -= 10;
			}
		}
		var totalToUpdate = '.' + who + '-total-number';
		$(totalToUpdate).text(totalHandValue);
		return totalHandValue;
	}

	function checkWin(){
		var playerTotal = calculateTotal(playersHand, 'player');
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		var winner = "";
		if (playerTotal > 21){
			winner = "Player has BUSTED... Dealer WINS!"
		}else if (dealerTotal > 21){
			winner = "Dealer has BUSTED... Player WINS!"
		}else{
			if (playerTotal > dealerTotal){
				winner = "You beat the Dealer!"
			}else if (playerTotal < dealerTotal){
				winner = "Dealer WINS!"
			}else{
				winner = "PUSH!"
			}
		}
		$('.message').html(winner);
	}

	function reset(){
		// in order to reset the game we need
		// 1. reset the deck.
		theDeck = freshDeck.slice();
		// shuffleDeck();
		// 2. reset the dealer and player handss
		playersHand = [];
		dealersHand = [];
		// 3.reset the cards in the DOM
		$('.front').html('');
		$('.back').html('');
		$('.cards').removeClass('flip');
		// 4.reset the totals for both players
		// $('.dealer-total-number').html('0');
		// $('.player-total-number').html('0');
		$('.message').html('');
	}

});


























































































































































































































































//...Welcome to HELL