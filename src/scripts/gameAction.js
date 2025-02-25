import {addCardToHand, countHand, newDeck} from './deck'
import {betToStartGame,bet,DealerPlay,HiddenCardDealer,result,player,dealer, doublePlay } from './gameState'
import { saveGameData} from './storage'
import {checkScore,bestHighScore} from './gameResult'


export const handleBetStartGame = (event) => {
    event.preventDefault()
    betToStartGame.value = true;
    player.value.balance -= bet.value
    addCardToHand(player)
    addCardToHand(player)
    addCardToHand(dealer)
    addCardToHand(dealer)
    HiddenCardDealer.value = dealer.value.hands.pop()
    countHand(player)
    countHand(dealer)
    saveGameData()
}

export function handleHit(){
    addCardToHand(player)
    countHand(player)
    doublePlay.value =false
    if(player.value.handCount > 21){
        DealerPlay.value = true
        bestHighScore()
        player.value.winStreak = 0;
        return result.value = "You Lose"
    }
    
}


export function handleStand(){
    DealerPlay.value = true
    dealer.value.hands.push(HiddenCardDealer.value)
    countHand(dealer)
    dealerControll()

}

export function handleDouble(){
    player.value.balance -= bet.value
    bet.value *= 2
    addCardToHand(player)
    countHand(player)
    if(player.value.handCount > 21){
        player.value.winStreak = 0;
        bestHighScore()
        DealerPlay.value = true
        result.value = "You Lose"
    }else {
        DealerPlay.value = true;
        dealer.value.hands.push(HiddenCardDealer.value);
        dealerControll()
    }

    setTimeout(() => {
        bet.value /= 2
    }, 3000)
}

export function resetGame(){
    newDeck(player)
    newDeck(dealer)
    result.value = ""
    betToStartGame.value =false
    DealerPlay.value=false
    doublePlay.value =true

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