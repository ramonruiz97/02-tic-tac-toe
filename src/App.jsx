import { useState } from 'react'
import './App.css'

const TURNS = {
  X : 'x',
  O : 'o',
}

const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const Square = ({children, isSelected, updateBoard, index}) => {
  //Basandonos en el estado del padre (turn), 
  //cambiamos la visualizacion del estado hijo
  const className = `square ${isSelected ? 'is-selected' : ''}`
  console.log(isSelected)

  const handleClick = () => {
    updateBoard(index)
  }
  return (<div className={className} onClick={handleClick}>
    {children}
  </div>
  )
}


function App() {
  //cada vez que cambie el estado de board se va a renderizar el componente
  const [winner, setWinner] = useState(null) 
  //false there is no winner, true there is a winner
  const [board, setBoard] = useState(
    Array(9).fill(null)
   ) //initial state only renderized first time
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
