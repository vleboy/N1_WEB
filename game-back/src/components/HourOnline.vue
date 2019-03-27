<template>
    <div class="hourOnline">
         <div id="hourChart" class="hourChart"></div>
    </div>
</template>
<script>
export default {
    name:'hourOnlineChart',
    components:{},
    filters:{
      
    },
    props:{
       onlineToday:Array,
       onlineSeven:Array
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
        this.drawBar()
    },
    updated() {
    this.$nextTick(() => {
      
    });
  },
    methods:{
       drawBar() {
      let option = {
        xAxis: {
          type: "category",
          data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        },
        yAxis: {
          type: "value"
        },
        legend: {
          data: ["7日平均人数", "今日在线人数"]
        },
        series: [
          {
            name: "7日平均人数",
            data: this.onlineSeven,
            type: "bar"
          },
          {
            name: "今日在线人数",
            data: this.onlineToday,
            type: "bar"
          }
        ],
        tooltip: {
          show: true,
          trigger:'axis',
          axisPointer: {
              type: 'shadow'
            }
        }
      };
      const chart = document.getElementById("hourChart");
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    }
    }
}
</script>
<style lang="less" scoped>
 .hourChart{
            width: 100%;
            height: 400px;
        }
</style>
