<script setup>
    import { ref , onMounted } from 'vue'
    import {addCardToHand , randomCard , arrDeck} from './scripts/deck'
    const startGame = ref(false)
    const betToStartGame = ref(false)
    const bet = ref(0)
    const DealerPlay = ref(false)
    let HiddenCardDealer = {}
    const result  = ref("")
    const player = ref({
        balance: 1000,
        highScore: 0,
        hands:[] ,
        handCount: 0
    })
    const dealer = ref({
        hands:[] ,
        handCount: 0
    })

    const loadGameData = () => {
        const savedPlayer = localStorage.getItem('player')
        const savedDealer = localStorage.getItem('dealer')
        const savedBet = localStorage.getItem('bet')
        const savedbetToStartGame = localStorage.getItem('betToStartGame')
        if (savedPlayer) player.value = JSON.parse(savedPlayer)
        if (savedDealer) dealer.value = JSON.parse(savedDealer)
        if (savedBet) bet.value = JSON.parse(savedBet)
        if (savedbetToStartGame) betToStartGame.value = JSON.parse(savedbetToStartGame)

        
    }
    const saveGameData = () => {
        localStorage.setItem('player', JSON.stringify(player.value))
        localStorage.setItem('dealer', JSON.stringify(dealer.value))
        localStorage.setItem('bet', JSON.stringify(bet.value))
        localStorage.setItem('betToStartGame', JSON.stringify(betToStartGame.value))

    }
    //USE WHEN WEB RELOAD
    onMounted(() => {
        loadGameData()
    })

    //Check BlackJack Player
    //Check Dealer Below 17
    //Check The Final Score 
    function checkScore(){
        if(dealer.value.handCount > 21){
            return result.value = "You Win"
        }else if(player.value.handCount === dealer.value.handCount){
            return result.value = "Draw"
        }else if(player.value.handCount > dealer.value.handCount){
            return result.value = "You Win"
        }else if(player.value.handCount < dealer.value.handCount){
            return result.value = "You Lose"
        }
    }

    
    

    const handleBetStartGame = (event) => {
        event.preventDefault()
        console.log(bet.value)
        betToStartGame.value = true;
        player.value.balance -= bet.value
        console.log(player.balance)
        addCardToHand(player)
        addCardToHand(player)
        addCardToHand(dealer)
        addCardToHand(dealer)
        HiddenCardDealer = dealer.value.hands.pop()
        console.log(HiddenCardDealer)
        // saveGameData()
    }
    function handleHit(){
        addCardToHand(player)
        if(player.value.handCount > 21){
            DealerPlay.value = true
            return result.value = "You Lose"
        }
    }
    

    function handleStand(){
        DealerPlay.value = true
        dealer.value.hands.push(HiddenCardDealer)
        dealerControll()

    }
    function handleDouble(){
        addCardToHand(player)
        if(player.value.handCount > 21){
            return result.value = "You Lose"
        }else {
            DealerPlay.value = true
            dealer.value.hands.push(HiddenCardDealer)
            dealerControll()
        }
    }

    function dealerControll() {
        setTimeout(() => {
            function addCardWithDelay() {
                if (dealer.value.handCount < 18) {
                    addCardToHand(dealer); 
                    setTimeout(addCardWithDelay, 1000);
                }else {
                    checkScore();
                }
            }
            addCardWithDelay();
        }, 1000); 
    }
     
    function resetGame(){
        betToStartGame.value = false
    }

</script>

<template>
    <div id="deck" v-show="false" class="grid grid-cols-12 gap-4">
        <div v-for="card in arrDeck">
            <div :class="`w-40 h-48 border-2 border-solid border-gray-900 rounded-sm bg-${card.color} flex flex-col justify-between`">
                <div class="p-2"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
                <div v-if="card.symbols=='diamond'||card.symbols=='heart'" class="text-center text-7xl" style="color: #ff4d4d;font-family: Oldenburg;">{{ card.number }}</div>
                <div v-else class="text-center text-7xl" style="color:#282828;font-family: Oldenburg;">{{ card.number }}</div>
                <div class="p-2 rotate-180"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
            </div>
        </div>
    </div>   

    <div class="test">
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
        <div v-show="!startGame" class="h-screen flex flex-col justify-center items-center">
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
       

        
    </div>
    
    <div v-show="startGame" class="h-screen bg-gray-800 overflow-hidden">
        <nav class="bg-black text-white py-4 px-4 border-b-4 border-yellow-600">
            <div class="max-w-screen-xl mx-auto flex items-center justify-between">
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="self-center text-2xl text-white font-semibold whitespace-nowrap ">PeePhanan</span>
                </div>
                <div class="text-2xl font-bold hidden w-full md:flex md:w-auto ">BLACKJACK</div>

                <div class="flex text-white md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <span class="self-center text-2xl text-white font-semibold whitespace-nowrap "><span class="text-sm text-stone-200 ">Your balance </span>${{ player.balance }}</span>
                </div>
            </div>
        </nav>
        <!-- StartGame Table -->
        <div v-show="startGame" class="slide-up bg-cover flex justify-center bg-center w-full h-full shadow-xl" style="background-image: url('./Image/BackGround.jpg');" >
            <div v-show="!betToStartGame" class="flex items-center">
                <div class="max-w-sm p-6 border rounded-lg shadow-sm bg-gray-800 from-gray-800 to-black border-yellow-500">
                    <div class="w-7 h-7 text-gray-400 mb-3">
                        $
                    </div>
                    <div>
                        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-yellow-300">How much your first bet?</h5>
                    </div>
                    <form @submit.prevent="handleBetStartGame">
                        <input 
                            v-model="bet" 
                            type="number" 
                            min="1"  
                            placeholder="ใส่จำนวนเดิมพัน"
                            class="mb-3 font-normal mr-2 px-4 py-2 slide-right text-yellow-300 bg-gradient-to-r from-gray-800 to-black border border-yellow-500 rounded-lg shadow-sm placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 ease-in-out"/>
                        <button
                            type="submit"
                            class="px-6 py-3 text-lg font-bold slide-left text-yellow-300 bg-gradient-to-r from-black via-gray-800 to-black border border-yellow-500 rounded-lg shadow-md hover:shadow-yellow-500/50 hover:bg-yellow-500 hover:text-yellow-200 hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:border-red-500 disabled:cursor-not-allowed"
                            :disabled="bet > player.balance"
                            v-text="bet > player.balance ? 'เงินไม่พอ' : '🃏เริ่มเกม🃏'">
                        </button>
                    </form>
                </div>
            </div>

            <div v-show="betToStartGame">
                <h1 class="mb-2 mt-6 text-3xl font-bold tracking-wide text-red-400 
                        bg-gradient-to-b from-yellow-300 to-yellow-500 
                        shadow-lg shadow-yellow-500/50 
                        border-2 border-yellow-500 
                        px-6 py-3 rounded-lg"
                        v-show="result.length > 0">
                        {{ result }}
                    </h1>
                    <button
                            type="submit"
                            class="px-6 py-3 text-lg font-bold slide-left text-yellow-300 bg-gradient-to-r from-black via-gray-800 to-black border border-yellow-500 rounded-lg shadow-md hover:shadow-yellow-500/50 hover:bg-yellow-500 hover:text-yellow-200 hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:border-red-500 disabled:cursor-not-allowed"
                            v-show="result.length > 0"
                            v-text="'Retry'"
                            @click="resetGame">

                    </button>
                    
                <div class="flex-1 flex flex-col items-center justify-center">
                    <div class="px-4 py-1 mt-3 hoverzoom w-[9rem] flex slide-left justify-center bg-black/50 rounded-full border border-yellow-500/30 backdrop-blur">
                        <h2 class="text-xl font-bold text-yellow-500 ">Dealer {{ dealer.handCount }}</h2>
                    </div>
                    <ul class="flex w-full items-center justify-center">
                        <li class="m-5" v-for="card in dealer.hands" :key="card.symbols + card.number ">
                            <div :class="`w-40 h-48 border-2 border-solid border-gray-900 rounded-sm bg-${card.color} flex flex-col justify-between`">
                                <div class="p-2"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
                                <div v-if="card.symbols=='diamond'||card.symbols=='heart'" class="text-center text-7xl" style="color: #ff4d4d;font-family: Oldenburg;">{{ card.number }}</div>
                                <div v-else class="text-center text-7xl" style="color:#282828;font-family: Oldenburg;">{{ card.number }}</div>
                                <div class="p-2 rotate-180"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
                            </div>
                        </li>
                        <li v-show="!DealerPlay">
                            <div class="w-40 h-48 border-2 border-solid border-gray-900 rounded-sm bg-rose-50 flex flex-col justify-between" > 
                                <div style="padding: 10px;"></div>
                                <div style="text-align: center; font-size: 70px; color: #282828;font-family: Oldenburg;">?</div>
                                <div style="padding: 10px;"></div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                <div class="w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
                <div class="flex-1 flex flex-col items-center justify-center">
                    <div class="px-4 py-1 hoverzoom w-[9rem] mt-3 flex justify-center bg-black/50 rounded-full border border-yellow-500/30 backdrop-blur slide-right">
                        <h2 class="text-xl font-bold text-yellow-500 ">Player {{player.handCount }} </h2>
                    </div>
                    <ul class="flex w-full items-center justify-center">
                        <li class="m-5" v-for="card in player.hands" :key="card.symbols + card.number ">
                            <div :class="`w-40 h-48 border-2 border-solid border-gray-900 rounded-sm bg-${card.color} flex flex-col justify-between`">
                                <div class="p-2"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
                                <div v-if="card.symbols=='diamond'||card.symbols=='heart'" class="text-center text-7xl" style="color: #ff4d4d;font-family: Oldenburg;">{{ card.number }}</div>
                                <div v-else class="text-center text-7xl" style="color:#282828;font-family: Oldenburg;">{{ card.number }}</div>
                                <div class="p-2 rotate-180"><img :src="`../Image/${card.symbols}.png`" style="width:25px;"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>        
        <!-- footer -->
        <div v-show="betToStartGame" class="relative bg-green-500">
            <div class="absolute bottom-20 left-5 text-white">
                <p>${{ bet }}</p>
                <p class="text-xl">TOTAL BET</p>
            </div>
            <div class="absolute bottom-20 right-5 text-white">
                <!-- ปุ่มควบคุม -->
                <div v-show="!DealerPlay" class="flex items-center justify-center mt-4 gap-4 w-full">
                    <button 
                        class="px-6 py-2 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-400 transition"
                        @click="handleHit">
                        <div class="relative flex flex-col items-center">
                            <img class="size-16 p-1 drop-shadow-md" src="../Image/hit.png">
                            <span class="text-sm font-bold absolute bottom-[-18px] bg-green-500 text-white px-3 py-1 rounded-lg shadow-md border border-green-700">Hit</span>
                        </div>
                    </button>
                    <button 
                        class="px-6 py-2 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-400 transition"
                        @click="handleStand">
                        <div class="relative flex flex-col items-center">
                            <img class="size-16 p-1 drop-shadow-md" src="../Image/stand.png">
                            <span class="text-sm font-bold absolute bottom-[-18px] bg-red-500 text-white px-3 py-1 rounded-lg shadow-md border border-green-700">Stand</span>
                        </div>
                    </button>
                    <button 
                        class="px-6 py-2 text-lg font-bold text-white bg-yellow-600 rounded-lg hover:bg-yellow-400 transition"
                        :disabled="bet * 2 > player.balance"
                        @click="handleDouble">
                        <div class="relative flex flex-col items-center">
                            <img class="size-16 p-1 drop-shadow-md" src="../Image/double.png">
                            <span class="text-sm font-bold absolute bottom-[-18px] bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md border border-green-700">Double</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>    
    </div>



</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
</style>
