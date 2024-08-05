// OptionsPage.js
import React from 'react';

function OptionsPage({ settings, updateSetting, onBack }) {
  return (
    <div className="options-page">
      <button onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h2>Options</h2>

      <label>
        Stop after one loop:
        <input
          type="text"
          value={settings.musicUrl}
          onChange={(e) => updateSetting('musicUrl', e.target.value)}
        />
      </label>


      <label>
        Music URL:
        <input
          type="text"
          value={settings.musicUrl}
          onChange={(e) => updateSetting('musicUrl', e.target.value)}
        />
      </label>
    </div>
  );
}

export default OptionsPage;