import {addCardToHand, countHand, newDeck} from './deck'
import {betToStartGame,bet,DealerPlay,HiddenCardDealer,result,player,dealer } from './gameState'
import { saveGameData} from './storage'
import {checkScore,bestHighScore} from './gameResult'


export const handleBetStartGame = (event) => {
    event.preventDefault()
    console.log(bet.value)
    betToStartGame.value = true;
    player.value.balance -= bet.value
    console.log(player.balance)
    addCardToHand(player)
    addCardToHand(player)
    addCardToHand(dealer)
    addCardToHand(dealer)
    HiddenCardDealer.value = dealer.value.hands.pop()
    console.log(HiddenCardDealer)
    countHand(player)
    countHand(dealer)
    saveGameData()
}

export function handleHit(){
    addCardToHand(player)
    countHand(player)
    if(player.value.handCount > 21){
        DealerPlay.value = true
        bestHighScore()
        return result.value = "You Lose"
    }
    
}


export function handleStand(){
    DealerPlay.value = true
    
    dealer.value.hands.push(HiddenCardDealer.value)
    countHand(dealer)
    dealerControll()

}

// There is a bug where the bet can be double up every time we click 'Double Button'
// and a bug where sometimes click Double and it doesn't clear the UI
// and it can be click many times as you like.
export function handleDouble(){
    player.value.balance -= bet.value
    bet.value *= 2
    addCardToHand(player)
    countHand(player)
    if(player.value.handCount > 21){
        bestHighScore()
        return result.value = "You Lose"

    }else {
        DealerPlay.value = true
        dealer.value.hands.push(HiddenCardDealer.value)
        dealerControll()
    }
}

export function resetGame(){
    newDeck(player)
    newDeck(dealer)
    result.value = ""
    betToStartGame.value =false
    DealerPlay.value=false
}

function dealerControll() {
    setTimeout(() => {
        function addCardWithDelay() {
            if (dealer.value.handCount < 17) {
                addCardToHand(dealer); 
                countHand(dealer)
                setTimeout(addCardWithDelay, 1000);
            }else {
                checkScore();
            }
        }
        addCardWithDelay();
    }, 1000); 
}
