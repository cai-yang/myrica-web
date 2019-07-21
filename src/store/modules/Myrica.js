const state = {
    sysName: 'Zuzu和Juju',
    count: 0
}

const mutations = {
    increment(state) {
        state.count++;
    },
    decrement(state) {
        state.count--;
    }
}

const actions = {

    incrementAsync({ commit }) {
        //Action通常为异步
        //为了在组件中确保分发的异步Action执行完毕再进行回调
        //通常使Action也返回一个Promise
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('increment');
                resolve();
            }, 1000)
        });
    },
    decrementAsync({ commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('decrement');
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