import { useState } from 'react'
import './App.css'
import Square from './components/Square'
import {TURNS, WINNER_COMBINATIONS} from './constants'

function App() {
  //States
  const [winner, setWinner] = useState(null) 
  const [board, setBoard] = useState(
    Array(9).fill(null)
   ) 
   const [turn, setTurn] = useState(TURNS.X)
  
  //Function to check winner
  const checkWinner = (Board) => {
    for (const combination of WINNER_COMBINATIONS) {
      const [a, b, c] = combination
      console.log(Board[a], Board[b], Board[c])
      if (Board[a] && 
        Board[a] === Board[b] 
        && Board[a] === Board[c]) {
        return Board[a]
      }
    }
    return null
    
  }

  const resetGame = () => {
    const newBoard = Array(9).fill(null)
    setBoard(newBoard)
    const newwinner = null
    setWinner(newwinner)
    const newturn = TURNS.X
    setTurn(newturn)
  }
  
  //setBoard changes the state of board
  const updateBoard = (index) => {
    if (board[index] || winner) { // Finish if there is a winner or board finished
      return
    }
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //UpdateBoard changes the state of the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newwinner = checkWinner(newBoard)
    console.log(newwinner)
    if (newwinner) {
      setWinner(newwinner)
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
    <h1> Tic tac Toe</h1>
    <button onClick={resetGame}>Restart game</button>
    <section className="game">
      {
        board.map((_, index) => {
          return(
            <Square key = {index}
            index = {index}
            updateBoard = {updateBoard} //No le pasamos la ejecucion de la funcion, solo la funcion en si
            >
              {board[index]}
            </Square>
  
          )
        })
      }
    </section>
    <section className="turn">
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
    {
      winner !== null && (
        <section className="winner">
        <div className="text">
          <h2>
            {
              winner == false ? 'Draw' : `Ganó:`
            }
            </h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>
                Play again!
              </button>
            </footer>
        </div>
        </section>
      )
    }
    
    </main>
  )
}

export default App
