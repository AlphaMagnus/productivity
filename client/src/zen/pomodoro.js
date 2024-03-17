// import React, { useState, useEffect } from 'react';

// const Pomodoro = () => {
//   const [minutes, setMinutes] = useState(25);
//   const [seconds, setSeconds] = useState(0);
//   const [isActive, setIsActive] = useState(false);
//   const [isBreak, setIsBreak] = useState(false);

//   useEffect(() => {
//     let interval = null;
//     if (isActive) {
//       interval = setInterval(() => {
//         if (seconds === 0) {
//           if (minutes === 0) {
//             clearInterval(interval);
//             setIsActive(false);
//             if (!isBreak) {
//               setIsBreak(true);
//               setMinutes(5); 
//             } else {
//               setIsBreak(false);
//               setMinutes(25);
//             }
//             postTime();
//           } else {
//             setMinutes(minutes - 1);
//             setSeconds(59);
//           }
//         } else {
//           setSeconds(seconds - 1);
//         }
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, minutes, seconds, isBreak]);

//   const toggleTimer = () => {
//     setIsActive(!isActive);
//   };

//   const resetTimer = () => {
//     setIsActive(false);
//     setIsBreak(false);
//     setMinutes(25);
//     setSeconds(0);
//   };

//   const addTime = (minutesToAdd) => {
//     if (!isActive) {
//       if (isBreak) {
//         setMinutes(minutes + minutesToAdd);
//       } else {
//         setMinutes(minutes + minutesToAdd);
//       }
//     }
//   };

//   const postTime = async () => {
//     const response = await fetch('YOUR_API_ENDPOINT', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ time: `${minutes}:${seconds}` }),
//     });
//     const data = await response.json();
//     console.log(data);
//   };

//   return (
//     <div>
//       <div>
//         <h1>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
//         <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
//         <button onClick={resetTimer}>Reset</button>
//         {!isBreak && (
//           <button onClick={() => {
//             setIsActive(true);
//             setIsBreak(true);
//             setMinutes(5);
//             setSeconds(0);
//           }}>Break</button>
//         )}
//         <button onClick={() => addTime(1)}>+1 min</button>
//         <button onClick={() => addTime(5)}>+5 min</button>
//         <button onClick={() => addTime(10)}>+10 min</button>
        
//       </div>
//     </div>
//   );
// };

// export default Pomodoro;

import React, { useState, useEffect } from 'react';
import './Pomodoro.css'; // Import CSS file for styling

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [additionalTime, setAdditionalTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (!isBreak) {
              setIsBreak(true);
              setMinutes(5); // set break time to 5 minutes
            } else {
              setIsBreak(false);
              setMinutes(25); // reset to pomodoro time
            }
            postTime();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak]);

  useEffect(() => {
    if (!isActive) {
      setMinutes(minutes + additionalTime);
      setAdditionalTime(0);
    }
  }, [additionalTime, isActive, minutes]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const addTime = (minutesToAdd) => {
    setAdditionalTime(additionalTime + minutesToAdd);
  };

  const postTime = async () => {
    const response = await fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ time: `${minutes}:${seconds}` }),
    });
    const data = await response.json();
    console.log(data);
  };

  // Calculate the percentage of time elapsed
  const progress = ((minutes * 60 + seconds) / (isBreak ? 300 : 1500)) * 100;

  return (
    <div>
      <div className="progress-circle">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
          <circle
            cx="50"
            cy="50"
            r="40"
            style={{
              strokeDasharray: 251,
              strokeDashoffset: 251 - (progress * 251) / 100,
              transition: isActive ? 'stroke-dashoffset 1s linear' : 'none'
            }}
          />
        </svg>
        <div className="progress-text">
          {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </div>
      </div>
      <div>
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={() => addTime(1)}>+1 min</button>
        <button onClick={() => addTime(5)}>+5 min</button>
        <button onClick={() => addTime(10)}>+10 min</button>
        {!isBreak && (
          <button onClick={() => {
            setIsActive(true);
            setIsBreak(true);
            setMinutes(5);
            setSeconds(0);
          }}>Break</button>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
