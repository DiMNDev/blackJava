//Welcome to blackJava, black jack in javascript

const cards = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, "Jack", "Queen", "King"];
const hearts = [];
const spades = [];
const diamonds = [];
const clubs = [];
const deck = [];
const playerHand = [];
const houseHand = [];
let playerSum = 0;
let houseSum = 0;
let houseWins = 0;
let playerWins = 0;

shuffle = () => {
  console.log('SHUFFLE')
  buildDeck();
  while (hearts.length + spades.length + diamonds.length + clubs.length > 0) {
    pickSuit();
  }
  document.getElementById("data-printDeck").disabled = false;
  document.getElementById("data-dealButton").disabled = false;
  document.getElementById("data-shuffleButton").disabled = true;
};

deal = () => {
  console.log('DEAL')
  clearHand(playerHand);
  clearHand(houseHand);
  if (deck.length < 7) {
    return checkDeck();
  }
  playerSum = 0;
  houseSum = 0;
  let i = 0;
  while (i < 2) {
    playerHand.push(deck.pop());
    houseHand.push(deck.pop());
    console.log("Player Card: " + playerHand[i]);
    console.log("House Card: " + houseHand[i]);
    i++;
  }
  //#region Experimental GUI
  var tableDiv = document.getElementById("viewport");
  var card1 = document.createElement("img");
  card1.src = "Images/Final/Ace_hearts.svg";
  card1.className = "card-size playerOnePosition";
  tableDiv.appendChild(card1);
  //#endregion

  document.getElementById("data-hitButton").disabled = false;
  document.getElementById("data-stayButton").disabled = false;
  document.getElementById("data-dealButton").disabled = true;

  addHand(playerHand);
  addHand(houseHand);
};

hit = () => {
  console.log('HIT')
  playerSum = 0;
  playerHand.push(deck.pop());
  console.log(`You were dealt ${playerHand[playerHand.length - 1]}`);
  addHand(playerHand);
};

addHand = (targetHand) => {
  console.log('ADD HAND')
  let counter = 0;
  switch (targetHand) {
    case playerHand:
      while (counter < playerHand.length) {
        let firstCharacter = playerHand[counter].charAt(0);
        playerSum += characterChecker(firstCharacter);
        checkPlayer();
        counter++;
      }
      printHand(playerHand);
      break
    case houseHand:
      while (counter < houseHand.length) {
        let firstCharacter = houseHand[counter].charAt(0);
        houseSum += characterChecker(firstCharacter);
        checkHouse();
        counter++;
      }
      printHand(houseHand);
      break
  }
};

stay = () => {
  console.log('STAY')
  document.getElementById("data-hitButton").disabled = true;
  document.getElementById("data-stayButton").disabled = true;
  document.getElementById("data-dealButton").disabled = true;
  while (houseSum < 17) {
    houseHit();
  }
};

houseHit = () => {
  console.log('HOUSE HIT')
  houseHand.push(deck.pop());
  houseSum += characterChecker(houseHand.length - 1);
  console.log(houseHand);
  console.log(houseSum);
  checkHouse();
};

checkPlayer = () => {
  console.log('CHECK PLAYER')
  if (playerSum > 21) {
    document.getElementById("data-hitButton").disabled = true;
    document.getElementById("data-stayButton").disabled = true;
    document.getElementById("data-dealButton").disabled = false;
    evaluate("playerBust");
  }
  if (playerSum == 21) {
    evaluate("playerBJ");
  }
};

checkHouse = () => {
  console.log('CHECK HOUSE')
  if (houseSum > 21) {
    document.getElementById("data-hitButton").disabled = true;
    document.getElementById("data-stayButton").disabled = true;
    document.getElementById("data-dealButton").disabled = false;
    evaluate("houseBust");
  }
  if (houseSum == 21) {
    document.getElementById("data-hitButton").disabled = true;
    document.getElementById("data-stayButton").disabled = true;
    document.getElementById("data-dealButton").disabled = false;
    evaluate("houseBJ");
  }
  if (houseSum >= 17) {
    evaluate();
  }
};

evaluate = (situation) => {
  console.log('EVALUATE')
  console.log("Your hand totals " + playerSum);
  console.log("House hand totals " + houseSum);
  switch (situation) {
    case "playerBust":
      houseWins += 1;
      console.log("You bust!");
      break
    case "houseBust":
      playerWins += 1;
      console.log("House bust!");
      break
    case "playerBJ":
      playerWins += 1;
      console.log("You hit BLACKJACK!");
      console.log('You WIN!')
      break
    case "houseBJ":
      houseWins += 1;
      console.log("House hit BLACKJACK!");
      break
    default:
      if (houseSum >= playerSum) {
        houseWins += 1;
        console.log("House WINS!");
      } else {
        playerWins += 1;
        console.log("You WIN!");
      }
  }

  console.log(`House Wins: ${houseWins}`);
  console.log(`Player Wins: ${playerWins}`);
  document.getElementById("playerWinsP").innerText = playerWins;
  document.getElementById("houseWinsP").innerText = houseWins;
  document.getElementById("data-dealButton").disabled = false;
  checkDeck();
};

//#region Deck functions
buildDeck = () => {
  let counter = 0;
  while (counter < cards.length) {
    hearts.push(cards[counter]);
    spades.push(cards[counter]);
    diamonds.push(cards[counter]);
    clubs.push(cards[counter]);
    counter++;
  }
  printCards();
};

pickSuit = () => {
  let suitNumber = Math.floor(Math.random() * 4 + 1);
  console.log(suitNumber);
  if (suitNumber == 1) {
    if (hearts.length == 0) {
      pickSuit();
    } else {
      suit = hearts;
      pickCard(suit);
    }
  }
  if (suitNumber == 2) {
    if (spades.length == 0) {
      pickSuit();
    } else {
      suit = spades;
      pickCard(suit);
    }
  }
  if (suitNumber == 3) {
    if (diamonds.length == 0) {
      pickSuit();
    } else {
      suit = diamonds;
      pickCard(suit);
    }
  }
  if (suitNumber == 4) {
    if (clubs.length == 0) {
      pickSuit();
    } else {
      suit = clubs;
      pickCard(suit);
    }
  }
};

pickCard = (suit) => {
  let cardNumber = Math.floor(Math.random() * suit.length);
  if (suit == hearts) {
    deck.push(hearts[cardNumber] + " of hearts");
    hearts.splice(cardNumber, 1);
  }
  if (suit == spades) {
    deck.push(spades[cardNumber] + " of spades");
    spades.splice(cardNumber, 1);
  }
  if (suit == diamonds) {
    deck.push(diamonds[cardNumber] + " of diamonds");
    diamonds.splice(cardNumber, 1);
  }
  if (suit == clubs) {
    deck.push(clubs[cardNumber] + " of clubs");
    clubs.splice(cardNumber, 1);
  }
  console.log(cardNumber + " + 1");
  printCards();
};

printCards = () => {
  console.log("Hearts:" + hearts);
  console.log("Spades:" + spades);
  console.log("Diamonds:" + diamonds);
  console.log("Clubs:" + clubs);
};

checkDeck = () => {
  if (deck.length > 0) {
    if (deck.length <= 7) {
      console.log("Shuffle deck!");
      while (deck.length > 0) {
        deck.pop();
      }
      document.getElementById("data-shuffleButton").disabled = false;
      document.getElementById("data-dealButton").disabled = true;
      document.getElementById("data-stayButton").disabled = true;
    }
  }
};
//#endregion

//#region Hand functions

clearHand = (target) => {
  playerSum = 0;
  houseSum = 0;
  let counter = target.length;
  while (counter >= 0) {
    target.pop();
    counter--;
  }
};

characterChecker = (character) => {
  switch (character) {
    case "A":
      return 1;
    case "J":
      return 10;
    case "Q":
      return 10;
    case "K":
      return 10;
    default:
      return parseInt(character);
  }
};

printHand = (targetHand) => {
  switch (targetHand) {
    case playerHand:
      console.log(`You have ${playerHand.join(" and ")} in your hand.`);
      console.log(`You: ${playerSum}`);
      break
    case houseHand:
      console.log(`The house has ${houseHand.join(" and ")}`);
      console.log(`House: ${houseSum}`);
      break
  }
};

//#endregion

//#region Experimental functions
getImage = (imageID) => {
  var image = document.createElement("img");
  image.id(imageID);
  return image;
};

displayDeck = (parent, child) => {
  child.forEach((element) => {
    parent.appendChild(element);
  });
};

printDeck = () => {
  document.getElementById("deck").innerHTML = deck;
  var aceIMG = document.createElement("img");
  aceIMG.setAttribute("src", "Images/Final/Ace of Hearts.svg");
  aceIMG.setAttribute("class", "card-size");
  var getCardBody = document.getElementById("card");
  getCardBody.appendChild(aceIMG);

  var deckImage = [getImage("aceHearts")];
  displayDeck(getCardBody, deckImage);
  calulatePieChart();
};
//#endregion
