import Bridge from '../components/bridge';
import init from '../components/main';
import store from '../components/store';

const inject = (scriptName, fn) => {
    const src = `
        var script = document.constructor.prototype.createElement.call(document, 'script');
        script.src = "${scriptName}";
        document.documentElement.appendChild(script);
        script.parentNode.removeChild(script);
  `;

    chrome.devtools.inspectedWindow.eval(src, function(res, err) {
        if (err) {
            console.log(err);
        }
        fn && fn();
    });
};

window.onload = () => {
    // export default () => {
    let bridge;
    const install = () => {
        init(() => {
            inject(chrome.runtime.getURL('build/backend.js'), () => {
                console.log('backend injected');
                const port = chrome.runtime.connect({
                    name: '' + chrome.devtools.inspectedWindow.tabId,
                });
                let disconnected = false;
                port.onDisconnect.addListener(() => {
                    console.log('disconnected');
                    disconnected = true;
                });
                bridge = new Bridge({
                    listen(fn) {
                        port.onMessage.addListener(fn);
                    },
                    send(data) {
                        if (!disconnected) {
                            port.postMessage(data);
                        }
                    },
                });
                bridge.on('flush', data => {
                    console.log(data);
                    store.commit('changeData', data);
                });
                window.getData = () => {
                    bridge.send('flush');
                };
                store.commit('changeData', []);
                store.commit('chooseData', {});
            });
        });
    };
    install();
    chrome.devtools.network.onNavigated.addListener(() => {
        bridge.removeAllListeners();
        install();
    });
};
