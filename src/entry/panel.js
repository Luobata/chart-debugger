import { hookName } from './hook';
let created = false;
let timer = window.setTimeout(() => {
    create(hookName);
}, 1000);

const create = hookName => {
    if (created) return;

    chrome.devtools.inspectedWindow.eval(
        '!!(window.' + hookName + '.installed)',
        function(hasVue) {
            if (!hasVue) return;
            window.clearTimeout(timer);
            created = true;
            chrome.devtools.panels.create(
                'Data-debugger',
                'images/back.jpg',
                'devtools.html',
                function() {
                    // panel loaded
                },
            );
        },
    );
};

chrome.devtools.network.onNavigated.addListener(() => {
    create(hookName);
});

create(hookName);
