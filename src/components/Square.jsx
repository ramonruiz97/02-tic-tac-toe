export default function Square ({children, isSelected, updateBoard, index}) {
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