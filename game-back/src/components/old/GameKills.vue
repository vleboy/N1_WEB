<template>
  <div class="kill">
    <p class="head_title">{{title}}</p>
    <div class="killcontent">
      <div class="cirle">
        <div class="history">
          <p class="killtitle">{{date}}</p>
          <i-circle :percent="80" stroke-color="#5cb85c">
            <span class="demo-Circle-inner" style="font-size:24px">80%</span>
          </i-circle>
        </div>
        <div class="today">
          <p class="killtitle">今天</p>
          <i-circle :percent="80" stroke-color="#5cb85c">
            <span class="demo-Circle-inner" style="font-size:24px">80%</span>
          </i-circle>
        </div>
      </div>
      <div :id="'linechart'+num" class="chart"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLineChart();
  },
  methods: {
    drawLineChart() {
      let option = {
        xAxis: {
          type: "category",
          data: ["三挡", "二挡", "一档"]
        },
        legend: {
          data: ["历史", "今天"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "历史",
            data: [120, 200, 150],
            type: "bar"
          },
          {
            name: "今天",
            data: [120, 200, 150],
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
      let dom = "linechart" + this.num;
      const lineChart = document.getElementById(dom);
      let myChart = this.$echarts.init(lineChart);
      myChart.setOption(option);
    }
  },
  props: ["title", "date", "num"]
};
</script>
<style lang="less" scoped>
.kill {
  .head_title{
    font-size: 14px;
    font-weight: bold;
    line-height: 32px;
  }
  .killcontent {
    background-color: #fff;
    height: 200px;
    .cirle {
      display: flex;
      width: 50%;
      justify-content: center;
      align-items: center;
      height: 200px;
      float: left;
    }
    .killtitle {
      text-align: center;
      line-height: 36px;
      
    }
    .history,
    .today {
      margin: auto 50px;
    }
    .chart {
      height: 180px;
      width: 450px;
      position: relative;
      right: 80px;
      float: right;
      margin: 10px auto;
    }
  }
}
</style>
