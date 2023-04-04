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
  var oddsOfSuccess = 0;


  

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
    console.log(total)
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

    var card1 = $("#cardOne").val();
    var card2 = $("#cardTwo").val();

    cardsInHand.push(card1);
    cardsInHand.push(card2);

    playerHandTotal = calculateHandTotal(cardsInHand);
    console.log("Player hand total:", playerHandTotal);

    // Update the cards array
    cards = cards.concat(cardsInHand).concat(dealerUpCard);

    //console log the cards
    console.log('Your hand is: ' + card1 + ' , ' + card2 + ' Dealers hand is ' + $dealerUpCard);

    dealerUpCard.push($dealerUpCard);
    
    dealerHandTotal = calculateHandTotal(dealerUpCard);
    console.log("Dealer hand total:", dealerHandTotal);

    // Update the history display
    updateHistoryDisplay();

    // Update the live count
    trueCount = getTrueCount(cards, numDecks);
    $("#countDisplay").text(trueCount);

    const oddsOfSuccess = calculateOddsOfSuccess(cardsInHand, dealerUpCard, trueCount, numDecks);
    const move = getBestMove(cardsInHand, dealerUpCard[0], trueCount, oddsOfSuccess);
    $(".next-move h3").text(move);

    const betSize = calculateBetSize(trueCount, oddsOfSuccess);
    $(".bet-size").text(betSize);
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

      const oddsOfSuccess = calculateOddsOfSuccess(cardsInHand, dealerUpCard[0], trueCount, numDecks);
      const move = getBestMove(cardsInHand, dealerUpCard[0], trueCount, oddsOfSuccess);
      $(".next-move h3").text(move);

    } else {
      alert("Please select a card before submitting.");
    }
  });

// When the user clicks the "Dealer Card Reveal" button, reveal the dealer's card and update the count
$("#downCardSubmit").on("click", function () {

  // Get the hidden card from the dealerDownCard array
  var hiddenCard = dealerDownCard[0];

  // Add the revealed card to the dealerUpCard array
  dealerUpCard.push(hiddenCard);

  // Recalculate the dealer's hand total using the dealerUpCard array
  dealerHandTotal = calculateHandTotal(dealerUpCard);
  console.log("Dealer hand total:", dealerHandTotal);

  // Update the count
  trueCount = getTrueCount(cards, numDecks);
  $("#countDisplay").text(trueCount);

  updateHistoryDisplay();

  // Update the move based on the new information
  const oddsOfSuccess = calculateOddsOfSuccess(cardsInHand, dealerUpCard, trueCount, numDecks);
  const move = getBestMove(cardsInHand, dealerUpCard, trueCount, oddsOfSuccess);
  $(".next-move h3").text(move);

});

$("#resetBtn").on("click", function () {
  if (confirm("Are you sure you want to reset the game?")) {
    cards = [];
    cardsInHand = [];
    dealerUpCard = [];
    dealerDownCard = [];
    trueCount = 0;
    $("#countDisplay").text(trueCount);
    updateHistoryDisplay();
  }
});



  function isPair(hand) {
    return hand.length === 2 && hand[0] === hand[1];
  }

  function isSoft(hand) {
    return hand.includes("A") && hand.some(card => card !== "A" && getCardValue(card) < 10);
  }

  function getCardValue(card) {
    if (card === "A") {
      return 11;
    } else if (["K", "Q", "J"].includes(card)) {
      return 10;
    } else {
      return parseInt(card, 10);
    }
  }
  


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

  function getBestMove(playerHand, dealerUpCard, trueCount) {


    // Implement a function to determine the best move based on perfect blackjack strategy
    const basicStrategyChart = {
      hard: [
        // Use this chart for hard hands (no ace or ace counted as 1)
        // Each row is the player's hand value (4-20)
        // Each column is the dealer's up card (2-A)
        "H H H H H H H H H H",
        "H H H H H H H H H H",
        "H H H H H H H H H H",
        "H H H H H H H H H H",
        "H H H H H H H H H H",
        "H D D D D H H H H H",
        "D D D D D D D D H H",
        "D D D D D D D D D D",
        "H H S S S H H H H H",
        "S S S S S H H H H H",
        "S S S S S H H H H H",
        "S S S S S H H H H H",
        "S S S S S H H H H H",
        "S S S S S H H H H H",
        "S S S S S H H H H H",
        "S S S S S H H H H H",
        "S S S S S H H H H H"
      ],
      soft: [
        // Use this chart for soft hands (ace counted as 11)
        // Each row is the player's hand value (13-20)
        // Each column is the dealer's up card (2-A)
        "H H H D D H H H H H",
        "H H D D D H H H H H",
        "H D D D D H H H H H",
        "D D D D D D H H H H",
        "H H S D D H H H H H",
        "S S S S S H H H H H",
        "S S S S S H H H H H",
        "S S S S S S S S S S"
      ],
      pairs: [
        // Use this chart for pairs
        // Each row is the player's pair value (2-10, A)
        // Each column is the dealer's up card (2-A)
        "P P P P P P H H H H",
        "H P P P P P P H H H",
        "H H P P P P H H H H",
        "H H H P P H H H H H",
        "H H H P P H H H H H",
        "H H H H H H H H H H",
        "P P P P P P P H H H",
        "P P P P P P P P P P",
        "P P P P P P P P P P"
      ]
    };

    function getHandValue(hand) {
      let value = 0;
      let aces = 0;
      for (let card of hand) {
        const cardValue = cardWorth[card];
        value += cardValue;
        if (card === "A") {
          aces++;
        }
      }
      while (aces > 0 && value > 21) {
        value -= 10;
        aces--;
      }
      return value;
    }
    

  let handType;
  let playerHandIndex;

  if (isPair(playerHand)) {
    handType = 'pairs';
    playerHandIndex = playerHand[0].value === 11 ? 9 : playerHand[0].value - 2;
  } else if (isSoft(playerHand)) {
    handType = 'soft';
    playerHandIndex = getHandValue(playerHand) - 13;
  } else {
    handType = 'hard';
    playerHandIndex = getHandValue(playerHand) - 4;
  }

    let dealerUpCardIndex = dealerUpCardValue === 11 ? 9 : dealerUpCardValue - 2;

    const bestMove = basicStrategyChart[handType][playerHandIndex][dealerUpCardIndex];

    console.log(bestMove);

    if (trueCount >= 4 && bestMove === "H") {
      return "Double";
    } else if (trueCount <= -4 && bestMove === "D") {
      return "Hit";
    } else {
      if (oddsOfSuccess >= 0.6) {
        return bestMove;
      } else {
        return "Hit";
      }
    }
  }


const dealerUpCardValue = cardWorth[dealerUpCard];

console.log('This is the dealer up card value'+ dealerUpCardValue);


  function calculateOddsOfSuccess(playerHand, dealerUpCard, trueCount, numDecks) {
    const dealerProbabilities = Array(23).fill(0);
    const playerProbabilities = Array(23).fill(0);

    // A function to calculate the dealer's bust probability based on their up card and the true count
    function dealerBustProbability(dealerUpCard, trueCount) {
      const baseProbabilities = {
        2: 0.35,
        3: 0.37,
        4: 0.42,
        5: 0.43,
        6: 0.42,
        7: 0.28,
        8: 0.24,
        9: 0.23,
        10: 0.21,
        "A": 0.11
      };

      const upCardValue = cardWorth[dealerUpCard];
      return baseProbabilities[upCardValue] + 0.03 * trueCount;
    }

    const dealerBustProb = dealerBustProbability(dealerUpCard, trueCount);

    console.log('This is the dealer bust probability'+ dealerBustProb);



    // Update the dealer's probabilities based on their up card and true count
    for (let i = 17; i <= 21; i++) {
      dealerProbabilities[i] = (1 - dealerBustProb) / 5;
    }
    dealerProbabilities[22] = dealerBustProb;

    const playerHandTotal = calculateHandTotal(playerHand);
    const remainingCards = numDecks * 52;
    const numberOfHighCards = Math.round((remainingCards / 13) * (trueCount / (numDecks || 1)));

    for (let i = playerHandTotal + 1; i <= 21; i++) {
      const highCardsNeeded = i - playerHandTotal;
      if (highCardsNeeded <= numberOfHighCards) {
        playerProbabilities[i] = numberOfHighCards / remainingCards;
      }
    }

    oddsOfSuccess = 0;

    for (let playerValue = 17; playerValue <= 21; playerValue++) {
      for (let dealerValue = 17; dealerValue <= 22; dealerValue++) {
        if (playerValue > dealerValue) {
          oddsOfSuccess += playerProbabilities[playerValue] * dealerProbabilities[dealerValue];
        }
      }
    }
    console.log(oddsOfSuccess);
    return oddsOfSuccess;
  }

  function calculateBetSize(oddsOfSuccess, playerBankroll, minBet, maxBet) {
    // Calculate the expected value (EV) of the bet
    const ev = oddsOfSuccess * 2 - 1;

    console.log(ev);

    // Calculate the fraction of the bankroll to bet using the Kelly Criterion
    const kellyFraction = ev / (2 * oddsOfSuccess - 1);

    // Calculate the optimal bet size based on the Kelly Criterion
    const optimalBetSize = kellyFraction * playerBankroll;

    console.log(optimalBetSize)

    // Ensure the bet size is within the minBet and maxBet limits
    const betSize = Math.max(minBet, Math.min(maxBet, optimalBetSize));

    console.log(betSize);

    return Math.round(betSize);
  }

});