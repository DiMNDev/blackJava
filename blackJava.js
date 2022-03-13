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

shuffle = () => {
  buildDeck();
  while (hearts.length + spades.length + diamonds.length + clubs.length > 0) {
    pickSuit();
  }
  document.getElementById('data-printDeck').disabled = false;
  document.getElementById("data-dealButton").disabled = false;
  document.getElementById("data-shuffleButton").disabled = true;
};

deal = () => {
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
  var tableDiv = document.getElementById("viewport");
  var card1 = document.createElement("img");
  card1.src = "Images/Final/Ace_hearts.svg";
  card1.className = "card-size playerOnePosition";
  tableDiv.appendChild(card1);

  document.getElementById("data-hitButton").disabled = false;
  document.getElementById("data-stayButton").disabled = false;
  document.getElementById("data-dealButton").disabled = true;
  check();
};

hit = () => {
  playerSum = 0;
  playerHand.push(deck.pop());
  console.log("Player Card: " + playerHand[playerHand.length]);
  check();
};

stay = () => {
  document.getElementById("data-hitButton").disabled = true;
  document.getElementById("data-stayButton").disabled = true;
  document.getElementById("data-dealButton").disabled = true;
  let counter = 0;
  while (houseSum < 17) {
    if (houseSum >= 17) {
      return evaluate();
    }
    houseHand.push(deck.pop());
    while (counter < houseHand.length) {
      let firstCharacter = parseInt(houseHand[counter].charAt(0));

      switch (houseHand[counter].charAt(0)) {
        case "A":
          houseSum += 1;
          break;
        case "J":
          houseSum += 10;
          break;
        case "Q":
          houseSum += 10;
          break;
        case "K":
          houseSum += 10;
          break;
        default:
          houseSum += firstCharacter;
          break;
      }
      counter++;
    }
    console.log(houseHand);
    console.log(houseSum);
  }
  if (houseSum > 21) {
    console.log("HOUSE BUST!");
    console.log("YOU WIN!");
    document.getElementById("data-dealButton").disabled = false;
  } else {
    evaluate();
  }
};

check = () => {
  let counter = 0;
  while (counter < playerHand.length) {
    let firstCharacter = parseInt(playerHand[counter].charAt(0));

    switch (playerHand[counter].charAt(0)) {
      case "A":
        playerSum += 1;
        break;
      case "J":
        playerSum += 10;
        break;
      case "Q":
        playerSum += 10;
        break;
      case "K":
        playerSum += 10;
        break;
      default:
        playerSum += firstCharacter;
        break;
    }
    counter++;
  }
  if (playerSum > 21) {
    console.log("YOU BUST!");
    document.getElementById("data-hitButton").disabled = true;
    document.getElementById("data-stayButton").disabled = true;
    document.getElementById("data-dealButton").disabled = false;
  }
  if (playerSum == 21) {
    console.log("BLACKJACK!");
    stay();
  }
  console.log(`You have ${playerHand.join(' and ')} in your hand.`);
  console.log(`You: ${playerSum}`);
  console.log(`The house has ${houseHand}`);
  console.log(`House: ${houseSum}`)
};

clearHand = (target) => {
  playerSum = 0;
  houseSum = 0;
  let counter = target.length;
  while (counter >= 0) {
    target.pop();
    counter--;
  }
};

evaluate = () => {
  console.log("Your hand totals " + playerSum);
  console.log("House hand totals " + houseSum);
  if (playerSum > houseSum) {
    console.log("YOU WIN!");
  } else {
    console.log("HOUSE WINS!");
  }
  document.getElementById("data-dealButton").disabled = false;
  checkDeck();
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


