<template>
    <div class="hourChart">
         <div :id="'hourChart'+hourId" class="hourChart"></div>
    </div>
</template>
<script>
export default {
    name:'hourChart',
    components:{},
    filters:{

    },
    props:{
        title:String,
        legend:Array,
        hourId:String,
        todayArr:Array,
        avarageArr:Array
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
        this.drwaLine()
    },
    updated() {
    this.$nextTick(() => {
      
    });
  },
    methods:{
       drwaLine() {
        let option = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.legend// ["7日平均下注", "今日下注"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: this.legend[0],
            type: "line",
            data: this.todayArr
          },
          {
            name: this.legend[1],
            type: "line",
            data: this.avarageArr
          },
        ]
      };
      let dom='hourChart'+this.hourId
      const chart = document.getElementById(dom);
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    }
    }
}
</script>
<style lang="less" scoped>
 .hourChart{
            width: 100%;
            height: 250px;
        }
</style>
