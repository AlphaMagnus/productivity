import logo from './logo.svg';
import './App.css';

import music from './zen/music';
import MusicPlayer from './zen/music';
import Pomodoro from './zen/pomodoro';

function App() {
  return (
    <div className="App">
      <MusicPlayer/>
      <Pomodoro/>
    </div>
  );
}

export default App;
