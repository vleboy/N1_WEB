import {avalibleManager,addUsers } from '@/service/index'
export const add = {
    state:{
      subRoleList: [],
    },
    mutations:{
      changeSubrole(state,{params}){
          state.subRoleList=params
      },
    },
    actions:{
        getSubrole({commit}){
            avalibleManager().then(res=>{
                if(res.code==0){
                    commit('changeSubrole',{params:res.payload})
                }
            })
        },
        newUser({commit},params){
            return addUsers(params)
        },
    }
}