/*
 * DuelingBook Overflow
 * Copyright (C) 2024 C. Diserio
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * This file includes code originally authored by:
 * - eyal282 (chrome-ext-dueling-book-unlock) - GPLv3
 * - alexjraymond (DuelingBookEnhanced) - MIT
 * - mykesXD (Duelingbook-Dark-Mode) - MIT
 * Modified by C. Diserio for DuelingBook Overflow.
 */

/**
 * @file onextensionpressed.js
 * @description Popup settings page logic for the DuelingBook Overflow extension.
 *              Handles loading and saving user preferences to Chrome storage.
 * 
 * This file manages all the toggle switches, sliders, color pickers, and dropdowns
 * in the extension popup (onextensionpressed.html). Each setting is independently
 * loaded and saved using Chrome's sync storage API.
 */

// =============================================================================
// TOGGLE SETTINGS - Boolean switches for various features
// =============================================================================

/**
 * Extended Mechanics Toggle
 * 
 * Enables advanced card mechanics that the Duelingbook website doesn't natively support.
 * This includes features like attacking from Pendulum Scale, special summons to opponent's
 * field, and other complex card interactions.
 * 
 * @default true
 */
document.addEventListener('DOMContentLoaded', function () {
	// Get the checkbox element for card mechanics unlocking
	let checkbox = document.querySelector('input[id="unlockCardMechanics"]');

	// Verify we have the correct element
	if (checkbox.id == 'unlockCardMechanics') {
		// Load saved setting from Chrome storage
		chrome.storage.sync.get(['unlockCardMechanics'], function (result) {

			// Default to true (enabled) if no saved value exists
			if (result && result.unlockCardMechanics == false)
				checkbox.checked = false;

			else
				checkbox.checked = true;

		});

		// Save setting whenever user toggles the checkbox
		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({ unlockCardMechanics: checkbox.checked }, function () { });
		});
	}
});



/**
 * Mute Chat Commands Toggle
 * 
 * Disables command sound effects during gameplay for a quieter experience.
 * 
 * @default true
 */
document.addEventListener('DOMContentLoaded', function () {
	let checkbox = document.querySelector('input[id="silentCommands"]');

	if (checkbox.id == 'silentCommands') {
		chrome.storage.sync.get(['silentCommands'], function (result) {
			if (result && result.silentCommands == false)
				checkbox.checked = false;

			else
				checkbox.checked = true;

		});

		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({ silentCommands: checkbox.checked }, function () { });
		});
	}
});

/**
 * Left-Click Action Menu Toggle
 * 
 * Enables left-click interaction mode for cards. When enabled, users can left-click
 * on cards to bring up the action menu instead of right-clicking. Also widens the
 * game field width for better visibility.
 * 
 * @default true
 */
document.addEventListener('DOMContentLoaded', function () {
	let checkbox = document.querySelector('input[id="birdUI"]');

	if (checkbox.id == 'birdUI') {
		chrome.storage.sync.get(['birdUI'], function (result) {
			// Default to true (enabled)
			if (result && result.birdUI == false)
				checkbox.checked = false;

			else
				checkbox.checked = true;

		});

		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({ birdUI: checkbox.checked }, function () { });
		});
	}
});


/**
 * Low Animations Toggle
 * 
 * Speeds up TweenMax animations for better performance during gameplay.
 * When enabled, animations run at 3x speed for user actions and 1.5x for opponent actions.
 * 
 * @default false
 */
document.addEventListener('DOMContentLoaded', function () {
	let checkbox = document.querySelector('input[id="lowAnimations"]');

	if (checkbox.id == 'lowAnimations') {
		chrome.storage.sync.get(['lowAnimations'], function (result) {

			if (result && result.lowAnimations == true)
				checkbox.checked = true;

			else
				checkbox.checked = false;

		});

		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({ lowAnimations: checkbox.checked }, function () { });
		});
	}
});



/**
 * Chat Card Logging Toggle
 * 
 * Enables logging of card activities to the browser console.
 * Useful for debugging or tracking gameplay events.
 * 
 * @default true
 */
document.addEventListener('DOMContentLoaded', function () {
	let checkbox = document.querySelector('input[id="cardLogging"]');

	if (checkbox.id == 'cardLogging') {
		chrome.storage.sync.get(['cardLogging'], function (result) {

			// Default to true (enabled)
			if (result && result.cardLogging == false)
				checkbox.checked = false;

			else
				checkbox.checked = true;

		});

		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({ cardLogging: checkbox.checked }, function () { });
		});
	}
});


/**
 * Effect Text Highlighter Toggle
 * 
 * Enables bold text highlighting for Problem-Solving Card Text (PSCT).
 * When combined with the color settings, makes card text more readable
 * by distinguishing conditions, costs, and effects.
 * 
 * @default true
 */
document.addEventListener('DOMContentLoaded', function () {
	let checkbox = document.querySelector('input[id="psctBold"]');

	if (checkbox.id == 'psctBold') {
		chrome.storage.sync.get(['psctBold'], function (result) {

			if (result && result.psctBold == false)
				checkbox.checked = false;

			else
				checkbox.checked = true;

		});

		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({ psctBold: checkbox.checked }, function () { });
		});
	}
});


// =============================================================================

/**
 * Dark Theme Toggle
 * 
 * Applies a custom dark theme to the website.
 * 
 * @default true
 */
document.addEventListener('DOMContentLoaded', function () {
	let checkbox = document.querySelector('input[id="darkTheme"]');

	if (checkbox.id == 'darkTheme') {
		chrome.storage.sync.get(['darkTheme'], function (result) {

			if (result && result.darkTheme == false)
				checkbox.checked = false;

			else
				checkbox.checked = true;

		});

		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({ darkTheme: checkbox.checked }, function () { });
		});
	}
});


// =============================================================================

/**
 * Skip Intro & Auto Connect
 * @default true
 */
document.addEventListener('DOMContentLoaded', function () {
	['skipIntro', 'autoConnect'].forEach(id => {
		let checkbox = document.getElementById(id);
		if (checkbox) {
			chrome.storage.sync.get([id], function (result) {
				if (result && result[id] == false) checkbox.checked = false;
				else checkbox.checked = true;
			});
			checkbox.addEventListener('change', function () {
				let obj = {};
				obj[id] = checkbox.checked;
				chrome.storage.sync.set(obj);
			});
		}
	});
});


// =============================================================================
// COLOR PICKERS - PSCT highlighting colors
// =============================================================================

/**
 * Condition Color Picker
 * 
 * Sets the color for condition text in card effects.
 * Conditions are requirements that must be met before an effect can activate.
 * Example: "If this card is in your GY:"
 * 
 * @default "#008000" (green)
 */
document.addEventListener('DOMContentLoaded', function () {
	let picker = document.querySelector('input[id="psctConditionColor"]');

	if (picker.id == 'psctConditionColor') {
		chrome.storage.sync.get(['psctConditionColor'], function (result) {

			if (result && result.psctConditionColor)
				picker.value = result.psctConditionColor

			else
				picker.value = "#008000"

		});

		picker.addEventListener('change', function () {
			chrome.storage.sync.set({ psctConditionColor: picker.value }, function () { });
		});
	}
});

/**
 * Cost Color Picker
 * 
 * Sets the color for cost text in card effects.
 * Costs are what you must pay to activate an effect.
 * Example: "discard 1 card;"
 * 
 * @default "#ff0000" (red)
 */
document.addEventListener('DOMContentLoaded', function () {
	let picker = document.querySelector('input[id="psctCostColor"]');

	if (picker.id == 'psctCostColor') {
		chrome.storage.sync.get(['psctCostColor'], function (result) {

			if (result && result.psctCostColor)
				picker.value = result.psctCostColor

			else
				picker.value = "#ff0000"

		});

		picker.addEventListener('change', function () {
			chrome.storage.sync.set({ psctCostColor: picker.value }, function () { });
		});
	}
});

/**
 * Restriction Color Picker
 * 
 * Sets the color for lock/restriction text in card effects.
 * Locks are restrictions placed on the player after activation.
 * Example: "You cannot Special Summon other monsters..."
 * 
 * @default "#0000ff" (blue)
 */
document.addEventListener('DOMContentLoaded', function () {
	let picker = document.querySelector('input[id="psctLockColor"]');

	if (picker.id == 'psctLockColor') {
		chrome.storage.sync.get(['psctLockColor'], function (result) {

			if (result && result.psctLockColor)
				picker.value = result.psctLockColor

			else
				picker.value = "#0000ff"

		});

		picker.addEventListener('change', function () {
			chrome.storage.sync.set({ psctLockColor: picker.value }, function () { });
		});
	}
});

/*
 * PSCT Effect Color Picker (COMMENTED OUT)
 * 
 * This was intended to set a color for general effect text,
 * but was disabled in the final implementation.
 * 
 * @default "#000000" (black)
 */
/*
document.addEventListener('DOMContentLoaded', function () {

	let picker = document.querySelector('input[id="psctEffectColor"]');
	
	if(picker.id == 'psctEffectColor')
	{
		chrome.storage.sync.get(['psctEffectColor'], function(result) {
			
			if(result && result.psctEffectColor)
				picker.value = result.psctEffectColor
			
			else
				picker.value = "#000000"

		});
		
		picker.addEventListener('change', function () {
			conLog(picker.value);
			chrome.storage.sync.set({psctEffectColor: picker.value}, function() {});
		});
	}
});
*/

// =============================================================================
// SLIDERS - Zoom control
// =============================================================================



// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Logs text to the console log element in the popup.
 * 
 * Used for debugging purposes. The text is prefixed with "a" 
 * (likely for testing visibility).
 * 
 * @param {string} text - The text to display in the console log element
 */
function conLog(text) {
	let cons = document.getElementById('consoleLog');

	cons.innerHTML = "a" + text;
}

/**
 * Gets the index of an option in a select dropdown by its value.
 * 
 * Iterates through all options in a dropdown menu and returns the index
 * of the option that matches the specified value. Used to set the selected
 * option when loading saved settings.
 * 
 * @param {HTMLOptionsCollection} options - The options collection from a select element
 * @param {string} value - The value to search for
 * @returns {number} The index of the matching option, or -1 if not found
 */
function getIndexByValue(options, value) {
	for (let abc = 0; abc < options.length; abc++) {
		if (options[abc].value == value)
			return options[abc].index;
	}

	return -1;
}

// =============================================================================
// EXPANDABLE UTILS & CUSTOM BACKGROUND
// =============================================================================

/**
 * Setup expandable sections listeners
 */
function setupExpandable(btnId, detailsId) {
	let btn = document.getElementById(btnId);
	let details = document.getElementById(detailsId);
	if (btn && details) {
		btn.addEventListener('click', function () {
			if (details.classList.contains('open')) {
				details.classList.remove('open');
				btn.classList.remove('expanded');
			} else {
				details.classList.add('open');
				btn.classList.add('expanded');
			}
		});
	}
}

document.addEventListener('DOMContentLoaded', function () {
	setupExpandable('btn-expand-dark', 'darkThemeDetails');
	setupExpandable('btn-expand-psct', 'psctDetails');
});

/**
 * Custom Background Image Logic
 */
document.addEventListener('DOMContentLoaded', function () {
	let input = document.getElementById('darkThemeBg');
	if (input) {
		chrome.storage.sync.get(['darkThemeBg'], function (result) {
			if (result && result.darkThemeBg) {
				input.value = result.darkThemeBg;
			}
		});

		input.addEventListener('change', function () {
			chrome.storage.sync.set({ darkThemeBg: input.value }, function () { });
		});
	}

	let clearBtn = document.getElementById('clearDarkThemeBg');
	if (clearBtn && input) {
		clearBtn.addEventListener('click', function () {
			input.value = "";
			chrome.storage.sync.set({ darkThemeBg: "" }, function () { });

			// Optional: Trigger change event if needed for immediate update, 
			// though set() handles storage, the input change event handles the manual typing.
			// We just updated storage directly.
		});
	}
});