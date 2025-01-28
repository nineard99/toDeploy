<script setup>
    import { ref } from 'vue'
    import {addCardToHand , randomCard , arrDeck} from './scripts/deck'
    const startGame = ref(false)
    const betToStartGame = ref(false)
    const bet = ref(0)
    const DealerPlay = ref(false)
    let HiddenCardDealer = {}
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

    const handleBetStartGame = (event) => {
        event.preventDefault()
        console.log(bet.value)
        betToStartGame.value = true;
        addCardToHand(player)
        addCardToHand(player)
        addCardToHand(dealer)
        addCardToHand(dealer)
        HiddenCardDealer = dealer.value.hands.pop()
        console.log(HiddenCardDealer)
    }
    function handleHit(){
        addCardToHand(player)
    }

    function handleStand(){
        DealerPlay.value = true
        dealer.value.hands.push(HiddenCardDealer)
        dealerControll()

    }
    function handleDouble(){
        addCardToHand(player)
        DealerPlay.value = true
        dealer.value.hands.push(HiddenCardDealer)
        dealerControll()
    }

    function dealerControll() {
        setTimeout(() => {
            function addCardWithDelay() {
                if (dealer.value.handCount < 18) {
                    addCardToHand(dealer); 
                    setTimeout(addCardWithDelay, 1000);
                }
            }
            addCardWithDelay();
        }, 1000); 
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
        <div v-show="startGame" class="slide-down px-5 py-1 mb-10 hoverzoom flex justify-center items-center bg-black/50 rounded-full border border-yellow-500/30 backdrop-blur">
            <h2 class="text-xl font-extrabold text-green-400 ">${{ player.balance }}</h2>
        </div>
       
        <!-- StartGame Table -->
        <div v-show="startGame" class="slide-up bg-cover flex items-center justify-center bg-center w-[80%] h-[70%] rounded-[3rem] border-4 border-yellow-350 shadow-xl" style="background-image: url('./Image/BackGround.jpg');" >
            <div v-show="betToStartGame" class="h-[90%] w-[90%] flex flex-col ">
                <div class="flex-1 flex flex-col items-center justify-center">
                    <div class="px-4 py-1 mt-3 hoverzoom w-[9rem] flex slide-left justify-center bg-black/50 rounded-full border border-yellow-500/30 backdrop-blur">
                        <h2 class="text-xl font-bold text-yellow-500 ">Dealer {{ dealer.handCount }}</h2>
                    </div>
                    <ul class="flex w-full items-center justify-center">
                        <li class="m-5" v-for="card in dealer.hands" :key="card.symbols + card.number ">
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
                        </li>
                    </ul>
                    <!-- ปุ่มควบคุม -->
                    <div v-show="!DealerPlay" class="flex items-center justify-center mt-4 gap-4">
                        <button 
                            class="px-6 py-2 text-lg font-bold text-white bg-green-500 rounded-lg hover:bg-green-400 transition"
                            @click="handleHit">
                            Hit
                        </button>
                        <button 
                            class="px-6 py-2 text-lg font-bold text-white bg-red-500 rounded-lg hover:bg-red-400 transition"
                            @click="handleStand">
                            Stand
                        </button>
                        <button 
                            class="px-6 py-2 text-lg font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-400 transition"
                            :disabled="bet * 2 > player.balance"
                            @click="handleDouble">
                            Double
                        </button>
                    </div>
                </div>
            </div>
            <div v-show="!betToStartGame">
                <form @submit.prevent="handleBetStartGame">
                    <input 
                        v-model="bet" 
                        type="number" 
                        min="1"  
                        placeholder="ใส่จำนวนเดิมพัน"
                        class="mr-2 px-4 py-2 slide-right text-yellow-300 bg-gradient-to-r from-gray-800 to-black border border-yellow-500 rounded-lg shadow-sm placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 ease-in-out"/>
                    <button
                        type="submit"
                        class="px-6 py-3 text-lg font-bold slide-left text-yellow-300 bg-gradient-to-r from-black via-gray-800 to-black border border-yellow-500 rounded-lg shadow-md hover:shadow-yellow-500/50 hover:bg-yellow-500 hover:text-yellow-200 hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:border-red-500 disabled:cursor-not-allowed"
                        :disabled="bet > player.balance"
                        v-text="bet > player.balance ? 'เงินไม่พอ' : '🃏เริ่มเกม🃏'">
                    </button>
                </form>
            </div>

        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
</style>
