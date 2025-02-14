
const arrDeck=[]
let usedCards=[]

for (let i = 1; i <= 4; i++) {
    let symbols
    switch (i) {
        case 1:
            symbols='club'
            break;
        case 2:
            symbols='diamond'
            break;
        case 3:
            symbols='heart'
            break;
        case 4:
            symbols='spade'
            break;
    }
    arrDeck.push({symbols:symbols,number:'K',values:10})
    arrDeck.push({symbols:symbols,number:'Q',values:10})
    arrDeck.push({symbols:symbols,number:'J',values:10})
    for (let j = 10; j >= 2; j--) {
        arrDeck.push({'symbols':symbols,'number':j,'values':j})
    }
    arrDeck.push({'symbols':symbols,'number':'A','values':1})
}


function randomCard() {
    let randNum=Math.ceil(Math.random()*52)-1
    while (usedCards.includes(randNum)) {
        randNum=Math.ceil(Math.random()*52)-1
    }
    usedCards.push(randNum)
    return usedCards[usedCards.length-1]
}   

function addCardToHand(handHolder){
    handHolder.value.hands.push(arrDeck[randomCard()])
    return handHolder.hands
}

function countHand(handHolder){
    let total = 0;
    let aceCount = 0;

    handHolder.value.hands.forEach((card) => {
        if (card.number === 'A') {
            total += 11;
            aceCount += 1;
        } else {
            total += card.values;
        }
    });
    while (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount -= 1;
    }
    handHolder.value.handCount = total;
};
function newDeck(handHolder){
    usedCards=[]
    handHolder.value.hands=[]
}



export  {addCardToHand, countHand, newDeck }
