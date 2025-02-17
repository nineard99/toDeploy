<script setup>
    import { onMounted} from 'vue'
    import {  startGame, betToStartGame,bet,DealerPlay,continueGame,result,player,dealer ,howToPlay} from './scripts/gameState'
    import {loadGameData } from './scripts/storage'
    import { handleBetStartGame,handleHit, handleStand, handleDouble, resetGame} from './scripts/gameAction'
    import {outOfMoney} from './scripts/gameResult'

    //USE WHEN WEB RELOAD
    onMounted(() => {
        if(localStorage.getItem('gameData')) continueGame.value = true
    })

    
</script>

<template>
    <div class="w-full bg-gray-800">
        <!-- Before StartGame -->
        <div v-show="!startGame" class="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-green-900">
            <div class="text-center mb-6">
                <p class="text-5xl animate-pulse  font-extrabold text-yellow-400 tracking-wider drop-shadow-lg neon-text">
                    ♠️ BLACKJACK ♦️
                </p>
                <p class="text-2xl font-bold text-yellow-200 drop-shadow-md mt-3">
                    High Score: <span class="text-white">{{player.highscore}}</span>
                </p>
            </div>

            <div class="flex gap-6">
                <button 
                    @click="startGame = true"
                    class="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all transform duration-200">
                    🎲 PLAY GAME
                </button>
                <button
                    v-show="continueGame"
                    @click="loadGameData"
                    class="px-6 py-3 bg-yellow-600 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all transform duration-200">
                    🔄 CONTINUE
                </button>
            </div>
            <button @click="howToPlay =!howToPlay" type="button" class="m-4 text-sm p-2.5 text-center inline-flex items-center bg-yellow-500 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all transform duration-200">
                <span class="h-4"> How to play ? </span>
            </button>
        </div>

        <div v-show="howToPlay" class="overflow-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full p-4">
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
        <nav class="bg-gradient-to-b from-black to-gray-900 text-white py-4 px-6 border-b-4 border-yellow-600 shadow-lg">
            <div class="max-w-screen-xl mx-auto flex items-center justify-between">
                
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="self-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]">
                        PeePhanan
                    </span>
                </div>

                <div class="text-3xl font-black tracking-widest hidden w-full md:flex md:w-auto text-yellow-400 drop-shadow-lg">
                        BLACKJACK 
                </div>

                <div class="flex items-center space-x-6 text-white md:order-2">
                    
                    <!-- Money -->
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 text-2xl" > 💰</span>
                        <span class="text-lg font-semibold text-yellow-300">
                            <span class="text-sm text-gray-400">Your Balance:</span> ${{ player.balance }}
                        </span>
                    </div>

                    <!-- WinStreak -->
                    <div class="flex items-center gap-2">
                        <span class="w-6 h-6 text-2xl" > 🔥 </span>
                        <span class="text-lg font-semibold text-green-400">
                            <span class="text-sm text-gray-400">WinStreak:</span> {{ player.winStreak }}
                        </span>
                    </div>
                </div>
            </div>
        </nav>

        <!-- StartGame Table -->
        <div v-show="startGame" class="slide-up bg-cover flex justify-center bg-center w-full h-full shadow-xl" style="background-image: url('./Image/BackGround.jpg');" >
            <div v-show="!betToStartGame" class="flex items-center">
                <div class="max-w-sm p-6 border rounded-lg shadow-sm bg-gray-800 from-gray-800 to-black border-yellow-500">
                    <div class="h-7 text-gray-400 mb-3 w-full">
                        Your Balance: ${{ player.balance }}
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
                            class="mb-3 font-normal mr-2 px-4 py-2 slide-right text-yellow-300 bg-gradient-to-r from-gray-800 to-black border border-yellow-500 rounded-lg shadow-sm placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 ease-in-out"
                        />
                        <button
                        type="button"
                            @click="bet = player.balance"
                            class="px-6 py-3 text-lg font-bold slide-left text-red-300 bg-gradient-to-r from-black via-red-800 to-black border border-yellow-500 rounded-lg shadow-md hover:shadow-yellow-500/50 hover:bg-yellow-500 hover:text-yellow-200 hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:border-red-500 disabled:cursor-not-allowed"
                            >
                            ALL IN
                        </button>
                        <button
                            type="submit"
                            class="px-6 py-3 text-lg font-bold slide-left text-yellow-300 bg-gradient-to-r from-black via-gray-800 to-black border border-yellow-500 rounded-lg shadow-md hover:shadow-yellow-500/50 hover:bg-yellow-500 hover:text-yellow-200 hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:border-red-500 disabled:cursor-not-allowed"
                            :disabled="bet > player.balance"
                            v-text="bet > player.balance ? 'Insufficient Balance' : 'Start Game'">
                        </button>
                    </form>
                </div>
            </div>

            <div v-show="betToStartGame">
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
        <div v-show="betToStartGame" class="relative bg-green-500">
            <div class="absolute bottom-20 left-5 text-white p-4 bg-black/40 rounded-lg shadow-xl border-2 border-yellow-500">
                <p class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                    ${{ bet }}
                </p>
                <p class="text-2xl font-black tracking-[0.15em] text-yellow-300 drop-shadow-md uppercase">
                    TOTAL BET
                </p>
            </div>

            
            <div class="absolute bottom-20 right-5 text-white">
                <!-- ปุ่มควบคุม -->
                <div v-show="!DealerPlay" class="flex items-center justify-center mt-4 gap-4 w-full">
                    <button 
                        class="px-6 hoverzoom py-2 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-400 transition"
                        @click="handleHit">
                        <div class="relative flex flex-col items-center">
                            <img class="size-16 p-1 drop-shadow-md" src="../Image/hit.png">
                            <span class="text-sm font-bold absolute bottom-[-18px] bg-green-500 text-white px-3 py-1 rounded-lg shadow-md border border-green-700">Hit</span>
                        </div>
                    </button>
                    <button 
                        class="px-6 py-2 hoverzoom text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-400 transition"
                        @click="handleStand">
                        <div class="relative flex flex-col items-center">
                            <img class="size-16 p-1 drop-shadow-md" src="../Image/stand.png">
                            <span class="text-sm font-bold absolute bottom-[-18px] bg-red-500 text-white px-3 py-1 rounded-lg shadow-md border border-green-700">Stand</span>
                        </div>
                    </button>
                    <button 
                        class="px-6 py-2 text-lg hoverzoom font-bold text-white bg-yellow-600 rounded-lg hover:bg-yellow-400 transition disabled:bg-yellow-300 disabled:cursor-not-allowed disabled:text-gray-500"
                        v-if="bet <= player.balance"
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

    <div v-if="result === 'You Lose' && player.balance === 0" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
        <div class="bg-white p-12 rounded-2xl shadow-2xl w-[500px] max-w-full text-center">
            <h2 class="text-4xl font-extrabold text-red-600">Game Over</h2>
            <p class="mt-4 text-lg text-gray-700">Your balance has reached 0</p>
            <p class="text-lg text-gray-700">Better luck next time!</p>
            <button @click="outOfMoney" class="px-6 py-3 my-3 bg-yellow-500 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all transform duration-200">
                ขอตังพ่อ
            </button>
        </div>
    </div>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
</style>
