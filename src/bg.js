/*
 * Background script listens for port connections, and
 * logs connection, message, and disconnection events.
 */

const browser = chrome || browser;

function openOptionsPage() {
    console.debug(`Opening options page...`);
    browser.runtime.openOptionsPage();
}

function startup() {
    browser.runtime.onConnect.addListener(port => {
        console.log('connection accepted', port.name);
        port.onMessage.addListener(msg => {
            console.log('message received', msg);
            if (msg === 'options') {
                openOptionsPage();
            }
        });
        port.onDisconnect.addListener(() => {
            console.log(`Port ${port.name} disconnected`);
        });
    });
}

startup();
