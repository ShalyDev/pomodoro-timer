import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';
import SettingsContext from './SettingsContext';
import { useContext, useState, useEffect, useRef } from 'react';


const red = '#f54e4e';
const green = '#4aec8c';

export default function Timer() {

    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [mode, setMode] = useState('focus');

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        function switchMode() {
            const nextMode = modeRef.current === 'focus' ? 'break' : 'focus';
            const nextSeconds = (nextMode === 'focus' ? settingsInfo.focusDuration : settingsInfo.breakDuration) * 60;
            setMode(nextMode);
            modeRef.current = nextMode;
            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = settingsInfo.focusDuration * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }
            tick();
        }, 1000);
        return () => clearInterval(interval);
    }, [settingsInfo]);

    const totalSeconds = mode === 'focus'
        ? settingsInfo.focusDuration * 60
        : settingsInfo.breakDuration * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return (
        <div>
            <CircularProgressbar
                value={percentage}
                text={minutes + ':' + seconds}
                styles={buildStyles({
                    textColor: '#fff',
                    pathColor: mode === 'focus' ? red : green,
                    trailColor: 'rgba(255, 255, 255, 2)'
                })} />
            <div style={{ marginTop: '20px' }}>
                {isPaused
                    ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
                    : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />
                }
            </div>
            <div style={{ marginTop: '20px' }}>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
            </div>
        </div>
    );
}
