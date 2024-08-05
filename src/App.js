// App.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import OptionsPage from './optionPage';
import './App.css';
import { FaPlay, FaPause, FaForward, FaCog } from 'react-icons/fa';

const POMODORO_TYPES = [
  { name: 'Work', duration: 25 },
  { name: 'Short Break', duration: 5 },
  { name: 'Long Break', duration: 15 },
];

const DEFAULT_SETTINGS = {
  workTime: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  shortBreaksBeforeLongBreak: 3,
  backgroundColors: ['#ff6347', '#78c4d4', '#00af91'],
  backgroundTunes: ['gong1.mp3', 'gong1.mp3', 'gong1.mp3'],
};

function App() {
  const [pomodoroType, setPomodoroType] = useState(0);
  const [timeLeft, setTimeLeft] = useState(POMODORO_TYPES[pomodoroType].duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showOptions, setShowOptions] = useState(false);

  const timerButtonRef = useRef(null);
  const skipButtonRef = useRef(null);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('pomodoroSettings'));
    if (storedSettings) {
      setSettings(storedSettings);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    let intervalId;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound(settings.backgroundTunes[pomodoroType]);
      switchPomodoroType();
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, pomodoroType, settings.backgroundTunes]);

  useEffect(() => {
    const storedPomodoro = JSON.parse(localStorage.getItem('pomodoro'));
    if (storedPomodoro) {
      setPomodoroType(storedPomodoro.type);
      setTimeLeft(storedPomodoro.timeLeft);
      setIsRunning(storedPomodoro.isRunning);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'pomodoro',
      JSON.stringify({ type: pomodoroType, timeLeft, isRunning })
    );
  }, [pomodoroType, timeLeft, isRunning]);

  function toggleTimer() {
    setIsRunning((prevState) => !prevState);
  }

  const switchPomodoroType = useCallback(() => {
    setPomodoroType((prevType) => (prevType + 1) % POMODORO_TYPES.length);
    setTimeLeft(POMODORO_TYPES[(pomodoroType + 1) % POMODORO_TYPES.length].duration * 60);
  }, [pomodoroType]);



  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function playSound(soundFile) {
    console.log("here")
    // console log current directory
    const audio = new Audio(`sounds/${soundFile}`);
    audio.play();
  }

  function updateSetting(key, value) {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  }

  const handleTimerButtonClick = () => {
    toggleTimer();
    timerButtonRef.current.classList.add('button-press');
    setTimeout(() => {
      timerButtonRef.current.classList.remove('button-press');
    }, 400);
  };

  const handleSkipButtonClick = () => {
    console.log("skipping")
    if(isRunning){
      console.log("skipping")
    }
    switchPomodoroType();
    playSound(settings.backgroundTunes[pomodoroType]);
    skipButtonRef.current.classList.add('button-press');
    setTimeout(() => {
      skipButtonRef.current.classList.remove('button-press');
    }, 400);
  };

  function handleOptionsClick() {
    setShowOptions(true);
  }

  function handleOptionsBack() {
    setShowOptions(false);
  }

  return (
    <div className="app" style={{ backgroundColor: settings.backgroundColors[pomodoroType] }}>
      <div className="scrollable-content">
      {showOptions ? (
        <OptionsPage
          settings={settings}
          updateSetting={updateSetting}
          onBack={handleOptionsBack}
        />
      ) : (
        <div className="timer-container">
          <h1 className="timer-title">{POMODORO_TYPES[pomodoroType].name}</h1>
          <div className="timer-display">{formatTime(timeLeft)}</div>
          <div className="timer-buttons">
            <button ref={timerButtonRef} className="timer-button" onClick={handleTimerButtonClick}>
              {isRunning ? <FaPause /> : <FaPlay />}
            </button>
            <button ref={skipButtonRef} className="timer-button" onClick={handleSkipButtonClick} disabled = {!isRunning}>
              <FaForward />
            </button>

          </div>
          <div className="timer-settings">
            <div className="settings-header">
              <h2 className="settings-title">Setup</h2>
              <button className="options-button" onClick={handleOptionsClick}>
                <FaCog />
              </button>
            </div>
            
            <div className="settings-form">
              <div className="form-group">
                <label className="form-label">
                  Work Duration:
                  <input
                    type="number"
                    className="form-input"
                    value={settings.workTime}
                    onChange={(e) => updateSetting('workTime', parseInt(e.target.value))}
                  />
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Short Break Length:
                  <input
                    type="number"
                    className="form-input"
                    value={settings.shortBreakLength}
                    onChange={(e) => updateSetting('shortBreakLength', parseInt(e.target.value))}
                  />
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Long Break Length:
                  <input
                    type="number"
                    className="form-input"
                    value={settings.longBreakLength}
                    onChange={(e) => updateSetting('longBreakLength', parseInt(e.target.value))}
                  />
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Short Breaks Before Long Break:
                  <input
                    type="number"
                    className="form-input"
                    value={settings.shortBreaksBeforeLongBreak}
                    onChange={(e) => updateSetting('shortBreaksBeforeLongBreak', parseInt(e.target.value))}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;