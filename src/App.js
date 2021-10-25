import './App.css';
import {useState, useEffect} from 'react';

import {isWin, isSoonWin} from './api/win'

import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

function App() {

  const [winner, setWinner] = useState('');
  const [player, setPlayer] = useState(true);
  const [pvePlayer, setPvePlayer] = useState(true);
  const [state, setState] = useState({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6': '',
    '7': '',
    '8': '',
    '9': '',
  });

  const [pvsState, setPveState] = useState({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6': '',
    '7': '',
    '8': '',
    '9': '',
  });

  useEffect(() => {
    const is_win = isWin(state)
    if (is_win.isWin) {
      setWinner(is_win.player)
      if (!localStorage.x || !localStorage.o) {
        localStorage.x = 0;
        localStorage.o = 0;
      } 
      if (is_win.player === 'O') {
        localStorage.o =  parseInt(localStorage.o) + 1;
      } else {
          localStorage.x = parseInt(localStorage.x) + 1;
      }
    }
  }, [state])

  useEffect(() => {

    const is_win = isWin(pvsState)
    if (is_win.isWin) {
      setWinner(is_win.player)
      if (!localStorage.xPve || !localStorage.oPve) {
        localStorage.xPve = 0;
        localStorage.oPve = 0;
      } 
      if (is_win.player === 'O') {
        localStorage.oPve =  parseInt(localStorage.oPve) + 1;
      } else {
          localStorage.xPve = parseInt(localStorage.xPve) + 1;
      }
      return
    }

    const e = isSoonWin(pvsState)
    if (pvePlayer) {
      return 
    } else {
      if (e.isSoonWin) {
        if (pvsState[e.player] === '') {
          setPveState({...pvsState, [e.player]: 'O'})
          setPvePlayer(!pvePlayer)
        } else {
          for (let i in ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
            if (pvsState[i] === '') {
              setPveState({...pvsState, [i]: 'O'})
              setPvePlayer(!pvePlayer)
              break
            }
          }
        }
      } 
      else {
        for (let i in ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
          if (pvsState[i] === '') {
            setPveState({...pvsState, [i]: 'O'})
            setPvePlayer(!pvePlayer)
            break
          }
        }
      }
    }

  }, [pvsState])


  const tap = (n) => {
    if (state[n] === '') {
      if (player) {
        setState({...state, [n]: 'X'})
      } else {
        setState({...state, [n]: 'O'})
      }
      setPlayer(!player)
    }
  }

  const tapPve = (n) => {
    if (pvsState[n] === '') {
        setPveState({...pvsState, [n]: 'X'})
        setPvePlayer(!pvePlayer)
    }
  }

  const restart = () => {
    setWinner('');
    setPlayer(true);
    setState({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6': '',
    '7': '',
    '8': '',
    '9': '',
  });
  }

  const pveRestart = () => {
    setWinner('');
    setPvePlayer(true);
    setPveState({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6': '',
    '7': '',
    '8': '',
    '9': '',
  });
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
          <Route path="/pvp">
            <header>
              <p>X: {localStorage.x} O: {localStorage.o}</p>
            </header>
            { winner !== '' &&
            <>
              <h1>Побеждает игрок, который ставил: {winner} 🐱‍💻</h1>
              <button onClick={restart} style={{marginBottom: '10px'}}>Играть еще раз</button>
            </>
            }
            <div className="game_area">
              <div onClick={() => tap('1')} className="square"><p>{state['1']}</p></div>
              <div onClick={() => tap('2')} className="square"><p>{state['2']}</p></div>
              <div onClick={() => tap('3')} className="square"><p>{state['3']}</p></div>
              <div onClick={() => tap('4')} className="square"><p>{state['4']}</p></div>
              <div onClick={() => tap('5')} className="square"><p>{state['5']}</p></div>
              <div onClick={() => tap('6')} className="square"><p>{state['6']}</p></div>
              <div onClick={() => tap('7')} className="square"><p>{state['7']}</p></div>
              <div onClick={() => tap('8')} className="square"><p>{state['8']}</p></div>
              <div onClick={() => tap('9')} className="square"><p>{state['9']}</p></div>
            </div>
          </Route>
          <Route path="/pve">
            <header>
              <p>X: {localStorage.xPve} Computer: {localStorage.oPve}</p>
            </header>
            { winner !== '' &&
            <>
              <h1>Побеждает игрок, который ставил: {winner} 🐱‍💻</h1>
              <button onClick={pveRestart} style={{marginBottom: '10px'}}>Играть еще раз</button>
            </>
            }
            <div className="game_area">
              <div onClick={() => tapPve('1')} className="square"><p>{pvsState['1']}</p></div>
              <div onClick={() => tapPve('2')} className="square"><p>{pvsState['2']}</p></div>
              <div onClick={() => tapPve('3')} className="square"><p>{pvsState['3']}</p></div>
              <div onClick={() => tapPve('4')} className="square"><p>{pvsState['4']}</p></div>
              <div onClick={() => tapPve('5')} className="square"><p>{pvsState['5']}</p></div>
              <div onClick={() => tapPve('6')} className="square"><p>{pvsState['6']}</p></div>
              <div onClick={() => tapPve('7')} className="square"><p>{pvsState['7']}</p></div>
              <div onClick={() => tapPve('8')} className="square"><p>{pvsState['8']}</p></div>
              <div onClick={() => tapPve('9')} className="square"><p>{pvsState['9']}</p></div>
            </div>
          </Route>
          <Route path="/">
            <div className={"links"}>
            <Link to='pvp'> PVP </Link>
            <Link to='pve'> PVE </Link>
          </div>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
