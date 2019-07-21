const state = {
    sysName: 'Zuzu和Juju',
    count: 0,
    mathStep: 1
}

const mutations = {
    increment(state, payload) {
        state.count += parseInt(payload.step);
    },
    decrement(state, payload) {
        state.count -= parseInt(payload.step);
    },
    count(state, payload) {
        state.count = payload.count;
    },
    step(state, payload) {
        state.mathStep = parseInt(payload.step);
    }
}

const actions = {

    incrementAsync({ commit }, payload) {
        //Action通常为异步
        //为了在组件中确保分发的异步Action执行完毕再进行回调
        //通常使Action也返回一个Promise
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('increment', {
                    step: parseInt(payload.step)
                });
                resolve();
            }, 1000)
        });
    },
    decrementAsync({ commit }, payload) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('decrement', {
                    step: parseInt(payload.step)
                });
                resolve();
            }, 1000)
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}