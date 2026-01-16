# DuelingBook Overflow - Internal Documentation

## Overview

**DuelingBook Overflow** (v1.0) is a unified Chrome extension for Duelingbook.com. It combines mechanic unlocking, visual enhancements, and automation features into a single optimized package.

## Features & Settings

### General Settings
| Feature | Storage Key | Description | Logic |
|---------|-------------|-------------|-------|
| **Dark Theme** | `darkTheme` | Applies dark mode CSS. | `background.js` injects `dark_theme.css`. |
| **Custom BG** | `darkThemeBg` | URL for background image. | `background.js` injects dynamic `<style>`. |
| **Skip Intro** | `skipIntro` | Skips landing page animation. | `background.js` clicks `#skip_intro_btn` via interval. |
| **Auto-Connect** | `autoConnect` | Auto-clicks "Duel" button. | `background.js` clicks `#duel_btn` via interval. |

### Gameplay Settings
| Feature | Storage Key | Description | Logic |
|---------|-------------|-------------|-------|
| **Extended Mechanics** | `unlockCardMechanics` | Unlocks native mechanics. | Passed to `injectFunction`. |
| **Mute Chat** | `silentCommands` | Silences chat commands. | Passed to `injectFunction`. |
| **Left-Click Menu** | `birdUI` | Refined card interactions. | Passed to `injectFunction` (as `birdUI`). |
| **Card Logging** | `cardLogging` | Logs card info to console. | Passed to `injectFunction`. |
| **PSCT Highlighting** | `psctBold` | Colors card text. | Colors passed to `injectFunction`. |

## Project Structure

```
chrome-ext-dueling-book-unlock-master/
├── manifest.json              # Config & Permissions
├── background.js              # Core logic & Injection
├── onextensionpressed.js      # Popup logic
├── onextensionpressed.html    # Popup UI
├── dark_theme.css             # Dark Mode Styles
├── icon.png                   # Extension Icon
└── docs/              # Dev resources
```

## Technical Architecture

### 1. Injection System
The core logic resides in `background.js`.
- **Initialization**: Loads settings from `chrome.storage.sync`.
- **Landing Page Automation**: A `setInterval` loop handles Skip Intro and Auto Connect immediately upon page load.
- **Main Injection**: `injectFunction` is executed in the `MAIN` world context to modify the website's native variables and functions (like `actionsQueue`).

### 2. Popup UI
- Built with standard HTML/CSS.
- Uses expandable sections for cleaner layout.
- Saves settings directly to `chrome.storage.sync` with event listeners.

### 3. Permissions
- `scripting`: Essential for injecting code into Duelingbook.
- `storage`: For saving user preferences.
- `tabs`: For identifying the active Duelingbook tab.
