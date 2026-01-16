<p align="center">
  <img src="icon.png" width="128" alt="DuelingBook Overflow Logo">
</p>

<h1 align="center">DuelingBook Overflow</h1>

<p align="center">
  <strong>Version 1.1.1</strong> · A feature-packed browser extension for Duelingbook.com
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#extended-mechanics">Extended Mechanics</a> •
  <a href="#chat-commands">Commands</a> •
  <a href="#installation">Installation</a> •
  <a href="#credits--acknowledgements">Credits</a>
</p>

---

DuelingBook Overflow unlocks hidden game mechanics, refines the user interface, and adds powerful automation tools to enhance your dueling experience.

> **The goal of this project is to unify all the features I personally use from various extensions into a single, cohesive package.**

<p align="center">
  <img src="storesassets/screenshot_1.jpg" alt="DuelingBook Overflow Screenshot" width="800">
</p>

## Installation

> [!NOTE]
> This repository contains two manifest files: `chrome_manifest.json` and `firefox_manifest.json`. Before installing, rename the one corresponding to your browser to `manifest.json`.

### Chrome / Edge / Brave
1. Download or clone this repository.
2. Rename `chrome_manifest.json` to `manifest.json`.
3. Go to `chrome://extensions` (or the equivalent for your browser).
4. Enable **Developer Mode**.
5. Click **Load unpacked** and select the extension folder.

### Firefox
1. Download or clone this repository.
2. Rename `firefox_manifest.json` to `manifest.json`.
3. Go to `about:debugging#/runtime/this-firefox`.
4. Click **Load Temporary Add-on** and select the `manifest.json` file.

---

## Features

### 🎨 Theme Settings

| Feature | Description |
|---------|-------------|
| **Dark Theme** | A sleek, modern dark theme for the entire website. Includes a custom background image option. |
| **Low Animations** | Speeds up card animations and disables some others for better performance. |

### ⚙️ General Settings

| Feature | Description |
|---------|-------------|
| **Skip Intro** | Automatically skips the landing page "Enter" animation. |
| **Auto-Login / Connect** | Instantly enters the main menu by auto-clicking the "Duel" button. |

### 🎮 Gameplay Settings

| Feature | Description |
|---------|-------------|
| **Extended Mechanics** | Unlocks natively unavailable actions. See [full list below](#extended-mechanics). |
| **Mute Chat Commands** | Executes chat commands (like `/search` or `/mill`) silently. |
| **Left-Click Action Menu** | Enhanced mouse interaction: Left-Click opens the card action menu, Double-Click for face-down actions. |
| **Chat Card Logging** | Logs detailed card info to the console for tracking, including opponent's hand content when viewed (e.g., via Trap Dustshoot). |
| **Effect Text Highlighter** | Colors card text based on PSCT (Problem-Solving Card Text): 🟢 Conditions, 🔴 Costs, 🔵 Restrictions. Customizable colors. |

---

## Extended Mechanics

### Card Text Effects

These effects are unlocked when a card's text contains the matching phrase:

| Effect | Description |
|--------|-------------|
| Attack from Pendulum Scale | Cards that specify "attack from your Pendulum Scale" |
| Attack during opponent's Battle Phase | Cards that specify "attack during your opponent's battle phase" |
| Attack in Defense Position | Cards that specify "attack while in face-up Defense Position" |
| Set from Hand to Spell Zone | Cards that specify "Set this card from your hand to your Spell" |
| Swap GY and Deck | Cards that swap graveyard with deck (both players or self) |
| Shuffle into Opponent's Deck | Cards that shuffle face-up into opponent's deck |
| Pay Half LP | Cards that require paying half your LP |
| Summon Tokens | Cards that Special Summon named tokens |
| Excavate Cards | Cards that excavate the top cards of deck |
| Summon to Opponent's Field | Cards that Special Summon to opponent's field |
| Normal Summon to either side | Cards that allow Normal Summoning to either side |
| Attach from Hand | Cards with "Attach this card" effect |

### Unlocked Card Mechanics

| Mechanic | Description |
|----------|-------------|
| Set Extra Deck Monster | Set an Extra Deck monster face-down to the field |
| Face-Down Link Monsters | Face-down an opponent's Link monster (request control → flip → return) |
| Convulsion of Nature | Flip decks face-up |
| Banish Random ED Face-Up | Banish a random Extra Deck card face-up (Cynet Storm) |
| Banish Random ED Face-Down | Banish random Extra Deck card face-down (Pot of Extravagance) |
| Add to Opponent's Hand | Add cards to your opponent's hand |
| Set S/T as Monster | Set Spells & Traps to field as monster (Magical Hats) |
| Stay Revealed | Keep cards revealed (Lord of Heavenly Prison) |
| Move Card Face-Up to Deck | Move a card to your deck face-up |
| LP Calculations | Use +, -, *, / in LP gain/loss inputs |
| Pot of Prosperity / Eater of Millions | Banish first X cards in Extra Deck (by deck builder order) |
| Sinister Serpent Reminder | Reminder for Sinister Serpent collection from GY |
| Banish Opponent's Cards Face-Down | Banish cards in opponent's banish zone and GY face-down |
| Siding Complete Sound | Sound notification when opponent finishes siding |
| Log Opponent's Hand | Log opponent's hand when viewed (Trap Dustshoot) |
| Declare Victory | Button for Exodia The Forbidden One win condition |
| Move to Field Spell | Move cards to your Field Spell zone |

---

## Chat Commands

Type these commands in the duel chat. Your opponent will not see commands marked as "silent".

### Card Search & Movement

| Command | Description |
|---------|-------------|
| `/search <card name>` | Add a card from deck to hand |
| `/dig <card name>` | View deck, filtering by card name. Use `*` to search multiple names (e.g., `/dig Swordsoul*Tenyi`) |
| `/pend <card name>` | Pendulum mechanic with a card from deck |
| `/send <card name>` | Mill a card from deck to GY |
| `/ban <card name>` | Banish a card from deck |
| `/atk <card name>` | Special Summon a card from deck (works on S/T) |
| `/def <card name>` | Special Summon a card from deck in DEF (works on S/T) |
| `/st <card name>` | Place a card from deck to S/T zone (works on monsters) |

### Utility Commands

| Command | Description |
|---------|-------------|
| `/ex <number>` | Excavate top X cards of deck to Extra Deck face-up (silent) |
| `/excavate <number>` | Same as `/ex` (silent) |
| `/ld` | Check every Light and Dark monster in your GY (silent) |
| `/calc <equation>` | Calculate an equation (silent). Example: `/calc (10 + 10) * 10` |
| `/calc2 <equation>` | Calculate an equation (visible to opponent) |
| `/help` | Show all Duelingbook commands (silent) |
| `/help2` | Show all DuelingBook Unlock commands (silent) |
| `/help3` | Show more DuelingBook Unlock commands (silent) |

### Deprecated Commands

| Command | Replacement |
|---------|-------------|
| `/snipe` | Right-click face-down card instead |
| `/gy` | Right-click GY instead |
| `/unext`, `/unexb`, `/unexg` | Right-click banish pile instead |

---

## Credits & Acknowledgements

This project acts as a unified fork, combining the best features from different extensions. Special thanks to the following creators:

| Creator | Contribution |
|---------|--------------|
| **[eyal282](https://github.com/eyal282/chrome-ext-dueling-book-unlock)** | **The Original Creator**. This project is a fork based on his work, serving as the core framework. |
| **[mykesXD](https://github.com/mykesXD/Duelingbook-Dark-Mode)** | Core CSS for the **Dark Theme**. |
| **[alexjraymond](https://github.com/alexjraymond/DuelingBookEnhanced)** | Logic implementation for **Skip Intro** and **Auto-Login**. |

---

<p align="center">
  <em>DuelingBook Overflow is a fan-made extension and is not affiliated with Duelingbook.com.</em>
</p>
