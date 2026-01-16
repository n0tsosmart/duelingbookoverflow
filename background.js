/*
 * DuelingBook Overflow
 * Copyright (C) 2024 C. Diserio
 * 
 * Minimal Service Worker for Keep-Alive
 */

// =============================================================================
// WEB NAVIGATION LISTENER
// =============================================================================

/**
 * Listens for navigation commits to duelingbook.com and triggers keep-alive.
 * This ensures the service worker stays active when the user is on the site.
 * 
 * @listens chrome.webNavigation.onCommitted
 */
chrome.webNavigation.onCommitted.addListener(function (e) {
	keepAlive();
}, { url: [{ hostSuffix: 'duelingbook.com' }] });


// =============================================================================
// SERVICE WORKER KEEP-ALIVE MECHANISM
// Prevents the service worker from being terminated by Chrome
// =============================================================================

/**
 * @type {chrome.runtime.Port|null} 
 * Port connection used to keep the service worker alive.
 */
let lifeline;

// Initialize keep-alive on service worker startup
keepAlive();

/**
 * Listens for keep-alive connection requests from injected scripts.
 * 
 * When a tab connects with the 'keepAlive' port name, we store the
 * connection and set up a timer to refresh it before the 5-minute
 * service worker timeout.
 * 
 * @listens chrome.runtime.onConnect
 */
chrome.runtime.onConnect.addListener(port => {
	if (port.name === 'keepAlive') {
		lifeline = port;
		// Refresh before 5-minute service worker timeout (295 seconds = 4min 55sec)
		setTimeout(keepAliveForced, 295e3);
		port.onDisconnect.addListener(keepAliveForced);
	}
});

/**
 * Forces a keep-alive refresh by disconnecting and reconnecting.
 * 
 * Called when the keep-alive timer expires or when the port disconnects.
 * Ensures continuous service worker operation.
 */
function keepAliveForced() {
	lifeline?.disconnect();
	lifeline = null;
	keepAlive();
}

/**
 * Establishes a keep-alive connection through any available tab.
 * 
 * Service workers in Chrome extensions are terminated after ~5 minutes
 * of inactivity. This function maintains an active connection to prevent
 * that by injecting a script that connects back to the extension.
 * 
 * @async
 */
async function keepAlive() {
	// Already have an active connection
	if (lifeline) return;

	// Try to establish connection through any open tab
	for (const tab of await chrome.tabs.query({ url: '*://*/*' })) {
		try {
			await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: () => chrome.runtime.connect({ name: 'keepAlive' }),
			});
			chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
			return;
		} catch (e) { }
	}

	// No suitable tabs found, wait for tab updates
	chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

/**
 * Tab update listener for keep-alive retry.
 * 
 * When no tabs are available for keep-alive, this listener waits for
 * a tab to load a URL and then attempts to establish the connection.
 * 
 * @async
 * @param {number} tabId - ID of the updated tab
 * @param {object} info - Change info object
 * @param {chrome.tabs.Tab} tab - Tab object
 */
async function retryOnTabUpdate(tabId, info, tab) {
	// Only retry for valid URLs (file, http, https)
	if (info.url && /^(file|https?):/.test(info.url)) {
		keepAlive();
	}
}
