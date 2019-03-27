import { logIn,updatePassword } from '@/service/index'
import { Message } from 'iview'
export const login = {
    state: {
        // getcode:'',
        infos: {},
        loading: false,
        admininfo: {},
        balance: null,
        waterfall: []
    },
    mutations: {
        // updateCode(state,{params}){
        //     state.getcode=`data:image/png;base64,${params}`
        // },
        saveWaterfall(state, { params }) {
            state.waterfall = params
        },
        saveInfo(state, { params }) {
            state.infos = params
        },
        updateLoading(state, { params }) {
            state.loading = params
        },
        updateAdmin(state, { params }) {
            state.admininfo = params
        },
        updateBill(state, { params }) {
            state.balance = params
        },
    },
    actions: {
        // getcapcha({state,commit},params){
        //     getCode(params).then(res=>{
        //         if(res.code==0){
        //             commit('updateCode',{params:res.payload})
        //         }
        //     })
        // },
        userlogin({ commit }, params) {
            let {cb,err,...rest}=params
            logIn(rest).then(res => {
                if (res.code == 0) {
                    localStorage.setItem('gameToken', res.payload.token);
                    setTimeout(() => localStorage.removeItem('gameToken'), 259200000);
                    commit('saveInfo', { params: res.payload });
                    localStorage.setItem('displayName',res.payload.displayName)
                    localStorage.setItem('uname',res.payload.uname)
                    cb && cb()
                } else {
                    commit('globalLoading', { params: false });
                    err && err()
                }
            })
        },
        // adminInfo({ commit }) {
        //     let userId = localStorage.loginId?localStorage.getItem("loginId"):''
        //     let p1 = agentOne().then(res => {
        //         if (res.code == 0) {
        //             commit('updateAdmin', { params: res.payload })
        //         }
        //     })
        //     let p2 = getWaterfall(userId).then(res => {
        //         if (res.code == 0) {
        //             commit('saveWaterfall', { params: res.payload })
        //         }
        //     });
        //     let p3 = getBill(userId).then(res => {
        //         if (res.code == 0) {
        //             commit('updateBill', { params: res.payload.balance })
        //         }
        //     });
        //     Promise.all([p1, p2, p3]).then(() => {
        //         commit('updateLoading', { params: false });
        //     })
        // },
        changePassword({ commit }, params) {
            return updatePassword(params)
        },
        updatePwd({ commit }, params) {
            updatePassword(params).then(res => {
                if (res.code == 0) {
                    Message.success('修改成功');
                }
            })
        }
    }
}
