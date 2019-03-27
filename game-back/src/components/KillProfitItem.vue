<template>
    <div class="killprofititem">
        <Row>
            <Col span="4">
            <i-circle :percent="rate>=100?100:rate" stroke-color="#169BD5" class="circle">
                <p class="circle1">平均杀数</p>
                <p class="circle2" @click="changeToKill">
                    <u><span class="demo-Circle-inner" style="font-size:20px">{{rate|filterRate}}</span></u>
                </p>
                <p class="circle3">{{level}}</p>
                <Button type="default" class="switch" @click="switchLevel">切换</Button>
            </i-circle>
            <p class="title">盈利总和-{{range}}</p>
            <p class="num" @click="changeToProfit">
                <u><Icon type="logo-yen" class="icon" />{{formatProfit}}</u></p>
            </Col>
            <Col span="20">
            <div :id="'killProfit'+chartId" class="chart"></div>
            </Col>
        </Row>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
import { mapState } from "vuex";
export default {
  name: "killProfit",
  components: {},
  filters:{
    filterRate(v){
      return v + '%'
    }
  },
  props: {
    range: String,
    chartId: String,
    profit:[Number,String],
    killRate:Object,
    profitArr:Array,
    killRateArr:Array,
    killXaxis:Array,
    profitxAxis:Array,
  },
  data() {
    return{
      rate:'',
      level:'',
      index:1,
      showProfit:false
    }
  },
  computed: {
    formatProfit(){
      return thousandFormatter(+this.profit)
    },
    entries(){
      return Object.entries(this.killRate)
    },
  },
  watch: {},
  created() {
    let kill=this.killRate;
    this.rate=kill.total;
    this.level='total'
  },
  mounted() {
    let color = ["#169BD5"];
    this.drawLineChart(this.killRateArr,this.killXaxis, color);
  },
  methods: {
    drawLineChart(data,xAxis,color) {
      let option = {
        xAxis: {
          type: "category",
          data:xAxis
        },
        yAxis: {
          type: "value",
          axisLabel:this.showProfit?{formatter:'{value}'} : {formatter:'{value} %'}
        },
        series: [
          {
            name: this.range,
            data: data,
            type: "bar",
            barWidth: "30%"
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          textStyle:{
            align:'left'
          },
           formatter(params){
              let data=params[0].data;
              let res=''
              for (let [key,val] of Object.entries(data)){
                  res+=key+' : '+val+'<br/>'
              }
              return res
          }
        },
        color: color
      };
      //  if (myChart != null && myChart != "" && myChart != undefined) {
      //         myChart.dispose();
      //         console.log(1);
      //  }
      let dom = "killProfit" + this.chartId;
      let myChart = this.$echarts.init(document.getElementById(dom));
      myChart.setOption(option);
    },
    changeToKill() {
      let color = ["#169BD5"];
      this.showProfit=false;
      this.drawLineChart(this.killRateArr,this.killXaxis, color);
    },
    changeToProfit() {
      let color = ["#c23531"];
      this.showProfit=true;
      this.drawLineChart(this.profitArr,this.profitxAxis, color);
    },
    switchLevel(){
      let entries=this.entries;
      let index=this.index;
      if (index > entries.length - 1) {
					index = 0;
      }
      this.level=entries[index][0]
      this.rate=entries[index][1]
      index ++;
      this.index=index;
    }
  }
};
</script>
<style lang="less" scoped>
.killprofititem {
  background-color: #fff;
  text-align: center;
  margin: 10px auto;
  .circle {
    margin-top: 28px;
  }
  .circle1 {
    padding-top: 18px;
  }
  .circle2 {
    padding-top: 8px;
    cursor: pointer;
  }
  .circle3{
    padding-top: 4px;
    line-height: 24px;
  }
  .switch {
    position: relative;
    top: 8px;
  }
  .title {
    font-size: 16px;
    margin-top: 10px;
    font-weight: bold;
  }
  .num {
    font-size: 16px;
    font-weight: bold;
    color: #f00;
    cursor: pointer;
  }
  .chart {
    width: 100%;
    height: 250px;
  }
}
</style>
