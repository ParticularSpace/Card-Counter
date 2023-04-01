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

const cardWorth = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 10,
  "Q": 10,
  "K": 10,
  "A": 11
};


// An array to hold all the cards the user has selected for the game so far
var cards = [];

$(document).ready(function () {

  var numDecks = $("#numDecks").val();
  var cardsInHand = [];
  var dealerUpCard = [];
  var dealerDownCard = [];
  var trueCount = 0;
  let playerHandTotal = 0;
  let dealerHandTotal = 0;

  function calculateHandTotal(hand) {
    var total = 0;
    var aces = 0;
  
    for (var i = 0; i < hand.length; i++) {
      var card = hand[i];
      var worth = cardWorth[card];
      
      if (card === "A") {
        aces += 1;
        total += worth;
      } else {
        total += worth;
      }
  
      while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
      }
    }
  
    return total;
  }
  
  


  function getTrueCount(cards, numDecks) {
    var liveCount = 0;
    for (var i = 0; i < cards.length; i++) {

      liveCount += cardValue[cards[i]];

    }
    var trueCount = liveCount / numDecks;
    return trueCount;
  }

  $("#submit-cards-btn").on("click", function () {
    var $dealerUpCard = $("#upCard").val();
    var $dealerDownCard = $("#downCard").val();

    var card1 = $("#cardOne").val();
    var card2 = $("#cardTwo").val();

    cardsInHand.push(card1);
    cardsInHand.push(card2);
    playerHandTotal = calculateHandTotal(cardsInHand);
    console.log("Player hand total:", playerHandTotal);

    dealerUpCard = [$dealerUpCard];

    // Update the cards array
    cards = cards.concat(cardsInHand).concat(dealerUpCard);

    //console log the cards
    console.log('Your hand is: ' + card1 + ' , ' + card2 + ' Dealers hand is ' + $dealerUpCard);

    dealerUpCard.push($dealerUpCard);
    dealerHandTotal = calculateHandTotal(dealerUpCard);
    console.log("Dealer hand total:", dealerHandTotal);


    //will be unknown for now
    dealerDownCard.push($dealerDownCard);

    // Update the history display
    updateHistoryDisplay();

    // Update the live count
    trueCount = getTrueCount(cards, numDecks);
    $("#countDisplay").text(trueCount);
  });




  // When the user clicks the "Hit" button, add the card to the cards in hand and update the count
  $("#submit-hit-card-btn").on("click", function () {


    var hitCard = $("#hitCard").val();

    if (hitCard) {
      cards.push(hitCard);
      cardsInHand.push(hitCard);
      playerHandTotal = calculateHandTotal(cardsInHand);
      console.log("Player hand total:", playerHandTotal);



      //update live count on page
      trueCount = getTrueCount(cards, numDecks);
      $("#countDisplay").text(trueCount);

      updateHistoryDisplay();

    } else {
      alert("Please select a card before submitting.");
    }
  });

  // When the user clicks the "Hidden Card Submit" button, add the card to the cards in hand and update the count
  $("#downCardSubmit").on("click", function () {

    var hiddenCard = $("#downCard").val();

    if (hiddenCard) {

      cards.push(hiddenCard);
      dealerDownCard.push(hiddenCard);
      dealerUpCard.push(hiddenCard);
      dealerHandTotal = calculateHandTotal(dealerUpCard);
      console.log("Dealer hand total:", dealerHandTotal);


      trueCount = getTrueCount(cards, numDecks);
      $("#countDisplay").text(trueCount);

      updateHistoryDisplay();

    } else {
      alert("Please select a card before submitting.");
    }
  });


  // When the user clicks the "Reset" button, clear the cards in hand and the count
  $("#resetBtn").on("click", function () {
    cards = [];
    console.log(cards, "cards line 170")
    cardsInHand = [];
    dealerUpCard = [];
    dealerDownCard = [];
    trueCount = 0;
    $("#countDisplay").text(trueCount);
    updateHistoryDisplay();
  });

  function updateHistoryDisplay() {

    $("#history").empty();

    var historyList = $("<ul>");

    // Update the history of cards after submitting target hands class to insert a list of past cards
    for (var i = 0; i < cards.length; i++) {
      var listItem = $("<li>").text(cards[i]);
      historyList.append(listItem);
    }

    $("#history").append(historyList);
  }


});