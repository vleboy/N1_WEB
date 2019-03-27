import Vue from 'vue'
import Vuex from 'vuex'
import {login} from './modules/login'
import {home} from './modules/home'
import {add} from './modules/add'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        loading:false
    },
    mutations:{
     globalLoading(state,{params}){
        state.loading=params
        },
    },
    actions:{

    },
    modules: {
        login,
        home,
        add
    }
})
