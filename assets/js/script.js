$(document).ready(function () {

  var cardsInHand = [];
  var liveCount = 0;
  var currentCount = 0;

  function getCountValue(cardValue) {
    // Define a function to get the value of a card based on its rank
    if (cardValue >= 2 && cardValue <= 6) {
      return 1;
    } else if (cardValue === 10 || cardValue >= 11) {
      return -1;
    } else {
      return 0;
    }
  }

  function getLiveCount(cardsInHand) {
    // Calculate the current live count based on the cards in hand
    var liveCount = 0;
    for (var i = 0; i < cardsInHand.length; i++) {
      liveCount += getCountValue(cardsInHand[i]);
    }
    return liveCount;
  }

  function updateCount(cardValue) {
    // Update the current count based on the card value
    currentCount += getCountValue(cardValue);
    // Update the count display on the page
    $("#count-display").text(currentCount);
    console.log(currentCount)
  }

  $("#reset-count-btn").on("click", function () {
    // If the user clicks the "Reset Count" button, reset the count and clear the hand
    currentCount = 0;
    liveCount = 0;
    cardsInHand = [];
    $("#count-display").text(currentCount);
    $("#cards-in-hand").empty();
  });

  $("#submit-cards-btn").on("click", function () {
    var cards = [];
    // Loop through all the text inputs and extract the card values.
    for (let i = 0; i < 6; i++) {
      let cardInput = $("#card" + (i + 1));
      let cardValue = parseInt(cardInput.val());

      if (!isNaN(cardValue)) {
        // If the input is a valid number, add it to the list of cards and
        // update the count based on the card's value.
        cards.push(cardValue);
        cardsInHand = cards;
        updateCount(cardValue);
      }
    }

    // Update the live count based on the cards in hand.
    liveCount = getLiveCount(cardsInHand);

    // Update the cards in hand with the new cards.
    cardsInHand = cards;

    // Determine the best move based on the current count and cards in hand.
    var basicDecision = getBestMove(currentCount, cardsInHand);

    // Update the best move display on the page.
    $("#best-move").text(basicDecision);
});


  function getBestMove(count, cardsInHand) {
    // Define the basic strategy decision matrix for hard totals (excluding pairs and soft hands)
    var basicStrategy = [["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"], // hard 8 or less
    ["H", "D", "D", "D", "D", "H", "H", "H", "H", "H"], // hard 9
    ["D", "D", "D", "D", "D", "D", "D", "D", "H", "H"], // hard 10
    ["D", "D", "D", "D", "D", "D", "D", "D", "D", "H"], // hard 11
    ["H", "H", "S", "S", "S", "H", "H", "H", "H", "H"], // hard 12
    ["S", "H", "S", "S", "S", "H", "H", "H", "H", "H"], // hard 13-16
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"], // hard 17 or more
    ];
    // Define the live count adjustment matrix for hard totals
    var liveCountAdjustment = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // hard 8 or less
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1], // hard 9
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], // hard 10
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], // hard 11
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], // hard 12
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // hard 13-16
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // hard 17 or more
    ];

    // Calculate the player's total based on the cards in hand
    var playerTotal = cardsInHand.reduce(function (sum, cardValue) {
      return sum + getCountValue(cardValue);
    }, 0);
    var upCard = parseInt($("#up-card").val());

    if (!Array.isArray(cardsInHand)) {
      return "Error: Invalid Hand";
    }

    // If the player has a pair, use the basic strategy matrix for pairs
    var basicDecision;
    if (playerTotal >= 8 && playerTotal <= 16 && upCard >= 2 && upCard <= 11) {
      basicDecision = basicStrategy[playerTotal - 8][upCard - 2];
    } else {
      basicDecision = "Error: Invalid Hand";
    }
    

    // Adjust the basic strategy decision based on the live count
    var liveCountAdjustmentIndex = playerTotal - 8;
    if (count < 0) {
      liveCountAdjustmentIndex += 4; // use the adjustment matrix for counts -1 to -4
    } else if (count > 0) {
      liveCountAdjustmentIndex += 3; // use the adjustment matrix for counts +1 to +3
    }
    var liveCountAdjustmentRow = liveCountAdjustment[liveCountAdjustmentIndex];
    for (var i = 0; i < liveCountAdjustmentRow.length; i++) {
      if (liveCountAdjustmentRow[i] !== 0) {
        // If the live count adjustment is non-zero, update the basic strategy decision
        if (liveCountAdjustmentRow[i] > 0) {
          basicDecision = "D"; // double down
        } else if (liveCountAdjustmentRow[i] < 0) {
          basicDecision = "H"; // hit
        }
      }
    }

    // Return the best move based on the basic strategy decision
    if (basicDecision === "H") {
      return "Hit";
    } else if (basicDecision === "S") {
      return "Stand";
    } else if (basicDecision === "D") {
      return "Double Down";
    } else if (basicDecision === "P") {
      return "Split";
    } else {
      return "Error: Invalid Basic Strategy Decision";
    }
  }

});