<template>
    <div class="online">
        <div class="content">
            <div class="sum">
                <p class="title">当前在线人数</p>
                <p><Icon type="ios-people" class="icon"/><span class="sum">{{sum}}</span></p>
            </div>
            <div class="detail">
                <ul class="gameul">
                    <li v-for="(item,index) in OnlineList" :key="index" class="gameList">
                        <p>{{item.name}}</p>
                        <p>{{item.count}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'onLine',
    components:{},
    props:{
        sum:Number,
        OnlineList:Array
    },
    data(){
        return{
            
        }
    },
    computed:{
    },
    watch:{

    },
    created(){
        // this.init()
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
.online{
    background-color: #fff;
    .search{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .content{
        display: flex;
        height: 80px;
        .sum{
            width: 15%;
            text-align: center;
            .title{
                font-size: 18px;
                font-weight: bold;
                line-height: 32px;
            }
            .icon{
                font-size: 28px;
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
