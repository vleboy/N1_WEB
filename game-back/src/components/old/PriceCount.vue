<template>
    <div class="priceCount">
        <p class="secTitle">{{title}}</p>
        <div class="freecontent">
            <Row>
                <Col span="14">
                <ul>
                    <li>
                        <Row>
                            <Col span="3">
                            <span>Bwin次数</span>
                            </Col>
                            <Col span="2">
                            <span>总计</span>
                            </Col>
                            <Col span="12">
                            <span class="datas">
                                <Icon type="pricetag"></Icon> 5,451
                                <span>占比</span>
                                <span>0.24%</span>
                            </span>
                            </Col>
                        </Row>
                    </li>
                    <li>
                        <Row>
                            <Col span="3">
                            <span>Mwin次数</span>
                            </Col>
                            <Col span="2">
                            <span>总计</span>
                            </Col>
                            <Col span="12">
                            <span class="datas">
                                <Icon type="pricetag"></Icon> 5,451
                                <span>占比</span>
                                <span>0.24%</span>
                            </span>
                            </Col>
                        </Row>
                    </li>
                    <li>
                        <Row>
                            <Col span="3">
                            <span>Swin次数</span>
                            </Col>
                            <Col span="2">
                            <span>总计</span>
                            </Col>
                            <Col span="12">
                            <span class="datas">
                                <Icon type="pricetag"></Icon> 5,451
                                <span>占比</span>
                                <span>0.24%</span>
                            </span>
                            </Col>
                        </Row>
                    </li>
                </ul>
                </Col>
                <Col span="10">
                <div :id="'pricePie'+num" class="pie"></div>
                </Col>
            </Row>
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
    let data = [
      { value: 335, name: "Bwin次数" },
      { value: 310, name: "Mwin次数" },
      { value: 234, name: "Swin次数" }
    ];
    this.drawPie(data);
  },
  methods: {
    drawPie(data) {
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "普通模式大奖次数",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: data,
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
      let dom = "pricePie" + this.num;
      const pie = document.getElementById(dom);
      let myChart = this.$echarts.init(pie);
      myChart.setOption(option);
    }
  },
  props: ["title", "num"]
};
</script>
<style lang="less" scoped>
.priceCount {
  .secTitle {
    line-height: 36px;
    font-weight: bold;
  }
  .freecontent {
    background-color: #fff;
    ul {
      padding-top: 60px;
      li {
        line-height: 36px;
        text-indent: 2em;
        list-style-type: none;
        .datas {
          border-bottom: 1px solid #3366ff;
        }
      }
    }
    .pie {
      width: 350px;
      height: 230px;
    }
  }
}
</style>

