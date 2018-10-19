import Vue from 'vue';
import Vuex from 'vuex';
import App from './app.vue';
import store from './store';

let app = null;
const init = fn => {
    if (!app) {
        // app.$destroy();
        app = new Vue({
            store,
            render(h) {
                return h(App);
            },
        }).$mount('#app');
    }
    fn && fn();
};

export default init;
