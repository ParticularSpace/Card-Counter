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


  var cardsInHand = [];
  var dealerUpCard = [];
  var dealerDownCard = [];
  var trueCount = 0;

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
    var historyList = $("<ul>");
    //push the cards to the cards array
    cards.push(card1);
    cards.push(card2);
    cards.push(dealerUpCard);
    cards.push(dealerDownCard);

    //loop through the cards array and append the cards to the history list
    for (var i = 0; i < cards.length; i++) {
      var card = $("<li>").text(cards[i]);
      historyList.append(card);
    }

    //append the history list to the history div
    $("#history").append(historyList);

    // Update the live count based on the cards in hand.
    trueCount = getTrueCount(cardsInHand);
    console.log(cardsInHand);

    // get the value of the card 
    function getCountValue(cardValue) {
      if (cardValue >= 2 && cardValue <= 6) {
        return 1;
      } else if (cardValue === 10 || cardValue >= 11) {
        return -1;
      } else {
        return 0;
      }
    }

    // Calculate the current true count based on the cards in hand
    function getTrueCount(cards) {
      var trueCount = 0;
      for (var i = 0; i < cards.length; i++) {
        console.log(cards[i], "cards in hand line 101");
        trueCount += getCountValue(cards[i]);
      }
      return trueCount;
    }

    //console log the true count
    console.log(trueCount);

    //update live count on page
    $("#countDisplay").text(trueCount);
  });
  // function adjustMove(move, adjustment) {
  //   // Helper function to adjust the basic strategy move based on the current count
  //   if (adjustment === 0) {
  //     return move;
  //   } else if (adjustment > 0) {
  //     if (move === "H") {
  //       return "D";
  //     } else if (move === "S") {
  //       return "H";
  //     } else {
  //       return move;
  //     }
  //   } else {
  //     if (move === "H") {
  //       return "S";
  //     } else if (move === "D") {
  //       return "H";
  //     } else {
  //       return move;
  //     }
  //   }
  // }

  // function updateCount(cardValue) {
  //   // Update the current count based on the card value
  //   currentCount += getCountValue(cardValue);
  //   trueCount = getTrueCount(cardsInHand);
  //   // Update the count display on the page
  //   $("#count-display").text(currentCount);
  //   console.log(currentCount)
  // }

  // $("#reset-count-btn").on("click", function () {
  //   // If the user clicks the "Reset Count" button, reset the count and clear the hand
  //   currentCount = 0;
  //   trueCount = 0;
  //   cardsInHand = [];
  //   $("#count-display").text(currentCount);
  //   $("#cards-in-hand").empty();
  // });


  // // Determine the best move based on the current count and cards in hand.
  // var basicDecision = getBestMove(trueCount, cardsInHand);

  // // Update the best move display on the page.
  // $("#best-move").text(basicDecision);






  //   function getBestMove(count, cardsInHand, dealUpCard) {
  //     // Define the basic strategy decision matrix for hard totals
  //     var basicStrategy = [["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"], // hard 8 or less
  //     ["H", "D", "D", "D", "D", "H", "H", "H", "H", "H"], // hard 9
  //     ["D", "D", "D", "D", "D", "D", "D", "D", "H", "H"], // hard 10
  //     ["D", "D", "D", "D", "D", "D", "D", "D", "D", "H"], // hard 11
  //     ["H", "H", "S", "S", "S", "H", "H", "H", "H", "H"], // hard 12
  //     ["S", "H", "S", "S", "S", "H", "H", "H", "H", "H"], // hard 13-16
  //     ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"], // hard 17 or more
  //     ];

  //     // Soft Hands Basic Strategy Decision Matrix
  //     const softBasicStrategy = [["H", "H", "H", "D", "D", "H", "H", "H", "H", "H"], // soft 13-14
  //     ["H", "H", "H", "D", "D", "H", "H", "H", "H", "H"], // soft 15-16
  //     ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"], // soft 17
  //     ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"], // soft 18
  //     ["H", "D", "D", "D", "D", "H", "H", "H", "H", "H"], // soft 19
  //     ["S", "S", "S", "S", "D", "S", "S", "H", "H", "H"], // soft 20
  //     ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"]  // soft 21
  //     ];

  //     // Pairs Basic Strategy Decision Matrix
  //     const pairs = [["P", "P", "P", "P", "P", "P", "H", "H", "H", "H"], // pairs of Aces
  //     ["P", "P", "P", "P", "P", "P", "H", "H", "H", "H"], // pairs of 2s
  //     ["H", "H", "H", "P", "P", "H", "H", "H", "H", "H"], // pairs of 3s
  //     ["H", "H", "H", "P", "P", "H", "H", "H", "H", "H"], // pairs of 4s
  //     ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"], // pairs of 5s
  //     ["P", "P", "P", "P", "P", "H", "H", "H", "H", "H"], // pairs of 6s
  //     ["H", "H", "H", "P", "P", "H", "H", "H", "H", "H"], // pairs of 7s
  //     ["H", "H", "H", "P", "P", "H", "H", "H", "H", "H"], // pairs of 8s
  //     ["P", "P", "P", "P", "P", "P", "P", "P", "H", "H"], // pairs of 9s
  //     ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"]  // pairs of 10s
  //     ];

  //     // Define the live count adjustment matrix for hard totals
  //     var countAdjustment = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // hard 8 or less
  //     [0, 1, 1, 1, 1, 1, 1, 1, 1, 1], // hard 9
  //     [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], // hard 10
  //     [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], // hard 11
  //     [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], // hard 12
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // hard 13-16
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // hard 17 or more
  //     ];
  //     // Define the live count adjustment matrix for soft totals
  //     var handType;
  //   if (cardsInHand[0].value === cardsInHand[1].value) {
  //     handType = "pair";
  //   } else if (cardsInHand.some(card => card.value === "A")) {
  //     handType = "soft";
  //   } else {
  //     handType = "hard";
  //   }

  //   // Look up the player's hand and the dealer's up card in the appropriate basic strategy decision matrix
  //   var decisionMatrix;
  //   switch (handType) {
  //     case "soft":
  //       decisionMatrix = softBasicStrategy;
  //       break;
  //     case "hard":
  //       decisionMatrix = basicStrategy;
  //       break;
  //     case "pair":
  //       decisionMatrix = pairs;
  //       break;
  //   }

  //   // Determine the row and column of the matrix to use
  //   var row = getMatrixRow(cardsInHand, handType);
  //   var col = getMatrixCol(dealUpCard);

  //   // Apply the count adjustment
  //   var matrixValue = decisionMatrix[row][col];
  //   var adjustment = countAdjustment[row][col];
  //   if (count > 0) {
  //     matrixValue += adjustment;
  //   } else if (count < 0) {
  //     matrixValue -= adjustment;
  //   }

  //   // Return the recommended move
  //   switch (matrixValue) {
  //     case "H":
  //       return "Hit";
  //     case "S":
  //       return "Stand";
  //     case "D":
  //       return "Double down";
  //     case "P":
  //       return "Split";
  //     case "R":
  //       return "Surrender";
  //   }
  // }
  // console.log(cardsInHand);
  // function getMatrixRow(cardsInHand, dealUpCard) {
  //   // Determine the type of the player's hand (hard, soft, or pair)
  //   var handType;
  //   if (cardsInHand[0].value === cardsInHand[1].value) {
  //     handType = "pair";
  //   } else if (cardsInHand.some(card => card.value === "A")) {
  //     handType = "soft";
  //   } else {
  //     handType = "hard";
  //   }

  //   function getMatrixCol(dealUpCard) {
  //     var cardValue = dealUpCard.value;
  //     if (isNaN(cardValue)) {
  //       return cardValue;
  //     } else if (cardValue >= 2 && cardValue <= 10) {
  //       return cardValue - 2;
  //     } else {
  //       switch (cardValue) {
  //         case "J":
  //         case "Q":
  //         case "K":
  //           return 9;
  //         case "A":
  //           return 0;
  //       }
  //     }
  //   }

  //   // Get the appropriate matrix based on the hand type
  //   var matrix;
  //   if (handType === "hard") {
  //     matrix = basicStrategy;
  //   } else if (handType === "soft") {
  //     matrix = softBasicStrategy;
  //   } else {
  //     matrix = pairs;
  //   }

  //   // Get the appropriate row from the matrix based on the dealer's up card
  //   var dealerUpCardValue = parseInt(dealUpCard.value);
  //   if (isNaN(dealerUpCardValue)) {
  //     dealerUpCardValue = 10; // Treat face cards as 10
  //   }
  //   var row = matrix[dealerUpCardValue - 2];

  //   // Adjust the row based on the current count
  //   var countAdjustmentRow = countAdjustment[dealerUpCardValue - 2];
  //   for (var i = 0; i < row.length; i++) {
  //     row[i] = adjustMove(row[i], countAdjustmentRow[i]);
  //   }

  //   return row;
  // }


});