import { ref } from 'vue'

export const startGame = ref(false)
export const betToStartGame = ref(false)
export const bet = ref(0)
export const DealerPlay = ref(false)
export const continueGame = ref(false)
export const HiddenCardDealer = ref({})
export const result = ref("")
export const howToPlay=ref(false)

export const player = ref({
    balance: 1000,
    highScore: localStorage.getItem('money'),
    hands: [],
    handCount: 0,
    winStreak: 0
})

export const dealer = ref({
    hands: [],
    handCount: 0
})
