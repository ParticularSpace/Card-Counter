const $hit = $('#hit')
const $stand = $('#stand')
const $double = $('#double')
const $split = $('#split')
const $reset = $('#reset')
const $betAmount = $('#bet-amount')
const $bust = $('#bust')
const $win = $('#win')
const $blackJack = $('#black-jack')
const $push = $('#push')

const countCards = {
    two : 1,
    three : 1,
    four : 1,
    five : 1,
    six : 1,
    seven : 0,
    eight : 0,
    nine: 0 ,
    ten: -1 ,
    J: -1 ,
    Q: -1 ,
    K: -1 ,
    A: -1 
    };

    let yourHand = []; //will be the array of your two cards
    let yourHandValue = 0; //will be the sum of your two cards

    let liveCount = 0; //will be the key pair value of the cards in play over the whole time playing

    let trueCount = 0; //will be the liveCount divided by the number of decks in play

    let numberOfDecks = 0; // will be the number of decks in play

    let dealerHand = []; //will be the array of the dealers two cards
    let dealerHandVAlue = 0; //will be the sum of the dealers two cards

    let bet = 0; //will be the amount of money you should bet
    let money = 0; //will be the amount of money you have to play with

    let splitHand = []; //will be the array of the second hand you split
    let splitHandValue = 0; //will be the sum of the second hand you split

    let split = false; //will be true if you should split your hand

    let doubleDown = false; //will be true if you should double down

    let bust = false; //will be true if you bust

    let win = false; //will be true if you win

    let blackJack = false; //will be true if you get a black jack

    let push = false; //will be true if you push

    let stand = false; //will be true if you stand

    let dealerBust = false; //will be true if the dealer busts

    let dealerBlackJack = false; //will be true if the dealer gets a black jack

    let dealerStand = false; //will be true if the dealer stands

    let dealerPush = false; //will be true if the dealer pushes

    let dealerWin = false; //will be true if the dealer wins


    //this function will be called when the page loads it will populate the drop down options with the cards using a for each loop to go through key value pairs
    function populateCards() {
        // simulate fetching data from API
        const cards = ['Ace', 'King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
      
        // get select element
        const cardsSelect = document.getElementById('cards');
      
        // remove loading message
        cardsSelect.innerHTML = '';
      
        // populate select element with options
        cards.forEach((card, index) => {
          const option = document.createElement('option');
          option.value = index + 1;
          option.text = card;
          cardsSelect.appendChild(option);
        });
      }
      
      function populateDealers() {
        // simulate fetching data from API
        const dealers = ['Dealer A', 'Dealer B', 'Dealer C'];
      
        // get select element
        const dealerSelect = document.getElementById('dealer');
      
        // remove loading message
        dealerSelect.innerHTML = '';
      
        // populate select element with options
        dealers.forEach((dealer, index) => {
          const option = document.createElement('option');
          option.value = index + 1;
          option.text = dealer;
          dealerSelect.appendChild(option);
        });
      }
      
      // call functions to populate select elements
      populateCards();
      populateDealers();
      
        
    
    

    //this function will be called when the hit button is clicked
    function playerHit() {

    }

    //this function will be called when the stand button is clicked
    function playerStand() {
            
    }

    //this function will be called when the double button is clicked
    function playerDouble() {
            
    }

    //this function will be called when the split button is clicked
    function playerSplit() {
                
    }
        
    //this function will be called when the reset button is clicked
    function preset() {
                    
    }

    //this function will be called when the bet amount is changed
    function playerBetAmount() {

    }

    //this function will be called when the game is pushed
    function playerPushed() {

    }

    //this function will be called when the game is black jacked
    function playerBlackJack() {
            
        }

    //this function will be called when the game is busted
    function gameBusted() {

    } 
    
    //this function will be called when the game is won
    function playerWon() {

    } 

    //this function will be called when the game is over
    function gameOver() {

    }



   


