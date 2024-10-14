const input = document.querySelector('input')
const output = document.querySelector('output')
const counterDisplay = document.querySelector('#counter')

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

let randomizedWord = ''
let maskedWord = ''
let guesscounter = 0

const newGame = () => {
    const random = Math.floor(Math.random() * 10) + 1
    randomizedWord = words[random]
    maskedWord = "*".repeat(randomizedWord.length)
    console.log(randomizedWord)
    output.innerHTML = maskedWord
    guesscounter = 0
    counterDisplay.textContent = guesscounter
}

const replaceFoundChars = (guess) => {
    for (let i = 0;i<randomizedWord.length;i++) {
        const char = randomizedWord.substring(i,i+1)
        if (char === guess) {
            let newString = maskedWord.split('')
            newString.splice(i,1,guess)
            newString = newString.join('')
            maskedWord =newString
        }
    }
    output.innerHTML =maskedWord
}

newGame()

input.addEventListener('keypress',(e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        guesscounter++
        counterDisplay.textContent = guesscounter

        const guess = input.value
        if (guess.toLowerCase() === randomizedWord.toLowerCase()) {    
            win()
        } else if (guess.length === 1) {
            replaceFoundChars(guess)
            if (maskedWord.toLocaleLowerCase() === randomizedWord.toLocaleLowerCase()) {
                win()
            }
        } else {
            alert("You guessed wrong!")
        }

        input.value = ''
    }
})

const win = () => {
    alert(`You have guessed right, the word is "${randomizedWord}". You needed ${guesscounter} guesses!`)
    newGame()
}