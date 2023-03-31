//current issues submitting hit card and down card have issues in logic and not updating the count
//previous hands are not being shown when you click hit card or down card


const cardValue = {
  "2": 1,
  "3": 1,
  "4": 1,
  "5": 1,
  "6": 1,
  "7": 0,
  "8": 0,
  "9": 0,
  "10": -1,
  "J": -1,
  "Q": -1,
  "K": -1,
  "A": -1
};

// An array to hold all the cards the user has selected for the game so far
var cards = [];

$(document).ready(function () {

  var numDecks = $("#numDecks").val();
  var cardsInHand = [];
  var dealerUpCard = [];
  var dealerDownCard = [];
  var trueCount = 0;
  var historyList = $("<ul>");


function getTrueCount(cards,numDecks) {
  var liveCount = 0;
  for (var i = 0; i < cards.length; i++) {
    console.log(cards[i], "cards in hand line 101");
    liveCount += cardValue[cards[i]]; // Use cardValue object to get the count value
  }
  console.log(numDecks, "numDecks line 33")
  var trueCount = liveCount / numDecks;
  return trueCount;
}

  $("#submit-cards-btn").on("click", function () {
    // If the user clicks the "Submit Cards" button, update the cards in hand and the count;
    cards = []; // update the cards variable 
    cardsInHand = []; // update the cardsInHand variable 

    // Extract the cards the user selected from the form

    var $dealerUpCard = $("#upCard").val();
    var $dealerDownCard = $("#downCard").val();
    var card1 = $("#cardOne").val();
    var card2 = $("#cardTwo").val();

    //console log the cards
    console.log('Your hand is: ' + card1 + ' , ' + card2 + ' Dealers hand is ' + $dealerUpCard + ' , ' + $dealerDownCard);

    // Add the cards to the cardsInHand array and the dealers to the dealers array
    cardsInHand.push(card1);
    cardsInHand.push(card2);

    //console log the cards in hand
    console.log(cardsInHand);

    //Dealer known card
    dealerUpCard.push($dealerUpCard);

    //will be unknown for now
    dealerDownCard.push($dealerDownCard);

    // Update the history of cards after submitting target hands class to insert a list of past cards
    
    //push the cards to the cards array
    cards.push(card1);
    cards.push(card2);
    cards.push(dealerUpCard);
    

    //loop through the cards array and append the cards to the history list
    for (var i = 0; i < cards.length; i++) {
      var card = $("<li>").text(cards[i]);
      historyList.append(card);
    }

    //append the history list to the history div
    $("#history").append(historyList);

    // Update the live count based on the cards in hand.
    trueCount = getTrueCount(cardsInHand, numDecks);
    console.log(cardsInHand, numDecks);

   // Calculate the current true count based on the cards in hand

    //console log the true count
    console.log(trueCount);
    //update live count on page
    $("#countDisplay").text(trueCount);
  });

  // When the user clicks the "Hit" button, add the card to the cards in hand and update the count
  $("#submit-hit-card-btn").on("click", function () {
    //clear history list
    $("#history").empty();

    // Extract the card the user selected from the form
    var hitCard = $("#hitCard").val();
    console.log(hitCard, "hit card line 97")
    // If the user selected a card, add it to the cards in hand and update the count
    if (hitCard) {
      cards.push(hitCard);
      trueCount = getTrueCount(cards, numDecks);

      console.log("True count:", trueCount);

      //update live count on page
      $("#countDisplay").text(trueCount);

   //loop through the cards array and append the cards to the history list
    for (var i = 0; i < cards.length; i++) {
      var card = $("<li>").text(cards[i]);
      historyList.append(card);
    }

    } else {
      alert("Please select a card before submitting.");
    }
  });

  // When the user clicks the "Hidden Card Submit" button, add the card to the cards in hand and update the count
  $("#downCardSubmit").on("click", function () {
    //clear history list
    $("#history").empty();
    var hiddenCard = $("#downCard").val();
    if (hiddenCard) {
      cards.push(hiddenCard);
      trueCount = getTrueCount(cards, numDecks);
      console.log("Hidden card:", hiddenCard);
      console.log("True count:", trueCount);
      $("#countDisplay").text(trueCount);

    //loop through the cards array and append the cards to the history list
    for (var i = 0; i < cards.length; i++) {
      var card = $("<li>").text(cards[i]);
      historyList.append(card);
    }
    
    } else {
      alert("Please select a card before submitting.");
    }
  });
  

  // When the user clicks the "Reset" button, clear the cards in hand and the count
  $("#resetBtn").on("click", function () {
    cards = [];
    cardsInHand = [];
    dealerUpCard = [];
    dealerDownCard = [];
    trueCount = 0;
    $("#countDisplay").text(trueCount);
    $("#history").empty();
  });


});