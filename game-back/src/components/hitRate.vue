<template>
    <div class="hitRate">
        <!-- <div class="search clear">
            <div class="right">
                <RadioGroup v-model="source" type="button" @on-change='changeSource'>
                    <Radio label="0">1月</Radio>
                    <Radio label="1">7天</Radio>
                    <Radio label="2">3天</Radio>
                    <Radio label="3">昨天</Radio>
                </RadioGroup>
                <DatePicker type="daterange" v-model="dateRange" :editable='false' @on-change="changeRange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
            </div>
         </div> -->
        <div class="title">
             <Row>
                <Col span="10">
                <p class="secTitle">游戏命中率</p>
                </Col>
                <Col span="5">
                <p><span class="rate">{{hitRateCount+'%'}}</span></p>
                <p class="count">{{gameCount}} 局</p>
                </Col>
            </Row>
        </div>
        <div id="hitrateChart" class="barchart"></div>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  props: {
      hitRateCount:Number,
      gameCount:Number,
      xAxis:Array,
      data:Array
  },
  data() {
    return {
    };
  },
  computed:{

  },
  mounted(){
      this.drawBar()
  },
  methods:{
    //   changeSource(){
    //       console.log(this.source);
    //   },
    //   changeRange(){
    //       let range = this.dateRange.map(item => {
    //         return item.getTime();
    //         });
    //         console.log(range);
    //   },
       drawBar() {
      let option = {
        xAxis: {
          type: "category",
          data: this.xAxis
        },
        yAxis: {
          type: "value",
          axisLabel: {formatter:'{value} %'}
        },
        series: [
          {
            name: "命中率",
            data: this.data,
            type: "bar",
            barWidth:'50%'
          },
        ],
        tooltip: {
          show: true,
          trigger:'axis',
          axisPointer: {
              type: 'shadow'
            },
           formatter(params){
              let data=params[0].data;
              let res=''
              for (let [key,val] of Object.entries(data)){
                  res+=key+' : '+val+'<br/>'
              }
              return res
          }
        }
      };
      const chart = document.getElementById("hitrateChart");
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.hitRate {
  background-color: #fff;
  margin-top: 15px;
  .secTitle {
    line-height: 38px;
    font-weight: bold;
    font-size: 16px;
    text-indent: 1em;
  }
  .search{
            padding-top: 10px;
            padding-bottom: 10px;
        }
  .rate{
      display: inline-block;
      margin-top: 10px;
      text-align: center;
      line-height: 40px;
      width: 150px;
      height: 40px;
      background-color: #00CCFF;
      color: #000;
      font-size: 16px;
      font-weight: bold;
  }
  .count{
      font-size: 16px;
      font-weight: bold;
      line-height: 40px;
  }
  .barchart{
      width: 100%;
      height: 300px;
  }
}
</style>
