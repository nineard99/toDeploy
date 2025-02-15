import { bet,result,player,dealer } from './gameState'

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
    if(localStorage.getItem('money') < player.value.balance){
       return localStorage.setItem('money',player.value.balance)
    } 
}

