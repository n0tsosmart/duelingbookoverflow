# DuelingBook Overflow - Internal Documentation

## Overview

**DuelingBook Overflow** (v1.1) is a unified browser extension for Duelingbook.com. It combines mechanic unlocking, visual enhancements, and automation features into a single optimized package. Compatible with both Chrome (Manifest V3) and Firefox.

---

## Features & Settings

### Theme Settings

| Feature | Storage Key | Default | Description |
|---------|-------------|---------|-------------|
| **Dark Theme** | `darkTheme` | `true` | Applies a sleek dark theme to the entire Duelingbook website. CSS is injected via `loader.js` using `dark_theme.css`. |
| **Custom Background** | `darkThemeBg` | `""` | URL for a custom background image. When set, displays the image with a dark overlay behind the game interface. |
| **Low Animations** | `lowAnimations` | `false` | Speeds up `TweenMax` animations globally (2x speed) and disables flashing zone selection animations for better performance. Injects CSS to make `.movieclip` elements static. |

### General Settings

| Feature | Storage Key | Default | Description |
|---------|-------------|---------|-------------|
| **Skip Intro** | `skipIntro` | `true` | Automatically clicks the `#skip_intro_btn` button to skip the landing page "Enter" animation. Runs via a 40ms interval in `main.js`. |
| **Auto-Connect** | `autoConnect` | `true` | Automatically clicks the `#duel_btn` button to enter the main menu. |

### Gameplay Settings

| Feature | Storage Key | Default | Description |
|---------|-------------|---------|-------------|
| **Extended Mechanics** | `unlockCardMechanics` | `true` | Unlocks natively unavailable card actions.
| **Mute Chat Commands** | `silentCommands` | `true` | Executes chat commands (e.g., `/mill`, `/search`) silently. |
| **Left-Click Action Menu** | `birdUI` | `true` | Enhanced card interaction mode: Left-Click opens the card action menu, Double-Click for face-down actions. |
| **Low Animations** | `lowAnimations` | `false` | Speeds up TweenMax animations (2x) and removes the flashing dotted-line zone selection animations. Overrides `startChooseMonsterZones` and `startChooseSpellZones` functions. |
| **Chat Card Logging** | `cardLogging` | `true` | Logs detailed card information to the browser console, including opponent's hand content when viewed (e.g., via Trap Dustshoot). |
| **Effect Text Highlighter** | `psctBold` | `true` | Highlights Problem-Solving Card Text (PSCT) with customizable colors for Conditions, Costs, and Restrictions. |

### PSCT Color Settings

| Setting | Storage Key | Default | Description |
|---------|-------------|---------|-------------|
| **Condition Color** | `psctConditionColor` | `#008000` (green) | Color for activation conditions (e.g., "If this card is summoned:"). |
| **Cost Color** | `psctCostColor` | `#ff0000` (red) | Color for activation costs (e.g., "Discard 1 card;"). |
| **Restriction Color** | `psctLockColor` | `#0000ff` (blue) | Color for effect restrictions (e.g., "You cannot Special Summon..."). |

---

## Project Structure

```
duelingbookoverflow/
├── manifest.json              # Extension config (use chrome_manifest.json or firefox_manifest.json)
├── chrome_manifest.json       # Chrome/Edge/Brave manifest (Manifest V3)
├── firefox_manifest.json      # Firefox manifest (with gecko settings)
├── background.js              # Service worker for keep-alive mechanism
├── onextensionpressed.js      # Popup settings page logic
├── onextensionpressed.html    # Popup UI
├── dark_theme.css             # Dark mode styles
├── icon.png                   # Extension icon
├── goat_cardpool.txt          # GOAT format cardpool data
├── edison_cardpool.txt        # Edison format cardpool data
├── negate_icon.png            # Negate button icon
├── negate_hover_icon.png      # Negate button hover icon
├── src/
│   └── content/
│       ├── loader.js          # Content script loader (injects main.js, handles settings sync)
│       └── main.js            # Main injected script (~13k lines, core game modifications)
├── docs/
│   └── DOCUMENTATION.md       # This file
├── storesassets/              # Web store assets (screenshots, etc.)
├── CREDITS.md                 # Attribution for original creators
├── LICENSE                    # GPLv3 License
└── README.md                  # User-facing documentation
```

---

## Technical Architecture

### 1. Extension Lifecycle

The extension uses a three-layer architecture:

```
┌──────────────────────────────────────────────────────────────┐
│                    background.js                             │
│         Service Worker - Keep-Alive Mechanism                │
│    Maintains connection to prevent service worker timeout    │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                   src/content/loader.js                      │
│               Content Script (ISOLATED world)                │
│    - Loads settings from chrome.storage.sync                 │
│    - Injects main.js into page context                       │
│    - Handles dark theme CSS injection                        │
│    - Fetches card pool data files                            │
│    - Posts settings to main.js via window.postMessage        │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                   src/content/main.js                        │
│               Injected Script (MAIN world)                   │
│    - Modifies Duelingbook's native variables and functions   │
│    - Implements all gameplay features                        │
│    - Runs on 3 intervals: Blitz (100ms), Fast (100ms),      │
│      Main (4500ms)                                           │
└──────────────────────────────────────────────────────────────┘
```

### 2. Injection System

**loader.js** (Content Script):
- Runs in the ISOLATED world context
- Creates a `<script>` element pointing to `main.js`
- After injection, fetches settings from `chrome.storage.sync`
- Loads card pool data (`goat_cardpool.txt`, `edison_cardpool.txt`)
- Posts settings to `main.js` via `window.postMessage`
- Handles dark theme CSS injection separately for faster loading

**main.js** (MAIN World):
- Listens for settings via `window.addEventListener("message", ...)`
- Runs three interval loops for different features:
  - **Blitz (100ms)**: Ultra-responsive action queue monitoring
  - **Fast (100ms)**: GY warning reset, card logging
  - **Main (4500ms)**: Full feature injection (extended mechanics, Bird UI, PSCT, etc.)

### 3. Keep-Alive Mechanism

Chrome's Manifest V3 terminates service workers after ~5 minutes of inactivity. The extension maintains activity through:

1. `chrome.webNavigation.onCommitted` listener triggers `keepAlive()` on navigation
2. `keepAlive()` injects a script that connects back via `chrome.runtime.connect`
3. A timeout refreshes the connection every 295 seconds (just under the 5-minute limit)

### 4. Popup UI

- Built with HTML/CSS in `onextensionpressed.html`
- Uses expandable sections for organized settings
- Each setting has its own `DOMContentLoaded` listener in `onextensionpressed.js`
- Settings are immediately saved to `chrome.storage.sync` on change
- `loader.js` listens for storage changes to update features dynamically

### 5. Feature Implementation Details

#### Extended Mechanics (`unlockCardMechanics`)
Modifies Duelingbook's `actionsQueue` and related functions to enable:
- Attack declarations from Pendulum Scales
- Setting Spells from hand
- Shuffling cards to opponent's deck
- Summoning tokens
- Excavating cards
- Attaching cards from hand to Xyz materials
- Banishing face-down

#### Left-Click Action Menu (`birdUI`)
- Expands `.db_content` width to 1485px for better visibility
- Changes card interaction from right-click to left-click
- Double-click triggers face-down actions

#### Low Animations (`lowAnimations`)
- Sets `TweenMax.globalTimeScale(2)` for faster animations
- Overrides `window.startChooseMonsterZones` and `window.startChooseSpellZones` to remove flashing animations
- Injects CSS to disable animations on `.movieclip` elements

#### Effect Text Highlighter (`psctBold`)
- Parses card text according to Problem-Solving Card Text (PSCT) standards
- Colors conditions (what must happen), costs (what you pay), and restrictions (what you can't do)
- Colors are customizable via the popup settings

---

## Permissions

| Permission | Purpose |
|------------|---------|
| `tabs` | Identifies active Duelingbook tabs for script injection |
| `storage` | Saves and syncs user preferences across devices |
| `scripting` | Injects scripts into Duelingbook pages |
| `webNavigation` | Triggers keep-alive on page navigation |

---

## Browser Compatibility

| Browser | Manifest | Notes |
|---------|----------|-------|
| Chrome | `chrome_manifest.json` | Full Manifest V3 support |
| Edge | `chrome_manifest.json` | Uses Chrome extension system |
| Brave | `chrome_manifest.json` | Uses Chrome extension system |
| Firefox | `firefox_manifest.json` | Includes `browser_specific_settings.gecko` |

To install, rename the appropriate manifest file to `manifest.json`.
