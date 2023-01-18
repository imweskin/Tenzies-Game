import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import Die from './components/Die';

function App() {

  const [dice, setDice] = useState(newDice());
  const [isGameWon, setIsGameWon] = useState(false);
  const { width, height } = useWindowSize()

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    }
  }

  function newDice() {
    const newDice = [];

    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }

    return newDice;
  }

  const handleRoll = () => {
    if(isGameWon) {
      setIsGameWon(false);
      setDice(newDice());
    } else {
      setDice(prevDice => prevDice.map(prevDie => {
        return prevDie.isHeld ? prevDie : generateNewDie()
      }))
    }
  }

  const handleDieClick = (event, dieId) => {
    if(!isGameWon) {
      setDice(prevDice => prevDice.map(prevDie => {
        return prevDie.id === dieId ? {...prevDie, isHeld: !prevDie.isHeld} : prevDie
      }))
    } else {
      event.preventDefault();
    }
  }

  useEffect(() => {
    //check if all dice are held
    const allHeld = dice.every(die => die.isHeld);
    //check if all same value
    const value = dice[0].value;
    const allSameValue = dice.every(die => die.value === value);

    if(allHeld && allSameValue) {
      setIsGameWon(true)
      console.log("YOU WON !")
    }

  }, [dice])

  return (
      <main>
        {isGameWon && <Confetti width={width} height={height} />}
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice">
          {dice.map(die => (
            <Die key={die.id} value={die.value}  handleDieClick={(event) => handleDieClick(event, die.id)} isHeld={die.isHeld}/>
          ))}
        </div>
        <button onClick={handleRoll}>{isGameWon ? "new game" : "roll"}</button>
      </main>
  )
};

export default App;