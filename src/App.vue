<script setup>
    import { onMounted} from 'vue'
    import {highscore,doublePlay,  startGame, betToStartGame,bet,DealerPlay,continueGame,result,player,dealer ,howToPlay} from './scripts/gameState'
    import {loadGameData } from './scripts/storage'
    import { handleBetStartGame,handleHit, handleStand, handleDouble, resetGame} from './scripts/gameAction'
    import { outOfMoney } from './scripts/gameResult';

    //USE WHEN WEB RELOAD
    onMounted(() => {
        if(localStorage.getItem('gameData')) continueGame.value = true
        if(localStorage.getItem('highscore')) highscore.value = localStorage.getItem('highscore')
    })

    
</script>

<template>
    <div class="w-full bg-gray-800">
        <!-- Before StartGame -->
        <div v-show="!startGame" class="h-screen  flex flex-col justify-center items-center bg-gradient-to-b from-black to-green-900">
            
            <div class="text-center slide-down mb-6">
                    <p class="text-5xl animate-pulse   font-extrabold text-yellow-400 tracking-wider drop-shadow-lg neon-text">
                        ♠️ BLACKJACK ♦️
                    </p>
                
                <p class="text-2xl font-bold text-yellow-200 drop-shadow-md mt-3">
                    High Score: <span class="text-white">{{ highscore }}</span>
                </p>
            </div>

            <div class="flex gap-6">
                <button 
                    @click="startGame = true"
                    class="px-6 py-3 slide-right bg-yellow-500 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all transform duration-200">
                    🎲 NEW GAME
                </button>
                <button
                    v-show="continueGame"
                    @click="loadGameData"
                    class="px-6 py-3 slide-left bg-yellow-500 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all transform duration-200">
                    CONTINUE
                </button>
            </div>
            <button @click="howToPlay =!howToPlay" type="button" class="m-4 slide-left text-sm p-2.5 text-center inline-flex items-center bg-yellow-500 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all transform duration-200">
                <span class="h-7 text-xl"> How to play ? </span>
            </button>
        </div>

        <div v-show="howToPlay" class="overflow-hidden fade-in fixed inset-0 z-50 flex justify-center items-center w-full h-full p-4">
            <div class="relative p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div class="relative bg-white rounded-lg shadow-lg">
                    <button @click="howToPlay =!howToPlay " type="button" class="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                    <div class="p-6 md:p-8 text-center overflow-y-auto max-h-[80vh]">
                        <h3 class="mb-6 text-xl font-semibold text-gray-700 dark:text-gray-600">เป้าหมายของเกม: ทำแต้มให้ใกล้เคียง 21 มากที่สุด แต่ห้ามเกิน</h3>
                        <ul class="mb-6 text-base font-normal text-gray-600 dark:text-gray-400 text-left space-y-4">
                            <li><strong>เป้าหมายของเกม:</strong> ทำแต้มให้ใกล้ 21 มากที่สุด ห้ามเกิน</li>
                            <li><strong>การแจกไพ่:</strong> 
                                <ul class="ml-6 list-disc">
                                    <li>ผู้เล่นและเจ้ามือได้รับไพ่คนละ 2 ใบ</li>
                                    <li>ไพ่ของผู้เล่นหงายทั้งหมด ส่วนเจ้ามือหงาย 1 ใบ</li>
                                </ul>
                            </li>
                            <li><strong>มูลค่าไพ่:</strong>
                                <ul class="ml-6 list-disc">
                                    <li>เลข 2-10 มีค่าตามตัวเลข</li>
                                    <li>J, Q, K มีค่า 10</li>
                                    <li>A มีค่า 1 หรือ 11 ขึ้นอยู่กับสถานการณ์</li>
                                </ul>
                            </li>
                            <li><strong>ตัวเลือกของผู้เล่น:</strong>
                                <ul class="ml-6 list-disc">
                                    <li><strong>Hit:</strong> ขอไพ่เพิ่ม</li>
                                    <li><strong>Stand:</strong> หยุด ไม่ขอไพ่เพิ่ม</li>
                                    <li><strong>Double Down:</strong> เพิ่มเงินเดิมพัน 2 เท่า และรับไพ่เพิ่ม 1 ใบ</li>
                                </ul>
                            </li>
                            <li><strong>กติกาของเจ้ามือ:</strong>
                                <ul class="ml-6 list-disc">
                                    <li>ต้องจั่วไพ่เพิ่มถ้าแต้มต่ำกว่า 17</li>
                                    <li>หยุดเมื่อแต้ม 17 ขึ้นไป</li>
                                </ul>
                            </li>
                            <li><strong>ตัดสินผล:</strong>
                                <ul class="ml-6 list-disc">
                                    <li><strong>Blackjack (21 แต้มจากไพ่ 2 ใบแรก):</strong> ชนะทันที</li>
                                    <li><strong>แต้มสูงกว่าเจ้ามือ แต่ไม่เกิน 21:</strong> ชนะ</li>
                                    <li><strong>แต้มเกิน 21 (Bust):</strong> แพ้</li>
                                    <li><strong>แต้มเท่ากับเจ้ามือ:</strong> เสมอ (Push)</li>
                                </ul>
                            </li>
                        </ul>
                        <button @click="startGame = true, howToPlay = false, gameDescription()" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-6 py-3">
                            Let's Play
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
    <div v-show="startGame" class="h-screen bg-gray-800 overflow-hidden">
        <nav class="bg-gradient-to-b from-black to-gray-900 text-white px-2 md:py-4 md:px-6 border-b-4 border-yellow-600 shadow-lg">
            <div class="max-w-screen-xl mx-auto flex items-center justify-between">
                
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="self-center text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]">
                        PeePhanan
                    </span>
                </div>

                <div class="text-3xl font-black tracking-widest hidden w-full md:flex md:w-auto text-yellow-400 drop-shadow-lg">
                        BLACKJACK 
                </div>

                <div class="flex items-center space-x-6 text-white md:order-2">
                    
                    <!-- Money -->
                    <div class="flex items-center px-4 py-1 gap-2 hoverzoom rounded-full border border-yellow-500/30 backdrop-blur">
                        <span class="text-sm md:text-lg font-semibold text-center text-yellow-300">
                            <span class="text-xs md:text-sm text-gray-400">💰Your Balance:</span> ${{ player.balance }}
                        </span>
                    </div>
                
                    <!-- WinStreak -->
                    <div class="flex items-center px-4 py-1 gap-2 rounded-full hoverzoom border border-yellow-500/30 backdrop-blur">
                        <span class="text-sm md:text-lg font-semibold text-center text-green-400">
                            <span class="text-xs md:text-sm text-gray-400">🔥WinStreak:</span> {{ player.winStreak }}
                        </span>
                    </div>
                </div>
            </div>
        </nav>

        <!-- StartGame Table -->
        <div v-show="startGame" class="slide-up bg-cover flex pt-20 justify-center bg-center w-full h-full shadow-xl" style="background-image: url('src/assets/BackGround.jpg');" >
            <div v-show="!betToStartGame" class="flex items-center md:scale-150">
                <div class="max-w-md md:w-[20rem] p-6 border-2 rounded-lg shadow-lg bg-gray-900 border-yellow-500">
                    <div class="text-gray-300 text-lg font-semibold mb-4">Your Balance: <span class="text-yellow-400">${{ player.balance }}</span></div>
                    <h2 class="mb-4 text-2xl font-bold text-yellow-300">Place Your First Bet</h2>
                    
                    <form @submit.prevent="handleBetStartGame" class="space-y-4">
                        <input 
                        v-model="bet" 
                        type="number" 
                        min="1" 
                        placeholder="Enter Bet Amount"
                        class="w-full px-4 py-2 text-yellow-300 bg-gray-800 border border-yellow-500 rounded-lg shadow-sm placeholder-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300 ease-in-out"
                        />
                        
                        <div class="grid grid-cols-3 gap-2">
                            <button type="button" @click="bet = player.balance" class="casino-btn ">ALL IN</button>
                            <button type="button" @click="bet = Math.round(player.balance / 2)" class="casino-btn" v-text="Math.round(player.balance / 2)"></button>
                            <button type="button" @click="bet = Math.round(player.balance / 5)" class="casino-btn" v-text="Math.round(player.balance / 5)"></button>
                        </div>
                        
                        <button
                        type="submit"
                        class="casino-btn w-full h-10"
                        :disabled="bet > player.balance"
                        >
                        {{ bet > player.balance ? 'Insufficient Balance' : 'Start Gambling' }}
                        </button>
                    </form>
                    </div>
            </div>

            <div v-show="betToStartGame" class="md:-m-10"> 
                <div class="-mt-[4.5rem] md:hidden hoverzoom  text-white p-2 bg-black/40 rounded-lg shadow-xl border-2 border-yellow-500">
                    <p class="text-xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                        ${{ bet }}
                    </p>
                    <p class="text-xl font-black tracking-[0.15em] text-yellow-300 drop-shadow-md uppercase">
                        TOTAL BET
                    </p>
                </div>    

                <div class="flex-1 flex flex-col items-center justify-center">
                    <div class="px-4 py-1 mt-3 hoverzoom w-[9rem] flex slide-left justify-center bg-black/50 rounded-full border border-yellow-500/30 backdrop-blur">
                        <h2 class="w-lg md:text-xl font-bold text-yellow-500 ">Dealer {{ dealer.handCount }}</h2>
                    </div>
                    <ul class="flex flex-wrap w-full items-center justify-center">
                        <li class="m-0.5 hoverzoom md:m-2.5 slide-down " v-for="card in dealer.hands" :key="card.symbols + card.number ">
                            <div :class="`w-24 h-32 md:w-40 md:h-48 border-2 border-solid border-gray-900 rounded-sm bg-white flex flex-col justify-between`">
                                <div class="p-2"><img :src="`../Image/${card.symbols}.png`" class="w-4 md:w-7"></div>
                                <div v-if="card.symbols=='diamond'||card.symbols=='heart'" class="text-center text-5xl md:text-7xl" style="color: #ff4d4d;font-family: Oldenburg;">{{ card.number }}</div>
                                <div v-else class="text-center text-5xl md:text-7xl" style="color:#282828;font-family: Oldenburg;">{{ card.number }}</div>
                                <div class="p-2 rotate-180"><img :src="`../Image/${card.symbols}.png`" class="w-4 md:w-7"></div>
                            </div>
                        </li>
                        <li v-show="!DealerPlay" class="m-0.5 slide-down hoverzoom  md:m-2.5">
                            <div :class="`w-24 h-32 md:w-40 md:h-48 border-2 border-solid border-gray-900 rounded-sm bg-white flex items-center justify-center`">
                                <div class="text-center text-5xl md:text-7xl" style="color:#282828;font-family: Oldenburg;"> ? </div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                <div class="w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>

                <div v-show="result.length > 0" class="mb-2 mt-6 text-3xl font-bold tracking-wide text-red-400 
                            bg-gradient-to-b from-yellow-300 to-yellow-500 
                            shadow-lg shadow-yellow-500/50 
                            border-2 border-yellow-500 
                            px-6 py-3 rounded-lg">
                    <div class="flex justify-between items-center">
                        {{ result }}
                        <button
                            type="submit"
                            class="px-6 py-3 text-lg font-bold slide-left text-yellow-300 bg-gradient-to-r from-black via-gray-800 to-black border border-yellow-500 rounded-lg shadow-md hover:shadow-yellow-500/50 hover:bg-yellow-500 hover:text-yellow-200 hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:border-red-500 disabled:cursor-not-allowed"
                            v-text="'Retry'"
                            @click="resetGame">
                        </button>
                    </div>
                </div>

                <div class="flex-1 flex flex-col items-center justify-center">
                    <div class="px-4 py-1 hoverzoom w-[9rem] mt-3 flex justify-center bg-black/50 rounded-full border border-yellow-500/30 backdrop-blur slide-right">
                        <h2 class="w-lg md:text-xl font-bold text-yellow-500 ">Player {{player.handCount }} </h2>
                    </div>
                    <ul class="flex flex-wrap w-full items-center justify-center">
                        <li class="m-0.5 hoverzoom md:m-2.5 slide-up " v-for="card in player.hands" :key="card.symbols + card.number" >
                            <div :class="`w-24 h-32 md:w-40 md:h-48 border-2 border-solid border-gray-900 rounded-sm bg-white flex flex-col justify-between`">
                                <div class="p-2"><img :src="`../Image/${card.symbols}.png`" class="w-4 md:w-7"></div>
                                <div v-if="card.symbols=='diamond'||card.symbols=='heart'" class="text-center text-5xl md:text-7xl" style="color: #ff4d4d;font-family: Oldenburg;">{{ card.number }}</div>
                                <div v-else class="text-center text-5xl md:text-7xl" style="color:#282828;font-family: Oldenburg;">{{ card.number }}</div>
                                <div class="p-2 rotate-180"><img :src="`../Image/${card.symbols}.png`" class="w-4 md:w-7"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>        
        <!-- footer -->
        <div v-show="betToStartGame" class="relative bg-green-500 bottom-10 sm:bottom-0 ">
            <div class="absolute hidden md:block hoverzoom bottom-20 left-5 text-white p-4 bg-black/40 rounded-lg shadow-xl border-2 border-yellow-500">
                <p class="text-4xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                    ${{ bet }}
                </p>
                <p class="text-2xl font-black tracking-[0.15em] text-yellow-300 drop-shadow-md uppercase">
                    TOTAL BET
                </p>
            </div>

            
            <div class="absolute bottom-20 left-5 sm:left-0 right-5 text-white">
                <!-- ปุ่มควบคุม -->
                <div v-show="!DealerPlay" class="flex items-center justify-center mt-4 gap-4 w-full">
                    <button 
                        class="px-6 hoverzoom py-2 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-400 transition"
                        @click="handleHit">
                        <div class="relative flex flex-col items-center">
                            <img class="size-16 p-1 drop-shadow-md" src="./assets/hit.png">
                            <span class="text-sm font-bold absolute bottom-[-18px] bg-green-500 text-white px-3 py-1 rounded-lg shadow-md border border-green-700">Hit</span>
                        </div>
                    </button>
                    <button 
                        class="px-6 py-2 hoverzoom text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-400 transition"
                        @click="handleStand">
                        <div class="relative flex flex-col items-center">
                            <img class="size-16 p-1 drop-shadow-md" src="./assets/stand.png">
                            <span class="text-sm font-bold absolute bottom-[-18px] bg-red-500 text-white px-3 py-1 rounded-lg shadow-md border border-green-700">Stand</span>
                        </div>
                    </button>
                    <button 
                        class="px-6 py-2 text-lg hoverzoom font-bold text-white bg-yellow-600 rounded-lg hover:bg-yellow-400 transition disabled:bg-yellow-300 disabled:cursor-not-allowed disabled:text-gray-500"
                        v-if="bet <= player.balance && doublePlay"
                        @click="handleDouble">
                        <div class="relative flex flex-col items-center">
                            <img class="size-16 p-1 drop-shadow-md" src="./assets/double.png">
                            <span class="text-sm font-bold absolute bottom-[-18px] bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md border border-green-700">Double</span>
                        </div>
                    </button>

                </div>
            </div>
        </div>    
    </div>

    <div v-if="result === 'You Lose' && player.balance === 0" class="fixed fade-in inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
        <div class="bg-white p-12 rounded-2xl shadow-2xl w-[500px] max-w-full text-center">
            <h2 class="text-4xl font-extrabold text-red-600">Game Over</h2>
            <p class="mt-4 text-lg text-gray-700">Your balance has reached 0</p>
            <p class="text-lg text-gray-700">Better luck next time!</p>
            <button @click="outOfMoney" class="px-6 py-3 my-3 bg-yellow-500 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all transform duration-200">
                Retry
            </button>
        </div>
    </div>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
</style>
