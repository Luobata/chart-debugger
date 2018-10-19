export const hookName = '__DATA_DEBUGGER_DEVTOOLS_GLOBAL_HOOK__';
const installHook = (window, hookName) => {
    if (window[hookName]) {
        return;
    }
    let listeners = {};
    const hook = {
        installed: false,
        refresh() {},
        on(event, fn) {
            event = '$' + event;
            (listeners[event] || (listeners[event] = [])).push(fn);
        },
        once(event, fn) {
            const eventAlias = event;
            event = '$' + event;
            function on() {
                this.off(eventAlias, on);
                fn.apply(this, arguments);
            }
            (listeners[event] || (listeners[event] = [])).push(on);
        },
        off(event, fn) {
            event = '$' + event;
            if (!arguments.length) {
                listeners = {};
            } else {
                const cbs = listeners[event];
                if (cbs) {
                    if (!fn) {
                        listeners[event] = null;
                    } else {
                        for (let i = 0, l = cbs.length; i < l; i++) {
                            const cb = cbs[i];
                            if (cb === fn || cb.fn === fn) {
                                cbs.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }
        },
        emit(event) {
            event = '$' + event;
            let cbs = listeners[event];
            if (cbs) {
                const args = [].slice.call(arguments, 1);
                cbs = cbs.slice();
                for (let i = 0, l = cbs.length; i < l; i++) {
                    cbs[i].apply(this, args);
                }
            }
        },
    };
    hook.once('install', () => {
        hook.installed = true;
    });

    Object.defineProperty(window, hookName, {
        get() {
            return hook;
        },
    });
};

const script = document.createElement('script');
script.textContent =
    ';(' + installHook.toString() + ')(window, "' + hookName + '")';
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
