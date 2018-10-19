import Bridge from '../components/bridge';
import { hookName } from './hook';

const getData = e => {
    if (e.data.source === 'data-debugger' && e.data.data === 'init') {
        window.removeEventListener('message', getData);
        const hook = window[hookName];
        const listenList = [];
        const bridge = new Bridge({
            listen(fn) {
                const listener = e => {
                    if (e.data.source === 'data-debugger') {
                        console.log(e.data);
                        fn(e.data.data);
                    }
                };
                listenList.push(listener);
                window.addEventListener('message', listener);
            },
            send(data) {
                console.log(data);
                window.postMessage(
                    {
                        source: 'data-debugger-backend',
                        data: data,
                    },
                    '*',
                );
            },
        });
        hook.on('refresh', () => {
            bridge.emit('flush');
        });
        bridge.on('close', () => {
            listenList.map(v => {
                window.removeEventListener('message', v);
            });
            bridge.send('flush', []);
        });
        bridge.on('flush', data => {
            const item = JSON.parse(
                JSON.stringify(window.__Canvas_Screen_Data || []),
            );
            console.log(item);
            bridge.send('flush', item);
        });
    }
};
window.addEventListener('message', getData);
