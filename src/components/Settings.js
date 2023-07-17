import ReactSlider from "react-slider";
import '../slider.css';
import SettingsContext from "./SettingsContext";
import { useContext } from "react";
import BackButton from "./BackButton";

export default function Settings() {

    const settingsInfo = useContext(SettingsContext);

    return (
        <div style={{ textAlign: "left" }}>
            <label>Focus Duration: {settingsInfo.focusDuration} minutes</label>
            <ReactSlider
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.focusDuration}
                onChange={newValue => settingsInfo.setFocusDuration(newValue)}
                min={1}
                max={120}
            />
            <label>Break Duration: {settingsInfo.breakDuration} minutes</label>
            <ReactSlider
                className={'slider green'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.breakDuration}
                onChange={newValue => settingsInfo.setBreakDuration(newValue)}
                min={1}
                max={120}
            />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
            </div>

        </div>
    );
}