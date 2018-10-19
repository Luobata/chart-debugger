import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        data: [],
        chooseData: {},
    },
    mutations: {
        changeData(state, data) {
            state.data = data;
            if (state.chooseData) {
                for (let i of data) {
                    if (i.id === state.chooseData.id) {
                        state.chooseData = i;
                    }
                }
            }
        },
        chooseData(state, data) {
            state.chooseData = data;
        },
    },
});

export default store;
