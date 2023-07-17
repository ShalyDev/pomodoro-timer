import './App.css';
import Settings from './components/Settings';
import SettingsContext from './components/SettingsContext';
import Timer from './components/Timer';
import { useState } from 'react';

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  return (
    <main className="App">
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        focusDuration,
        breakDuration,
        setFocusDuration,
        setBreakDuration
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;