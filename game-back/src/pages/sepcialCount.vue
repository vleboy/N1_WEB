<template>
    <div class="special">
         <div class="search clear">
            <div class="left">
                <Input v-model="acount" placeholder="输入账号" style="width: 200px"></Input>
                <Input v-model="id" placeholder="输入ID" style="width: 200px"></Input>
                <Button type="primary" @click="search">搜索</Button>
            </div>
            <div class="right">
                <RadioGroup v-model="source" type="button" @on-change='changeSource'>
                    <Radio label="0">1月</Radio>
                    <Radio label="1">7天</Radio>
                    <Radio label="2">3天</Radio>
                    <Radio label="3">昨天</Radio>
                </RadioGroup>
                <DatePicker type="daterange" v-model="range" :editable='false' @on-change="changeRange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
            </div>
        </div>
        <div class="content">
            <section class="countItem">
                <p class="itemTitle">特殊统计—聚宝模式</p>
                <Row v-for="item in jubaoList" :key="item.name" class="itemRow">
                <Col span="2">
                {{item.name}}
                </Col>
                <Col span="2">
                聚宝次数
                </Col>
                <Col span="2">
                <span class="redFont">{{item.count}}</span>
                </Col>
                <Col span="4">
               平均 <span class="redFont">{{item.frequency}}</span> 局出现一次
                </Col>
                <Col span="2">
               聚宝金额
                </Col>
                <Col span="2">
               <span class="redFont">{{thousandFormatter(item.amount)}}</span>
                </Col>
            </Row>
            </section>
             <section class="countItem">
                <p class="itemTitle">特殊统计—随机免费模式</p>
                <Row v-for="item in randomFree" :key="item.name" class="itemRow">
                <Col span="2">
                {{item.name}}
                </Col>
                <Col span="2">
                免费次数
                </Col>
                <Col span="2">
                <span class="redFont">{{item.count}}</span>
                </Col>
                <Col span="4">
               平均 <span class="redFont">{{item.frequency}}</span> 局出现一次
                </Col>
                <Col span="2">
               赔付金额
                </Col>
                <Col span="2">
               <span class="redFont">{{thousandFormatter(item.amount)}}</span>
                </Col>
                 <Col span="2">
               平均金额
                </Col>
                <Col span="2">
               <span class="redFont">{{thousandFormatter(item.average)}}</span>
                </Col>
            </Row>
            </section>
             <section class="countItem">
                <p class="itemTitle">特殊统计—道具触发</p>
                <Row v-for="(item,index) in PropsList" :key="item.index" class="itemRow">
                <Col span="2">
                
                {{item.name}}
                </Col>
                <Col span="2">
                道具{{index+1}}次数
                </Col>
                <Col span="2">
                <span class="redFont">{{item.count}}</span>
                </Col>
                <Col span="4">
               平均 <span class="redFont">{{item.frequency}}</span> 局出现一次
                </Col>
                <Col span="2">
               赔付金额
                </Col>
                <Col span="2">
               <span class="redFont">{{thousandFormatter(item.amount)}}</span>
                </Col>
                 <Col span="2">
               平均金额
                </Col>
                <Col span="2">
               <span class="redFont">{{thousandFormatter(item.average)}}</span>
                </Col>
            </Row>
            </section>
        </div>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
    name:'',
    components:{},
    filters:{

    },
    props:{

    },
    data(){
        return{
            source:'',
            range:'',
            acount:'',
            id:'',
            thousandFormatter:thousandFormatter,
            jubaoList:[
                {
                    name:'熊猫传奇',
                    count:3456,
                    frequency:34,
                    amount:3566342
                },
                {
                    name:'幸运足球',
                    count:234,
                    frequency:4,
                    amount:325
                },
                {
                    name:'神秘海域',
                    count:32,
                    frequency:24,
                    amount:4564
                }
            ],
            randomFree:[
                {
                    name:'熊猫传奇',
                    count:3456,
                    frequency:34,
                    amount:3566342,
                    average:355
                }
            ],
            PropsList:[
                {
                    name:'三消游戏',
                    count:3456,
                    frequency:34,
                    amount:3566342,
                    average:355
                },
                 {
                    name:'三消游戏',
                    count:234,
                    frequency:44,
                    amount:545,
                    average:35
                },
                 {
                    name:'三消游戏',
                    count:354,
                    frequency:43,
                    amount:5654,
                    average:34
                },
                 {
                    name:'三消游戏',
                    count:23,
                    frequency:6,
                    amount:4335,
                    average:43
                },
                 {
                    name:'三消游戏',
                    count:435,
                    frequency:56,
                    amount:56564,
                    average:346
                }
            ]
        }
    },
    computed:{

    },
    watch:{

    },
    created(){

    },
    methods:{
        search(){
            console.log(this.id);
        },
       changeSource(){
           console.log(this.source);
       },
       changeRange(){
            let range = this.range.map(item => {
            return item.getTime();
            });
            console.log(range);
       }
    }
}
</script>
<style lang="less" scoped>
.special{
    background-color: #fff;
    min-height: 90vh;
    .search{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .countItem{
        font-size: 16px;
        padding: 10px;
        .itemTitle{
            font-weight: bold;
            font-size: 18px;
            line-height: 38px;
        }
        .itemRow{
            line-height: 36px;
        }
        .redFont{
            color:#f00;
            font-weight: bold;
        }
    }
    .ivu-col{
        font-weight: bold;
    }
}
</style>

