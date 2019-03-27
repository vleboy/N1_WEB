<template>
    <div class="onlinehour">
        <div class="content">
            <div class="sum">
                <p class="title">玩家在线时长</p>
                <p><Icon type="ios-people" class="icon"/></p>
            </div>
            <div class="detail">
                <ul class="gameul">
                    <li v-for="(item,index) in OnlineList" :key="index" class="gameList">
                        <i-circle :percent="item.percent" stroke-color="#5cb85c">
                            <p>{{item.name}}</p>
                            <p>{{item.hour+'分'}}</p>
                        </i-circle>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btn">
            <Button type="primary" class="morebtn" v-if='!showHourOnline' @click="seeHourOnline">点击查看每小时在线玩家人数</Button>
        </div>
        <hour-online 
            :onlineToday="onlineTodayArr"
            :onlineSeven="onlineSevenAverage"
         v-if="showHourOnline"/>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import HourOnline from '@/components/HourOnline'
import { mapState } from "vuex";
import {GAME_LIST} from '@/config/gameList'
export default {
    name:'onLine',
    components:{HourOnline},
    props:{

    },
    data(){
        return{
            showHourOnline:false,
            OnlineList:[ ],
        }
    },
    computed:{
        ...mapState(["login","onlineSevenAverage","onlineTodayArr"])
    },
    watch:{

    },
    created(){
        this.init()
    },
    methods:{
        seeHourOnline(){
            this.showHourOnline=true
        },
        gameName(key){
            //gametype 获取名字
            return GAME_LIST[key]
        },
        init(){
            let gameTimeDetail=this.login.gameTimeDetail
             for(let [key,val] of Object.entries(gameTimeDetail)){
                let name=this.gameName(key);
                this.OnlineList.push({
                    name,
                    percent:(val/(60*24))*100,
                    hour:val
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.onlinehour{
    background-color: #fff;
    margin-top: 15px;
    .search{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .btn{
            text-align: center;
            .morebtn{
                width: 250px;
                margin-top: 10px;
                margin-bottom: 15px;
            }
        }
    .content{
        display: flex;
        margin:15px auto;
        .sum{
            width: 15%;
            text-align: center;
            .title{
                font-size: 18px;
                font-weight: bold;
                line-height: 32px;
            }
            .icon{
                font-size: 36px;
            }
            .sum{
                font-size: 18px;
                color:#f00;
                font-weight: bold;
            }
        }
        .detail{
            display: flex;
            flex-wrap: nowrap;
            width: 85%;
            .gameul{
                width: 100%;
                .gameList{
                    float: left;
                    width: 11%;
                    text-align: center;
                    line-height: 32px;
                    font-size: 16px;
                }

            }
        }
    }
}
</style>
