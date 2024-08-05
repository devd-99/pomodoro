// background.js
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'pomodoroTimer') {
      chrome.storage.local.get(['pomodoroState'], (result) => {
        const { pomodoroState } = result;
        if (pomodoroState.isRunning) {
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'Pomodoro Timer',
            message: `${pomodoroState.currentSession} session ended!`,
          });
          // Update the pomodoroState and store it in Chrome's storage
          const updatedState = {
            ...pomodoroState,
            isRunning: false,
            // Update other properties as needed
          };
          chrome.storage.local.set({ pomodoroState: updatedState });
        }
      });
    }
  });
  
  // Other event listeners and functions can be added here