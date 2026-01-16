/*
 * DuelingBook Overflow - Content Script Loader
 * Handles injection of the main script into the page context (MAIN world)
 * and synchronizes settings from extension storage.
 */

// Inject the main script into the page
function injectMainScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('src/content/main.js');
    script.onload = function () {
        this.remove(); // Clean up the script tag
        initializeSettings(); // Send initial settings once script is loaded
    };
    (document.head || document.documentElement).appendChild(script);
}

// Fetch settings and send to main script
function initializeSettings() {
    chrome.storage.sync.get([
        'unlockCardMechanics',
        'silentCommands',
        'birdUI',
        'lowAnimations',
        'cardLogging',
        'psctBold',
        'psctConditionColor',
        'psctCostColor',
        'psctLockColor',
        'psctEffectColor',
        'darkTheme',
        'darkThemeBg',
        'skipIntro',
        'autoConnect'
    ], function (result) {
        // Prepare settings object with defaults
        const settings = {
            unlockCardMechanics: result.unlockCardMechanics !== false,
            silentCommands: result.silentCommands !== false,
            birdUI: result.birdUI !== false,
            lowAnimations: result.lowAnimations === true,
            cardLogging: result.cardLogging !== false,
            psctColors: [
                result.psctBold !== false,
                result.psctConditionColor || "#008000",
                result.psctCostColor || "#ff0000",
                result.psctLockColor || "#0000ff",
                result.psctEffectColor || "#000000"
            ],
            darkTheme: result.darkTheme !== false,
            darkThemeBg: result.darkThemeBg || "",
            skipIntro: result.skipIntro !== false,
            autoConnect: result.autoConnect !== false
        };

        // Fetch Card Pools
        Promise.all([
            fetch(chrome.runtime.getURL('goat_cardpool.txt')).then(r => r.text()),
            fetch(chrome.runtime.getURL('edison_cardpool.txt')).then(r => r.text())
        ]).then(([goatText, edisonText]) => {
            const parseCards = (text) => text.replaceAll("\r", "").split('\n').filter(l => l[0] !== ';' && l.length > 0);

            // Send settings and data to the injected script
            window.postMessage({
                type: 'DBO_SETTINGS_UPDATE',
                settings: settings,
                data: {
                    goatCards: parseCards(goatText),
                    edisonCards: parseCards(edisonText),
                    extensionId: chrome.runtime.id,
                    extensionBaseUrl: chrome.runtime.getURL("")
                }
            }, '*');

            // Handle Dark Theme CSS Injection directly from Content Script for speed
            handleDarkTheme(settings.darkTheme, settings.darkThemeBg);
        }).catch(err => {
            console.error("DuelingBook Overflow: Failed to load card pools", err);
        });
    });
}

// Listen for storage changes to update settings dynamically
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync') {
        initializeSettings();
    }
});

// Helper to inject/remove Dark Theme CSS
function handleDarkTheme(enabled, bgUrl) {
    const cssId = 'dbo-dark-theme-style';
    const bgId = 'dbo-custom-bg-style';

    // 1. Handle Main Dark Theme CSS
    let link = document.getElementById(cssId);
    if (enabled) {
        if (!link) {
            link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = chrome.runtime.getURL('dark_theme.css');
            document.head.appendChild(link);
        }
    } else {
        if (link) link.remove();
    }

    // 2. Handle Custom Background
    let bgStyle = document.getElementById(bgId);
    if (enabled && bgUrl) {
        if (!bgStyle) {
            bgStyle = document.createElement('style');
            bgStyle.id = bgId;
            document.head.appendChild(bgStyle);
        }
        bgStyle.textContent = `
            body {
                background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${bgUrl}") !important;
                background-size: cover !important;
                background-attachment: fixed !important;
            }
            #circuit_board, #circuit_cover, #greenlines {
                visibility: hidden !important;
            }
        `;
    } else {
        if (bgStyle) bgStyle.remove();
    }
}

// Start Injection
injectMainScript();

// Keep-alive connection
chrome.runtime.connect({ name: 'keepAlive' });
