// // Define card values
// const cardValues = {
//   '2': 1,
//   '3': 1,
//   '4': 1,
//   '5': 1,
//   '6': 1,
//   '7': 0,
//   '8': 0,
//   '9': 0,
//   '10': -1,
//   'J': -1,
//   'Q': -1,
//   'K': -1,
//   'A': -1
// };

// // Initialize count
// let count = 0;

// // Initialize previous hands array
// let previousHands = [];

// // Add event listener to submit button
// $('#submit').on('click', function() {
//   // Get player cards
//   let playerCards = [];
//   $('#player-1, #player-2, #player-3, #player-4, #player-5, #player-6, #player-7').each(function() {
//     let card = $(this).val();
//     if (card != 'Select your cards...') {
//       playerCards.push(card);
//     }
//   });

//   // Get dealer cards
//   let dealerCards = [];
//   $('#dealer-1, #dealer-2').each(function() {
//     let card = $(this).val();
//     if (card != 'Select your cards...') {
//       dealerCards.push(card);
//     }
//   });

//   // Get number of decks
//   let numDecks = $('#decks').val();
  
//   // Calculate true count
//   let trueCount = count / numDecks;

//   // Get suggested move based on perfect blackjack strategy
//   let suggestedMove = getSuggestedMove(playerCards, dealerCards, trueCount);

//   // Add hand to previous hands array
//   previousHands.push({
//     playerCards: playerCards,
//     dealerCards: dealerCards,
//     suggestedMove: suggestedMove
//   });

//   // Update hands list
//   updateHandsList(previousHands);

//   // Update suggested move
//   updateSuggestedMove(suggestedMove);
// });

// // Add event listener to reset button
// $('#reset').on('click', function() {
//   // Reset player cards
//   $('#player-1, #player-2, #player-3, #player-4, #player-5, #player-6, #player-7').val('Select your cards...');
  
//   // Reset dealer cards
//   $('#dealer-1, #dealer-2').val('Select your cards...');

//   // Clear previous hands array
//   previousHands = [];

//   // Update hands list
//   updateHandsList(previousHands);

//   // Reset suggested move
//   updateSuggestedMove('');
// });

// // Add event listener to reset count button
// $('#reset-count').on('click', function() {
//   // Reset count
//   count = 0;

//   // Update count display
//   updateCountDisplay(count);
// });

// // Update count display
// function updateCountDisplay(count) {
//   $('#count').text(count);
// }

// // Get suggested move based on perfect blackjack strategy
//   // ... code to calculate suggested move ...

//   function getSuggestedMove(playerCards, dealerCards, trueCount) {
  
// }

// // Function to calculate the value of a hand
// function getHandValue(cards) {

  
// }

// // Update hands list
// function updateHandsList(previousHands) {
//   // ... code to update hands list ...
// }

// // Update suggested move
// function updateSuggestedMove(suggestedMove) {
//   // ... code to update suggested move ...
// }

// // Add event listeners to player and dealer card select elements
// $('.card-layout select').on('change', function() {
//   // Get card value
//   let card = $(this).val();

//   // Add card value to count
//   count += cardValues[card];

//   // Update the count display on the page
//   $("#count").text(count);
// });


