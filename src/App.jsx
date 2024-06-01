import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [scoreArr, setScoreArr] = useState(Array(9).fill(null));
  const [turnX, setTurn] = useState(true);
  const [winner, setWinner] = useState(false);

  const data = localStorage.getItem('winRecords');

  const [winRecords, setWinRecords] = useState(data ? JSON.parse(data) :  {
    '0': 0,
    'X': 0,
    'draws': 0,

  })


  function clickHandler(index) {
    if (scoreArr[index] != null || winner) {
      return
    }

    const newArr = [...scoreArr];

    newArr[index] = turnX ? `X` : `0`;
    setScoreArr(newArr);
    setTurn(!turnX);


    checkWinner(scoreArr);

  }
  useEffect(()=>{
    localStorage.setItem('winRecords', JSON.stringify(winRecords));

  },[winRecords]);

  useEffect(() => {
    checkWinner(scoreArr);
  }, [scoreArr]);

  function checkWinner() {

    if (winner) return;
    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

    for (let i of arr) {
      const [a, b, c] = i;
      if (scoreArr[a] === scoreArr[b] && scoreArr[b] === scoreArr[c] && scoreArr[a] != null && scoreArr[b] != null && scoreArr[c] != null) {
        setWinner(`${scoreArr[a]} is Winner !!`);
        const key = scoreArr[a];
        setWinRecords((prevRecords) => ({
          ...prevRecords,
          [key]: prevRecords[key] + 1,
        }));
       

        return;

      }

    }

    let counter = 0;

    for (let i of scoreArr) {
      if (i === null) {
        counter++;
      }
    }

    if (counter === 0) {
      setWinner(`It's a Draw`);
      setWinRecords((prevRecords) => ({
        ...prevRecords,
        ['draws']: prevRecords['draws'] + 1,
      }));

     
    }
  }

  function resetHandler() {
    setScoreArr(Array(9).fill(null));
    setTurn(true);
    setWinner(false);

  }



  return (
    <div className="wrapperClass">
      <div className="scoreDiv">
        <p className="redText">X : <span className="greenTxt">{winRecords['X']}</span></p>
        <p className="blueText">0 : <span className="greenTxt">{winRecords['0']}</span></p>
        <p className="redText">Draws: <span className="yellowTxt">{winRecords.draws}</span>
        </p>

      </div>

      <div className="wrapperClass1">
        {winner ? <div className="winnerClass">{winner}</div> : <div className="winnerClass">{`Current Player : ${turnX ? `X` : '0'} `}</div>}

        <div className="boxClass">
          <div className="box" onClick={() => clickHandler(0)}>
            <p className={scoreArr[0] === 'X' ? `redText` : `blueText`}>{scoreArr[0]}</p>
          </div>
          <div className="box" onClick={() => clickHandler(1)}>
            <p className={scoreArr[1] === 'X' ? `redText` : `blueText`}>{scoreArr[1]}</p>
          </div>
          <div className="box" onClick={() => clickHandler(2)}>
            <p className={scoreArr[2] === 'X' ? `redText` : `blueText`}>{scoreArr[2]}</p>
          </div>
        </div>

        <div className="boxClass">
          <div className="box" onClick={() => clickHandler(3)}>
            <p className={scoreArr[3] === 'X' ? `redText` : `blueText`}>{scoreArr[3]}</p>
          </div>
          <div className="box" onClick={() => clickHandler(4)}>
            <p className={scoreArr[4] === 'X' ? `redText` : `blueText`}>{scoreArr[4]}</p>
          </div>
          <div className="box" onClick={() => clickHandler(5)}>
            <p className={scoreArr[5] === 'X' ? `redText` : `blueText`}>{scoreArr[5]}</p>
          </div>
        </div>

        <div className="boxClass">
          <div className="box" onClick={() => clickHandler(6)}>
            <p className={scoreArr[6] === 'X' ? `redText` : `blueText`}>{scoreArr[6]}</p>
          </div>
          <div className="box" onClick={() => clickHandler(7)}>
            <p className={scoreArr[7] === 'X' ? `redText` : `blueText`}>{scoreArr[7]}</p>
          </div>
          <div className="box" onClick={() => clickHandler(8)}>
            <p className={scoreArr[8] === 'X' ? `redText` : `blueText`}>{scoreArr[8]}</p>
          </div>
        </div>

        <button onClick={() => resetHandler()} className="resetBtn">Reset</button>


      </div>


    </div>


  );
}

export default App;
