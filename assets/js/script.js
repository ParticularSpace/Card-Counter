$(document).ready(function () {

  function getLiveCount(cardsInHand) {
    // Calculate the current live count based on the cards in hand
    var liveCount = 0;
    for (var i = 0; i < cardsInHand.length; i++) {
      liveCount += getCountValue(cardsInHand[i]);
    }
    return liveCount;
  }

  var cardsInHand = [];

  // Define a function to update the count based on a given card value
  function updateCount(cardValue) {
    // Update the current count based on the card value
    // You can use a switch statement or if/else statements to handle different card values
    currentCount += cardValue;
    // Update the count display on the page
    $("#count-display").text(currentCount);
    console.log(currentCount)
  }

  // Define a function to add a card to the hand
  function addCard(card) {
    // Add the card to the cardsInHand array
    cardsInHand.push(card);
    // Display the cards in hand on the page
    // You can use a loop to iterate through the cardsInHand array and create HTML elements for each card
    $("#cards-in-hand").empty();
    for (var i = 0; i < cardsInHand.length; i++) {
      var cardHtml = "<div class='card'>" + cardsInHand[i] + "</div>";
      $("#cards-in-hand").append(cardHtml);
    }
    // Update the count based on the added card
    updateCount(cardValue);
    console.log(cardsInHand)
    // Call the function to offer the best next move
    offerBestMove();
  }

  // Define a function to remove a card from the hand
  function removeCard(cardIndex) {
    // Remove the card at the specified index from the cardsInHand array
    var removedCard = cardsInHand.splice(cardIndex, 1)[0];
    // Display the updated cards in hand on the page
    // You can use the same loop as in the addCard function to update the HTML elements
    $("#cards-in-hand").empty();
    for (var i = 0; i < cardsInHand.length; i++) {
      var cardHtml = "<div class='card'>" + cardsInHand[i] + "</div>";
      $("#cards-in-hand").append(cardHtml);
    }
    // Update the count based on the removed card
    updateCount(-cardValue);
    console.log(cardsInHand)
    // Call the function to offer the best next move
    offerBestMove();
  }



  // Attach event listeners to the input and button elements
  $("#card-input").on("keyup", function (event) {
    if (event.keyCode === 13) {
      // If the user presses the Enter key, add the card to the hand
      var cardValue = parseInt($(this).val());
      addCard(cardValue);
      $(this).val("");
    }
    console.log(event.keyCode, cardValue);
  });

  $("#add-card-btn").on("click", function () {
    // If the user clicks the "Add Card" button, add the card to the hand
    var cardValue = parseInt($("#card-input").val());
    addCard(cardValue);
    $("#card-input").val("");
  });

  count = 0;

  $("#reset-count-btn").on("click", function () {
    // If the user clicks the "Reset Count" button, reset the count and clear the hand
   
    cardsInHand = [];
    $("#count-display").text(currentCount);
    $("#cards-in-hand").empty();
    offerBestMove();
    });

    $("#cards-in-hand").on("click", ".card", function () {
      // If the user clicks on a card in the hand, remove it from the hand
      var cardIndex = $(this).index();
      var cardValue = cardsInHand[cardIndex];
      removeCard(cardIndex);
      });      

  $("#submit-cards-btn").on("click", function () {
      // Define a function to offer the best next move

    // If the user clicks the "Submit Cards" button, we need to extract the card values
    // from the text inputs and add or subtract the corresponding count value.
    var cards = [];
    var countChange = 0;
    // Loop through all the text inputs and extract the card values.
    for (let i = 0; i < 6; i++) {
      let cardInput = $("#card" + (i + 1));
      let cardValue = parseInt(cardInput.val());

      if (!isNaN(cardValue)) {
        // If the input is a valid number, add it to the list of cards and
        // update the count change based on the card's value.
        cards.push(cardValue);
        countChange += getCountValue(cardValue);
      } 
      
      function offerBestMove() {
    // Determine the best move based on the current count and cards in hand
    // You can use if/else statements to handle different scenarios
    var bestMove = "Stand"; // This is just a placeholder, you should replace it with the actual best move
    // Display the best move on the page
    $("#best-move").text(bestMove);
    // Determine the basic strategy decision based on the current count and cards in hand
    var basicDecision = getBestNextMove(currentCount, upCard, cardsInHand);
    // Display the basic strategy decision on the page
    $("#basic-decision").text(basicDecision);
  }
    }

    // Update the count and count display.
    count += countChange;
    $("#count-display").text(count);

    // Clear the input fields.
    $(".card-input").val("");

    // Update the next move display.
    $("#next-move-display").text(count);
  

  function getCountValue(cardValue) {
    // Returns the count value for a given card value.
    // Face cards and 10s have a value of -1, aces have a value of -1 or -11
    // depending on the current count, and all other cards have a value of +1.
    if (cardValue >= 2 && cardValue <= 6) {
      return 1;
    } else if (cardValue >= 10) {
      return -1;
    } else if (cardValue === 1) {
      return (count >= 0) ? -1 : -11;
    } else {
      return 0;
    }
    console.log(cardValue)
  }

  function getBestMove(count, upCard, cardsInHand) {
    // Define the basic strategy decision matrix for hard totals (excluding pairs and soft hands)
    var basicStrategy = [    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"], // hard 8 or less
      ["H", "D", "D", "D", "D", "H", "H", "H", "H", "H"], // hard 9
      ["D", "D", "D", "D", "D", "D", "D", "D", "H", "H"], // hard 10
      ["D", "D", "D", "D", "D", "D", "D", "D", "D", "H"], // hard 11
      ["H", "H", "S", "S", "S", "H", "H", "H", "H", "H"], // hard 12
      ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"], // hard 13-16
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"], // hard 17 or more
    ];
  
    // Define the live count adjustment matrix for hard totals
    var liveCountAdjustment = [    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // hard 8 or less
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // hard 9
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // hard 10
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // hard 11
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // hard 12
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // hard 13-16
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // hard 17 or more
    ];
  
       // Determine the correct basic strategy decision based on the player's hand and the dealer's up card
       var playerTotal = cardsInHand.reduce(function (sum, cardValue) {
        return sum + getCountValue(cardValue);
      }, 0);
      var basicDecision = basicStrategy[playerTotal - 8][upCard - 2];
  
      // Adjust the basic strategy decision based on the live count
      var liveCount = getLiveCount(cardsInHand);
      var liveCountAdjustmentIndex = playerTotal - 8;
      if (liveCount < 0) {
        liveCountAdjustmentIndex += 4; // use the adjustment matrix for counts -1 to -4
      } else if (liveCount > 0) {
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
      console.log(playerTotal, upCard,liveCount,basicDecision);
      }
    });
});




