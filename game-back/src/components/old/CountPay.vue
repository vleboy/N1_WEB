<template>
    <div class="countPayItem">
        <p class="secTitle">{{title}}</p>
        <div class="content">
            <Row class="rowTitle">
                <Col span="12">
                <span class="bigFont">历史次数</span>
                <span class="datas">
                    <Icon type="pricetag"></Icon> 5,451</span>
                </Col>
                <Col span="12">
                <span class="bigFont">今日次数</span>
                <span class="datas">
                    <Icon type="pricetag"></Icon> 5,451</span>
                </Col>
            </Row>
            <div class="lineChart" :id="'lineChart'+num[0]"></div>
             <Row class="rowTitle">
                <Col span="12">
                <span class="bigFont">赔付额度</span>
                <span class="datas">
                    <Icon type="social-yen"></Icon> 5,451</span>
                </Col>
                <Col span="12">
                <span class="bigFont">今日赔付</span>
                <span class="datas">
                    <Icon type="social-yen"></Icon> 5,451</span>
                </Col>
            </Row>
            <div class="lineChart" :id="'lineChart'+num[1]"></div>
        </div>
    </div>
</template>
<script>
import { thousandFormatter } from "@/config/format";
export default {
  data() {
    return {};
  },
  mounted() {
      this.drawLine(0)
      this.drawLine(1)
  },
  methods: {
    drawLine(index) {
      let option = {
        xAxis: {
          type: "category",
          data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        },
        yAxis: {
          type: "value"
        },
        legend: {
          data: ["历史次数", "今日次数"]
        },
        series: [
          {
            name: "历史次数",
            data: [220,   140,    170,  210,  160,  180,  240,  153, 110,   210,   170, 180,  206, 450,110, 200,  150, 120,  200,  150,120,200,  150],
            type: "line"
          },
           {
            name: "今日次数",
            data: [120,   150,    120,  200,  150,  120,  200,  150, 120,   200,   150, 120,  2,  150,120,200,  150],
            type: "line"
          }
        ]
      };
      let name='lineChart'+this.num[index]
      const chart = document.getElementById(name);
      let myChart = this.$echarts.init(chart);
      myChart.setOption(option);
    }
  },
  props: {
      title:String,
      num:Array
  }
};
</script>
<style lang="less" scoped>
.countPayItem {
  .secTitle {
    line-height: 36px;
    font-size: 14px;
    font-weight: bold;
  }
  .content {
    background-color: #fff;
    .rowTitle{
        padding-top: 15px;
    }
    .bigFont {
      font-size: 18px;
      font-weight: bold;
      padding-left: 24px;
    }
    .datas {
      border-bottom: 1px solid #3366ff;
      margin-left: 20px;
      text-indent: 2em;
    }
  }
  .lineChart {
    width: 100%;
    height: 400px;
  }
}
</style>
