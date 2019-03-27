<template>
    <div class="pieItem">
        <p class="title">{{title}} <span class="count">{{count|format}}</span></p>
        <div class="piechart" :id="'pieitem'+pieId"></div>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
    name:'',
    components:{},
    filters:{
        format(v){
            return v.toLocaleString()
        }
    },
    props:{
        title:String,
        count:Number,
        pieId:String,
        data:Array
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

    },
    mounted(){
        this.drawPie()
    },
    methods:{
       drawPie() {
      let option = {
        tooltip: {
          trigger: "item",
           formatter(params){
            let data=params.data;
            let res=''
            for (let [key,val] of Object.entries(data)){
                res+=key+' : '+val+'<br/>'
            }
            return res
          }
        },
        series: [
          {
            name: this.title,
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      let dom = "pieitem" + this.pieId;
      const pie = document.getElementById(dom);
      let myChart = this.$echarts.init(pie);
      myChart.setOption(option);
    }
    }
}
</script>
<style lang="less" scoped>
.pieItem{
    background-color: #fff;
    .title{
        font-size: 16px;
        line-height: 36px;
        font-weight: bold;

    }
    .count{
        color: #f00;
        font-size: 14px;
        font-weight: bold;
        padding-left: 30px
    }
    .piechart{
        width: 100%;
        height: 300px;
    }
}
</style>
