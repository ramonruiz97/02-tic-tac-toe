import Square from './Square'

export default function WinnerModal({winner, resetGame}){
    if (winner===null) return null
    return (
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