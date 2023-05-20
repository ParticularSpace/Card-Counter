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
$(document).ready(function () {

  // An array to hold all the cards the user has selected for the game so far
  var cards = [];



  var numDecks = $("#numDecks").val();
  var cardsInHand = [];
  var dealersHand = [];
  var dealerUpCard = [];
  var trueCount = 0;
  let playerHandTotal = 0;
  let dealerHandTotal = 0;
  let oddsOfSuccess = 0;
  let betSize = 0;


  //Get the total card value of your hand

  function calculateHandTotal(cardsInHand) {
    var total = 0;
    var aces = 0;

    for (var i = 0; i < cardsInHand.length; i++) {
      var card = cardsInHand[i];
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
    console.log('This is your total: ' + total)
    return total;
  }

  //calculate the true count based off of all the cards in the game

  function getTrueCount(cards, numDecks) {
    var liveCount = 0;
    for (var i = 0; i < cards.length; i++) {

      liveCount += cardValue[cards[i]];

    }
    var trueCount = liveCount / numDecks;
    return trueCount;
  }

  //get the value of yours or dealers hand
  function getHandValue(cardsInHand) {
    let value = 0;
    let aces = 0;
    for (let card of cardsInHand) {
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

  //First major submit button, needs to update your cards, dealers cards, the whole cards array, then need to update true count, probability of dealer bust, probability of player bust, next best move, bet size, and update history list //

  $("#submit-cards-btn").on("click", function () {

    //grab the up card and your two cards value
    var $dealerUpCard = $("#upCard").val();
    var card1 = $("#cardOne").val();
    var card2 = $("#cardTwo").val();

    //push the two personal selected cards into your cardsInHand array that represents your cards
    cardsInHand.push(card1);
    cardsInHand.push(card2);

    //push the dealers up card into dealerUpCard array
    dealersHand.push($dealerUpCard);

    //call calculateHandTotal to get the total value of the cards in your hand
    playerHandTotal = calculateHandTotal(cardsInHand);

    //call the calculateHandTotal to get the total value of the dealers cards
    dealerHandTotal = calculateHandTotal(dealersHand);

    // Update the cards array
    cards = cards.concat(cardsInHand).concat(dealersHand);

    //console log the cards in your hand and dealers
    console.log('Your hand is: ' + card1 + ' , ' + card2 + ' Dealers hand is ' + dealersHand);

    // set trueCount to check the cards for the whole game and num decks to determine count
    trueCount = getTrueCount(cards, numDecks);

    //set text to trueCount value
    $("#countDisplay").text(trueCount);

    //getOddsOfSuccess after hitting submit
    oddsOfSuccess = calculateOddsOfSuccess(cardsInHand, dealersHand, trueCount, numDecks);

    //getBestMove after hitting submit
    move = getBestMove(cardsInHand, dealersHand, trueCount, oddsOfSuccess);
    $(".next-move h3").text(move);

    //calculateBetSize after hitting submit
    betSize = calculateBetSize(trueCount, oddsOfSuccess);
    $(".bet-size").text(betSize);

    // Update the history display last cards
    updateHistoryDisplay();

  });

  // When the user clicks the "Hit" button, add the card to the cards in hand and update the count
  $("#submit-hit-card-btn").on("click", function () {

    // get the hitCard value which could be any of this hits keep updating hand dont clear
    var hitCard = $("#hitCard").val();

    //push hitCard into all cards array
    cards.push(hitCard);

    //push hit card into your hand so now you have three cards or more
    cardsInHand.push(hitCard);

    //call calculateHandTotal for new cardsInHand
    playerHandTotal = calculateHandTotal(cardsInHand);
    console.log("Player hand total:", playerHandTotal);

    // set trueCount to check the cards for the whole game and num decks to determine count
    trueCount = getTrueCount(cards, numDecks);

    //set text to trueCount value
    $("#countDisplay").text(trueCount);

    //getOddsOfSuccess after hitting submit
    oddsOfSuccess = calculateOddsOfSuccess(cardsInHand, dealerUpCard, trueCount, numDecks);

    //getBestMove after hitting submit
    getBestMove(cardsInHand, dealerUpCard, trueCount, oddsOfSuccess);
    $(".next-move h3").text(move);

    //calculateBetSize after hitting submit
    betSize = calculateBetSize(trueCount, oddsOfSuccess);
    $(".bet-size").text(betSize);

    // Update the history display last cards
    updateHistoryDisplay();

  });

  // When the user enters the dealers down card and submits it 
  $("#downCardSubmit").on("click", function () {

    // Get the down card value
    var hiddenCard = $("#downCard").val();

    // push the down card into the cards array with the other cards
    cards.push(hiddenCard);

    // Add the revealed card to the dealers hand array
    dealersHand.push(hiddenCard);

    // Recalculate the dealer's hand total using the dealersHand array
    dealerHandTotal = calculateHandTotal(dealersHand);

    // set trueCount to check the cards for the whole game and num decks to determine count
    trueCount = getTrueCount(cards, numDecks);

    //set text to trueCount value
    $("#countDisplay").text(trueCount);

    //getOddsOfSuccess after hitting submit
    oddsOfSuccess = calculateOddsOfSuccess(cardsInHand, dealerUpCard, trueCount, numDecks);
    console.log("Odds of success:", oddsOfSuccess)

    //getBestMove after hitting submit
    bestMove = getBestMove(cardsInHand, dealerUpCard, trueCount, oddsOfSuccess);
    $(".next-move h3").text(bestMove);

    //calculateBetSize after hitting submit
    betSize = calculateBetSize(trueCount, oddsOfSuccess);
    $(".bet-size").text(betSize);

    // Update the history display last cards
    updateHistoryDisplay();

  });

  $("#resetBtn").on("click", function () {
    if (confirm("Are you sure you want to reset the game?")) {
      cards = [];
      cardsInHand = [];
      dealersHand = [];
      dealerDownCard = [];
      trueCount = 0;
      $("#countDisplay").text(trueCount);
      updateHistoryDisplay();
    }
  });






  function isPair(cardsInHand) {
    return cardsInHand.length === 2 && cardsInHand[0] === cardsInHand[1];
  }






  function isSoft(cardsInHand) {
    return cardsInHand.includes("A") && cardsInHand.some(card => card !== "A" && getCardValue(card) < 10);
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





  //
  function adjustBestMoveForTrueCount(bestMove, handType, trueCount) {
    if (handType === "hard") {
      if (trueCount >= 5 && (bestMove === "H" || bestMove === "S")) {
        return "D";
      } else if (trueCount <= -1 && bestMove === "D") {
        return "H";
      }
    } else if (handType === "soft") {
      if (trueCount >= 4 && bestMove === "H") {
        return "D";
      } else if (trueCount <= -1 && bestMove === "D") {
        return "H";
      }
    } else if (handType === "pairs") {
      if (trueCount >= 6 && bestMove === "P") {
        return "S";
      } else if (trueCount <= -4 && bestMove === "P") {
        return "H";
      }
    }
  
    return bestMove;
  }





  function getBestMove(playerHand, dealersHand, trueCount, useMonteCarlo = false) {
    if (useMonteCarlo) {
      // Define a list of possible actions
      const actions = ['H', 'S', 'D', 'P'];
  
      // Initialize an object to store win rates for each action
      const winRates = {};
  
      // Perform Monte Carlo simulations for each action
      for (const action of actions) {
        let wins = 0;
        const numSimulations = 10000;
  
        for (let i = 0; i < numSimulations; i++) {
          const result = simulateGame(playerHand, dealersHand[0], trueCount, action);
          if (result === 'win') {
            wins++;
          }
        }
  
        winRates[action] = wins / numSimulations;
      }
  
      // Find the action with the highest win rate
      const bestMove = Object.keys(winRates).reduce((a, b) => winRates[a] > winRates[b] ? a : b);
  
      return bestMove;

    } else {

    let dealerUpCardValue = dealersHand[0].value;

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

    let bestMove = basicStrategyChart[handType][playerHandIndex][dealerUpCardIndex];
  
  // Adjust the best move based on the true count
  const adjustedBestMove = adjustBestMoveForTrueCount(bestMove, handType, trueCount);

  return adjustedBestMove;
  }
}


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

    console.log('This is the dealer bust probability' + dealerBustProb);



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

  function calculateBetSize(trueCount, oddsOfSuccess) {
    const baseBet = 10; // You can adjust this value according to your preferred base bet size
    const kellyFraction = 0.5; // You can adjust this value to change the level of risk (0.5 is a common choice for moderate risk)

    const advantage = (trueCount - 1) * 0.5; // Estimate the player's advantage based on the true count
    const optimalBetProportion = (oddsOfSuccess * (advantage + 1) - 1) / advantage;
    const betSize = Math.round(baseBet + (baseBet * kellyFraction * optimalBetProportion));

    return Math.max(betSize, baseBet);
  }

});