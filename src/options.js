const browser = chrome || browser;

let listening = false;

function listen() {
    browser.runtime.onConnect.addListener(port => {
        console.log('heard connect event for', port.name);
    });
}

function startup() {
    document.querySelector('#listenButton').addEventListener('click', event => {
        if (!listening) {
            listen();
            listening = true;
        }
    });
}

startup();
