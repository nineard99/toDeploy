<script setup>
    import { ref } from 'vue'

    let arrDeck=[]
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
        arrDeck.push({'symbols':symbols,'number':'K','values':10})
        arrDeck.push({'symbols':symbols,'number':'Q','values':10})
        arrDeck.push({'symbols':symbols,'number':'J','values':10})
        for (let j = 10; j >= 2; j--) {
            arrDeck.push({'symbols':symbols,'number':j,'values':j})
        }
        arrDeck.push({'symbols':symbols,'number':'A','values':1})
    }
   
    //Check BlackJack Player
    //Check Dealer Below 17
    //Check The Final Score 
    function checkScore(player, dealer){
        if(player > 21){
            return "You Bust"
        }else if(dealer > 21){
            return "You Win"
        }else if(player === dealer){
            return "Draw"
        }else if(player > dealer){
            return "You Win"
        }else if(player < dealer){
            return "You Lose"
        }
    }

    const startGame = ref(false)
    const BetToStartGame = ref(false)
    const bet = ref(0)
    const handleBetStartGame = (event) => {
        event.preventDefault()
        console.log(bet.value)
        BetToStartGame.value = true;
        console.log(BetToStartGame)
    }

    const player = {
        balance: 1000,
        highScore: 0,
        hands:[] //Work in progress with split option
    }

    const usedCards=[]
    function randomCard() {
        let randNum=Math.ceil(Math.random()*52)-1
        while (usedCards.includes(randNum)) {
            randNum=Math.ceil(Math.random()*52)-1
        }
        usedCards.push(randNum)
        return usedCards[usedCards.length-1]
    }   

    function addCardToHand(handHolder){
        handHolder.hands.push(arrDeck[randomCard()])
        return handHolder.hands
    }
    
    
</script>

<template>
    <div class="test flex-col">
        <div id="deck" v-show="false" class="grid grid-cols-12 gap-4">
            <div v-for="card in arrDeck">
                <div v-if="card.symbols=='club'||card.symbols=='spade'" class="w-40 h-48 border-2 border-solid border-gray-900 rounded-sm bg-stone-100 flex flex-col justify-between">
                    <div style="padding: 10px;"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
                    <div style="text-align: center; font-size: 70px; color: #282828;font-family: Oldenburg;">{{ card.number }}</div>
                    <div style="padding: 10px; rotate: 180deg; align-items: end;"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
                </div>
                <div v-else="card.symbols=='diamond'||card.symbols=='heart'" class="w-40 h-48 border-2 border-solid border-gray-900 rounded-sm bg-rose-50 flex flex-col justify-between">
                    <div style="padding: 10px;"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
                    <div style="text-align: center; font-size: 70px; color: #ff4d4d;font-family: Oldenburg;">{{ card.number }}</div>
                    <div style="padding: 10px; rotate: 180deg; align-items: end;"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
                </div>
            </div>
        </div>
        <!-- display player's balance and high score -->
        <div v-show="false" class="flex flex-col items-center gap-3 p-5 bg-gray-100 rounded-lg max-w-xs">
        <!-- display player's balance -->
            <div class="w-50 p-3 bg-green-100 rounded-lg">
                <span class="text-lg font-bold text-green-800">Your balance:</span>
                <span class="text-lg font-bold text-green-600"> ${{player.balance}} </span>
            </div>

            <!-- display player's high score -->
            <div class="w-50 p-3 bg-blue-100 rounded-lg">
                <span class="text-lg font-bold text-blue-800">High Score: </span>
                <span class="text-lg font-bold text-blue-600"> {{player.highScore}}</span>
            </div>
        </div>

        <!-- Before StartGame -->
        <div v-show="!startGame" class="flex flex-col justify-center items-center">
            <div class="text-center mb-2">
                <p class="text-4xl font-extrabold text-yellow-500 tracking-wide drop-shadow-md animate-bounce  ">
                    INFINITY BLACKJACK
                </p>
                <p class="text-xl font-bold text-yellow-300  drop-shadow-md animate-pulse mt-2">
                    Made By PeePaNun
                </p>
            </div>
            <button 
                class="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg slide-up hover:bg-yellow-400 hover:scale-105 transition"
                @click="startGame = true">
                PLAY GAME
            </button>         
        </div>
        
        <!-- StartGame Table -->
        <div v-show="startGame" class="slide-up bg-cover flex items-center justify-center bg-center w-[80%] h-[70%] rounded-[3rem] border-4 border-yellow-350 shadow-xl" style="background-image: url('./Image/BackGround.jpg');" >
            <div v-show="BetToStartGame" class="h-[90%] w-[90%] flex flex-col ">
                <div class="h-[40%] ">
                    <div class="px-4 py-1 mt-3 hoverzoom w-[9rem] flex justify-center bg-black/50 rounded-full border border-yellow-500/30 backdrop-blur">
                        <h2 class="text-xl font-bold text-yellow-500">Dealer (21)</h2>
                    </div>
                </div>
                <div class="w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent my-4"></div>
                <div class="h-[40%] ">
                    <div class="px-4 py-1 hoverzoom w-[9rem] mt-3 flex justify-center bg-black/50 rounded-full border border-yellow-500/30 backdrop-blur">
                        <h2 class="text-xl font-bold text-yellow-500">Player (21)</h2>

                    </div>
                </div>
            </div>
            <div v-show="!BetToStartGame">
                <form @submit.prevent="handleBetStartGame">
                    <input 
                        v-model="bet" 
                        type="number" 
                        min="1"  
                        placeholder="ใส่จำนวนเดิมพัน"
                        class="mr-2 px-4 py-2 slide-right text-yellow-300 bg-gradient-to-r from-gray-800 to-black border border-yellow-500 rounded-lg shadow-sm placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 ease-in-out"
                    />
                    <button
                        type="submit"
                        class="px-6 py-3 text-lg font-bold slide-left text-yellow-300 bg-gradient-to-r from-black via-gray-800 to-black border border-yellow-500 rounded-lg shadow-md hover:shadow-yellow-500/50 hover:bg-yellow-500 hover:text-yellow-200 hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:border-red-500 disabled:cursor-not-allowed"
                        :disabled="bet > player.balance"
                        v-text="bet > player.balance ? 'เงินไม่พอ' : '🃏เริ่มเกม🃏'"
                    >
                        
                    </button>
                </form>
            </div>

        </div>
        <button v-show="startGame"
                class="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
                @click="startGame = false">
                Back
        </button>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
</style>
