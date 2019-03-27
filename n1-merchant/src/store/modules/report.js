import { queryUserStat,queryPlayer } from '@/service/index'
export const report = {
    state:{
       
    },
    mutations:{
      
    },
    actions:{
       getUserList({commit},params){
        return queryUserStat(params)
       },
       getUserChild({commit},params){
        return queryUserStat(params)
       },
       getPlayerList({commit},params){
         return queryPlayer(params)
       }
    }
}