
import { startGame, betToStartGame,bet,HiddenCardDealer,player,dealer } from './gameState'


export const loadGameData = () => {
    let gameData;
    const savedGameData = localStorage.getItem('gameData')
    if (savedGameData){
        gameData = JSON.parse(savedGameData)
        player.value = gameData.player
        dealer.value = gameData.dealer
        bet.value = gameData.bet
        betToStartGame.value = gameData.betToStartGame
        HiddenCardDealer.value = gameData.HiddenCardDealer
        startGame.value = true
    }
    
}
export const saveGameData = () => {
    const gameData = {
        player: player.value,
        dealer: dealer.value,
        bet : bet.value,
        betToStartGame : betToStartGame.value,
        HiddenCardDealer: HiddenCardDealer.value
    }
    localStorage.setItem('gameData',JSON.stringify(gameData))
}
