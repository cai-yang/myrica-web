import Vue from 'vue'
import Vuex from 'vuex'

import Myrica from './modules/Myrica'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        myrica: Myrica
    }
})