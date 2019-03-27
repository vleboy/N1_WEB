<template>
    <div class="betDetail">
        <div class="sumary">
            <p class="title">下注总和</p>
            <div class="sumary_content">
                <Row>
                    <Col span="2">
                    <span class="bigfont">历史</span>
                    </Col>
                    <Col span="6" class="num">
                    <span>
                        <Icon type="social-yen" size=24></Icon> <span class='number'>152,435</span></span>
                    </Col>
                    <Col span="2">
                    <span class="bigfont">今日</span>
                    </Col>
                    <Col span="6" class="num">
                    <span>
                        <Icon type="social-yen" size=24></Icon> <span class='number'>152,435</span></span>
                    </Col>
                    <Col span="2">
                    <span class="bigfont">占比</span>
                    </Col>
                    <Col span="4">
                    <i-circle :percent="80" :size="80" stroke-color="#54DA54" class="circles">
                        <span class="demo-Circle-inner" style="font-size:20px">80%</span>
                    </i-circle>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="limit1">
            <p class="title">额度0.25-2.5</p>
            <div class="sumary_content">
                <Row>
                    <Col span="2">
                    <span class="bigfont">历史</span>
                    </Col>
                    <Col span="6" class="num">
                    <span>
                        <Icon type="social-yen" size=24></Icon> <span class='number'>152,435</span></span>
                    </Col>
                    <Col span="2">
                    <span class="bigfont">今日</span>
                    </Col>
                    <Col span="6" class="num">
                    <span>
                        <Icon type="social-yen" size=24></Icon> <span class='number'>152,435</span></span>
                    </Col>
                    <Col span="2">
                    <span class="bigfont">占比</span>
                    </Col>
                    <Col span="4">
                    <i-circle :percent="80" :size="80" stroke-color="#54DA54" class="circles">
                        <span class="demo-Circle-inner" style="font-size:20px">80%</span>
                    </i-circle>
                    </Col>
                </Row>
                <div id="lineChart1" class="lineChart"></div>
                <div class="fix"></div>
            </div>
        </div>
        <div class="limit1">
            <p class="title">额度5-50</p>
            <div class="sumary_content">
                <Row>
                    <Col span="2">
                    <span class="bigfont">历史</span>
                    </Col>
                    <Col span="6" class="num">
                    <span>
                        <Icon type="social-yen" size=24></Icon> <span class='number'>152,435</span></span>
                    </Col>
                    <Col span="2">
                    <span class="bigfont">今日</span>
                    </Col>
                    <Col span="6" class="num">
                    <span>
                        <Icon type="social-yen" size=24></Icon> <span class='number'>152,435</span></span>
                    </Col>
                    <Col span="2">
                    <span class="bigfont">占比</span>
                    </Col>
                    <Col span="4">
                    <i-circle :percent="80" :size="80" stroke-color="#54DA54" class="circles">
                        <span class="demo-Circle-inner" style="font-size:20px">80%</span>
                    </i-circle>
                    </Col>
                </Row>
                <div id="lineChart2" class="lineChart"></div>
                <div class="fix"></div>
            </div>
        </div>
        <div class="limit1">
            <p class="title">额度125-500</p>
            <div class="sumary_content">
                <Row>
                    <Col span="2">
                    <span class="bigfont">历史</span>
                    </Col>
                    <Col span="6" class="num">
                    <span>
                        <Icon type="social-yen" size=24></Icon> <span class='number'>152,435</span></span>
                    </Col>
                    <Col span="2">
                    <span class="bigfont">今日</span>
                    </Col>
                    <Col span="6" class="num">
                    <span>
                        <Icon type="social-yen" size=24></Icon> <span class='number'>152,435</span></span>
                    </Col>
                    <Col span="2">
                    <span class="bigfont">占比</span>
                    </Col>
                    <Col span="4">
                    <i-circle :percent="80" :size="80" stroke-color="#54DA54" class="circles">
                        <span class="demo-Circle-inner" style="font-size:20px">80%</span>
                    </i-circle>
                    </Col>
                </Row>
                <div id="lineChart3" class="lineChart"></div>
                <div class="fix"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  data() {
    return {};
  },
  mounted(){
      this.drwaLine('lineChart1')
      this.drwaLine('lineChart2')
      this.drwaLine('lineChart3')
  },
  methods: {
    drwaLine(id) {
      let option = {
        title: {
          text: "下注量"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["每小时历史下注量", "今日下注量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "每小时历史下注量",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "今日下注量",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290, 330, 310]
          },
        ]
      };
      const chart = document.getElementById(id);
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.betDetail {
  p {
    line-height: 36px;
    font-weight: bold;
  }
  .sumary_content {
    background-color: #fff;
    line-height: 80px;
    .bigfont {
      font-size: 18px;
      font-weight: bold;
      padding-left: 15px;
    }
    .num {
      border-bottom: 1px solid #3366ff;
    }
     .number{
        padding-left: 30px;
        font-size: 16px;
    }
    .circles {
      margin-top: 15px;
    }
  }
  .lineChart {
    width: 98%;
    height: 300px;
    margin: 0 auto;
    background-color: #fff;
  }
  .fix{
      height: 10px;
      width: 100%;
  }
}
</style>
