<template>
    <div class="pricemix">
        <Row>
            <Col span="12">
                <pie-item 
                    title="大奖占比—普通模式"
                    :count="priceNormalCount"
                    pieId="1"
                    :data="priceNormalData"
                />
            </Col>
            <Col span="12">
                <pie-item 
                    title="大奖占比—免费模式"
                    :count="priceFreeCount"
                    pieId="2"
                    :data="priceFreeData"
                />
            </Col>
        </Row>
         <Row>
            <Col span="12">
                <pie-item 
                    title="免费模式—选择次数"
                    :count="freeSelectCount"
                    pieId="3"
                    :data="freeChooseData"
                />
            </Col>
            <!-- <Col span="12">
                <pie-item 
                    title="免费模式—赔付金额"
                    :count="-1"
                    pieId="4"
                    :data="pieData2"
                />
            </Col> -->
        </Row>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import PieItem from '@/components/PieItem'
import { mapState } from "vuex";
export default {
    name:'pricemix',
    components:{PieItem},
    filters:{

    },
    props:{

    },
    data(){
        return{
            // pieData2:[
            //     { value: 335, name: "5次" },
            //     { value: 310, name: "8次" },
            //     { value: 234, name: "10次" },
            //     { value: 123, name: "15次" },
            //     { value: 654, name: "20次" }
            // ]
        }
    },
    computed:{
    ...mapState(["priceNormalCount","priceNormalData","priceFreeCount","priceFreeData","freeChooseData","freeSelectCount"]),
    },
    watch:{

    },
    created(){

    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
.pricemix{
    background-color: #fff;
    margin-top: 15px;
     .search{
            padding-top: 10px;
            padding-bottom: 10px;
        }
}
</style>
