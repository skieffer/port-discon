const browser = chrome || browser;

function openPort(name) {
    const port = browser.runtime.connect({name: name});
    console.log('Opened port', name);
    port.onMessage.addListener(msg => {
        console.log(`Message received on ${name}:`, msg);
    });
    port.onDisconnect.addListener(() => {
        console.log(`Port ${name} disconnected`);
    });
    return port;
}

/*
 * First open the options page.
 * Then open a new port once every 2 seconds,
 * until 10 ports have been opened, then stop.
 */
function startup() {
    const port = openPort('opt');
    port.postMessage('options');

    let counter = 0;
    let interval = setInterval(function() {
        counter++;
        const port = openPort(`Port ${counter}`)
        port.postMessage('ping!');
        if (counter >= 10) {
            clearInterval(interval);
        }
    }, 2000);
}

startup();
