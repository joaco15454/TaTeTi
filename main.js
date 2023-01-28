// ELEMENTOS DE HTML
const turnPlayer = document.querySelector(`#turnPlayer`)
const restartGame = document.querySelector(`.restart`)
const boxGame = Array.from(document.getElementsByClassName(`box`))
const playerWinner = document.querySelector(`.name_winner`)
const msgGanador = document.querySelector(`.mensaje_ganador`)
const title = document.querySelector(`.title`)
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(`--cyan`)
// CONSTS AND LETS
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

// FUNCTIONS

const startGame = () => {
    boxGame.forEach(box=> box.addEventListener(`click`, boxClicked))
}
const mensajeGanador = () => {
    playerWinner.innerText = currentPlayer
    msgGanador.classList.remove(`oculto`)
}
const ocultarMensajeGanador = () => {
    msgGanador.classList.add(`oculto`)
}
const playerHasWon = () => {
    for (const condition of winningCombos) {
        let [a,b,c] = condition
        if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
            return [a,b,c]
        }
    }
    return false
}
const boxClicked = (e)=> {
    const idElement = e.target.id
    if (!spaces[idElement]) {
        spaces [idElement] = currentPlayer //Basicamente llenamos el array con X o O
        e.target.innerText = currentPlayer;
        if (playerHasWon() !==false ) {
            title.innerText = `${currentPlayer} ha ganado!`
            let winningBlock = playerHasWon()
            winningBlock.map( block => boxGame[block].style.backgroundColor = winnerIndicator)
        }
        if (e.target.innerText === O_TEXT) { //Para agregar el color a las letras
            e.target.classList.add(O_TEXT)
        } else {
            e.target.classList.add(X_TEXT)
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        turnPlayer.innerText= currentPlayer //Muestra el turno de quien es
    }

}
const restartTheGame = () => {
    
    spaces.fill(null)
    boxGame.forEach(box => {
        box.innerText = ""
        box.style.backgroundColor ="var(--black)"
    })
    currentPlayer = X_TEXT
    title.innerText = `TaTeTi!`
}
const init = () => {    
    startGame()
    restartGame.addEventListener(`click`, restartTheGame)
 }

 init()