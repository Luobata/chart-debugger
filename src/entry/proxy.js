const port = chrome.runtime.connect({
    name: 'content-script',
});
const bridgeTotools = e => {
    if (e.data.source === 'data-debugger-backend') {
        console.log(e.data.data);
        port.postMessage(e.data.data);
    }
};
const bridgeTobackend = data => {
    console.log(data);
    window.postMessage(
        {
            source: 'data-debugger',
            data: data,
        },
        '*',
    );
};
port.onMessage.addListener(bridgeTobackend);
window.addEventListener('message', bridgeTotools);
bridgeTobackend('init');
port.onDisconnect.addListener(() => {
    console.log('close');
    window.removeEventListener('message', bridgeTotools);
    bridgeTobackend('close');
});
