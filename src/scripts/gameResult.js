import { resetGame } from './gameAction'
import { bet,result,player,dealer,highscore, clearState } from './gameState'

export function checkScore(){
    if(dealer.value.handCount > 21){
        player.value.balance += bet.value * 2
        player.value.winStreak++
        bestHighScore()
        return result.value = "You Win"
    }else if(player.value.handCount === dealer.value.handCount){
        player.value.balance += bet.value
        bestHighScore()
        return result.value = "Draw"
    }else if(player.value.handCount > dealer.value.handCount){
        player.value.balance += bet.value * 2
        player.value.winStreak++
        bestHighScore()
        return result.value = "You Win"
    }else if(player.value.handCount < dealer.value.handCount){
        player.value.winStreak = 0;
        bestHighScore()
        return result.value = "You Lose"
    }
}

export function bestHighScore(){
    if(localStorage.getItem('highscore') < player.value.balance){
        highscore.value = player.value.balance
        localStorage.setItem('highscore',player.value.balance)
    } 
}
export function outOfMoney(){
    resetGame()
    clearState()
    localStorage.removeItem("gameData");
    player.value.balance = 1000
}
