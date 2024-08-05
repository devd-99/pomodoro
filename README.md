# Chrome Pomodoro Timer Extension

A customizable Pomodoro timer extension for Chrome that helps you manage your work and break sessions effectively.

## Features

- Customizable work, short break, and long break durations
- Visual timer display with start, pause, and skip functionality
- Background color changes based on the current session type
- Sound notifications at the end of each session
- Options page for additional customization
- Local storage to persist settings and timer state

## Installation

1. Clone this repository or download the source code.
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the `dist` folder in your project directory

## Usage

1. Click on the Pomodoro Timer extension icon in your Chrome toolbar to open the timer.
2. Use the "Start" button to begin a session, "Pause" to pause the timer, and "Skip" to move to the next session.
3. Access the "Options" page to customize timer durations and other settings.

## Development

To start development with hot-reloading:

```
npm run watch
```

This will watch for file changes and rebuild the extension automatically.

## Project Structure

- `src/`: Contains the main source code
  - `App.js`: Main React component for the timer
  - `index.js`: Entry point for the React application
  - `background.js`: Chrome extension background script
  - `optionPage.js`: React component for the options page
- `public/`: Static assets and HTML templates
- `dist/`: Output directory for the built extension (created after building)

## Scripts


```16:23:package.json
  "scripts": {
    "clean": "rimraf dist",
    "build": "npm run clean && webpack --config webpack.config.js",
    "watch": "npm run clean && webpack -w --config webpack.config.js",
    "start": "react-scripts start",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```


## Technologies Used

- React
- Webpack
- Babel
- Chrome Extension APIs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).