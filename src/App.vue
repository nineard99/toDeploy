<script setup>
    let arrDeck=[
        {'symbols':'club','number':'K'},{'symbols':'club','number':'Q'},{'symbols':'club','number':'J'},
        {'symbols':'diamond','number':'K'},{'symbols':'diamond','number':'Q'},{'symbols':'diamond','number':'J'},
        {'symbols':'heart','number':'K'},{'symbols':'heart','number':'Q'},{'symbols':'heart','number':'J'},
        {'symbols':'spade','number':'K'},{'symbols':'spade','number':'Q'},{'symbols':'spade','number':'J'}
    ]
    for (let i = 1; i <= 4; i++) {
        switch (i) {
            case 1:
                for (let j = 1; j <= 10; j++) {
                    arrDeck.push({'symbols':'club','number':j})
                }
                break;
            case 2:
                for (let j = 1; j <= 10; j++) {
                    arrDeck.push({'symbols':'diamond','number':j})
                }
                break;
            case 3:
                for (let j = 1; j <= 10; j++) {
                    arrDeck.push({'symbols':'heart','number':j})
                }
                break;
            case 4:
                for (let j = 1; j <= 10; j++) {
                    arrDeck.push({'symbols':'spade','number':j})
                }
                break;
        }
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
</script>

<template>
    <div id="deck" v-show="false" class="grid grid-cols-12 gap-4">
        <div v-for="card in arrDeck">
            <div v-if="card.symbols=='club'||card.symbols=='spade'" class="w-40 h-48 border-2 border-solid border-gray-900 rounded-sm bg-stone-100 flex flex-col justify-between">
                <div style="padding: 10px;"><img :src="`../symbolDeckImage/${card.symbols}.png`" style="width:25px;"></div>
                <div style="text-align: center; font-size: 70px; color: #282828;font-family: Oldenburg;">{{ card.number }}</div>
                <div style="padding: 10px; rotate: 180deg; align-items: end;"><img :src="`../symbolDeckImage/${card.symbols}.png`" style="width:25px;"></div>
            </div>
            <div v-else="card.symbols=='diamond'||card.symbols=='heart'" class="w-40 h-48 border-2 border-solid border-gray-900 rounded-sm bg-rose-50 flex flex-col justify-between">
                <div style="padding: 10px;"><img :src="`../symbolDeckImage/${card.symbols}.png`" style="width:25px;"></div>
                <div style="text-align: center; font-size: 70px; color: #282828;font-family: Oldenburg;">{{ card.number }}</div>
                <div style="padding: 10px; rotate: 180deg; align-items: end;"><img :src="`../symbolDeckImage/${card.symbols}.png`" style="width:25px;"></div>
            </div>
        </div>
    </div>
    <div >
       <!-- check score function -->
       {{ checkScore(32,21) }}
          
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oldenburg&display=swap');
</style>
