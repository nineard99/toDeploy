
const arrDeck=[]
const usedCards=[]


    for (let i = 1; i <= 4; i++) {
        let symbols
        let color
        switch (i) {
            case 1:
                symbols='club'
                color='gray-100'
                break;
            case 2:
                symbols='diamond'
                color='rose-50'
                break;
            case 3:
                symbols='heart'
                color='rose-50'
                break;
            case 4:
                symbols='spade'
                color='gray-100'
                break;
        }
        arrDeck.push({symbols:symbols,number:'K',values:10,color:color})
        arrDeck.push({symbols:symbols,number:'Q',values:10,color:color})
        arrDeck.push({symbols:symbols,number:'J',values:10,color:color})
        for (let j = 10; j >= 2; j--) {
            arrDeck.push({'symbols':symbols,'number':j,'values':j,color:color})
        }
        arrDeck.push({'symbols':symbols,'number':'A','values':1,color:color})
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
    countHand(handHolder)
    return handHolder.hands
}

const countHand = (handHolder) => {
    handHolder.value.handCount = handHolder.value.hands.reduce((prev, curr) => {
        if (curr.number == 'A') {
            return prev + (prev + 11 > 21 ? 1 : 11);
        }
        return prev + curr.values;
    }, 0);
}



export  {addCardToHand , randomCard , arrDeck}
